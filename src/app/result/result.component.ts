import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { groupBy, maxBy, Dictionary } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, map } from 'rxjs/operators';

import { FooterMod } from '../footer/enums';
import { CandidateResult } from '../model/candidate.model';
import { NavbarMod } from '../navbar/enums';
import { CandidateService } from '../shared-services/candidate.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  navMod = NavbarMod.VoteEnd;
  footerMod = FooterMod.Home;

  presidentElected: CandidateResult; // 會長獲選人
  persidentChartOption: EChartOption; // 會長Chart設定
  councilors: CandidateResult[]; // 議員名單
  councilorChartOption: EChartOption; // 議員Chart設定
  representativesOption: Dictionary<EChartOption> = {}; // 代表Chart [key:EchartOption]

  constructor(
    private candidateService: CandidateService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.candidateService
      .getCandidateResult()
      .pipe(
        map(candidateResult =>
          groupBy(candidateResult, item => item.pool.slice(-2))
        ),
        finalize(() => this.spinner.hide())
      )
      .subscribe(data => {
        this.setPresidentChart(data.會長);
        this.setCouncilorChart(data.議員);
        this.setRepresentativeCharts(data.代表);
        this.councilors = data.議員;
      });
  }

  setPresidentChart(presidentResult: CandidateResult[]) {
    this.presidentElected = maxBy(presidentResult, o => o.voteCount); // 會長獲選人
    const chartData = presidentResult.map(p => [p.voteCount, p.name]); // 會長Chart資料
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
          max: this.presidentElected.voteCount, // 最大值
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
    const councilorElected = maxBy(councilorResult, o => o.voteCount); // 議員獲選人
    const chartData = councilorResult.map(p => [p.voteCount, p.name]); // 議員Chart資料
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
          max: councilorElected.voteCount, // 最大值
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

  setRepresentativeCharts(representativeResult: CandidateResult[]) {
    const representativeGroup = groupBy(
      representativeResult,
      repre => repre.pool
    ); // 根據名稱分組

    for (const representativeKey of Object.keys(representativeGroup)) {
      const representativeElected = maxBy(
        representativeGroup[representativeKey],
        o => o.voteCount
      ); // 每組獲選人
      const chartData = representativeGroup[representativeKey].map(p => [
        p.voteCount,
        p.name
      ]); // 每組資料

      this.representativesOption[representativeKey] = {
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
            max: representativeElected.voteCount, // 最大值
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
}
