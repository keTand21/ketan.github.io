import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpCommonService } from './http-common.service';
let OrderdetailsService = class OrderdetailsService {
    constructor(httpCommonService) {
        this.httpCommonService = httpCommonService;
    }
    getOrderDetails(objParams) {
        return this.httpCommonService.post('order/get-order-details', objParams);
    }
};
OrderdetailsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpCommonService])
], OrderdetailsService);
export { OrderdetailsService };
//# sourceMappingURL=orderdetails.service.js.map