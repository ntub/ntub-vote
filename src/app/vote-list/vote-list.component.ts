import { Component, OnInit } from '@angular/core';
import { NavbarMod } from '../navbar/enums';
import { AuthService } from '../shared-services/auth.service';
import { of } from 'rxjs';
import { shareReplay, filter, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TimeService } from '../shared-services/time.service';

@Component({
  selector: 'app-vote-list',
  templateUrl: './vote-list.component.html',
  styleUrls: ['./vote-list.component.scss']
})
export class VoteListComponent implements OnInit {
  navMod = NavbarMod.VoteLeave;

  constructor(private auth: AuthService, private router: Router, private timeService: TimeService) { }

  ngOnInit() {
    const authSource = of(this.auth.isAuthenticated);
    authSource.pipe(
      filter(v => v),

    )

    authSource.pipe(
      filter(v => !v),
      mergeMap(_ => this.auth.login()),
    ).subscribe(_ => {
      this.router.navigate(['/vote-list']);
    });
  }

}
