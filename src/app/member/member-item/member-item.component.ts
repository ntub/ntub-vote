import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {

  @Input() isMany = true;
  @Input() selectId: number;
  @Output() idChanged: EventEmitter<number> = new EventEmitter<number>();
  id: number;

  constructor() { }

  ngOnInit() {
  }

  get isSelected(): boolean {
    return this.id === this.selectId;
  }

}
