import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { Constants, GlobalService, ShowAlert, MessageType } from 'src/app/components/shared/services/global.service';
let ProductCarouselComponent = class ProductCarouselComponent {
    constructor(dialog, router, cartService, productService, wishlistService, globalService, objGlobalService) {
        this.dialog = dialog;
        this.router = router;
        this.cartService = cartService;
        this.productService = productService;
        this.wishlistService = wishlistService;
        this.globalService = globalService;
        this.objGlobalService = objGlobalService;
        this.onOpenProductDialog = new EventEmitter();
        this.product = [];
        //@Input() producteWishlist: Product;
        // @Output()
        // childCount = new EventEmitter<string>();
        // public badgeCount: number;
        this.config = {};
        this.objConstants = Constants;
    }
    ngOnInit() {
        //  this.badgeCount = 0;
        this.objUser = this.objGlobalService.getCurrentUser();
        console.log('product==>', this.product);
        // this.isActive = !this.isActive;
        this.product = this.product == null ? [] : this.product.map((objPrev) => objPrev['Wishlisted']);
        console.log('id==========>', this.product);
        // if (this.productd.Wishlisted == 0) {
        //   this.isActive = true
        //   console.log('n');
        // } else {
        //   this.isActive = true
        // }
    }
    ngAfterViewInit() {
        this.config = {
            observer: true,
            slidesPerView: 5,
            spaceBetween: 16,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: true,
            preloadImages: false,
            lazy: true,
            breakpoints: {
                480: {
                    slidesPerView: 1
                },
                740: {
                    slidesPerView: 2,
                },
                960: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
            }
        };
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
    //Add To Cart
    addToCart(product) {
        const objCustomer = this.objGlobalService.getCurrentUser();
        let Customer = JSON.parse(localStorage.getItem('user'));
        if (Customer != null) {
            const objParams = {
                DealId: product.DealId,
                CustomerId: Customer.CustomerId,
                Quantity: product.MinQtyPerRetailer,
                Type: "Home"
            };
            this.globalService.spinner.show();
            const unsubscribe = this.cartService.addToCart(objParams)
                .subscribe((objResp) => {
                if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    // let objCount = this.badgeCount += 1;
                    // console.log("in sendtoParentMessage" + objCount);
                    // this.childCount.emit(objCount.toString());
                    // console.log('count==>', objCount.toString());
                    ShowAlert(MessageType.SUCCESS, '', objResp.message);
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
            }).add(() => {
                this.globalService.spinner.hide();
                unsubscribe.unsubscribe();
            });
        }
        else {
            ShowAlert(MessageType.ERROR, 'Log in or Sign up first');
            this.router.navigate(['/pages/login']);
        }
    }
    // Add to wishlist
    addToWishlist(product) {
        const objCustomer = this.objGlobalService.getCurrentUser();
        let Customer = JSON.parse(localStorage.getItem('user'));
        if (Customer != null) {
            const objParams = {
                DealId: product.DealId,
                CustomerId: Customer.CustomerId,
            };
            if (product.DealId) {
                this.globalService.spinner.show();
                const unsubscribe = this.wishlistService.addToWishlist(objParams)
                    .subscribe((objResp) => {
                    if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                        const objWishId = objResp.data.WishId;
                        if (objWishId == undefined || objWishId == null) {
                            this.isActive = !this.isActive;
                            !this.isActive == false;
                            console.log('n');
                        }
                        else {
                            this.isActive = true;
                            console.log('yes');
                        }
                        ShowAlert(MessageType.SUCCESS, '', objResp.message);
                    }
                    else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                        ShowAlert(MessageType.ERROR, '', objResp.message);
                    }
                    else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                        ShowAlert(MessageType.ERROR, '', objResp.message);
                    }
                }, (error) => {
                    ShowAlert(MessageType.ERROR, '', error.message);
                }, () => {
                }).add(() => {
                    this.globalService.spinner.hide();
                    unsubscribe.unsubscribe();
                });
            }
        }
        else {
            ShowAlert(MessageType.ERROR, 'Log in or Sign up first');
            this.router.navigate(['/pages/login']);
        }
    }
    onClick() {
        // this.isActive = !this.isActive;
        console.log('colur', this.isActive);
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ProductCarouselComponent.prototype, "onOpenProductDialog", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Product)
], ProductCarouselComponent.prototype, "productd", void 0);
tslib_1.__decorate([
    Input('product'),
    tslib_1.__metadata("design:type", Array)
], ProductCarouselComponent.prototype, "product", void 0);
ProductCarouselComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-carousel',
        templateUrl: './product-carousel.component.html',
        styleUrls: ['./product-carousel.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialog,
        Router,
        CartService,
        ProductService,
        WishlistService,
        GlobalService,
        GlobalService])
], ProductCarouselComponent);
export { ProductCarouselComponent };
//# sourceMappingURL=product-carousel.component.js.map