import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Router } from '@angular/router';
let ProductDialogComponent = class ProductDialogComponent {
    constructor(router, productsService, cartService, dialogRef, product) {
        this.router = router;
        this.productsService = productsService;
        this.cartService = cartService;
        this.dialogRef = dialogRef;
        this.product = product;
        this.products = [];
        this.counter = 1;
        this.variantImage = '';
        this.selectedColor = '';
        this.selectedSize = '';
    }
    ngOnInit() {
        // this.productsService.getProducts().subscribe(product => this.products = product);
    }
    addToCart(product, quantity) {
        // if (quantity === 0) return false;
        // this.cartService.addToCart(product, parseInt(quantity));
    }
    close() {
        this.dialogRef.close();
    }
    increment() {
        this.counter += 1;
    }
    decrement() {
        if (this.counter > 1) {
            this.counter -= 1;
        }
    }
    // Add to cart
    buyNow() {
        this.router.navigate(['/product', this.product.id]);
        this.close();
    }
};
ProductDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-dialog',
        templateUrl: './product-dialog.component.html',
        styleUrls: ['./product-dialog.component.sass']
    }),
    tslib_1.__param(4, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Router, ProductService, CartService, MatDialogRef, Product])
], ProductDialogComponent);
export { ProductDialogComponent };
//# sourceMappingURL=product-dialog.component.js.map