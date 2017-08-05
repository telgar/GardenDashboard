import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html'
})
export class PictureComponent {

  cacheBuster: string ;

  constructor() {

    this.cacheBuster = new Date().getTime().toString();
  }
}

