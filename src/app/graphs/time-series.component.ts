import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    black: 'rgb(0,0,0)'
  };

@Component({
  selector: 'app-time-series-graph',
  templateUrl: './time-series.component.html'
})
export class TimeSeriesComponent implements OnInit {

  @Input() temperatureUrl: string;
  @Input() soil1Url: string;
  @Input() soil2Url: string;

  public lineChartData: Array<any> = [
    {data: [], label: 'Temperature C', yAxisID: 'y-axis-1' },
    {data: [], label: 'Soil 1 Moisture %', yAxisID: 'y-axis-2'},
    {data: [], label: 'Day / Night', fill: true, pointRadius: 0, pointHoverRadius: 0, yAxisID: 'y-axis-2'},
    //{data: [], label: 'Soil 2 Moisture %', borderColor: chartColors.green, backgroundColor: chartColors.green, yAxisID: 'y-axis-2'}
  ];
  public lineChartLabels: Array<any> = [];
  public lineColors: Array<any> = [
    { // red
      backgroundColor: 'rgba(255, 99, 132,0.2)',
      borderColor: 'rgba(255, 99, 132,1)'
    },
    { // blue
      backgroundColor: 'rgba(54, 162, 235,0.2)',
      borderColor: 'rgba(54, 162, 235,1)'
    },
    /*
    { // green
      backgroundColor: 'rgba(75, 192, 192,0.2)',
      borderColor: 'rgba(75, 192, 192,1)'
    },
    */
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)'
    }
  ];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1'
      }, {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2'
      }],
    }
  };
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private http: Http) { }

  ngOnInit() {

    this.fetchData();
  }

  private fetchData(): void {

    this.http.get(this.temperatureUrl)
             .map((res: Response) => res.json())
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
             .subscribe((data) => {
                this.lineChartData[0].data = data.map((o) => o.celsius);
              });

    this.http.get(this.soil1Url)
             .map((res: Response) => res.json())
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
             .subscribe((data) => {
                this.lineChartData[1].data = data.map((o) => o.moisture);
                this.lineChartData[2].data = data.map((o) => {
                  const hours = new Date(o.timestamp).getHours();

                  if (hours < 7) {
                    return 100;
                  } else if (hours > 19) {
                    return 100;
                  }

                  return 0;
                });
                this.lineChartLabels = data.map((o) => o.label);
              });
/*
    this.http.get(this.soil2Url)
             .map((res: Response) => res.json())
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
             .subscribe((data) => {
                this.lineChartData[2].data = data.map((o) => o.moisture);
                this.lineChartLabels = data.map((o) => o.label);
              });
*/
  }
}
