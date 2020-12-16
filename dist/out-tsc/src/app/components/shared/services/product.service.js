import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { HttpCommonService } from './http-common.service';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Constants } from 'src/app/components/shared/services/global.service';
let ProductService = class ProductService {
    constructor(snackBar, http, cartService) {
        this.snackBar = snackBar;
        this.http = http;
        this.cartService = cartService;
        this.currency = 'INR';
        this.catalogMode = false;
        this.compareProducts = new BehaviorSubject([]);
        this.arrProduct = new Array();
        this.objConstants = Constants;
        this.compareProducts.subscribe(products => products = products);
    }
    getCategoryList(objParams = {}) {
        return this.http.post('category/get-category-list', objParams);
    }
    addToCart(product, quantity) {
        console.log(product, quantity);
        const objParams = {
            DealId: product.DealId,
            CustomerId: 255,
            Quantity: quantity
        };
        const unsubscribe = this.cartService.addToCart(objParams)
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                alert(objResp.message);
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                alert(objResp.message);
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                alert(objResp.message);
            }
        }, (error) => {
        }, () => {
            unsubscribe.unsubscribe();
        });
    }
    getProducts(objParams) {
        return this.http.post('deal/get-deal-details-for-web', objParams);
    }
    getProductsDashboard(objParams = {}) {
        objParams['ApplyDateRangeOnColumn'] = 'CreatedOn';
        // objParams['SearchString'] = '';
        objParams['Pagination'] = {
            Page: 0,
            Limit: 50,
            SortOrder: 'DESC',
            SortField: 'UpdatedOn',
        };
        return this.http.post('deal/get-deal-list-for-dashboard', objParams);
    }
    getLatestDeals(objParams) {
        return this.product(objParams);
    }
    // Get Products By Id
    getProduct(id) {
        const objParams = {
            DealId: id,
        };
        return this.http.post('deal/get-deal-details', objParams);
    }
    product(objParams = {}) {
        objParams['ApplyDateRangeOnColumn'] = 'CreatedOn';
        // objParams['SearchString'] = '';
        objParams['Pagination'] = {
            Page: 0,
            Limit: 50,
            SortOrder: 'DESC',
            SortField: 'UpdatedOn',
        };
        // return this.http.post('deal/get-deal-list-for-frontend', objParams);
        return this.http.post('deal/get-deal-list-for-dashboard', objParams);
    }
};
ProductService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar,
        HttpCommonService,
        CartService])
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map