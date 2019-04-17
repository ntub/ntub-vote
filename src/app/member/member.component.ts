import { Component, OnInit } from '@angular/core';
import { NavbarMod } from '../navbar/enums';
import { FooterMod } from '../footer/enums';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  navMod = NavbarMod.VoteLeave;
  footerMod = FooterMod.Submit;

  constructor() { }

  ngOnInit() {
  }

}
