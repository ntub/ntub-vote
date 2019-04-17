import { Component, Input, OnInit } from '@angular/core'

import { HeaderMod } from './enums'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() headerMod: HeaderMod = HeaderMod.None;
  headerModType = HeaderMod;

  constructor() { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
  }

}
