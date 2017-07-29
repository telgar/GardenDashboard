import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {

  humidity: string = '??.??';
  timestamp: string = '???';

  constructor(private http: Http) { }

  ngOnInit() {

    //this.fetchData();

    setInterval(() => {
      //this.fetchData();
    }, 5000);
  }

  private fetchData(): void {

    this.http.get('http://localhost:30010/humidity')
             .map((res: Response) => res.json())
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
             .subscribe((data) => {

                if (data.length === 1) {
                  this.humidity = data[0].moisture;
                  this.timestamp = data[0].label;
                } else {
                  this.humidity = '??.??';
                  this.timestamp = '???';
                }
              });
  }

}

