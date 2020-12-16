import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/components/shared/services/global.service';
import { GlobalService } from 'src/app/components/shared/services/global.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
let ProductLeftSidebarComponent = class ProductLeftSidebarComponent {
    constructor(productService, route, globalService) {
        this.productService = productService;
        this.route = route;
        this.globalService = globalService;
        this.sidenavOpen = true;
        this.sortByOrder = ''; // sorting
        this.tagsFilters = [];
        this.viewType = 'grid';
        // tslint:disable-next-line:no-inferrable-types
        this.viewCol = 33.3;
        this.colorFilters = [];
        this.items = [];
        this.arrProducts = [];
        this.tags = [];
        this.colors = [];
        this.objPagination = {
            currentPage: 1,
            itemsPerPage: Pagination.pageSize,
            totalItems: Pagination.pageSize,
            allowPaginationAfter: Pagination.allowPaginationAfter,
            sortOrder: undefined,
            sortField: undefined,
        };
        this.route.params.subscribe((params) => {
            if (+params['CategoryId'] > 0) {
                this.categoryId = +params['CategoryId'];
            }
            this.getProducts();
        });
    }
    ngOnInit() {
        if (localStorage.getItem('user') !== null) {
            console.log('should not be logged'); //din't work, it's getting logged in the console
        }
    }
    getProducts() {
        const CategoryId = this.globalService.getCurrentUser();
        console.log('CuctmorID=======>', CategoryId);
        if (CategoryId === undefined || CategoryId === null) {
            this.objCustomer = null;
        }
        else {
            this.objCustomer = CategoryId.CustomerId;
        }
        const objParams = {
            //  CustomerId: CategoryId.CustomerId,
            CustomerId: this.objCustomer,
            CategoryId: this.categoryId,
            Pagination: {
                Page: this.objPagination.currentPage - 1,
                Limit: this.objPagination.itemsPerPage,
                SortOrder: this.objPagination.sortOrder,
                SortField: this.objPagination.sortField,
            },
        };
        this.globalService.spinner.show();
        this.productService.getProducts(objParams)
            .subscribe((objResp) => {
            if ('data' in objResp && 'rows' in objResp.data &&
                Array.isArray(objResp.data.rows)) {
                this.arrProducts = objResp.data.rows;
                console.log('deallist==>', this.arrProducts);
            }
            if (this.objPagination.currentPage === 1) {
                this.objPagination.totalItems = objResp.data.count;
            }
        }).add(() => {
            this.globalService.spinner.hide();
        });
    }
    changeViewType(viewType, viewCol) {
        this.viewType = viewType;
        this.viewCol = viewCol;
    }
    // Animation Effect fadeIn
    fadeIn() {
        this.animation = 'fadeIn';
    }
    // Animation Effect fadeOut
    fadeOut() {
        this.animation = 'fadeOut';
    }
    // Update tags filter
    updateTagFilters(tags) {
        this.tagsFilters = tags;
        this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
    }
    // sorting type ASC / DESC / A-Z / Z-A etc.
    onChangeSorting(val) {
        this.sortByOrder = val;
        this.animation === 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
    }
    onPageChanged($event) {
        this.objPagination.currentPage = $event;
        this.getProducts();
    }
    // Update price filter
    updatePriceFilters(price) {
    }
};
ProductLeftSidebarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-left-sidebar',
        templateUrl: './product-left-sidebar.component.html',
        styleUrls: ['./product-left-sidebar.component.sass'],
        animations: [
            trigger("Animation", [
                state('in', style({ height: '*' })),
                transition('* => void', [
                    style({ height: '*' }),
                    animate(250, style({ height: 0 }))
                ])
            ])
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [ProductService, ActivatedRoute, GlobalService])
], ProductLeftSidebarComponent);
export { ProductLeftSidebarComponent };
//# sourceMappingURL=product-left-sidebar.component.js.map