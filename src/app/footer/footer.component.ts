import { Component, Input, OnInit } from '@angular/core'

import { FooterMod } from './enums'
import { SendVote } from '../model/vote-pool.model';
import { VotePoolService } from '../shared-services/vote-pool.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() footerMod: FooterMod = FooterMod.None;
  @Input() submitVote?: SendVote = null;
  footerModType = FooterMod;

  get isFixedFooter(): boolean {
    return this.footerMod !== FooterMod.Home;
  }

  constructor(private votePoolService: VotePoolService, private router: Router) { }

  ngOnInit() {
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  submit() {
    if (this.submitVote) {
      this.votePoolService.createVote(this.submitVote).subscribe(() => {
        this.router.navigate(['/vote-list']);
      });
    } else {
      alert('請選擇候選人!');
    }
  }

}
