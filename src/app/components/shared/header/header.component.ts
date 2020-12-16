import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  @Input() Count: Number;
  @Output() dealProduct: EventEmitter<any> = new EventEmitter();

  countList: any;
  public sidenavMenuItems: Array<any>;
  public arrMyBusiness = [] as Array<any>;
  arrNotification = [] as Array<any>;
  counts: number;
  objCount: any;
  data: any;
  notificationCount: number;

  public businessDataCount: number;
  public arrMyAccount: Array<any> = [];

  public indexProduct: number;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }
  employee() {
    this.router.navigate(['pages/deal']);
  }

}