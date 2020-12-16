import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { of } from 'rxjs';
import { ProductService } from '../../shared/services/product.service';
import { Constants, GlobalService, ShowAlert, MessageType } from '../../shared/services/global.service';
let CheckoutComponent = class CheckoutComponent {
    constructor(globalService, cartService, productService, router) {
        this.globalService = globalService;
        this.cartService = cartService;
        this.productService = productService;
        this.router = router;
        this.myMap = new Map();
        this.cartItems = of([]);
        this.buyProducts = [];
        this.arrCartlist = [];
        this.DelivaryCharge = 0;
        this.paymentType = 0;
        this.DealId = [];
        this.arrRadioButton = [
            { name: 'COD', value: 0 },
        ];
        this.payments = ['Create an Account?', 'Flat Rate'];
    }
    ngOnInit() {
        this.objUser = this.globalService.getCurrentUser();
        this.getItems();
    }
    getItems() {
        const objCustomer = JSON.parse(localStorage.getItem('user'));
        this.CustomerId = objCustomer.CustomerId;
        const objParams = {
            CustomerId: this.CustomerId,
        };
        if (this.CustomerId) {
            this.globalService.spinner.show();
            this.cartService.getItems(objParams)
                .subscribe((objResp) => {
                this.globalService.spinner.hide();
                if (objResp && 'data' in objResp &&
                    'count' in objResp.data && objResp.data.count) {
                    this.arrCartlist = objResp.data['rows'];
                    console.log('chek chekout===>', this.arrCartlist);
                    for (let i = 0; i < objResp.data.rows.length; i++) {
                        this.DealId[i] = objResp.data.rows[i].DealId;
                    }
                    this.updateGrandTotal();
                }
            }, (error) => {
            }, () => {
            }).add(() => {
                this.globalService.spinner.hide();
            });
        }
        else {
            ShowAlert(MessageType.ERROR, 'You have no items to show');
        }
    }
    updateGrandTotal() {
        const arrDeal = this.arrCartlist;
        let total = 0, gstTotal = 0;
        let price = 0;
        let objdelivary = 0;
        let objBusinessId = 0;
        this.arrCartlist.forEach(deal => {
            total += deal.Ptr * deal.Quantity;
            gstTotal += ((deal.Quantity * deal.Gst * deal.Ptr) / 100);
            if (this.myMap.get(deal.BusinessId) == null || this.myMap.get(deal.BusinessId) == undefined) {
                this.myMap.set(deal.BusinessId, (deal.Ptr * deal.Quantity));
            }
            else {
                let amount = this.myMap.get(deal.BusinessId);
                this.myMap.set(deal.BusinessId, amount + (deal.Ptr * deal.Quantity));
            }
        });
        console.log('chek===>', this.myMap);
        let deliveryChargeOnItem = 50;
        for (let [key, value] of this.myMap) {
            console.log(key + ' = ' + value);
            if (value <= 1499) {
                this.DelivaryCharge = this.DelivaryCharge + deliveryChargeOnItem;
            }
        }
        console.log('check delivery amt ', this.DelivaryCharge);
        this.Grandtotal = total + gstTotal + objdelivary + this.DelivaryCharge;
        this.gstTotal = gstTotal;
    }
    onChange($event) {
        this.paymentType = $event;
    }
    // place order
    placeOrder() {
        const objParams = {
            DealId: this.DealId,
            BusinessId: this.objUser.BusinessData.BusinessId,
            PaymentType: this.paymentType,
            CustomerId: this.objUser.CustomerId,
        };
        this.globalService.spinner.show();
        const unsubscribe = this.cartService.placeorder(objParams)
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                ShowAlert(MessageType.SUCCESS, '', objResp.message);
                this.router.navigate(['pages/mypurchase']);
            }
        }, (error) => {
            ShowAlert(MessageType.ERROR, '', error);
            this.router.navigate(['pages/business']);
        }).add(() => {
            this.globalService.spinner.hide();
            unsubscribe.unsubscribe();
        });
    }
};
CheckoutComponent = tslib_1.__decorate([
    Component({
        selector: 'app-checkout',
        templateUrl: './checkout.component.html',
        styleUrls: ['./checkout.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [GlobalService,
        CartService,
        ProductService,
        Router])
], CheckoutComponent);
export { CheckoutComponent };
//# sourceMappingURL=checkout.component.js.map