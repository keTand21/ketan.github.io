import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { map } from 'rxjs/operators';
import { GlobalService, Pagination } from '../../shared/services/global.service';
let HomeComponent = class HomeComponent {
    constructor(productService, globalService, objGlobalService) {
        this.productService = productService;
        this.globalService = globalService;
        this.objGlobalService = objGlobalService;
        this.objPagination = {
            currentPage: 1,
            // itemsPerPage: Pagination.pageSize,
            itemsPerPage: 5,
            totalItems: Pagination.pageSize,
            allowPaginationAfter: Pagination.allowPaginationAfter,
            sortOrder: undefined,
            sortField: undefined,
        };
        this.slides = [
            // { title: 'Huge sale', subtitle: 'Up to 70%', image: 'assets/images/carousel/banner1.jpg' },
            // { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/2.jpg' },
            // { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/3.jpg' },
            // { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/4.jpg' },
            // { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/5.jpg' }
        ];
    }
    ngOnInit() {
        this.objUser = this.objGlobalService.getCurrentUser();
        if (this.objUser === undefined || this.objUser === null) {
            this.objCustomer = null;

        } else {
            this.objCustomer = this.objUser.CustomerId
        }
        this.getBaneerList();
        const objParams = {
            Pagination: {
                Page: this.objPagination.currentPage - 1,
                Limit: this.objPagination.itemsPerPage,
                SortOrder: this.objPagination.sortOrder,
                SortField: this.objPagination.sortField,
            },
            CustomerId: this.objCustomer,
        };
        this.globalService.spinner.show();
        this.productService.getProductsDashboard(objParams)
            .subscribe((objResp) => {
                if ('data' in objResp && 'FeaturedDeal' in objResp.data &&
                    Array.isArray(objResp.data.FeaturedDeal) && objResp.data.FeaturedDeal.length) {
                    this.FeaturedDeal = objResp.data.FeaturedDeal;
                    this.LastestDeal = objResp.data.LastestDeal;
                    this.products = objResp.data.PopularDeal;
                }
            }).add(() => {
                this.globalService.spinner.hide();
            });
    }
    getBaneerList() {
        const objParams = {
            Pagination: {
                ApplyDateRangeOnColumn: 'CreatedOn',
                Page: this.objPagination.currentPage - 1,
                Limit: Pagination.pageSize,
                SortOrder: 'DESC',
                SortField: 'UpdatedOn',
            },
        };
        this.globalService.spinner.show();
        const subscription = this.productService.getProductsDashboard(objParams)
            .pipe(map((objResp) => {
                let arrResp = [];
                if ('data' in objResp && 'BannerImage' in objResp.data &&
                    Array.isArray(objResp.data.BannerImage) && objResp.data.BannerImage.length) {
                    arrResp = objResp.data.BannerImage.filter((objDeal) => objDeal.BannerImage);
                    console.log(arrResp);
                }
                return arrResp;
            }))
            .subscribe((arrResp) => this.slides = arrResp)
            .add(() => {
                subscription.unsubscribe();
                this.globalService.spinner.hide();
            });
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [ProductService,
        GlobalService,
        GlobalService])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map