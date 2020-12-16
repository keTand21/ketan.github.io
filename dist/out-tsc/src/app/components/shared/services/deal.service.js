import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpCommonService } from '../services/http-common.service';
let DealService = class DealService {
    constructor(httpCommonService) {
        this.httpCommonService = httpCommonService;
    }
    getDeals(objParams) {
        return this.httpCommonService.post('deal/get-deal-list-for-frontend', objParams);
    }
    addNewDeals(objParams) {
        return this.httpCommonService.post('deal/add-deal', objParams);
    }
    updateDeals(objParams) {
        return this.httpCommonService.put('deal/update-deal', objParams);
    }
    getDealsDetails(objParams) {
        return this.httpCommonService.post('deal/get-deal-details', objParams);
    }
    deleteDeals(objParams) {
        return this.httpCommonService.delete('deal/delete-deal', objParams);
    }
    searchProducts(objParams) {
        return this.httpCommonService.post('product/search-products', objParams);
    }
    getCompanyList(objParams) {
        return this.httpCommonService.post('company/get-company-list', objParams);
    }
    relaunchDeal(objParams) {
        return this.httpCommonService.post('deal/relaunch-deal', objParams);
    }
    deleteDealImageWeb(objParams) {
        return this.httpCommonService.post('deal/remove-imageweb', objParams);
    }
    deleteDealImageMobile(objParams) {
        return this.httpCommonService.post('deal/remove-imagemobile', objParams);
    }
};
DealService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpCommonService])
], DealService);
export { DealService };
//# sourceMappingURL=deal.service.js.map