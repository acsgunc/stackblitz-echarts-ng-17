import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { EChartComponent } from './echart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EChartComponent],
  template: `
    <chart></chart>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
