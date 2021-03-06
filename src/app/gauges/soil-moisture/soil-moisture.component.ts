import { Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-soil-moisture',
  templateUrl: './soil-moisture.component.html',
  styleUrls: ['./soil-moisture.component.css']
})
export class SoilMoistureComponent implements OnInit {

  @Input() instance: number;
  moisture: string = '??.??';
  timestamp: string = '???';

  constructor(private http: Http) { }

  ngOnInit() {

    this.fetchData();

    setInterval(() => {

      this.fetchData();
    }, 5000);
  }

  private fetchData(): void {

    this.http.get('http://192.168.1.109:30010/soil' + this.instance)
             .map((res: Response) => res.json())
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
             .subscribe((data) => {

                if (data.length === 1) {
                  this.moisture = data[0].moisture;
                  this.timestamp = data[0].label;
                } else {
                  this.moisture = '??.??';
                  this.timestamp = '???';
                }
              });
  }

}

