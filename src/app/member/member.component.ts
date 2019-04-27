import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs/operators'

import { FooterMod } from '../footer/enums'
import { SendVote, VotePoolDetail } from '../model/vote-pool.model'
import { NavbarMod } from '../navbar/enums'
import { VotePoolService } from '../shared-services/vote-pool.service'

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  navMod = NavbarMod.VoteLeave;
  footerMod = FooterMod.Submit;

  votePool: VotePoolDetail;
  vote?: SendVote = null;

  constructor(private route: ActivatedRoute, private votePoolService: VotePoolService) { }

  ngOnInit() {

    this.route.paramMap.pipe(
      map(params => +params.get('id')),
      switchMap(id => this.votePoolService.getVotePool(id))
    ).subscribe(result => {
      this.votePool = result;
    });
  }

  onSelected(vote: SendVote) {
    this.vote = vote;
  }

}
