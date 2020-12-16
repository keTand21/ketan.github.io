import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpCommonService } from '../services/http-common.service';
// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("wishlistItem")) || [];
let WishlistService = class WishlistService {
    constructor(snackBar, httpCommonService) {
        this.snackBar = snackBar;
        this.httpCommonService = httpCommonService;
        // wishlist array
        this.wishlistProducts = new BehaviorSubject([]);
    }
    // Get  wishlist Products
    getProducts() {
        const itemsStream = new Observable(observer => {
            observer.next(products);
            observer.complete();
        });
        return itemsStream;
    }
    // If item is aleready added In wishlist
    hasProduct(product) {
        const item = products.find(item => item.id === product.id);
        return item !== undefined;
    }
    getItems(objParams) {
        return this.httpCommonService.post('wishlist/get-wishlist', objParams);
    }
    // Add to cart
    addToWishlist(objParams) {
        return this.httpCommonService.post('wishlist/add-wishlist', objParams);
    }
    removeItem(objParams) {
        return this.httpCommonService.delete('wishlist/delete-wishlist', objParams);
    }
    // Removed Product
    removeFromWishlist(product) {
        if (product === undefined) {
            return;
        }
        const index = products.indexOf(product);
        products.splice(index, 1);
        localStorage.setItem("wishlistItem", JSON.stringify(products));
    }
};
WishlistService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar,
        HttpCommonService])
], WishlistService);
export { WishlistService };
//# sourceMappingURL=wishlist.service.js.map