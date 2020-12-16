import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { Constants, GlobalService, ShowAlert, MessageType } from 'src/app/components/shared/services/global.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
let ProductComponent = class ProductComponent {
    constructor(productsService, cartService, globalService, wishlistService, dialog, router, objGlobalService) {
        this.productsService = productsService;
        this.cartService = cartService;
        this.globalService = globalService;
        this.wishlistService = wishlistService;
        this.dialog = dialog;
        this.router = router;
        this.objGlobalService = objGlobalService;
        this.onOpenProductDialog = new EventEmitter();
        this.objConstants = Constants;
        this.counter = 1;
    }
    ngOnInit() {
        console.log('i====>', this.product.ImageUrl);
        //const WishlistedId = this.globalService.getCurrentUser;
        // const WishlistedId = this.objUser.BusinessData.CustomerId
        this.objUser = this.objGlobalService.getCurrentUser();
        //this.objUser = this.objGlobalService.getCurrentUser();
        // let arrImageUrl = this.product.ImageUrl[0].ImageUrl
        // if (this.product.ImageUrl[0].ImageUrl != null && (this.product.ImageMobile1 == null || this.product.ImageMobile1 == undefined)) {
        //   this.objImageUrl = this.product.ImageUrl[0].ImageUrl
        // }
        // this.arrID = this.arrID == null ? [] : this.arrID.map((objPrev: any) => objPrev['PrivId']);
        if (this.product.IsWishlisted == 0) {
            this.isActive == false;
            console.log('n');
        }
        else {
            this.isActive = true;
            console.log('yes');
        }
    }
    // Add to cart
    addToCart(product) {
        if (this.objUser) {
            const objParams = {
                DealId: product.DealId,
                CustomerId: this.objUser.CustomerId,
                Quantity: product.MinQtyPerRetailer,
                Type: 'Home'
            };
            this.globalService.spinner.show();
            const unsubscribe = this.cartService.addToCart(objParams)
                .subscribe((objResp) => {
                if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    // let objCount = this.badgeCount++;
                    // console.log("in sendtoParentMessage" + objCount);
                    // this.childCount.emit(objCount.toString());
                    // console.log('count==>', objCount.toString());
                    ShowAlert(MessageType.SUCCESS, objResp.message);
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                    ShowAlert(MessageType.ERROR, objResp.message);
                    alert(objResp.message);
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                    ShowAlert(MessageType.ERROR, objResp.message);
                    alert(objResp.message);
                }
            }, (error) => {
                ShowAlert(MessageType.ERROR, error);
            }, () => {
            }).add(() => {
                this.globalService.spinner.hide();
                unsubscribe.unsubscribe();
            });
        }
        else {
            this.objGlobalService.loginToContinue();
        }
    }
    // Add to wishlist
    addToWishlist(product) {
        if (this.objUser) {
            const objParams = {
                DealId: product.DealId,
                CustomerId: this.objUser.CustomerId
            };
            this.globalService.spinner.show();
            const unsubscribe = this.wishlistService.addToWishlist(objParams)
                .subscribe((objResp) => {
                let objDeal = objResp.data;
                const objDealId = objResp.data.DealId;
                const objWishId = objResp.data.WishId;
                // this.isActive = !this.isActive;
                if (objWishId == undefined || objWishId == null) {
                    this.isActive = !this.isActive;
                    !this.isActive == false;
                    console.log('n');
                }
                else {
                    this.isActive = true;
                    console.log('yes');
                }
                console.log('fev list==>', objDeal);
                ShowAlert(MessageType.SUCCESS, objResp.message);
            }, (error) => {
                ShowAlert(MessageType.ERROR, error);
            }).add(() => {
                this.globalService.spinner.hide();
                unsubscribe.unsubscribe();
            });
        }
        else {
            this.objGlobalService.loginToContinue();
        }
    }
    // Add to compare
    addToCompare(product) {
        // this.productsService.addToCompare(product);
    }
    getwishlist() {
        const objParams = {
            CustomerId: this.objUser.CustomerId
        };
        this.globalService.spinner.show();
        const subscription = this.wishlistService.getItems(objParams)
            .subscribe((objResp) => {
            ShowAlert(MessageType.SUCCESS, objResp.message);
            if (objResp && 'data' in objResp &&
                'count' in objResp.data && objResp.data.count) {
                this.arrCategories = objResp.data['rows'];
            }
        }, (error) => {
            ShowAlert(MessageType.ERROR, error);
        }).add(() => {
            this.globalService.spinner.hide();
            subscription.unsubscribe();
        });
    }
    openProductDialog(product) {
        const dialogRef = this.dialog.open(ProductDialogComponent, {
            data: product,
            panelClass: 'product-dialog',
        });
        dialogRef.afterClosed().subscribe((product) => {
            if (product) {
                this.router.navigate(['/products', product.id, product.ProdTitle, product.ImageUrl]);
            }
        });
    }
    onClick() {
        // this.isActive = !this.isActive;
        //console.log('colur', this.isActive);
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ProductComponent.prototype, "onOpenProductDialog", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Product)
], ProductComponent.prototype, "product", void 0);
ProductComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product',
        templateUrl: './product.component.html',
        styleUrls: ['./product.component.sass'],
    }),
    tslib_1.__metadata("design:paramtypes", [ProductService,
        CartService,
        GlobalService,
        WishlistService, MatDialog,
        Router,
        GlobalService])
], ProductComponent);
export { ProductComponent };
//# sourceMappingURL=product.component.js.map