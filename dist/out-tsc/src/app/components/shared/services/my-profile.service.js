import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpCommonService } from '../services/http-common.service';
let MyProfileService = class MyProfileService {
    constructor(httpCommonService) {
        this.httpCommonService = httpCommonService;
    }
    getcustomer(objParams) {
        return this.httpCommonService.post('customer/get-customer-list', objParams);
    }
    ;
    // addNewcustomer(objParams: any) {
    //   return this.httpCommonService.post('customer/add-customer', objParams);
    // };
    updatecustomer(objParams) {
        return this.httpCommonService.put('customer/update-customer-for-web', objParams);
    }
    ;
    deletecustomer(objParams) {
        return this.httpCommonService.delete('customer/delete-customer', objParams);
    }
    ;
    getcustomerDetails(objParams) {
        return this.httpCommonService.post('customer/get-customer-details-for-web', objParams);
    }
};
MyProfileService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpCommonService])
], MyProfileService);
export { MyProfileService };
//# sourceMappingURL=my-profile.service.js.map