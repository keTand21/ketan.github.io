import * as tslib_1 from "tslib";
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { GlobalService } from 'src/app/components/shared/services/global.service';
import { SwiperDirective } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { Constants, ShowAlert, MessageType } from 'src/app/components/shared/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
let ProductDetailsComponent = class ProductDetailsComponent {
    constructor(dialog, productsService, globalService, route, router, cartService, spinner) {
        this.dialog = dialog;
        this.productsService = productsService;
        this.globalService = globalService;
        this.route = route;
        this.router = router;
        this.cartService = cartService;
        this.spinner = spinner;
        this.config = {};
        this.onOpenProductDialog = new EventEmitter();
        this.product = {};
        this.products = [];
        this.objConstants = Constants;
        this.arrCategories = [];
        this.bigProductImageIndex = 0;
        this.spinner.show(undefined, {
            type: 'ball-fussion',
        });
        this.route.params.subscribe(params => {
            const Id = +params['id'];
            console.log('id==>', Id);
            // this.productsService.getProduct(DealId)
            //   .subscribe((objResp: ResponseModel) => {
            //     if ('data' in objResp && Array.isArray(objResp.data) &&
            //       objResp.data.length) {
            const subscription = this.productsService.getProduct(Id)
                .subscribe((objResp) => {
                console.log('respones======>', objResp.data);
                this.product = objResp.data;
                this.MaxQtyPerRetailer = objResp.data.MaxQtyPerRetailer;
                this.MinQtyPerRetailer = objResp.data.MinQtyPerRetailer;
                this.Discount = objResp.data.Discount;
                this.Buy = objResp.data.Buy;
                this.Quantity = objResp.data.Quantity;
                if (this.Quantity <= this.MinQtyPerRetailer) {
                    this.counter = this.MinQtyPerRetailer;
                }
                else {
                    this.counter = this.Quantity;
                }
                this.imageCarousel = objResp.data.ImageUrl;
                console.log('carouse==>', this.imageCarousel);
                this.objImageView = objResp.data.ImageUrl[0];
                setTimeout(() => {
                    this.spinner.hide();
                }, 1000);
            });
        });
        const objParams = {};
    }
    ngOnInit() {
        this.objUser = this.globalService.getCurrentUser();
        window.scroll(0, 0);
    }
    // tslint:disable-next-line:use-lifecycle-interface
    ngAfterViewInit() {
        this.config = {
            observer: true,
            slidesPerView: 3,
            spaceBetween: 10,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
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
                    slidesPerView: 3,
                },
            }
        };
    }
    openProductDialog(product, bigProductImageIndex) {
        const dialogRef = this.dialog.open(ProductZoomComponent, {
            data: { product, index: bigProductImageIndex },
            panelClass: 'product-dialog',
        });
        // tslint:disable-next-line:no-shadowed-variable
        dialogRef.afterClosed().subscribe(product => {
            if (product) {
                this.router.navigate(['/products', product.id, product.ProdTitle, product.ImageUrl]);
            }
        });
    }
    selectImage(index) {
        this.bigProductImageIndex = index;
    }
    increment() {
        if (this.Discount) {
            if (this.counter === this.MaxQtyPerRetailer) {
                this.MaxQtyPerRetailermessage = "Deal should be less than " + this.MaxQtyPerRetailer;
            }
            else {
                this.counter += 1;
                //   this.counter = this.MaxQtyPerRetailer;
                console.log("this.counter", this.counter);
            }
        }
        else {
            if (this.counter === this.MaxQtyPerRetailer) {
                //  this.counter = this.counter;
                // }
                // if (this.counter > this.MaxQtyPerRetailer) {
                this.MaxQtyPerRetailermessage = "Deal should be less than " + this.MaxQtyPerRetailer;
            }
            else {
                this.counter = this.counter + this.MinQtyPerRetailer;
            }
        }
    }
    decrement() {
        if (this.Discount) {
            if (this.counter === this.MinQtyPerRetailer) {
                this.MinQtyPerRetailermessage = "Deal should be more than " + this.MinQtyPerRetailer;
            }
            else {
                this.counter -= 1;
                console.log("this.counter", this.counter);
            }
        }
        else {
            if (this.counter === this.MinQtyPerRetailer) {
                this.MinQtyPerRetailermessage = "Deal should be more than " + this.MinQtyPerRetailer;
            }
            else {
                this.counter = this.counter - this.MinQtyPerRetailer;
            }
        }
    }
    // Add to cart
    addToCart(product, Quantity) {
        if (this.objUser) {
            if (Quantity < product.MinQtyPerRetailer) {
                ShowAlert(MessageType.ERROR, 'Deal should be more than' + product.MinQtyPerRetailer);
            }
            else if (Quantity > product.MaxQtyPerRetailer) {
                ShowAlert(MessageType.ERROR, 'Deal should be less than' + product.MaxQtyPerRetailer);
            }
            else if (product.AvailableStock <= product.MaxQtyPerRetailer) {
                ShowAlert(MessageType.ERROR, product.ProdTitle + ' Is Out Of Stock.');
            }
            else {
                const objParams = {
                    DealId: product.DealId,
                    CustomerId: this.objUser.CustomerId,
                    Quantity: Quantity,
                    Type: 'Details'
                };
                this.globalService.spinner.show();
                const unsubscribe = this.cartService.addToCart(objParams)
                    .subscribe((objResp) => {
                    if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                        ShowAlert(MessageType.SUCCESS, '', objResp.message);
                        this.router.navigate(['/product/', product.DealId]);
                    }
                    else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                        ShowAlert(MessageType.ERROR, '', objResp.message);
                    }
                    else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                        ShowAlert(MessageType.ERROR, '', objResp.message);
                    }
                }, error => {
                    alert(error.message);
                }).add(() => {
                    this.globalService.spinner.hide();
                });
            }
        }
        else {
            ShowAlert(MessageType.ERROR, 'You have to login first');
            this.router.navigate(['/pages/login']);
        }
    }
    buyNow(product, quantity) {
        if (this.objUser) {
            if (quantity > 0) {
                this.router.navigate(['/pages/checkout']);
            }
        }
        else {
            ShowAlert(MessageType.ERROR, 'Log in or Sign up first');
            this.router.navigate(['/pages/login']);
        }
    }
    onMouseMove(e) {
        if (window.innerWidth >= 1280) {
            // tslint:disable-next-line:one-variable-per-declaration
            let image, offsetX, offsetY, x, y, zoomer;
            image = e.currentTarget;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            x = offsetX / image.offsetWidth * 100;
            y = offsetY / image.offsetHeight * 100;
            zoomer = this.zoomViewer.nativeElement.children[0];
            if (zoomer) {
                zoomer.style.backgroundPosition = x + '% ' + y + '%';
                zoomer.style.display = "block";
                zoomer.style.height = image.height + 'px';
                zoomer.style.width = image.width + 'px';
            }
        }
    }
    onMouseLeave(event) {
        this.zoomViewer.nativeElement.children[0].style.display = "none";
    }
    openZoomViewer() {
        this.dialog.open(ProductZoomComponent, {
            data: this.zoomImage,
            panelClass: 'zoom-dialog'
        });
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ProductDetailsComponent.prototype, "onOpenProductDialog", void 0);
tslib_1.__decorate([
    ViewChild('zoomViewer', { static: true }),
    tslib_1.__metadata("design:type", Object)
], ProductDetailsComponent.prototype, "zoomViewer", void 0);
tslib_1.__decorate([
    ViewChild(SwiperDirective, { static: true }),
    tslib_1.__metadata("design:type", SwiperDirective)
], ProductDetailsComponent.prototype, "directiveRef", void 0);
ProductDetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-details',
        templateUrl: './product-details.component.html',
        styleUrls: ['./product-details.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialog,
        ProductService,
        GlobalService,
        ActivatedRoute,
        Router,
        CartService,
        NgxSpinnerService])
], ProductDetailsComponent);
export { ProductDetailsComponent };
//# sourceMappingURL=product-details.component.js.map