import { Component, Input, OnInit } from '@angular/core';

import { HeaderMod } from './enums';
import { AuthService } from '../shared-services/auth.service';
import { Router } from '@angular/router';
import { TimeService } from '../shared-services/time.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() headerMod: HeaderMod = HeaderMod.None;
  headerModType = HeaderMod;

  constructor(private auth: AuthService, private router: Router, private timeService: TimeService) { }

  ngOnInit() {
  }

  async login() {
    const isVoteTime = await this.timeService.isVoteTime();
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/vote-list']);
    } else if (isVoteTime) {
      this.auth.login();
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.auth.logout();
  }

}
