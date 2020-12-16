import * as tslib_1 from "tslib";
import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from 'src/app/components/shared/services/product.service';
let ProductZoomComponent = class ProductZoomComponent {
    constructor(productsService, dialogRef, data) {
        this.productsService = productsService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.product = data.product;
        this.selectedProductImageIndex = data.index;
    }
    ngOnInit() {
    }
    close() {
        this.dialogRef.close();
    }
};
tslib_1.__decorate([
    ViewChild('zoomImage', { static: true }),
    tslib_1.__metadata("design:type", Object)
], ProductZoomComponent.prototype, "zoomImage", void 0);
ProductZoomComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-zoom',
        templateUrl: './product-zoom.component.html',
        styleUrls: ['./product-zoom.component.sass'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__param(2, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [ProductService, MatDialogRef, Object])
], ProductZoomComponent);
export { ProductZoomComponent };
//# sourceMappingURL=product-zoom.component.js.map