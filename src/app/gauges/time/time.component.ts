import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  timestamp: string = '???';
  watered: string = '???';

  constructor(private http: Http) { }

  ngOnInit() {

    this.fetchData();

    setInterval(() => {
      this.fetchData();
    }, 5000);
  }

  private fetchData(): void {

    this.http.get('http://192.168.1.109:30010/time')
              .map((res: Response) => res.text())
              .catch((error: any) => Observable.throw(error || 'Server error'))
              .subscribe((data) => {
                this.timestamp = data;
              });

    this.http.get('http://192.168.1.109:30010/watered')
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error || 'Server error'))
              .subscribe((data) => {
                if (data && data.length === 1) {
                  this.watered = data;
                } else {
                  this.watered = 'No record.';
                }
              });
  }
}
