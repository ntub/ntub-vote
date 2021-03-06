import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared-services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    // const newWindow = window.open(
    //   'https://mail.google.com/mail/?logout&hl=fr',
    //   'Disconnect from Google',
    //   'width=100,height=50,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,top=200,left=200'
    // );
    setTimeout(() => {
      // if (newWindow) {
      //   newWindow.close();
      // } else {
      //   // window.location = 'auth/google';
      //   console.log('ok');
      //   this.router.navigate(['/home']);
      // }
      console.log('go');
      this.authService.logout();
      // this.router.navigate(['/home']);
    }, 2000);
  }
}
