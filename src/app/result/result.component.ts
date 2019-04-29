import { Component, OnInit } from '@angular/core';
import { NavbarMod } from '../navbar/enums';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  navMod = NavbarMod.VoteEnd;
  constructor() {}

  ngOnInit() {}
}
