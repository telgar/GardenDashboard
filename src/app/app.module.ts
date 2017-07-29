import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TimeSeriesComponent } from './graphs/time-series.component';
import { HourComponent } from './graphs/hour/hour.component';
import { DayComponent } from './graphs/day/day.component';
import { WeekComponent } from './graphs/week/week.component';
import { AllTimeComponent } from './graphs/all-time/all-time.component';
import { TemperatureComponent } from './gauges/temperature/temperature.component';
import { SoilMoistureComponent } from './gauges/soil-moisture/soil-moisture.component';
import { HumidityComponent } from './gauges/humidity/humidity.component';

const appRoutes: Routes = [
  { path: 'stats/hour', component: HourComponent },
  { path: 'stats/day', component: DayComponent },
  { path: 'stats/week', component: WeekComponent },
  { path: 'stats/all-time', component: AllTimeComponent },
  { path: '**', component: AllTimeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TimeSeriesComponent,
    HourComponent,
    DayComponent,
    WeekComponent,
    AllTimeComponent,
    TemperatureComponent,
    SoilMoistureComponent,
    HumidityComponent
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
