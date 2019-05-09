import { Component, OnInit } from '@angular/core';
import { NavbarMod } from '../navbar/enums';
import { HeaderMod } from '../header/enums';
import { FooterMod } from '../footer/enums';
import { CandidateService } from '../shared-services/candidate.service';
import {
  mergeMap,
  shareReplay,
  toArray,
  reduce,
  map,
  tap,
  filter
} from 'rxjs/operators';
import { groupBy } from 'lodash';
import { Candidate } from '../model/candidate.model';
import { TimeService } from '../shared-services/time.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  presidents: Candidate[];
  councilors: Candidate[];
  representatives: Candidate[];
  navMod = NavbarMod.VoteList;
  footerMod = FooterMod.Home;
  headerMod = HeaderMod.None;

  constructor(
    private candidateService: CandidateService,
    private timeService: TimeService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.candidateService
      .getCandidates()
      .pipe(
        // tap(console.log),
        // mergeMap(candidate => candidate),
        // tap(console.log),
        // toArray(),
        // tap(console.log),
        map(candidate => groupBy(candidate, item => item.pool.slice(-2)))
      )
      .subscribe(data => {
        console.log(data);
        this.presidents = data.會長;
        this.councilors = data.議員;
        this.representatives = data.代表;
      });
    this.timeService
      .isVoteTime()
      .then(result => {
        this.spinner.hide();
        if (result) {
          this.headerMod = HeaderMod.Home;
        }
        this.headerMod = HeaderMod.None;
      })
      .catch(() => {
        this.spinner.hide();
      });
  }
}
