import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from '../../model/candidate.model';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.scss']
})
export class RepresentativeComponent implements OnInit {
  @Input() representatives: Candidate[];
  constructor() { }

  ngOnInit() {
  }

}
