import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
let CompareComponent = class CompareComponent {
    constructor(productService, cartService) {
        this.productService = productService;
        this.cartService = cartService;
        this.product = of([]);
        this.products = [];
    }
    ngOnInit() {
        this.product.subscribe(products => this.products = products);
    }
};
CompareComponent = tslib_1.__decorate([
    Component({
        selector: 'app-compare',
        templateUrl: './compare.component.html',
        styleUrls: ['./compare.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [ProductService, CartService])
], CompareComponent);
export { CompareComponent };
//# sourceMappingURL=compare.component.js.map