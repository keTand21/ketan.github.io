import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
// Routes
const routes = [
    { path: '', component: HomeComponent },
    { path: 'products/:CategoryId', component: ProductLeftSidebarComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
];
let ShopRoutingModule = class ShopRoutingModule {
};
ShopRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ShopRoutingModule);
export { ShopRoutingModule };
//# sourceMappingURL=shop-routing.module.js.map