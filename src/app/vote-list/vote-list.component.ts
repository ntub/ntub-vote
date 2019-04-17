import { Component, OnInit } from '@angular/core';
import { NavbarMod } from '../navbar/enums';

@Component({
  selector: 'app-vote-list',
  templateUrl: './vote-list.component.html',
  styleUrls: ['./vote-list.component.scss']
})
export class VoteListComponent implements OnInit {
  navMod = NavbarMod.VoteLeave;

  constructor() { }

  ngOnInit() {
  }

}
