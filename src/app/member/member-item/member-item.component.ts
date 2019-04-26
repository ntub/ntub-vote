import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Candidate } from 'src/app/model/candidate.model'
import { SendVote } from 'src/app/model/vote-pool.model'

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {

  @Input() isMany = true;
  @Input() selectId?: number = null;
  @Output() voteChanged: EventEmitter<SendVote> = new EventEmitter<SendVote>();
  @Input() candidate: Candidate;
  isAgree?: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  get isSelected(): boolean {
    return this.candidate.id === this.selectId;
  }

  selectCandidate(agree: boolean = true) {
    this.isAgree = agree;
    this.voteChanged.emit({ id: this.candidate.id, isAgree: agree });
  }

}
