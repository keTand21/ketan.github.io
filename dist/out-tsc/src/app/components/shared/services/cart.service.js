import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpCommonService } from '../services/http-common.service';
// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("cartItem")) || [];
let CartService = class CartService {
    constructor(snackBar, httpCommonService) {
        this.snackBar = snackBar;
        this.httpCommonService = httpCommonService;
        // Array
        this.cartItems = new BehaviorSubject([]);
        this.cartItems.subscribe(products => products = products);
    }
    // Get Products
    // public getItems(objParams:any) {
    //   const itemsStream = new Observable(observer => {
    //     observer.next(products);
    //     observer.complete();
    //   });
    //   //return <Observable<CartItem[]>>itemsStream;
    //   return this.httpCommonService.post('cart/get-cart-list', <Observable<CartItem[]>>itemsStream);
    //   //console.log(this.httpCommonService.post('cart/get-cart-list', <Observable<CartItem[]>>itemsStream));
    // }
    placeorder(objParams) {
        return this.httpCommonService.post('order/add-order', objParams);
    }
    getItems(objParams = {}) {
        return this.httpCommonService.post('cart/get-cart-list', objParams);
    }
    // Add to cart
    addToCart(objParams) {
        return this.httpCommonService.post('cart/add-cart', objParams);
    }
    removeFromCart(objParams) {
        return this.httpCommonService.delete('cart/delete-cart', objParams);
    }
    //  public addToCart(product: Product, quantity: number) {
    //   let message, status;
    //    var item: CartItem | boolean = false;
    //    //console.log("DealId",DealId);
    //    // If Products exist
    //    let hasItem = products.find((items, index) => {
    //      if(items.product.id == product.id) {
    //        let qty = products[index].quantity + quantity;
    //        let stock = this.calculateStockCounts(products[index], quantity);
    //        if(qty != 0 && stock) {
    //          products[index]['quantity'] = qty;
    //          message = 'The product ' + product.ProdTitle + ' has been added to cart.';
    //          status = 'success';
    //          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    //        }
    //        this.httpCommonService.post('cart/add-cart', objParams);
    //        return true;
    //      }
    //    } );
    //    // If Products does not exist (Add New Products)
    //    if(!hasItem) {
    //     item = { product: product, quantity: quantity };
    //     products.push(item);
    //     message = 'The product ' + product.ProdTitle + ' has been added to cart.';
    //     status = 'success';
    //     this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    //     console.log("product Title",product.ProdTitle);
    // }
    //     return this.httpCommonService.post('cart/add-cart', objParams);
    //    localStorage.setItem("cartItem", JSON.stringify(products));
    //    console.log("added to cart",);
    //    return item;
    //  }
    // Calculate Product stock Counts
    calculateStockCounts(product, quantity) {
        let message, status;
        let qty = product.quantity + quantity;
        let stock = product.product.stock;
        if (stock < qty) {
            // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
            this.snackBar.open('You can not choose more items than available. In stock ' + stock + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
            return false;
        }
        return true;
    }
    // Removed in cart
    // public removeFromCart(item: CartItem) {
    //   if (item === undefined) return false;
    //     const index = products.indexOf(item);
    //     products.splice(index, 1);
    //     localStorage.setItem("cartItem", JSON.stringify(products));
    // }
    // Total amount
    // public getTotalAmount(): Observable<number> {
    //   return this.cartItems.pipe(map((product: CartItem[]) => {
    //     return products.reduce((prev, curr: CartItem) => {
    //       return prev + curr.product.price * curr.quantity;
    //     }, 0);
    //   }));
    // }
    getTotalAmount() {
        return this.cartItems.pipe(map((product) => {
            return products.reduce((prev, curr) => {
                return prev + curr.product.price * curr.quantity;
            }, 0);
        }));
    }
    // Update Cart Value
    updateCartQuantity(product, quantity) {
        return products.find((items, index) => {
            if (items.product.id == product.id) {
                let qty = products[index].quantity + quantity;
                let stock = this.calculateStockCounts(products[index], quantity);
                if (qty != 0 && stock)
                    products[index]['quantity'] = qty;
                localStorage.setItem("cartItem", JSON.stringify(products));
                return true;
            }
        });
    }
};
CartService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar,
        HttpCommonService])
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map