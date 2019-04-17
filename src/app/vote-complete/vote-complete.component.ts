import { Component, OnInit } from '@angular/core';
import { NavbarMod } from '../navbar/enums';
import { HeaderMod } from '../header/enums';

@Component({
  selector: 'app-vote-complete',
  templateUrl: './vote-complete.component.html',
  styleUrls: ['./vote-complete.component.scss']
})
export class VoteCompleteComponent implements OnInit {

  navMod = NavbarMod.Default;
  headerMod = HeaderMod.Finished;

  constructor() { }

  ngOnInit() {
  }

}
