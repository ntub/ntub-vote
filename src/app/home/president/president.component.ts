import { Component, OnInit, Input } from '@angular/core';
import { CandidateService } from 'src/app/shared-services/candidate.service';
import { Candidate } from '../../model/candidate.model';
import { Observable, from, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-president',
  templateUrl: './president.component.html',
  styleUrls: ['./president.component.scss']
})
export class PresidentComponent implements OnInit {
  @Input() presidents: Candidate[];
  constructor() { }

  ngOnInit() {
  }

}
