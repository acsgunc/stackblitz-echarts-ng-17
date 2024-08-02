import { Component } from '@angular/core';
import { fromEvent, debounceTime } from 'rxjs';
import { ECharts, graphic, EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: `./echart.component.html`,
  styles: [`h1 { font-family: Lato; }`],
  providers: [provideEcharts()],
})
export class EChartComponent {
  echartsIntance: any;
  labels: string[] = ['fabrics', 'electronics', 'hardware'];
  data: number[] = [58, 44, 82];
  maxValue: number = 100;

  options: any = {};

  testOptions: EChartsOption = Object.assign(
    {},
    {
      grid: {
        left: '6%',
        right: '6%',
        bottom: '4%',
        top: '3%',
        containLabel: true,
      },
      xAxis: {
        axisLabel: {
          color: 'gray',
          fontSize: '16',
        },
        axisLine: {
          lineStyle: {
            color: 'blue',
            width: 4,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: 'gray',
            width: 1,
          },
        },
      },
      yAxis: {
        data: this.labels,
        axisLabel: {
          color: 'pink',
          fontSize: 22,
        },
        axisLine: {
          lineStyle: {
            color: 'orange',
            width: 4,
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          // For shadow
          type: 'bar',
          data: this.data.map((v) => this.maxValue),
          cursor: 'default',
          itemStyle: {
            normal: {
              color: 'gray',
            },
            opacity: 1,
          },
          barWidth: '40%',
          barGap: '-100%',
          barCategoryGap: '30%',
          animation: false,
          z: 1,
        },
      ],
    }
  );
  constructor() {
    this.resize();
  }

  ngOnInit(): void {
    this.options = Object.assign(
      {},
      {
        grid: {
          left: '6%',
          right: '6%',
          bottom: '4%',
          top: '3%',
          containLabel: true,
        },
        xAxis: {
          axisLabel: {
            color: 'gray',
            fontSize: '16',
          },
          axisLine: {
            // comment in true to make it work
            //            show: true,
            lineStyle: {
              color: 'blue',
              width: 4,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: 'gray',
              width: 1,
            },
          },
        },
        yAxis: {
          data: this.labels,
          axisLabel: {
            color: 'pink',
            fontSize: 22,
          },
          axisLine: {
            lineStyle: {
              color: 'orange',
              width: 4,
            },
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            // For shadow
            type: 'bar',
            data: this.data.map((v) => this.maxValue),
            cursor: 'default',
            itemStyle: {
              normal: {
                color: 'gray',
              },
              opacity: 1,
            },
            barWidth: '40%',
            barGap: '-100%',
            barCategoryGap: '30%',
            animation: false,
            z: 1,
          },
          {
            // For bottom line
            type: 'bar',
            data: this.data,
            cursor: 'pointer',
            itemStyle: {
              normal: {
                color: 'green',
              },
              opacity: 1,
            },
            barWidth: '40%',
            barGap: '-100%',
            barCategoryGap: '30%',
            z: 2,
          },
          {
            type: 'bar',
            barWidth: '40%',
            data: this.data,
            cursor: 'default',
            itemStyle: {
              normal: {
                color: new graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: 'orange',
                  },
                  {
                    offset: 1,
                    color: 'red',
                  },
                ]),
              },
            },
            z: 3,
          },
        ],
      }
    );
  }

  resize() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe((e) => {
        console.log('RESIZE');
        if (this.echartsIntance) {
          this.echartsIntance.resize({
            animation: {
              duration: 1500,
              easing: 'elasticOut',
            },
          });
        }
      });
  }

  onChartInit(echarts: ECharts) {
    this.echartsIntance = echarts;
  }
}
