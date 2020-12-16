import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

 

  constructor(private spinner: NgxSpinnerService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
   

  }

}