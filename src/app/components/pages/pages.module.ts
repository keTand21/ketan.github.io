import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DealComponent } from './deal/deal.component';
import { AddDealComponent } from './deal/add-deal/add-deal.component';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';



import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { from } from 'rxjs';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    PerfectScrollbarModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    NgxDaterangepickerMd.forRoot(),

  ],
  declarations: [
    DealComponent,
    AddDealComponent,
 
  ],
  entryComponents: [
    AddDealComponent,

  ],
  exports: [
    NgxPaginationModule
  ],
  providers: [],
})
export class PagesModule { }
