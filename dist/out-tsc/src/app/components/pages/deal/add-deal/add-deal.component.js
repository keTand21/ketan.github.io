import * as tslib_1 from "tslib";
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../../shared/services/global.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog } from '@angular/material';
import { GlobalService, arrGST, arrPackType } from '../../../shared/services/global.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { debounceTime, switchMap } from 'rxjs/operators';
import { DealService } from '../../../shared/services/deal.service';
import { DealModel } from '../../deal/deal.model';
import { Observable } from 'rxjs';
import ValidationMessages from '../add-deal/deal-validation-messages';
const arrValidators = [Validators.required, Validators.min(0), Validators.max(99999)];
let AddDealComponent = class AddDealComponent {
    constructor(dialogRef, 
    // private fb: FormBuilder,
    data, dealservice, fb, router, dialog, globalService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dealservice = dealservice;
        this.fb = fb;
        this.router = router;
        this.dialog = dialog;
        this.globalService = globalService;
        this.fileDataOfImageWeb1 = null;
        this.fileDataOfImageMobile1 = null;
        this.fileDataOfBannerImage = null;
        this.Constants = Constants;
        this.fileUploadProgress = null;
        this.uploadedFilePath = null;
        this.previewUrlOfImageWeb1 = null;
        this.previewUrlOfImageMobile1 = null;
        this.previewUrlOfBannerImage = null;
        this.now = new Date();
        this.filteredProducts = [];
        this.filteredCompany = [];
        this.schemeType = 1;
        this.arrGST = arrGST;
        this.arrPackType = arrPackType;
        this.arrSchemeType = [
            { id: 0, displayValue: 'Quantity' },
            { id: 1, displayValue: 'Percentage' }
        ];
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.ValidationMessages = ValidationMessages;
        this.objCustomer = {};
    }
    ngOnInit() {
        this.objCustomer = this.globalService.getCurrentUser();
        if (this.data.objDealModel) {
            this.objDealModel = JSON.parse(JSON.stringify(this.data.objDealModel));
        }
        else {
            this.objDealModel = new DealModel();
        }
        this.openDialogInMode = this.data.openDialogInMode;
        this.objDealModel = Object.assign({}, this.data.objDealModel);
        console.log('this.objDealModel ADD-EDIT', this.objDealModel);
        this.onBuildForm();
        if (!this.objDealModel.DealId) {
            this.objDealModel.StartOn = new Date();
            this.objDealModel.PackType = this.arrPackType[0];
            this.objDealModel.Gst = this.arrGST[0];
        }
        // this.dealForm.get('ProdTitle').valueChanges
        //   .pipe(
        //     debounceTime(300),
        //     // tap(() => ),
        //     switchMap((value) => {
        //       if (this.isFormSaving) {
        //         return new Observable();
        //       }
        //       console.log('this.objSelectedProduct value', value);
        //       if (value && typeof value === 'object') {
        //         // this.dealForm.get('ProdTitle').setValue(value['ProdTitle']);
        //         this.dealForm.get('ProdId').setValue(value['ProdId']);
        //         this.dealForm.get('Mrp').setValue(value['ProdMrp']);
        //         this.dealForm.get('PackSize').setValue(value['ProdSize']);
        //         this.dealForm.get('PackType').setValue(value['PackType']);
        //         this.dealForm.get('CompanyName').setValue(value['CompanyName']);
        //         this.dealForm.get('CompanyId').setValue(+value['CompanyId']);
        //         return new Observable();
        //       } else {
        //         this.dealForm.get('ProdId').setValue(null);
        //         this.dealForm.get('Mrp').setValue(null);
        //         this.dealForm.get('PackSize').setValue(null);
        //         this.dealForm.get('PackType').setValue(null);
        //         this.dealForm.get('CompanyName').setValue(null);
        //         this.dealForm.get('CompanyId').setValue(null);
        //       }
        //       if (this.isProdTitleLoading || this.isFormSaving) {
        //         return new Observable();
        //       }
        //       if (this.dealForm.get('ProdTitle').valid) {
        //         const objParams = {
        //           Pagination: {
        //             Page: 0,
        //             Limit: 100,
        //             SortField: 'ProdTitle',
        //             SortOrder: 'ASC'
        //           },
        //           SearchString: value
        //         };
        //         this.isProdTitleLoading = true;
        //         return this.dealservice.searchProducts(objParams).pipe()
        //       } else {
        //         this.dealForm.get('ProdId').setValue('');
        //         this.dealForm.get('ProdTitle').setValue('');
        //         return new Observable();
        //       }
        //     })
        //   )
        //   .subscribe((objResp: ResponseModel) => {
        //     if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS && objResp.data) {
        //       this.filteredProducts = objResp.data;
        //     }
        //     setTimeout(() => { this.isProdTitleLoading = false; }, 500);
        //   })
        this.dealForm.get('ProdTitle').valueChanges
            .pipe(debounceTime(300), 
        // tap(() => ),
        switchMap((value) => {
            if (value && typeof value === 'object') {
                console.log('this.objSelectedProduct value', value);
                this.dealForm.get('ProdTitle').setValue(value['ProdTitle']);
                this.dealForm.get('ProdId').setValue(value['ProdId']);
                this.dealForm.get('Mrp').setValue(value['ProdMrp']);
                this.dealForm.get('PackSize').setValue(value['ProdSize']);
                this.dealForm.get('PackType').setValue(value['PackType']);
                this.dealForm.get('CompanyName').setValue(value['CompanyName']);
                this.dealForm.get('CompanyId').setValue(+value['CompanyId']);
                return new Observable();
            }
            else {
                this.dealForm.get('ProdId').setValue(null);
                this.dealForm.get('Mrp').setValue(null);
                this.dealForm.get('PackSize').setValue(null);
                this.dealForm.get('PackType').setValue(null);
                this.dealForm.get('CompanyName').setValue(null);
                this.dealForm.get('CompanyId').setValue(null);
            }
            if (this.isProdTitleLoading) {
                return new Observable();
            }
            if (this.dealForm.get('ProdTitle').valid) {
                const objParams = {
                    Pagination: {
                        Page: 0,
                        Limit: 100,
                        SortField: 'ProdTitle',
                        SortOrder: 'ASC'
                    },
                    SearchString: value
                };
                this.isProdTitleLoading = true;
                return this.dealservice.searchProducts(objParams).pipe();
            }
            else {
                this.dealForm.get('ProdId').setValue('');
                return new Observable();
            }
        }))
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS && objResp.data) {
                this.filteredProducts = objResp.data;
            }
            setTimeout(() => { this.isProdTitleLoading = false; }, 500);
        });
        this.dealForm.get('CompanyName').valueChanges
            .pipe(debounceTime(500), 
        // tap(() => ),
        switchMap((value) => {
            // if (this.isCompanyNameLoading === undefined) {
            //   return new Observable();
            // }
            if (value && typeof value === 'object') {
                this.dealForm.get('CompanyId').setValue(+value['CompanyId']);
                return new Observable();
            }
            else {
                this.dealForm.get('CompanyId').setValue(null);
            }
            if (this.isCompanyNameLoading) {
                return new Observable();
            }
            if (this.dealForm.get('CompanyName').valid) {
                const objParams = {
                    Pagination: {
                        Page: 0,
                        Limit: 100,
                        SortField: 'CompanyName',
                        SortOrder: 'ASC'
                    },
                    SearchString: value,
                    ApplyDateRangeOnColumn: 'CreatedOn',
                    SelectColumns: ['CompanyId', 'CompanyName']
                };
                this.isCompanyNameLoading = true;
                return this.dealservice.getCompanyList(objParams).pipe();
            }
            else {
                return new Observable();
            }
        }))
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS && objResp.data &&
                'rows' in objResp.data && Array.isArray(objResp.data.rows)) {
                this.filteredCompany = objResp.data.rows;
            }
            setTimeout(() => { this.isCompanyNameLoading = false; }, 500);
        });
    }
    openImage(imageUrl) {
        swal.fire({
            imageUrl: imageUrl,
            imageHeight: 400,
            imageWidth: 600,
            confirmButtonText: 'Close'
        });
    }
    fileProgresion(fileInput, ImageType) {
        const objFileInput = fileInput.target.files[0];
        if (!objFileInput) {
            if (ImageType === 1) {
                this.previewUrlOfImageWeb1 = null;
                this.fileDataOfImageWeb1 = null;
                this.dealForm.get('ImageWeb1').setValue(null);
            }
            else {
                this.previewUrlOfImageMobile1 = null;
                this.fileDataOfImageMobile1 = null;
                this.dealForm.get('ImageMobile1').setValue(null);
            }
            return;
        }
        const mimeType = objFileInput.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(objFileInput);
        reader.onload = (event) => {
            if (ImageType === 1) {
                this.previewUrlOfImageWeb1 = reader.result;
                this.fileDataOfImageWeb1 = objFileInput;
                this.dealForm.get('ImageWeb1').setValue('previewUrlOfImageWeb1');
            }
            else {
                this.previewUrlOfImageMobile1 = reader.result;
                this.fileDataOfImageMobile1 = objFileInput;
                this.dealForm.get('ImageMobile1').setValue('previewUrlOfImageMobile1');
            }
        };
    }
    BannerImageProgresion(fileInput, ImageType) {
        const objFileInput = fileInput.target.files[0];
        if (!objFileInput) {
            if (ImageType === 1) {
                this.previewUrlOfBannerImage = null;
                this.fileDataOfBannerImage = null;
                this.dealForm.get('BannerImage').setValue(null);
            }
            return;
        }
        const mimeType = objFileInput.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(objFileInput);
        reader.onload = (event) => {
            if (ImageType === 1) {
                this.previewUrlOfBannerImage = reader.result;
                this.fileDataOfBannerImage = objFileInput;
                this.dealForm.get('BannerImage').setValue('previewUrlOfBannerImage');
            }
        };
    }
    doCalculations() {
        const ptr = this.dealForm.get('Ptr').value;
        const mrp = this.dealForm.get('Mrp').value;
        if (ptr > mrp) {
            this.dealForm.get('Ptr').setErrors({
                largeThanMrp: true
            });
        }
        if (this.dealForm.get('MinQtyPerRetailer').value >
            this.dealForm.get('MaxQtyPerRetailer').value) {
            this.dealForm.get('MinQtyPerRetailer').setErrors({
                maxThanMaxQtyPerRetailer: true
            });
        }
        let dealRate = 0, dealScheme = '';
        if (this.schemeType) {
            const discount = this.dealForm.get('Discount').value;
            if (ptr > 0 && discount > 0) {
                dealRate = ptr - ((ptr * discount) / 100);
                dealScheme = `${discount} % On Rate`;
            }
        }
        else {
            const buy = this.dealForm.get('Buy').value;
            const get = this.dealForm.get('Get').value;
            if (buy > 0 && get > 0) {
                dealRate = (ptr * buy) / (buy + get);
                dealScheme = `${buy} + ${get}`;
            }
        }
        this.dealForm.get('DealRate').setValue(dealRate.toFixed(2));
        this.dealForm.get('DealScheme').setValue(dealScheme);
    }
    onModelChangeMaxQtyPerRetailer() {
        if (!this.schemeType) {
            if (this.dealForm.get('MaxQtyPerRetailer').valid) {
                this.dealForm.get('Buy').setValue(this.dealForm.get('MaxQtyPerRetailer').value);
            }
            else {
                this.dealForm.get('Buy').setValue('');
            }
        }
    }
    doCalculationsMinQtyPerRetailer() {
        const MinQtyPerRetailer = this.dealForm.get('MinQtyPerRetailer').value;
        const MaxQtyPerRetailer = this.dealForm.get('MaxQtyPerRetailer').value;
        if (MinQtyPerRetailer > MaxQtyPerRetailer) {
            this.dealForm.get('MinQtyPerRetailer').setErrors({
                maxThanMaxQtyPerRetailer: true
            });
        }
    }
    onBuildForm() {
        this.dealForm = this.fb.group({
            DealId: [this.objDealModel.DealId],
            ProdId: [this.objDealModel.ProdId],
            ProdTitle: [this.objDealModel.ProdTitle || this.objDealModel.TempProdTitle,
                [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            CompanyName: [this.objDealModel.CompanyName || this.objDealModel.TempCompanyName,
                [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            CompanyId: [this.objDealModel.CompanyId],
            StartOn: [this.objDealModel.StartOn, [Validators.required]],
            EndOn: [this.objDealModel.EndOn, [Validators.required]],
            ActualStock: [this.objDealModel.ActualStock, [Validators.required, Validators.min(1), Validators.max(99999)]],
            AvailableStock: [this.objDealModel.AvailableStock, [Validators.required, Validators.min(1), Validators.max(99999)]],
            Mrp: [this.objDealModel.Mrp, [Validators.required, Validators.min(1)]],
            Ptr: [this.objDealModel.Ptr, [Validators.required]],
            Discount: [this.objDealModel.Discount, [Validators.required, Validators.min(0), Validators.max(100)]],
            Buy: [this.objDealModel.Buy, arrValidators],
            Get: [this.objDealModel.Get, arrValidators],
            DealRate: [this.objDealModel.DealRate, [Validators.required]],
            DealScheme: [this.objDealModel.DealScheme, [Validators.required]],
            Gst: [this.objDealModel.Gst || this.arrGST[0], [Validators.required]],
            PackType: [this.objDealModel.PackType || this.arrPackType[0], [Validators.required]],
            PackSize: [this.objDealModel.PackSize, [Validators.required]],
            ProdExpiryDate: [this.objDealModel.ProdExpiryDate],
            MaxQtyPerRetailer: [this.objDealModel.MaxQtyPerRetailer, [Validators.required]],
            MinQtyPerRetailer: [this.objDealModel.MinQtyPerRetailer, [Validators.required]],
            SearchCount: [this.objDealModel.SearchCount],
            ClaimCount: [this.objDealModel.ClaimCount],
            IsFeatured: [this.objDealModel.IsFeatured],
            Status: [this.objDealModel.Status],
            StatusInfo: [this.objDealModel.StatusInfo],
            ApprovedOn: [this.objDealModel.ApprovedOn],
            CreatedOn: [this.objDealModel.CreatedOn],
            UpdatedOn: [this.objDealModel.UpdatedOn],
            ImageWeb1: [this.objDealModel.ImageWeb1],
            ImageMobile1: [this.objDealModel.ImageMobile1],
            BannerImage: [this.objDealModel.BannerImage],
            CreatedByUserName: [this.objDealModel.CreatedByUserName],
            BusinessName: [this.objDealModel.BusinessName],
        });
        this.schemeType = (this.objDealModel.Discount && this.objDealModel.Discount > 0) ? 1 : 0;
        this.onChangeSchemeType({
            value: this.schemeType
        });
        if (this.objDealModel.DealId) {
            if (this.objDealModel.ImageWeb1) {
                this.previewUrlOfImageWeb1 = `${this.Constants.AWS.BASE_URI}${this.objDealModel.ImageWeb1}`;
            }
            if (this.objDealModel.ImageMobile1) {
                this.previewUrlOfImageMobile1 = `${this.Constants.AWS.BASE_URI}${this.objDealModel.ImageMobile1}`;
            }
        }
        if (this.objDealModel.BannerImage) {
            if (this.objDealModel.BannerImage) {
                this.previewUrlOfBannerImage = `${this.Constants.AWS.BASE_URI}${this.objDealModel.BannerImage}`;
            }
        }
    }
    doCalculetStartdate() {
        const StartOn = new Date(this.dealForm.get('StartOn').value);
        const year = StartOn.getFullYear();
        const month = StartOn.getMonth();
        const day = StartOn.getDate();
        const EndOn = new Date(year, month, day + 6);
        this.dealForm.get('EndOn').setValue(EndOn);
    }
    onCancel() {
        this.dialogRef.close();
    }
    relaunchDeal() {
        const objParams = {
            DealId: this.objDealModel.DealId,
            StartOn: this.dealForm.value['StartOn'],
            EndOn: this.dealForm.value['EndOn'],
        };
        this.isFormSaving = true;
        this.globalService.spinner.show();
        const subscription = this.dealservice.relaunchDeal(objParams)
            .subscribe((objResp) => {
            alert(objResp.message);
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                this.dialogRef.close(objResp.status);
            }
        }, error => {
            console.log('Error while relaunch deal', error);
            alert('Failed to relaunch deal.');
        }, () => {
            this.isFormSaving = false;
        }).add(() => {
            this.globalService.spinner.hide();
            subscription.unsubscribe();
        });
    }
    onChangeSchemeType($event) {
        this.schemeType = +$event['value'];
        console.log('asdas==>', this.schemeType);
        if (this.schemeType) {
            this.dealForm.addControl('Discount', new FormControl(this.objDealModel.Discount, [Validators.required, Validators.min(0), Validators.max(100)]));
            this.dealForm.removeControl('Buy');
            this.dealForm.removeControl('Get');
        }
        else {
            this.dealForm.removeControl('Discount');
            this.dealForm.addControl('Buy', new FormControl(this.objDealModel.Buy, arrValidators));
            this.dealForm.addControl('Get', new FormControl(this.objDealModel.Get, arrValidators));
        }
        this.doCalculations();
    }
    imageWebdelete(DealId) {
        const unsubscribe = this.dealservice.deleteDealImageWeb({ DealId })
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                swal.fire('Deleted!', objResp.message, 'success');
                this.previewUrlOfImageWeb1 = null;
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                swal.fire(objResp.message, 'error');
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                swal.fire(objResp.message, 'error');
            }
        }, (error) => {
            swal.fire('Error', error, 'error');
            console.log('deleteDealsImage', error);
        }, () => {
        }).add(() => unsubscribe.unsubscribe());
    }
    ImageMobiledelete(DealId) {
        const unsubscribe = this.dealservice.deleteDealImageMobile({ DealId: DealId })
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                swal.fire('Deleted!', objResp.message, 'success');
                this.previewUrlOfImageMobile1 = null;
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                swal.fire(objResp.message, 'error');
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                swal.fire(objResp.message, 'error');
            }
        }, (error) => {
            swal.fire('Error', error, 'error');
            console.log('deleteDealsImage', error);
        }, () => {
        }).add(() => unsubscribe.unsubscribe());
    }
    onSave() {
        this.isFormSaving = true;
        this.doCalculations();
        this.globalService.markAsTouched(this.dealForm.controls);
        console.log('this.dealForm', this.dealForm);
        if (this.dealForm.valid) {
            // const objParams = JSON.parse(JSON.stringify(this.dealForm.value));
            // objParams['CreatedByUserId'] = +localStorage.getItem('user');
            const prodTitle = this.dealForm.get('ProdTitle').value;
            if (prodTitle && typeof prodTitle === 'object') {
                this.dealForm.get('ProdId').setValue(prodTitle['ProdId']);
                this.dealForm.get('ProdTitle').setValue(prodTitle['ProdTitle']);
                if ('CompanyId' in prodTitle && +prodTitle['CompanyId']) {
                    this.dealForm.get('CompanyId').setValue(prodTitle['CompanyId']);
                    this.dealForm.get('CompanyName').setValue(prodTitle['CompanyName']);
                }
            }
            const companyName = this.dealForm.get('CompanyName').value;
            if (companyName && typeof companyName === 'object') {
                this.dealForm.get('CompanyId').setValue(companyName['CompanyId']);
                this.dealForm.get('CompanyName').setValue(companyName['CompanyName']);
            }
            if (this.openDialogInMode === 'relaunch') {
                this.relaunchDeal();
                return;
            }
            // const objParams = this.dealForm.value;
            const objParams = JSON.parse(JSON.stringify(this.dealForm.value));
            const Business = JSON.parse(localStorage.getItem('user'));
            objParams['BusinessId'] = Business.BusinessData.BusinessId;
            // objParams['BusinessId'] = +localStorage.getItem('BusinessId');
            // const objParams = this.dealForm.value;
            // delete objParams['DealId'];
            delete objParams['SearchCount'];
            delete objParams['ClaimCount'];
            delete objParams['IsFeatured'];
            delete objParams['Status'];
            delete objParams['ApprovedOn'];
            delete objParams['CreatedOn'];
            delete objParams['UpdatedOn'];
            // delete objParams['ProdExpiryDate'];
            // delete objParams['EndOn'];
            // delete objParams['StartOn'];
            console.log('JSON.stringify(objParams)', JSON.stringify(objParams));
            const formData = new FormData();
            formData.append('ImageWeb1', this.fileDataOfImageWeb1);
            formData.append('ImageMobile1', this.fileDataOfImageMobile1);
            formData.append('BannerImage', this.fileDataOfBannerImage);
            if (this.dealForm.value.DealId) {
                objParams['UpdatedByUserId'] = this.objCustomer.CustomerId;
                formData.append('params', JSON.stringify(objParams));
                this.isFormSaving = true;
                this.globalService.spinner.show();
                const subscription = this.dealservice.updateDeals(formData)
                    .subscribe((objResp) => {
                    swal.fire('Update Deal!', objResp.message, 'success');
                    if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                        this.dialogRef.close(objResp.status);
                    }
                }, error => {
                    console.log('Error while update deal', error);
                    swal.fire('Error', error, 'error');
                    this.dialogRef.close();
                }, () => {
                    this.isFormSaving = false;
                    this.dialogRef.close();
                }).add(() => {
                    this.globalService.spinner.hide();
                    subscription.unsubscribe();
                });
            }
            else {
                objParams['CreatedByUserId'] = this.objCustomer.CustomerId;
                formData.append('params', JSON.stringify(objParams));
                this.isFormSaving = true;
                this.globalService.spinner.show();
                const subscription = this.dealservice.addNewDeals(formData)
                    .subscribe((objResp) => {
                    // Check response which you are getting from backend & show alert
                    if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                        swal.fire(objResp.message, 'success');
                        this.dialogRef.close(objResp.data);
                    }
                    else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                        swal.fire(objResp.message, 'error');
                    }
                    else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                        swal.fire(objResp.message, 'error');
                        console.log('chekk===>', objResp);
                    }
                    this.dialogRef.close(objResp.data);
                }, error => {
                    console.log('Error while add new deal', error);
                    swal.fire('Error', error, 'error');
                    this.dialogRef.close();
                }, () => {
                    this.isFormSaving = false;
                }).add(() => {
                    this.globalService.spinner.hide();
                    subscription.unsubscribe();
                });
            }
        }
        else {
            this.isFormSaving = false;
        }
    }
    onItemSelect(item) {
        console.log(item);
    }
    onSelectAll(items) {
        console.log(items);
    }
    displayProductTitle(objProduct) {
        console.log('objProduct', objProduct);
        this.isProdTitleLoading = true;
        setTimeout(() => {
            this.isProdTitleLoading = false;
        }, 700);
        if (objProduct && typeof objProduct === 'object' && 'ProdTitle' in objProduct) {
            return objProduct['ProdTitle'];
        }
        return objProduct;
    }
    displayCompanyName(objCompany) {
        this.isCompanyNameLoading = true;
        setTimeout(() => {
            this.isCompanyNameLoading = false;
        }, 2000);
        if (objCompany && typeof objCompany === 'object' && 'CompanyName' in objCompany) {
            return objCompany['CompanyName'];
        }
        return objCompany;
    }
};
AddDealComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-deal',
        templateUrl: './add-deal.component.html',
        styleUrls: ['./add-deal.component.sass'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, DealService,
        FormBuilder,
        Router,
        MatDialog,
        GlobalService])
], AddDealComponent);
export { AddDealComponent };
//# sourceMappingURL=add-deal.component.js.map