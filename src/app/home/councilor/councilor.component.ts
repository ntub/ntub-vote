import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from '../../model/candidate.model';

@Component({
  selector: 'app-councilor',
  templateUrl: './councilor.component.html',
  styleUrls: ['./councilor.component.scss']
})
export class CouncilorComponent implements OnInit {
  @Input() councilors: Candidate[];
  constructor() { }

  ngOnInit() {
  }

}
