import { Component, OnInit, Input } from '@angular/core';
import { NavbarMod } from './enums';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() navMod: NavbarMod = NavbarMod.Default;
  navModType = NavbarMod;

  constructor() { }

  ngOnInit() {
    console.log(typeof this.navMod);
  }

}
