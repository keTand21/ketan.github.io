import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpCommonService } from '../services/http-common.service';
let BusinessService = class BusinessService {
    constructor(http) {
        this.http = http;
    }
    // public getBusinessList(objParams = {}) {
    //   return this.http.post('business/get-business-list', objParams);
    // }
    getBusinesssList(objParams = {}) {
        return this.http.post('business/get-business-list-for-Web', objParams);
    }
    getBusinesssListHeader(objParams = {}) {
        return this.http.post('business/get-business-list-for-header', objParams);
    }
    checkBusinessExist(objParams) {
        return this.http.post('business/check-business-name-exist', objParams);
    }
    deleteBusiness(objParams) {
        return this.http.delete('business/delete-business', objParams);
    }
    getBusinessDetails(objParams) {
        return this.http.post('business/get-business-details', objParams);
    }
    onAddBusiness(objParams) {
        return this.http.post('business/add-business', objParams);
    }
    onUpdateBusiness(objParams) {
        return this.http.put('business/update-business', objParams);
    }
    gstBusinessImage(objParams) {
        return this.http.post('business/remove-gst-image', objParams);
    }
    deleteBusinessImage20(objParams) {
        return this.http.post('business/remove-licence20-image', objParams);
    }
    deleteBusinessImage21(objParams) {
        return this.http.post('business/remove-licence21-image', objParams);
    }
    setDefaultBusiness(objParams) {
        return this.http.post('business/set-deafult-business', objParams);
    }
};
BusinessService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpCommonService])
], BusinessService);
export { BusinessService };
//# sourceMappingURL=business.service.js.map