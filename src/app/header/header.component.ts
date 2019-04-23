import { Component, Input, OnInit, NgZone } from '@angular/core';

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

  constructor(private auth: AuthService,
              private router: Router,
              private timeService: TimeService,
              private zone: NgZone) { }

  async ngOnInit() {
    const isVoteTime = await this.timeService.isVoteTime();
    if (isVoteTime) {
      this.headerMod = HeaderMod.Home;
    } else {
      this.headerMod = HeaderMod.None;
    }
  }

  async login() {
    const isVoteTime = await this.timeService.isVoteTime();
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/vote-list']);
    } else if (isVoteTime) {
      this.auth.login().subscribe(() => {
        this.zone.run(() => {
          this.router.navigate(['/vote-list']);
        });
      });
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.auth.logout();
  }

}
