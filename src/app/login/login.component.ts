import { AuthService } from './../shared-services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService as SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { TimeService } from '../shared-services/time.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private spinner: NgxSpinnerService,
    private timeService: TimeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.timeService.isVoteTime().then(isVoteTime => {
      if (this.authService.isAuthenticated) {
        this.router.navigate(['/vote-list']);
      } else if (isVoteTime) {
        this.spinner.show();
        this.socialAuthService
          .signIn(GoogleLoginProvider.PROVIDER_ID)
          .then(_ => {
            this.authService.login().subscribe(() => {
              this.spinner.hide();
              this.router.navigate(['/vote-list']);
            });
          })
          .catch(err => {
            this.spinner.hide();
            this.router.navigate(['/home']);
            console.log(err);
          });
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
