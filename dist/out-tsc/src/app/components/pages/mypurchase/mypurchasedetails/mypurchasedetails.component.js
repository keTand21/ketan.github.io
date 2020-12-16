import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalService, Constants, arrState } from 'src/app/components/shared/services/global.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MypurchaseModel } from 'src/app/modals/mypurchase.model';
import { MypurchaseService } from 'src/app/components/shared/services/mypurchase.service';
import { MatDialog } from '@angular/material';
let MypurchasedetailsComponent = class MypurchasedetailsComponent {
    //public validationMessages = ValidationMessages;
    constructor(dialogRef, data, dialog, fb, globalService, MypurchaseService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dialog = dialog;
        this.fb = fb;
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
        this.selectedItems = [];
        if (this.data.objMypurchaseModel) {
            this.objMypurchaseModel = JSON.parse(JSON.stringify(this.data.objMypurchaseModel));
        }
        else {
            this.objMypurchaseModel = new MypurchaseModel();
        }
        this.openDialogInMode = this.data.openDialogInMode;
        this.objMypurchaseModel = Object.assign({}, this.data.objMypurchaseModel);
        console.log('this.objMypurchaseModel ADD-EDIT', this.objMypurchaseModel);
        this.onBuildForm();
        this.getShipperList();
        this.dropdownSettings = {
            singleSelection: true,
            idField: 'ShipperId',
            textField: 'CompanyName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
    }
    onBuildForm() {
        this.myperchaseForm = this.fb.group({
            OrderId: [this.objMypurchaseModel.OrderId],
            ProdTitle: [this.objMypurchaseModel.ProdTitle],
            OrderNumber: [this.objMypurchaseModel.OrderNumber],
            DealId: [this.objMypurchaseModel.DealId],
            BusinessId: [this.objMypurchaseModel.BusinessId],
            // PaymentId: [this.objOrdersModel.PaymentId],
            OrderDate: [this.objMypurchaseModel.OrderDate],
            Price: [this.objMypurchaseModel.Price],
            Quantity: [this.objMypurchaseModel.Quantity],
            Discount: [this.objMypurchaseModel.Discount],
            TotalAmount: [this.objMypurchaseModel.TotalAmount],
            Size: [this.objMypurchaseModel.Size],
            BillDate: [this.objMypurchaseModel.BillDate],
            // Frieght: [this.objOrdersModel.Frieght],
            // Tax: [this.objOrdersModel.Tax],
            DeliveryCharges: [this.objMypurchaseModel.DeliveryCharges],
            ShipperId: [this.objMypurchaseModel.ShipperId],
            SellerId: [this.objMypurchaseModel.SellerId],
            ShipDate: [this.objMypurchaseModel.ShipDate],
            RequiredDate: [this.objMypurchaseModel.RequiredDate],
            OrderStatus: [this.objMypurchaseModel.OrderStatus],
            ShippingDetails: [this.objMypurchaseModel.ShippingDetails],
            TransactionStatus: [this.objMypurchaseModel.TransactionStatus],
            TransactionReferenceNumber: [this.objMypurchaseModel.TransactionReferenceNumber],
            ErrorLocation: [this.objMypurchaseModel.ErrorLocation],
            ErrorMsg: [this.objMypurchaseModel.ErrorMsg],
            PaymentDate: [this.objMypurchaseModel.PaymentDate],
            //ShipperName: [this.objOrdersModel.ShipperName],
            CustomerId: [this.objMypurchaseModel.CustomerId],
            CustomerName: [this.objMypurchaseModel.CustomerName],
            AddressLine1: [this.objMypurchaseModel.AddressLine1],
            AddressLine2: [this.objMypurchaseModel.AddressLine2],
            Place: [this.objMypurchaseModel.Place],
            State: [this.objMypurchaseModel.State],
            Landmark: [this.objMypurchaseModel.Landmark],
            MobileNo: [this.objMypurchaseModel.MobileNo],
        });
    }
    onCancel() {
        this.dialogRef.close();
    }
    getShipperList() {
        const objParams = {};
        this.MypurchaseService.getShipper(objParams)
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS &&
                'rows' in objResp.data && Array.isArray(objResp.data.rows)) {
                this.arrShipper = objResp.data.rows;
                console.log("chekk=========>", this.arrShipper);
            }
        });
    }
    onItemSelect(item) {
        console.log(item);
    }
    onSelectAll(items) {
        console.log(items);
    }
};
MypurchasedetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-mypurchasedetails',
        templateUrl: './mypurchasedetails.component.html',
        styleUrls: ['./mypurchasedetails.component.sass']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, MatDialog,
        FormBuilder,
        GlobalService,
        MypurchaseService])
], MypurchasedetailsComponent);
export { MypurchasedetailsComponent };
//# sourceMappingURL=mypurchasedetails.component.js.map