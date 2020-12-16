import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SignupModel } from 'src/app/modals/signup.model';
import { HttpCommonService } from './http-common.service';
let AuthService = class AuthService {
    constructor(
    // private jwtHelper: JwtHelperService,
    httpCommonService) {
        this.httpCommonService = httpCommonService;
    }
    login(objReqBody) {
        return this.httpCommonService.post('auth/login-customer', objReqBody);
    }
    signup(objReqBody) {
        return this.httpCommonService.post('customer/add-customer', objReqBody);
    }
    otp(objReqBody) {
        return this.httpCommonService.post('customer/signup-validate-otp', objReqBody);
    }
    logout() {
        localStorage.clear();
        this.loggedIn = false;
        this.isAdmin = false;
        this.objUser = new SignupModel();
        this.router.navigate(['/']);
    }
    decodeUserFromToken(token) {
        // return this.jwtHelper.decodeToken(token);
    }
    allowedAccess() {
    }
    getCurrentUser() {
        let objUser = localStorage.getItem('user');
        if (objUser && objUser != null && typeof objUser === 'object') {
            objUser = JSON.parse(objUser);
            this.loggedIn = true;
        }
        else {
            this.logout();
        }
        // return (this.decodeUserFromToken(token));
    }
    setCurrentUser() {
        this.loggedIn = true;
    }
    forgotPassword(params) {
        return this.httpCommonService.post('api/forgot', params);
    }
    resetPassword(code, params) {
        return this.httpCommonService.post('api/reset/' + code + '', params);
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpCommonService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map