import { Component, Input, OnInit, NgZone } from '@angular/core';

import { HeaderMod } from './enums';
import { AuthService } from '../shared-services/auth.service';
import { Router } from '@angular/router';
import { TimeService } from '../shared-services/time.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Time } from '../model/time.model';
import { DatePipe } from '@angular/common';
import { AuthService as SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() headerMod: HeaderMod = HeaderMod.None;
  headerModType = HeaderMod;
  time$: Observable<Time>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private timeService: TimeService,
    private zone: NgZone,
    private spinner: NgxSpinnerService,

    private socialAuthService: SocialAuthService
  ) {
    this.time$ = timeService.getTime();
  }

  async ngOnInit() {
    const isVoteTime = await this.timeService.isVoteTime();
    const isEnd = await this.timeService.isEnd();
    if (!isEnd) {
      if (isVoteTime && this.headerMod !== HeaderMod.Finished) {
        this.headerMod = HeaderMod.Home;
      } else if (this.headerMod !== HeaderMod.Finished) {
        this.headerMod = HeaderMod.None;
      }
    } else {
      this.headerMod = HeaderMod.End;
    }
  }

  async testLogin() {
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
  }

  async login() {
    // this.router.navigate(['/login']);
    const isVoteTime = await this.timeService.isVoteTime();
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/vote-list']);
    } else if (isVoteTime) {
      this.spinner.show();
      // this.auth.login().subscribe(() => {
      //   this.zone.run(
      //     () => {
      //       this.spinner.hide();
      //       this.router.navigate(['/vote-list']);
      //     },
      //     error => {
      //       this.spinner.hide();
      //     }
      //   );
      // });
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
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/logout']);
    // this.router.navigate(['/home']);
  }
}
