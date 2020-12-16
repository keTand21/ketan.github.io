import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../shared/services/cart.service';
import { Constants, GlobalService, ShowAlert, MessageType } from '../../shared/services/global.service';
import { Router } from '@angular/router';
let CartComponent = class CartComponent {
    constructor(globalService, spinner, cartService, router) {
        this.globalService = globalService;
        this.spinner = spinner;
        this.cartService = cartService;
        this.router = router;
        this.cartItems = of([]);
        this.shoppingCartItems = [];
        this.arrDeal = [];
        this.quantity = [];
        this.Mrp = [];
        this.objConstants = Constants;
    }
    ngOnInit() {
        this.objUser = this.globalService.getCurrentUser();
        this.getItems();
    }
    getItems() {
        if (this.objUser) {
            const objParams = {
                CustomerId: this.objUser.CustomerId,
            };
            this.spinner.show();
            this.isLoadingCart = true;
            this.cartService.getItems(objParams)
                .subscribe((objResp) => {
                this.isLoadingCart = false;
                if (objResp && 'data' in objResp &&
                    'count' in objResp.data && objResp.data.count) {
                    this.arrDeal = objResp.data['rows'];
                    console.log('chek in card===>', objResp.data.count);
                    this.updateGrandTotal();
                }
            }, (error) => {
                this.isLoadingCart = false;
                this.spinner.hide();
            }, () => {
            }).add(() => {
                this.globalService.spinner.hide();
            });
        }
        else {
            this.globalService.loginToContinue();
        }
    }
    updateGrandTotal() {
        const arrDeal = this.arrDeal;
        // tslint:disable-next-line:one-variable-per-declaration
        let total = 0, gstTotal = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < arrDeal.length; i++) {
            total += arrDeal[i].Ptr * arrDeal[i].Quantity;
            gstTotal += ((arrDeal[i].Quantity * arrDeal[i].Gst * arrDeal[i].Ptr) / 100);
        }
        this.Grandtotal = total + gstTotal;
        this.total = total;
        this.gstTotal = gstTotal;
    }
    // Remove cart items
    removeItem(item) {
        const objParams = {
            CartId: item
        };
        this.globalService.spinner.show();
        const unsubscribe = this.cartService.removeFromCart(objParams)
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                ShowAlert(MessageType.SUCCESS, '', objResp.message);
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                ShowAlert(MessageType.ERROR, '', objResp.message);
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                ShowAlert(MessageType.ERROR, '', objResp.message);
            }
            this.getItems();
        }, (error) => {
            ShowAlert(MessageType.ERROR, '', error);
        }, () => {
        }).add(() => {
            this.globalService.spinner.hide();
            unsubscribe.unsubscribe();
        });
    }
    increment(item) {
        if (this.objUser) {
            if (item.Discount) {
                if (item.Quantity === item.MaxQtyPerRetailer) {
                    ShowAlert(MessageType.ERROR, 'Deal should be less than ', item.MaxQtyPerRetailer);
                }
                else {
                    item.Quantity += 1;
                    this.updateGrandTotal();
                }
            }
            else {
                if (item.Quantity === item.MaxQtyPerRetailer) {
                    ShowAlert(MessageType.ERROR, 'Deal should be less than ', item.MaxQtyPerRetailer);
                }
                else {
                    item.Quantity = item.Quantity + item.MinQtyPerRetailer;
                    this.updateGrandTotal();
                }
            }
            const objParams = {
                DealId: item.DealId,
                CustomerId: this.objUser.CustomerId,
                Quantity: item.Quantity,
            };
            //  this.globalService.spinner.show();
            const unsubscribe = this.cartService.addToCart(objParams)
                .subscribe((objResp) => {
                // this.globalService.spinner.hide();
                if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                    ShowAlert(MessageType.ERROR, '', objResp.message);
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                    ShowAlert(MessageType.ERROR, '', objResp.message);
                }
            }, (error) => {
                ShowAlert(MessageType.ERROR, '', error);
            }, () => {
                unsubscribe.unsubscribe();
            }).add(() => {
                //   this.globalService.spinner.hide();
            });
        }
        else {
            this.globalService.loginToContinue();
        }
    }
    // Decrease Product Quantity
    decrement(item) {
        if (this.objUser) {
            if (item.Discount) {
                if (item.Quantity === item.MinQtyPerRetailer) {
                    ShowAlert(MessageType.ERROR, 'Deal should be more than ', item.MinQtyPerRetailer);
                    // const objParams = {
                    //   CartId: item.CartId
                    // };
                    // this.globalService.spinner.show();
                    // const unsubscribe = this.cartService.removeFromCart(objParams)
                    //   .subscribe((objResp: ResponseModel) => {
                    //     if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    //     }
                    //     this.getItems();
                    //   }, (error) => {
                    //   },
                    //     () => {
                    //     }).add(() => {
                    //       this.globalService.spinner.hide();
                    //       unsubscribe.unsubscribe()
                    //     });
                }
                else {
                    item.Quantity -= 1;
                    // this.arrDeal[index]['Quantity'] = item.Quantity;
                    this.updateGrandTotal();
                    const objParams = {
                        DealId: item.DealId,
                        CustomerId: this.objUser.CustomerId,
                        Quantity: item.Quantity,
                    };
                    //   this.globalService.spinner.show();
                    const unsubscribe = this.cartService.addToCart(objParams)
                        .subscribe((objResp) => {
                        //  this.globalService.spinner.hide();
                        if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                        }
                        else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                            ShowAlert(MessageType.ERROR, '', objResp.message);
                        }
                        else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                            ShowAlert(MessageType.ERROR, '', objResp.message);
                        }
                    }, (error) => {
                        ShowAlert(MessageType.ERROR, '', error);
                    }, () => {
                        unsubscribe.unsubscribe();
                    }).add(() => {
                        //   this.globalService.spinner.hide();
                    });
                }
            }
            else {
                if (item.Quantity <= item.MinQtyPerRetailer) {
                    ShowAlert(MessageType.ERROR, 'Deal should be more than ', item.MinQtyPerRetailer);
                    // const objParams = {
                    //   CartId: item.CartId
                    // };
                    // this.globalService.spinner.show();
                    // const unsubscribe = this.cartService.removeFromCart(objParams)
                    //   .subscribe((objResp: ResponseModel) => {
                    //     if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    //     }
                    //     this.getItems();
                    //   }, (error) => {
                    //   },
                    //     () => {
                    //     }).add(() => {
                    //       this.globalService.spinner.hide();
                    //       unsubscribe.unsubscribe()
                    //     });
                }
                else {
                    item.Quantity = item.Quantity - item.MinQtyPerRetailer;
                    // this.arrDeal[index]['Quantity'] = item.Quantity;
                    this.updateGrandTotal();
                    const objParams = {
                        DealId: item.DealId,
                        CustomerId: this.objUser.CustomerId,
                        Quantity: item.Quantity,
                    };
                    //   this.globalService.spinner.show();
                    const unsubscribe = this.cartService.addToCart(objParams)
                        .subscribe((objResp) => {
                        //  this.globalService.spinner.hide();
                        if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                        }
                        else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                            ShowAlert(MessageType.ERROR, '', objResp.message);
                        }
                        else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                            ShowAlert(MessageType.ERROR, '', objResp.message);
                        }
                    }, (error) => {
                        ShowAlert(MessageType.ERROR, '', error);
                    }, () => {
                        unsubscribe.unsubscribe();
                    }).add(() => {
                        // this.globalService.spinner.hide();
                    });
                }
            }
        }
        else {
            this.globalService.loginToContinue();
        }
    }
    // Add to cart
    addToCart(arrDeal) {
        if (this.objUser) {
            const objParams = {
                DealId: arrDeal.DealId,
                CustomerId: this.objUser.CustomerId,
                Quantity: arrDeal.MinQtyPerRetailer,
            };
            this.globalService.spinner.show();
            const unsubscribe = this.cartService.addToCart(objParams)
                .subscribe((objResp) => {
                this.globalService.spinner.hide();
                if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    this.router.navigate(['/pages/checkout']);
                    ShowAlert(MessageType.SUCCESS, '', objResp.message);
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                    ShowAlert(MessageType.ERROR, '', objResp.message);
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                    ShowAlert(MessageType.ERROR, '', objResp.message);
                }
            }, (error) => {
                alert(error);
            }, () => {
                unsubscribe.unsubscribe();
            }).add(() => {
                this.globalService.spinner.hide();
            });
        }
        else {
            this.globalService.loginToContinue();
        }
    }
};
CartComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cart',
        templateUrl: './cart.component.html',
        styleUrls: ['./cart.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [GlobalService,
        NgxSpinnerService,
        CartService,
        Router])
], CartComponent);
export { CartComponent };
//# sourceMappingURL=cart.component.js.map