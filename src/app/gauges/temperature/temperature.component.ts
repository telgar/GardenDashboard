import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  celsius: string = '??.??';
  timestamp: string = '???';

  constructor(private http: Http) { }

  ngOnInit() {

    this.fetchData();

    setInterval(() => {
      this.fetchData();
    }, 5000);
  }

  private fetchData(): void {

    this.http.get('http://192.168.1.109:30010/temperature')
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
              .subscribe((data) => {

                if (data.length === 1) {
                  this.celsius = data[0].celsius;
                  this.timestamp = data[0].label;
                } else {
                  this.celsius = '??.??';
                  this.timestamp = '???';
                }
              });
  }

}
