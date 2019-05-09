import { Candidate } from './../model/candidate.model';
import { Component, OnInit } from '@angular/core';
import { NavbarMod } from '../navbar/enums';
import { CandidateService } from '../shared-services/candidate.service';
import { Observable } from 'rxjs';
import { CandidateResult } from '../model/candidate.model';
import { groupBy, maxBy } from 'lodash';
import { mergeMap, toArray, map, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  navMod = NavbarMod.VoteEnd;
  presidentElected: CandidateResult;
  persidentChartOption: EChartOption;
  // councilorElected: CandidateResult;
  councilorChartOption: EChartOption;
  councilors: CandidateResult[];
  constructor(
    private candidateService: CandidateService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.candidateService
      .getCandidateResult()
      .pipe(
        // mergeMap(candidateResult => candidateResult),
        // toArray(),
        map(candidateResult =>
          groupBy(candidateResult, item => item.pool.slice(-2))
        ),
        finalize(() => this.spinner.hide())
      )
      .subscribe(data => {
        console.log(data);
        const representativeGroup = groupBy(data.代表, repre => repre.pool);
        console.log(representativeGroup);
        this.setPresidentChart(data.會長);
        this.setCouncilorChart(data.議員);
        // this.presidents = data.會長;
        this.councilors = data.議員;
        // this.representatives = data.代表;
      });
  }

  setPresidentChart(presidentResult: CandidateResult[]) {
    this.presidentElected = maxBy(presidentResult, o => o.voteCount);
    const chartData = presidentResult.map(p => [p.voteCount, p.name]);
    this.persidentChartOption = {
      dataset: {
        source: [['amount', 'people'], ...chartData]
      },
      // grid: { containLabel: true },
      xAxis: { name: '得票數' },
      yAxis: { type: 'category' },
      visualMap: [
        {
          orient: 'horizontal',
          left: 'center',
          min: 0,
          max: this.presidentElected.voteCount,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#D7DA8B', '#E15457']
          }
        }
      ],
      series: [
        {
          type: 'bar',
          encode: {
            x: 'amount',
            y: 'people'
          },
          label: {
            normal: {
              position: 'right',
              show: true
            }
          }
        }
      ]
    };
  }

  setCouncilorChart(councilorResult: CandidateResult[]) {
    const councilorElected = maxBy(councilorResult, o => o.voteCount);
    const chartData = councilorResult.map(p => [p.voteCount, p.name]);
    this.councilorChartOption = {
      dataset: {
        source: [['amount', 'people'], ...chartData]
      },
      // grid: { containLabel: true },
      xAxis: { name: '得票數' },
      yAxis: { type: 'category' },
      visualMap: [
        {
          orient: 'horizontal',
          left: 'center',
          min: 0,
          max: councilorElected.voteCount,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#D7DA8B', '#E15457']
          }
        }
      ],
      series: [
        {
          type: 'bar',
          encode: {
            x: 'amount',
            y: 'people'
          },
          label: {
            normal: {
              position: 'right',
              show: true
            }
          }
        }
      ]
    };
  }
}
