import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
// import { SlideUpDownAnimation } from '../app/shared/animation/collapse-animate';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/components/shared/services/auth.service';
import { ValidationMessages } from 'src/app/components/shared/validations/validation-messages';
import { GlobalService, ShowAlert, Constants, MessageType } from 'src/app/components/shared/services/global.service';
import { Router } from '@angular/router';
import { SignupModel } from 'src/app/modals/signup.model';
import { CustomValidator, MustMatch, MustNotMatch } from '../../shared/validations/custom.validator';
import swal from 'sweetalert2';
let LoginComponent = class LoginComponent {
    constructor(fb, globalService, router, authService) {
        this.fb = fb;
        this.globalService = globalService;
        this.router = router;
        this.authService = authService;
        this.objConstants = Constants;
        this.hide = true;
        this.loading = false;
        this.animationState = 'down';
        this.validationMessages = ValidationMessages.USER;
        this.encryptMode = true;
    }
    onLogin() {
        this.globalService.markAsTouched(this.loginForm.controls);
        if (this.loginForm.valid) {
            this.loading = true;
            this.globalService.spinner.show();
            const obsLogin = this.authService.login(this.loginForm.value)
                .subscribe((objResp) => {
                if (objResp.statusCode === 200) {
                    this.userData = objResp.data; // Setting up user data in userData var
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    let user = localStorage.getItem('user');
                    if (user && user !== null && user !== '') {
                        user = JSON.parse(user);
                        // console.log('user==>',user)
                        this.globalService.refreshMyAccountDropdown(user);
                        // this.change.emit();
                    }
                    this.router.navigate(['/']);
                }
                else {
                    ShowAlert(MessageType.ERROR, 'Failed to login', objResp.message);
                }
                this.loading = false;
            }, error => {
                this.loading = false;
                ShowAlert(MessageType.ERROR, 'Failed to login', error);
            }, () => {
                this.loading = false;
            }).add(() => {
                this.globalService.spinner.hide();
                obsLogin.unsubscribe();
            });
        }
    }
    ngOnInit() {
        localStorage.clear();
        this.objSignupModel = new SignupModel();
        this.onBuildForm();
    }
    onBuildForm() {
        this.loginForm = this.fb.group({
            MobileNo: [this.objSignupModel.MobileNo, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            Password: [this.objSignupModel.Password, [Validators.required, Validators.minLength(6)]],
        });
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
            Password: [this.objSignupModel.Password, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
            ConfirmPassword: [this.objSignupModel.ConfirmPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        }, {
            validators: [MustMatch('Password', 'ConfirmPassword'), MustNotMatch('MobileNo', 'MobileNoAlt')],
        });
    }
    onSignup() {
        this.globalService.markAsTouched(this.signupForm.controls);
        // console.log('this.signupForm ---->', this.signupForm);
        if (this.signupForm.valid) {
            this.globalService.spinner.show();
            const subscription = this.authService.signup(this.signupForm.value)
                .subscribe((objResp) => {
                if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    this.onOtpPopupOpen(objResp.data['otp']);
                    this.signupForm.disable();
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                    swal.fire(objResp.message, 'error');
                }
                else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                    swal.fire(objResp.message, 'error');
                }
            }, error => {
                console.log('error', error);
                swal.fire('Error', error, 'error');
                subscription.unsubscribe();
                this.loading = false;
            }).add(() => {
                this.globalService.spinner.hide();
                subscription.unsubscribe();
            });
        }
    }
    onOtpPopupOpen(otpTemp) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield swal.fire({
                title: 'Enter OTP which is sent on mobile',
                input: 'number',
                inputValue: otpTemp,
                showCancelButton: true,
                cancelButtonText: 'Close',
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        resolve();
                        if (!value || (typeof value === 'string' && value && value.trim().length !== 6)) {
                            resolve('Enter valid 6 digit otp');
                            return;
                        }
                        swal.showLoading();
                        swal.disableButtons();
                        const objParams = {
                            MobileNo: this.signupForm.get('MobileNo').value.toString(),
                            Otp: +value
                        };
                        this.globalService.spinner.show();
                        const subscription = this.authService.otp(objParams)
                            .subscribe((objResp) => {
                            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                                ShowAlert(MessageType.SUCCESS, '', objResp.message);
                                this.loginForm.get('MobileNo').setValue(this.signupForm.get('MobileNo').value);
                                this.objSignupModel = new SignupModel();
                                this.signupForm.enable();
                                this.signupForm.reset();
                            }
                            else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                                ShowAlert(MessageType.ERROR, '', objResp.message);
                            }
                            else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                                ShowAlert(MessageType.ERROR, '', objResp.message);
                            }
                            swal.hideLoading();
                            swal.enableButtons();
                            resolve();
                        }, error => {
                            swal.hideLoading();
                            swal.enableButtons();
                            subscription.unsubscribe();
                            resolve(error);
                        }, () => {
                            swal.hideLoading();
                            swal.enableButtons();
                        }).add(() => {
                            this.globalService.spinner.hide();
                            subscription.unsubscribe();
                        });
                    });
                }
            });
        });
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        GlobalService,
        Router,
        AuthService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map