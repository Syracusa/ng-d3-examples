import { Component } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-d3-examples';

  drawStackedAreadChart(
    width: number,
    height: number,
    margin: { left: number, right: number, top: number, bottom: number }
  ) {
    let testdata =
      [
        { "date": Date.parse("2013-01-23"), "c": 140, "h": 233, "cpp": 150 },
        { "date": Date.parse("2013-01-24"), "c": 122, "h": 223, "cpp": 331 },
        { "date": Date.parse("2013-01-25"), "c": 400, "h": 223, "cpp": 432 },
        { "date": Date.parse("2013-01-26"), "c": 600, "h": 553, "cpp": 224 },
        { "date": Date.parse("2013-01-27"), "c": 652, "h": 300, "cpp": 214 },
        { "date": Date.parse("2013-01-28"), "c": 122, "h": 223, "cpp": 331 },
        { "date": Date.parse("2013-01-29"), "c": 400, "h": 223, "cpp": 432 },
        { "date": Date.parse("2013-01-30"), "c": 122, "h": 223, "cpp": 331 },
        { "date": Date.parse("2013-01-31"), "c": 140, "h": 233, "cpp": 150 },
        { "date": Date.parse("2013-02-01"), "c": 122, "h": 223, "cpp": 331 },
        { "date": Date.parse("2013-02-02"), "c": 400, "h": 223, "cpp": 432 },
        { "date": Date.parse("2013-02-03"), "c": 600, "h": 253, "cpp": 224 },
        { "date": Date.parse("2013-02-04"), "c": 652, "h": 250, "cpp": 214 },
        { "date": Date.parse("2013-02-05"), "c": 311, "h": 223, "cpp": 331 },
      ];
    let keys = ["c", "h", "cpp"];
    let dateExtent = d3.extent(testdata, d => d["date"]) as [number, number];

    let stackGen = d3.stack().keys(keys);
    let stackData = stackGen(testdata);
    let maxY = d3.max(stackData[stackData.length - 1], d => d[1]) as number;

    let xScale = d3
      .scaleTime()
      .domain(dateExtent)
      .range([margin.left, width - margin.right]);

    let yScale = d3
      .scaleLinear()
      .domain([0, maxY])
      .range([height - margin.bottom, margin.top]);

    let dates = d3.map(testdata, (d) => d.date);

    /* ========== DRAW AREA ========== */

    let areaGen = d3.area()
      .x((d, i) => xScale(dates[i]))
      .y0((d, i) => yScale(d[0]))
      .y1((d, i) => yScale(d[1]));

    let areaData = d3.map(stackData, (d) => {
      return d3.map(d, (inner) => {
        return [inner[0], inner[1]] as [number, number];
      })
    });

    let svgsel = d3.select("#chart1");
    let colors = d3.schemePaired;

    svgsel
      .selectAll("path")
      .data(areaData)
      .join("path")
      .attr("fill", (d, i) => colors[i])
      .attr("d", (d, i) => areaGen(d));


    /* ========== DRAW AXES ========== */

    let xAxis = d3.axisBottom(xScale);

    let xAxisSel = svgsel.select('.xaxis').node() ?
      svgsel.select('g.xaxis') as d3.Selection<SVGGElement, unknown, HTMLElement, any>
      : svgsel.append('g').attr('class', 'xaxis');

    xAxisSel
      .call(xAxis)
      .attr("transform", "translate(" + 0 + ", " + (height - margin.bottom) + ")");


    let yAxis = d3.axisRight(yScale);

    let yAxisSel = svgsel.select('.yaxis').node() ?
      svgsel.select('g.yaxis') as d3.Selection<SVGGElement, unknown, HTMLElement, any>
      : svgsel.append('g').attr('class', 'yaxis');

    yAxisSel
      .call(yAxis)
      .attr("transform", "translate(" + (width - margin.right) + ", " + 0 + ")");

    /* ========== DRAW LAGENDS ========== */

    let legendSel = svgsel.select('.legend').node() ?
      svgsel.select('g.legned') as d3.Selection<SVGGElement, unknown, HTMLElement, any>
      : svgsel.append('g').attr('class', 'legend');

    legendSel.selectAll('rect').data(keys).enter().append('rect')
      .attr('x', width - 50)
      .attr('y', (d, i) => margin.top + 15 * i)
      .attr('width', 11)
      .attr('height', 11)
      .attr('fill', (d, i) => colors[i]);

    legendSel.selectAll('text').data(keys).enter().append('text')
      .attr('x', width - 35)
      .attr('y', (d, i) => margin.top + 15 * i)
      .style('font-size', "10px")
      .text(d => d)
      .style('alignment-baseline', 'hanging');
  }

  ngOnInit(): void {
    this.drawStackedAreadChart(760, 400, { left: 10, right: 100, top: 10, bottom: 50 });
  }
}
