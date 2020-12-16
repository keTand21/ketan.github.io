import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalService, Constants, arrState } from 'src/app/components/shared/services/global.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MypurchaseService } from 'src/app/components/shared/services/mypurchase.service';
import { MatDialog } from '@angular/material';
let OrderdetailsComponent = class OrderdetailsComponent {
    constructor(dialogRef, data, dialog, fb, router, globalService, MypurchaseService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dialog = dialog;
        this.fb = fb;
        this.router = router;
        this.globalService = globalService;
        this.MypurchaseService = MypurchaseService;
        this.selectedItems = [];
        this.arrShipper = [];
        this.objConstants = Constants;
        this.dropdownSettings = {};
        this.dropdownList = [];
        this.arrState = arrState;
    }
    ngOnInit() {
    }
};
OrderdetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-orderdetails',
        templateUrl: './orderdetails.component.html',
        styleUrls: ['./orderdetails.component.sass']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, MatDialog,
        FormBuilder,
        Router,
        GlobalService,
        MypurchaseService])
], OrderdetailsComponent);
export { OrderdetailsComponent };
//# sourceMappingURL=orderdetails.component.js.map