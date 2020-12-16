import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainBannerComponent } from './main-banner/main-banner.component';
import { PriceComponent } from './products/price/price.component';
// import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { ProductVerticalComponent } from './products/product-vertical/product-vertical.component';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductCarouselComponent } from './../shop/home/product-carousel/product-carousel.component';
import { CategoriesComponent } from './widgets/categories/categories.component';
import { ProductZoomComponent } from './products/product-details/product-zoom/product-zoom.component';
import { MaterialModule } from '../shared/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
let ShopModule = class ShopModule {
};
ShopModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            HomeComponent,
            MainBannerComponent,
            // ProductsComponent,
            PriceComponent,
            ProductComponent,
            ProductDetailsComponent,
            ProductDialogComponent,
            ProductLeftSidebarComponent,
            ProductVerticalComponent,
            ProductCarouselComponent,
            CategoriesComponent,
            ProductZoomComponent,
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
            BrowserAnimationsModule,
            NgxImageZoomModule.forRoot() // <-- Add this line
        ],
        exports: [
            ProductDialogComponent,
            ProductZoomComponent
        ],
        entryComponents: [
            ProductDialogComponent,
            ProductZoomComponent
        ],
    })
], ShopModule);
export { ShopModule };
//# sourceMappingURL=shop.module.js.map