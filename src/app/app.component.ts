import { Component } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-d3-examples';

  testdata =
    [
      {"date": Date.parse("2013-01-23"), "c": 1400, "h": 2233, "cpp": 4333 },
      {"date": Date.parse("2013-01-24"), "c": 1122, "h": 223, "cpp": 43 },
      {"date": Date.parse("2013-01-25"), "c": 400, "h": 223, "cpp": 432 },
    ];

    
}
