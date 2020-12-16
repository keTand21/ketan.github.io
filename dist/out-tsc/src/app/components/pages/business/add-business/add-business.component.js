import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../../shared/services/global.service';
import { BusinessService } from '../../../shared/services/business.service';
import { ShowAlert, MessageType } from 'src/app/components/shared/services/global.service';
import swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BusinessModel } from '../business.model';
import { MatDialog } from '@angular/material';
import { GlobalService, arrState } from '../../../shared/services/global.service';
import ValidationMessages from '../../../pages/business/business-validation-messages';
import { CustomValidator } from '../../../shared/validations/custom.validator';
let AddBusinessComponent = class AddBusinessComponent {
    constructor(dialogRef, data, dialog, fb, globalService, businessService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dialog = dialog;
        this.fb = fb;
        this.globalService = globalService;
        this.businessService = businessService;
        this.ValidFrom = new FormControl(new Date());
        this.show = false;
        this.value = 'Show';
        this.ValidationMessages = ValidationMessages;
        this.fileDataOfLicence20 = null;
        this.fileDataOfLicence21 = null;
        this.fileDataOfLicence1 = null;
        this.fileDataOfLicence2 = null;
        this.previewUrlOfLicence20 = null;
        this.previewUrlOfLicence21 = null;
        this.previewUrlOfLicence1 = null;
        this.previewUrlOfLicence2 = null;
        this.fileUploadProgress = null;
        this.uploadedFilePath = null;
        this.Constants = Constants;
        this.selectedValue = '';
        this.arrState = arrState;
        this.selectedState = { abbreviation: 'MH', stateName: 'Maharashtra' };
    }
    ngOnInit() {
        if (this.data.objBusinessModel) {
            this.objBusinessModel = JSON.parse(JSON.stringify(this.data.objBusinessModel));
            // this.objBusinessModels = JSON.parse(JSON.stringify(this.objBusinessModel.Address));
        }
        else {
            this.objBusinessModel = new BusinessModel();
            this.objBusinessModels = new BusinessModel();
        }
        this.openDialogInMode = this.data.objBusinessModel.openDialogInMode;
        //this.objBusinessModel = Object.assign({}, this.data.objBusinessModel);
        console.log('this.objBusinessModel ADD-EDIT', this.objBusinessModel);
        this.onBuildForm();
        this.businessForm.get('BusinessName').valueChanges
            .subscribe((businessName) => {
            if (this.businessForm.get('BusinessName').valid && businessName.trim() !== '') {
                this.isBusinessNameLoading = true;
                const objParams = {
                    CustomerId: 1,
                    BusinessId: this.objBusinessModel.BusinessId,
                    BusinessName: businessName
                };
                this.globalService.spinner.show();
                const subscription = this.businessService.checkBusinessExist(objParams)
                    .subscribe(objResp => {
                    this.globalService.spinner.hide();
                    if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    }
                }, error => {
                    if (error && 'status' in error && error.status === Constants.HTTP_CODE.FORBIDDEN) {
                        this.businessForm.get('BusinessName').setErrors({
                            alreadyExist: true
                        });
                    }
                    else {
                        this.businessForm.get('BusinessName').setErrors({
                            unableToCheckWithServer: true
                        });
                    }
                    console.log('Error while add new Business', error);
                }, () => {
                    setTimeout(() => {
                        this.isBusinessNameLoading = false;
                    }, 1000);
                    subscription.unsubscribe();
                }).add(() => {
                    this.globalService.spinner.hide();
                });
            }
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
    fileProgress(fileInput, licenceType) {
        const objFileInput = fileInput.target.files[0];
        if (!objFileInput) {
            if (licenceType === 20) {
                this.previewUrlOfLicence20 = null;
                this.fileDataOfLicence20 = null;
                this.businessForm.get('Licence20').setValue(null);
            }
            else {
                this.previewUrlOfLicence21 = null;
                this.fileDataOfLicence21 = null;
                this.businessForm.get('Licence21').setValue(null);
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
            if (licenceType === 20) {
                this.previewUrlOfLicence20 = reader.result;
                this.fileDataOfLicence20 = objFileInput;
                this.businessForm.get('Licence20').setValue('previewUrlOfLicence20');
            }
            else {
                this.previewUrlOfLicence21 = reader.result;
                this.fileDataOfLicence21 = objFileInput;
                this.businessForm.get('Licence21').setValue('previewUrlOfLicence21');
            }
        };
    }
    fileProgresion(fileInput, PanType) {
        const objFileInput = fileInput.target.files[0];
        if (!objFileInput) {
            if (PanType === 1) {
                this.previewUrlOfLicence1 = null;
                this.fileDataOfLicence1 = null;
                this.businessForm.get('PanImage').setValue(null);
            }
            else {
                this.previewUrlOfLicence2 = null;
                this.fileDataOfLicence2 = null;
                this.businessForm.get('GstImage').setValue(null);
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
            if (PanType === 1) {
                this.previewUrlOfLicence1 = reader.result;
                this.fileDataOfLicence1 = objFileInput;
                this.businessForm.get('PanImage').setValue('previewUrlOfLicence1');
            }
            else {
                this.previewUrlOfLicence2 = reader.result;
                this.fileDataOfLicence2 = objFileInput;
                this.businessForm.get('GstImage').setValue('previewUrlOfLicence2');
            }
        };
    }
    onBuildForm() {
        this.businessForm = this.fb.group({
            BusinessId: [this.objBusinessModel.BusinessId],
            CustomerId: [this.objBusinessModel.CustomerId],
            BusinessName: [this.objBusinessModel.BusinessName,
                [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            // Address: [this.objBusinessModel.Address,
            // [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            StatusInfo: [this.objBusinessModel.StatusInfo],
            // CustomerType: [this.objBusinessModel.CustomerType ?
            //   this.objBusinessModel.CustomerType.toString() : this.objBusinessModel.CustomerType,
            // [Validators.required]],
            CustomerType: [this.objBusinessModel.CustomerType, [Validators.required]],
            Licence20: [this.objBusinessModel.Licence20, [Validators.required]],
            Licence21: [this.objBusinessModel.Licence21, [Validators.required]],
            PanImage: [this.objBusinessModel.PanImage, [Validators.required]],
            GstImage: [this.objBusinessModel.GstImage],
            Gstn: [this.objBusinessModel.Gstn, [CustomValidator.gstn]],
            Pan: [this.objBusinessModel.Pan, [Validators.required, CustomValidator.pan]],
            ValidFrom: [this.objBusinessModel.ValidFrom],
            ValidTill: [this.objBusinessModel.ValidTill],
            AddressLine1: [this.objBusinessModel.AddressLine1, [Validators.required]],
            AddressLine2: [this.objBusinessModel.AddressLine2,],
            Place: [this.objBusinessModel.Place, [Validators.required]],
            Tahsil: [this.objBusinessModel.Tahsil, [Validators.required]],
            Dist: [this.objBusinessModel.Dist, [Validators.required]],
            State: [this.objBusinessModel.State],
            Pincode: [this.objBusinessModel.Pincode, [Validators.required]],
            Landmark: [this.objBusinessModel.Landmark, [Validators.required]],
        });
        //this.a = (this.objBusinessModel.Gstn && this.objBusinessModel.Gstn > 0) ? 1 : 0;
        // this.onChangeCustomerType({
        //   value: this.CustomerType
        // });
        if (this.objBusinessModel.BusinessId) {
            this.previewUrlOfLicence20 = `${this.Constants.AWS.BASE_URI}${this.objBusinessModel.Licence20}`;
            this.previewUrlOfLicence21 = `${this.Constants.AWS.BASE_URI}${this.objBusinessModel.Licence21}`;
        }
        if (this.objBusinessModel.BusinessId) {
            this.previewUrlOfLicence1 = `${this.Constants.AWS.BASE_URI}${this.objBusinessModel.PanImage}`;
            if (this.objBusinessModel.GstImage) {
                this.previewUrlOfLicence2 = `${this.Constants.AWS.BASE_URI}${this.objBusinessModel.GstImage}`;
            }
        }
    }
    onChangeGstnNo() {
        const gstn = this.businessForm.get('Gstn');
        if (gstn.valid && gstn.value && gstn.value.length === 15) {
            const pan = gstn.value.substring(2, 12);
            this.businessForm.get('Pan').setValue(pan);
        }
        else {
            this.businessForm.get('Pan').setValue('');
        }
    }
    onChangeCustomerType($event) {
        let CustomerType = this.businessForm.get('CustomerType').value;
        if (CustomerType === 1) {
            this.businessForm.get('Gstn').setErrors({
                gstRequrd: true
            });
            this.businessForm.get('GstImage').setErrors({
                gstimage: true
            });
        }
        else {
            this.businessForm.get('Gstn').setErrors(null),
                this.businessForm.get('GstImage').setErrors(null);
        }
    }
    setValidTillDate() {
        const ValidFrom = new Date(this.businessForm.get('ValidFrom').value);
        const year = ValidFrom.getFullYear();
        const month = ValidFrom.getMonth();
        const day = ValidFrom.getDate();
        const ValidTill = new Date(year + 5, month, day - 1);
        this.businessForm.get('ValidTill').setValue(ValidTill);
    }
    onCancel() {
        this.dialogRef.close();
    }
    gstDelete(BusinessId) {
        const unsubscribe = this.businessService.gstBusinessImage({ BusinessId: BusinessId })
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                swal.fire('Deleted!', objResp.message, 'success');
                this.previewUrlOfLicence2 = null;
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                ShowAlert(MessageType.ERROR, 'Failed to login', objResp.message);
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                ShowAlert(MessageType.ERROR, 'Failed to login', objResp.message);
            }
        }, (error) => {
            ShowAlert(MessageType.ERROR, 'Failed to login', error);
            console.log('deleteBusinessImage', error);
        }, () => {
        }).add(() => unsubscribe.unsubscribe());
    }
    // async gstDelete(BusinessId) {
    //   const objSwalResp = await swal.fire({
    //     type: 'warning',
    //     title: 'Are you sure to Delete Gst Image?',
    //     text: 'You will not be able to recover the data of Gst Image',
    //     showCancelButton: true,
    //     confirmButtonColor: '#049F0C',
    //     cancelButtonColor: '#ff0000',
    //     confirmButtonText: 'Yes, delete it!',
    //     cancelButtonText: 'No, keep it'
    //   });
    //   if (objSwalResp && 'value' in objSwalResp && objSwalResp.value) {
    //     const unsubscribe = this.businessService.gstBusinessImage({ BusinessId: BusinessId })
    //       .subscribe((objResp: ResponseModel) => {
    //         if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
    //           swal.fire(
    //             'Deleted!',
    //             objResp.message,
    //             'success'
    //           );
    //           this.previewUrlOfLicence2 = null;
    //         } else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
    //           swal.fire(objResp.message, 'error');
    //         } else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
    //           swal.fire(objResp.message, 'error');
    //         }
    //       }, (error) => {
    //         swal.fire(
    //           'Error',
    //           error,
    //           'error'
    //         );
    //         console.log('deleteBusinessImage', error)
    //       }, () => {
    //         unsubscribe.unsubscribe();
    //       });
    //   }
    // }
    onSave() {
        this.globalService.markAsTouched(this.businessForm.controls);
        console.log('this.businessForm ---->', this.businessForm);
        if (this.businessForm.valid) {
            // if (confirm('Are you sure you want to save?')) {
            this.isFormSaving = true;
            const objParams = JSON.parse(JSON.stringify(this.businessForm.value));
            // const objParams =this.businessForm.value;
            var Customer = JSON.parse(localStorage.getItem('user'));
            console.log(Customer.CustomerId);
            objParams['CustomerId'] = (Customer.CustomerId);
            // objParams['CustomerId'] = this.CustomerId;
            delete objParams['UpdatedOn'];
            delete objParams['CreatedOn'];
            const formData = new FormData();
            formData.append('params', JSON.stringify(objParams));
            formData.append('Licence20', this.fileDataOfLicence20);
            formData.append('Licence21', this.fileDataOfLicence21);
            formData.append('PanImage', this.fileDataOfLicence1);
            formData.append('GstImage', this.fileDataOfLicence2 ? this.fileDataOfLicence2 : undefined);
            if (this.businessForm.value.BusinessId) {
                this.globalService.spinner.show();
                const subscription = this.businessService.onUpdateBusiness(formData)
                    .subscribe((objResp) => {
                    // this.globalService.spinner.hide();
                    if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                        swal.fire('Update Business!', objResp.message, 'success');
                        this.dialogRef.close();
                    }
                    else {
                        ShowAlert(MessageType.ERROR, 'Failed to login', objResp.message);
                    }
                    this.dialogRef.close();
                }, error => {
                    ShowAlert(MessageType.ERROR, 'Failed to login', error);
                    this.dialogRef.close();
                }, () => {
                    subscription.unsubscribe();
                    this.isFormSaving = false;
                    this.dialogRef.close();
                }).add(() => {
                    this.globalService.spinner.hide();
                });
            }
            else {
                const objCustomer = JSON.parse(localStorage.getItem('user'));
                objParams['CustomerId'] = objCustomer.CustomerId;
                // Add new Business
                this.globalService.spinner.show();
                const subscription = this.businessService.onAddBusiness(formData)
                    .subscribe((objResp) => {
                    //  this.globalService.spinner.hide();
                    // Check response which you are getting from backend & show alert
                    if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                        // alert(objResp.message);
                        swal.fire('Save Business!', objResp.message, 'success');
                        this.dialogRef.close();
                        let existing = JSON.parse(localStorage.getItem('user'));
                        //  let existing = localStorage.getItem('user');
                        existing = existing ? JSON.parse(existing) : {};
                        if (!existing.BusinessData['BusinessId'] || existing.BusinessData['BusinessId'] == null &&
                            existing.BusinessData['BusinessId'] == '' && +existing.BusinessData['BusinessId']) {
                            existing.BusinessData['BusinessId'] = objResp.data.BusinessId;
                            existing.BusinessData['BusinessName'] = objParams['BusinessName'];
                            localStorage.setItem('user', JSON.stringify(existing));
                        }
                        this.dialogRef.close(true);
                    }
                    else if (objResp.statusCode === Constants.HTTP_CODE.BAD_REQUEST) {
                        ShowAlert(MessageType.ERROR, 'Failed to login', objResp.message);
                    }
                    else {
                        ShowAlert(MessageType.ERROR, 'Failed to login', objResp.message);
                    }
                    this.dialogRef.close();
                }, error => {
                    console.log('Error while add new Business', error);
                    ShowAlert(MessageType.ERROR, 'Failed to login', error);
                    this.dialogRef.close();
                }, () => {
                    subscription.unsubscribe();
                    this.isFormSaving = false;
                    this.dialogRef.close();
                }).add(() => {
                    this.globalService.spinner.hide();
                });
            }
        }
    }
};
AddBusinessComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-business',
        templateUrl: './add-business.component.html',
        styleUrls: ['./add-business.component.sass'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, MatDialog,
        FormBuilder,
        GlobalService,
        BusinessService])
], AddBusinessComponent);
export { AddBusinessComponent };
//# sourceMappingURL=add-business.component.js.map