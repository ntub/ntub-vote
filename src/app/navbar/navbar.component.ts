import { Component, OnInit, Input } from '@angular/core';
import { NavbarMod } from './enums';
import { AuthService } from '../shared-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() navMod: NavbarMod = NavbarMod.Default;
  navModType = NavbarMod;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/logout']);
  }

}
