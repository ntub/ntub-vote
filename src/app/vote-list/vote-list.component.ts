import { Component, OnInit, NgZone } from '@angular/core';
import { NavbarMod } from '../navbar/enums';
import { AuthService } from '../shared-services/auth.service';
import { of, Subject } from 'rxjs';
import { filter, mergeMap, debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { VotePoolService } from '../shared-services/vote-pool.service';
import { VotePool } from '../model/vote-pool.model';

@Component({
  selector: 'app-vote-list',
  templateUrl: './vote-list.component.html',
  styleUrls: ['./vote-list.component.scss']
})
export class VoteListComponent implements OnInit {
  navMod = NavbarMod.VoteLeave;
  votePools: VotePool[] = [];
  subject = new Subject<VotePool>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private ngzone: NgZone,
    private votePoolService: VotePoolService
    ) { }

  ngOnInit() {
    const authSource = of(this.auth.isAuthenticated);

    /// isAuthenticated === true
    authSource.pipe(
      filter(v => v),
      mergeMap(() => {
        return this.votePoolService.getVotePools();
      }),
    ).subscribe(result => {
      this.votePools = result;
    })
    /// isAuthenticated === false
    authSource.pipe(
      filter(v => !v),
      mergeMap(_ => this.auth.login()),
    ).subscribe(() => {
      this.ngzone.run(()=>{
        this.router.navigate(['/vote-list']);
      })
    });

    /// handle to voting page
    this.subject.pipe(
      debounceTime(500),
      map(votePool => votePool.id),
    ).subscribe(id => {
      this.router.navigate(['/member', `${id}`]);
    }, err => {
      this.router.navigate(['/'])
    })
  }

  toVoting(item: VotePool) {
    if (!item.voted) {
      this.subject.next(item);
    }
  }

}
