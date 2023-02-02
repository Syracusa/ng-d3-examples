import { Component } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-d3-examples';

  ngOnInit(): void {

    let testdata =
      [
        { "date": Date.parse("2013-01-23"), "c": 1400, "h": 2233, "cpp": 4333 },
        { "date": Date.parse("2013-01-24"), "c": 1122, "h": 223, "cpp": 43 },
        { "date": Date.parse("2013-01-25"), "c": 400, "h": 223, "cpp": 432 },
        { "date": Date.parse("2013-01-26"), "c": 600, "h": 53, "cpp": 224 },
        { "date": Date.parse("2013-01-27"), "c": 652, "h": 300, "cpp": 214 },
      ];

    let keys = ["c", "h", "cpp"];

    let stackGen = d3.stack().keys(keys);
    let stackData = stackGen(testdata);
    console.log('Stack data');
    console.log(stackData);
    
    let xScale = d3.scaleTime().domain([Date.parse("2013-01-23"), Date.parse("2013-01-27")]).range([10, 100]);
    let yScale; /* Todo set domain from data */
      /* y.domain([0, d3.max(data, function(d) { return d.total; })]).nice(); */
  }
}
