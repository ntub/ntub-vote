import { Component, OnInit } from '@angular/core';
import { NavbarMod } from '../navbar/enums';
import { HeaderMod } from '../header/enums';
import { FooterMod } from '../footer/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  navMod = NavbarMod.VoteList;
  headerMod = HeaderMod.Home;
  footerMod = FooterMod.Home;

  constructor() { }

  ngOnInit() {
  }

}
