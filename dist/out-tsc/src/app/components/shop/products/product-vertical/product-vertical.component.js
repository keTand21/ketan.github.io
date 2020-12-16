import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Constants } from 'src/app/components/shared/services/global.service';
import { GlobalService, Pagination } from 'src/app/components/shared/services/global.service';
let ProductVerticalComponent = class ProductVerticalComponent {
    constructor(productService, globalService) {
        this.productService = productService;
        this.globalService = globalService;
        this.objConstants = Constants;
        this.objPagination = {
            currentPage: 1,
            itemsPerPage: Pagination.pageSize,
            totalItems: Pagination.pageSize,
            allowPaginationAfter: Pagination.allowPaginationAfter,
            sortField: 'CreatedOn',
            sortOrder: 'DESC',
        };
    }
    ngOnInit() {
        const objParams = {
            //IsFeatured:1
            CategoryId: this.globalService.getCurrentUser,
            Pagination: {
                Page: this.objPagination.currentPage - 1,
                Limit: this.objPagination.allowPaginationAfter,
                SortField: this.objPagination.sortField,
                SortOrder: this.objPagination.sortOrder.toUpperCase(),
            },
        };
        this.globalService.spinner.show();
        this.productService.getProductsDashboard(objParams)
            .subscribe((objResp) => {
            if ('data' in objResp && 'PopularDeal' in objResp.data &&
                Array.isArray(objResp.data.PopularDeal) && objResp.data.PopularDeal.length) {
                this.products = objResp.data.PopularDeal;
                
            }
        }).add(() => {
            this.globalService.spinner.hide();
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], ProductVerticalComponent.prototype, "products", void 0);
ProductVerticalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-vertical',
        templateUrl: './product-vertical.component.html',
        styleUrls: ['./product-vertical.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [ProductService, GlobalService])
], ProductVerticalComponent);
export { ProductVerticalComponent };
//# sourceMappingURL=product-vertical.component.js.map