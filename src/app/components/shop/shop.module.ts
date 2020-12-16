import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MaterialModule } from '../shared/material/material/material.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    MaterialModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxImageZoomModule.forRoot() // <-- Add this line
  ],
  exports: [
  
  ],

  entryComponents: [
   
  ],
})

export class ShopModule { }
