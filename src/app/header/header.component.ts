import { Component, Input, OnInit, NgZone } from '@angular/core';

import { HeaderMod } from './enums';
import { AuthService } from '../shared-services/auth.service';
import { Router } from '@angular/router';
import { TimeService } from '../shared-services/time.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Time } from '../model/time.model';
import { DatePipe } from '@angular/common';

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
    private auth: AuthService,
    private router: Router,
    private timeService: TimeService,
    private zone: NgZone,
    private spinner: NgxSpinnerService
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

  async login() {
    const isVoteTime = await this.timeService.isVoteTime();
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/vote-list']);
    } else if (isVoteTime) {
      this.spinner.show();
      this.auth.login().subscribe(() => {
        this.zone.run(
          () => {
            this.spinner.hide();
            this.router.navigate(['/vote-list']);
          },
          error => {
            this.spinner.hide();
          }
        );
      });
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
