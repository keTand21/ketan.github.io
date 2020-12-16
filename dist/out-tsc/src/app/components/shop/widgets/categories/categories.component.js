import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Router } from '@angular/router';
import { ShowAlert, MessageType } from '../../../shared/services/global.service';
import { GlobalService, } from 'src/app/components/shared/services/global.service';
let CategoriesComponent = class CategoriesComponent {
    constructor(productService, router, globalService) {
        this.productService = productService;
        this.router = router;
        this.globalService = globalService;
        this.arrCategories = [];
    }
    ngOnInit() {
        const objParams = {
            ApplyDateRangeOnColumn: 'UpdatedOn',
            Pagination: {
                Page: 0,
                Limit: 50,
                SortOrder: 'DESC',
                SortField: 'UpdatedOn'
            }
        };
        this.globalService.spinner.show();
        this.productService.getCategoryList(objParams)
            .subscribe((objResp) => {
            if (objResp && 'data' in objResp &&
                'count' in objResp.data && objResp.data.count) {
                this.arrCategories = objResp.data['rows'];
            }
        }, (error) => {
            ShowAlert(MessageType.ERROR, '', error.message);
        }, () => {
        }).add(() => {
            this.globalService.spinner.hide();
        });
    }
    openDealsOfCategory(objCategory) {
        console.log("objCategory", objCategory);
        this.router.navigate(['/products/', objCategory.CategoryId]);
    }
};
CategoriesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-categories',
        templateUrl: './categories.component.html',
        styleUrls: ['./categories.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [ProductService,
        Router,
        GlobalService])
], CategoriesComponent);
export { CategoriesComponent };
//# sourceMappingURL=categories.component.js.map