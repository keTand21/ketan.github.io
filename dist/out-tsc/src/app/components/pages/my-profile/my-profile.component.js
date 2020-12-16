import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MyProfileService } from '../../shared/services/my-profile.service';
import ValidationMessages from '../../pages/my-profile/my-profile-validation-messages';
import { MatDialog } from '@angular/material';
import { GlobalService } from '../../shared/services/global.service';
import { CustomValidator, MustMatch, MustNotMatch } from '../../shared/validations/custom.validator';
import swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../shared/services/global.service';
import { Router } from '@angular/router';
import { SignupModel } from 'src/app/modals/signup.model';
import { NgxSpinnerService } from 'ngx-spinner';
let MyProfileComponent = class MyProfileComponent {
    //dataSource = new MatTableDataSource<MyprofileModel>(ELEMENT_DATA);
    constructor(fb, globalService, router, myprofileService, dialog, spinner) {
        this.fb = fb;
        this.globalService = globalService;
        this.router = router;
        this.myprofileService = myprofileService;
        this.dialog = dialog;
        this.spinner = spinner;
        this.objConstants = Constants;
        this.hide = true;
        this.ValidationMessages = ValidationMessages;
        this.displayedColumns = ['FirstName', 'LastName', 'CustomerType',
            'MobileNo', 'EmailId', 'Password'];
    }
    ngOnInit() {
        this.objSignupModel = new SignupModel();
        this.objSignupModel = this.objSignupModel;
        this.objSignupModel = Object.assign({}, this.objSignupModel);
        this.onBuildForm();
        this.getmyprofileDetails();
    }
    onBuildForm() {
        this.signupForm = this.fb.group({
            FirstName: [this.objSignupModel.FirstName, [Validators.required, Validators.minLength(2), CustomValidator.charOnly]],
            LastName: [this.objSignupModel.LastName, [Validators.required, Validators.minLength(2), CustomValidator.charOnly]],
            MobileNo: [this.objSignupModel.MobileNo, [Validators.required, Validators.minLength(10), Validators.maxLength(10),
                    Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]],
            MobileNoAlt: [this.objSignupModel.MobileNoAlt, [Validators.minLength(10), Validators.maxLength(10)]],
            EmailId: [this.objSignupModel.EmailId,
                [Validators.required,
                    // tslint:disable-next-line:max-line-length
                    Validators.pattern(/^(([^<>\-()\~|`\#\=\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,4}))$/)]],
            Password: [this.objSignupModel.Password, [Validators.minLength(8), Validators.maxLength(10)]],
            ConfirmPassword: [this.objSignupModel.ConfirmPassword, [Validators.minLength(8), Validators.maxLength(10)]],
        }, {
            validators: [MustMatch('Password', 'ConfirmPassword'), MustNotMatch('MobileNo', 'MobileNoAlt')],
        });
    }
    getmyprofileDetails() {
        const Customer = JSON.parse(localStorage.getItem('user'));
        const objParams = {
            CustomerId: Customer.CustomerId
        };
        // this.loading = true;
        //  this.globalService.spinner.show();
        const subscription = this.myprofileService.getcustomerDetails(objParams)
            .subscribe((objResp) => {
            if (objResp && objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                this.objSignupModel = objResp.data;
                // this.Customer = objResp.data;
                this.onBuildForm();
            }
        }, error => {
        }, () => {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }).add(() => {
            this.globalService.spinner.hide();
            subscription.unsubscribe();
        });
    }
    // mobile() {
    //   const MobileNo = this.signupForm.get('MobileNo').value;
    //   const MobileNoAlt = this.signupForm.get('MobileNoAlt').value;
    //   if (MobileNo === MobileNoAlt &&
    //     this.signupForm.get('MobileNoAlt').valid &&
    //     this.signupForm.get('MobileNo').valid) {
    //     this.signupForm.get('MobileNoAlt').setErrors({
    //       sameMobileNo: true
    //     });
    //   }
    // }
    onSave() {
        this.globalService.markAsTouched(this.signupForm.controls);
        console.log('this.signupForm ---->', this.signupForm);
        const Customer = JSON.parse(localStorage.getItem('user'));
        // CustomerId: Customer.CustomerId;
        const Business = JSON.parse(localStorage.getItem('user'));
        if (this.signupForm.valid) {
            const objParams = this.signupForm.value;
            objParams['CustomerId'] = Business.CustomerId;
            objParams['UpdatedByUserId'] = Business.CustomerId;
            if (objParams['Password']) {
                delete objParams['ConfirmPassword'];
            }
            else {
                delete objParams['Password'];
                delete objParams['ConfirmPassword'];
            }
            const signupForm = this.globalService.getCurrentUser();
            objParams['VerifiedByUserId'] = signupForm['UserId'];
            this.globalService.spinner.show();
            const subscription = this.myprofileService.updatecustomer(objParams)
                .subscribe((objResp) => {
                if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    swal.fire('Update profile!', objResp.message, 'success');
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                    swal.fire(objResp.message, 'error');
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                    swal.fire(objResp.message, 'error');
                }
                subscription.unsubscribe();
            }, error => {
                console.log('error', error);
                swal.fire('Error', error, 'error');
                subscription.unsubscribe();
            }).add(() => {
                this.globalService.spinner.hide();
                subscription.unsubscribe();
            });
        }
    }
};
MyProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-my-profile',
        templateUrl: './my-profile.component.html',
        styleUrls: ['./my-profile.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        GlobalService,
        Router,
        MyProfileService,
        MatDialog,
        NgxSpinnerService])
], MyProfileComponent);
export { MyProfileComponent };
//# sourceMappingURL=my-profile.component.js.map