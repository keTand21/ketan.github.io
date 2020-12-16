import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants, GlobalService, ShowAlert, MessageType, Pagination } from '../services/global.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Router } from '@angular/router';
import { BusinessService } from '../services/business.service';
let HeaderComponent = class HeaderComponent {
    constructor(globalService, productService, businessService, fb, router) {
        this.globalService = globalService;
        this.productService = productService;
        this.businessService = businessService;
        this.fb = fb;
        this.router = router;
        this.change = new EventEmitter();
        this.arrMyBusiness = [];
        this.arrMyAccount = [];
        this.count = 1;
        this.searchString = '';
        this.dropdownSettings = {};
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
        this.headerForm = this.fb.group({
            SearchString: ['', [Validators.required]],
            Business: [{}]
        });
        this.globalService.spinner.show();
        this.globalService.obsMyAccount.subscribe(objUser => {
            this.refreshMyAccountDropdown();
        }).add(() => {
            this.globalService.spinner.hide();
        });
        this.dropdownSettings = {
            singleSelection: true,
            idField: 'BusinessId',
            selectAllText: false,
            unSelectAllText: '',
            textField: 'BusinessName',
            allowSearchFilter: true,
            itemsShowLimit: 1,
            closeDropDownOnSelection: true
        };
    }
    onItemSelect(BusinessId) {
        this.globalService.spinner.show();
        const unsubscribe = this.businessService.setDefaultBusiness({ BusinessId: BusinessId.BusinessId })
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                console.log('businessis======>', objResp.data);
                this.objCustomer.BusinessData['BusinessId'] = objResp.data.BusinessId;
                this.objCustomer.BusinessData['BusinessName'] = objResp.data.BusinessName;
                this.objCustomer.BusinessData['CustomerType'] = objResp.data.CustomerType;
                this.objCustomer.BusinessData['Status'] = objResp.data.Status;
                this.globalService.setCurrentUser(this.objCustomer);
            }
            else {
                ShowAlert(MessageType.ERROR, 'Unable to set default business', objResp.message);
            }
        }, (error) => {
            ShowAlert(MessageType.ERROR, 'Unable to set default business', error);
        }, () => {
        }).add(() => {
            this.globalService.spinner.hide();
            unsubscribe.unsubscribe();
        });
    }
    refreshMyAccountDropdown() {
        this.objCustomer = this.globalService.getCurrentUser();
        if (this.objCustomer) {
            this.arrMyAccount = [
                { name: 'My Profile', routeLink: '/pages/myprofile' },
                // { name: 'My Search', routeLink: '' },
                { name: 'Orders', routeLink: '/pages/mypurchase' },
                // { name: 'Settings', routeLink: '' },
                { name: 'My Business', routeLink: '/pages/business' },
                { name: 'My Deals', routeLink: '/pages/deal' },
                { name: 'Help & Support', routeLink: 'pages/contact' },
                { name: 'Logout', routeLink: 'logout' },
            ];
            this.businessList();
        }
        else {
            this.arrMyAccount = [
                { name: 'Login/Signup', routeLink: '/pages/login' },
                { name: 'Help & Support', routeLink: 'pages/contact' },
            ];
            this.arrMyBusiness = [];
            this.headerForm.get('Business').setValue([]);
        }
    }
    goToCart() {
        this.objCustomer = this.globalService.getCurrentUser();
        if (this.objCustomer) {
            this.router.navigate(['/pages/cart']);
        }
        else {
            this.router.navigate(['/pages/login']);
        }
    }
    businessList() {
        const objParams = {
            // Pagination: {
            //   Page: this.objPagination.currentPage - 1,
            //   Limit: this.objPagination.allowPaginationAfter,
            //   SortField: this.objPagination.sortField,
            //   SortOrder: this.objPagination.sortOrder.toUpperCase(),
            // },
            CustomerId: this.objCustomer.CustomerId,
        };
        this.globalService.spinner.show();
        this.businessService.getBusinesssListHeader(objParams)
            .subscribe((objResp) => {
            if (objResp && 'data' in objResp &&
                'count' in objResp.data && objResp.data.count) {
                this.arrMyBusiness = objResp.data['rows'];
                this.headerForm.get('Business').setValue([this.objCustomer.BusinessData]);
            }
        }, (error) => {
        }, () => {
        }).add(() => {
            this.globalService.spinner.hide();
        });
    }
    openDealsOfBusiness(objBusiness) {
        this.router.navigate(['/products/', objBusiness.BusinessId]);
    }
    openPage(objAcc) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (objAcc.routeLink === 'logout') {
                const isConfirm = yield ShowAlert(MessageType.CONFIRM, 'Logout', 'Are you sure want to logout?', 'Logout');
                if (isConfirm) {
                    this.globalService.logout();
                }
            }
            else if (objAcc.routeLink) {
                this.router.navigate([objAcc.routeLink]);
            }
        });
    }
    displaydetails() {
        // this.headerForm.get('SearchString').value
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], HeaderComponent.prototype, "change", void 0);
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [GlobalService,
        ProductService,
        BusinessService,
        FormBuilder,
        Router])
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map