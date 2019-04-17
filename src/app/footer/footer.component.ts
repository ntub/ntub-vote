import { Component, Input, OnInit } from '@angular/core'

import { FooterMod } from './enums'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() footerMod: FooterMod = FooterMod.None;
  @Input() submitId?: boolean = null;
  footerModType = FooterMod;

  get isFixedFooter(): boolean {
    return this.footerMod !== FooterMod.Home;
  }

  constructor() { }

  ngOnInit() {
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  submit(event: any) {
    if (this.submitId !== null) {

    }
    alert('請選擇候選人！');
  }

}
