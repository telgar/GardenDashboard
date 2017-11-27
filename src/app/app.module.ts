import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TimeSeriesComponent } from './graphs/time-series.component';
import { HoursComponent } from './graphs/12hours/12hours.component';
import { HourComponent } from './graphs/hour/hour.component';
import { DayComponent } from './graphs/day/day.component';
import { WeekComponent } from './graphs/week/week.component';
import { AllTimeComponent } from './graphs/all-time/all-time.component';
import { TimeComponent } from './gauges/time/time.component';
import { TemperatureComponent } from './gauges/temperature/temperature.component';
import { SoilMoistureComponent } from './gauges/soil-moisture/soil-moisture.component';
import { PictureComponent } from './camera/picture.component';
import { LogsComponent } from './logs/logs.component';

const appRoutes: Routes = [
  { path: '12hours', component: HoursComponent },
  { path: 'hour', component: HourComponent },
  { path: 'day', component: DayComponent },
  { path: 'week', component: WeekComponent },
  { path: 'all-time', component: AllTimeComponent },
  { path: 'picture', component: PictureComponent },
  { path: 'logs', component: LogsComponent },
  { path: '**', component: HourComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TimeSeriesComponent,
    HoursComponent,
    HourComponent,
    DayComponent,
    WeekComponent,
    AllTimeComponent,
    TimeComponent,
    TemperatureComponent,
    SoilMoistureComponent,
    PictureComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
