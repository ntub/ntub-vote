import { Component, OnInit } from '@angular/core';
import { TimeService } from './shared-services/time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ntub-student-election';

  constructor(private timeService: TimeService) { }
  ngOnInit() {
    // this.timeService.getTime().subscribe(
    //   data => {
    //     console.log('ok');
    //     console.log(data);
    //   },
    //   error => {
    //     console.log('error');
    //     console.log(error);
    //   }
    // )
  }
}
