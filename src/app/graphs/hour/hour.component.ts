import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Component({
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.css']
})
export class HourComponent implements OnInit {

  // lineChart
  public lineChartData: Array<any> = [
    {data: [], label: 'Temperature C'}
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private http: Http) { }

  ngOnInit() {

    this.fetchData();
  }

  private fetchData(): void {

    this.http.get('http://192.168.1.109:30010/temperature/hour')
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
              .subscribe((data) => {
                this.lineChartData[0].data = data.map((o) => o.celsius);
                this.lineChartLabels = data.map((o) => o.label);
              });
  }
}
