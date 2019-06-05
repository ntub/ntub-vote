import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { FooterMod } from './enums';
import { SendVote } from '../model/vote-pool.model';
import { VotePoolService } from '../shared-services/vote-pool.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CandidateService } from '../shared-services/candidate.service';
import { Candidate } from '../model/candidate.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @ViewChild('checkSwal', { static: false }) private checkSwal: SwalComponent;
  @Input() footerMod: FooterMod = FooterMod.None;
  @Input() submitVote?: SendVote = null;
  candidate: Candidate;
  footerModType = FooterMod;

  get isFixedFooter(): boolean {
    return this.footerMod !== FooterMod.Home;
  }

  constructor(
    private candidateService: CandidateService,
    private votePoolService: VotePoolService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() { }

  scrollTop() {
    window.scroll(0, 0);
  }

  onBeforeOpen(event) {
    console.log('before');
    for (let i = 0; i < 999; i++) { }
  }

  submit() {
    if (this.submitVote) {
      console.log(this.submitVote);
      this.spinner.show();
      this.candidateService
        .getCandidate(this.submitVote.id)
        .toPromise()
        .then(candidate => {
          this.candidate = candidate;
          return;
        })
        .then(() => {
          this.spinner.hide();
          return this.checkSwal.show();
        })
        .then(check => {
          console.log(check);
          if (check.value) {
            this.spinner.show();
            this.votePoolService
              .createVote(this.submitVote)
              .pipe(finalize(() => this.spinner.hide()))
              .subscribe(() => {
                this.router.navigate(['/vote-list']);
              });
          }
        })
        .catch(err => {
          console.log('error');
          console.log(err);
        })
        .finally(() => {
          this.spinner.hide();
        });
    } else {
      alert('請選擇候選人!');
    }
  }
}
