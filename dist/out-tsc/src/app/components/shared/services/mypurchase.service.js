import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpCommonService } from './http-common.service';
let MypurchaseService = class MypurchaseService {
    constructor(router, jwtHelper, httpCommonService) {
        this.router = router;
        this.jwtHelper = jwtHelper;
        this.httpCommonService = httpCommonService;
    }
    getOrdersList(objParams) {
        return this.httpCommonService.post('order/get-order-list-for-web', objParams);
    }
    getOrderDetails(objParams) {
        return this.httpCommonService.post('order/get-order-details', objParams);
    }
    getShipper(objParams) {
        return this.httpCommonService.get('shipper/get-shipper-list', objParams);
    }
    deleteOrder(objParams) {
        return this.httpCommonService.delete('order/delete-order', objParams);
    }
};
MypurchaseService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        JwtHelperService,
        HttpCommonService])
], MypurchaseService);
export { MypurchaseService };
//# sourceMappingURL=mypurchase.service.js.map