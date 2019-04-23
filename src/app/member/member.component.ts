import { Component, OnInit } from '@angular/core';
import { NavbarMod } from '../navbar/enums';
import { FooterMod } from '../footer/enums';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { VotePoolService } from '../shared-services/vote-pool.service';
import { VotePoolDetail, SendVote } from '../model/vote-pool.model';

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
      console.log(result);
      this.votePool = result;
    });
  }

  onSelected(vote: SendVote) {
    console.log(vote);
    this.vote = vote;
  }

}
