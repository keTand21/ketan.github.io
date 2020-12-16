import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Constants } from '../../shared/services/global.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Router } from '@angular/router';
import { BusinessService } from '../../shared/services/business.service';
import swal from 'sweetalert2';
import { Pagination } from '../../shared/services/global.service';
import { AddBusinessComponent } from '../business/add-business/add-business.component';
import { BusinessModel } from '../business/business.model';
import { MatPaginator, MatDialog, MatSort } from '@angular/material';
import { GlobalService } from '../../shared/services/global.service';
import * as moment from 'moment';
let BusinessComponent = class BusinessComponent {
    constructor(productsService, businessService, fb, router, dialog, globalService) {
        this.productsService = productsService;
        this.businessService = businessService;
        this.fb = fb;
        this.router = router;
        this.dialog = dialog;
        this.globalService = globalService;
        this.searchField = '';
        this.objConstants = Constants;
        this.arrMyBusiness = [];
        this.control = new FormControl('');
        this.pagination = Pagination;
        this.selectedDateColumn = 'CreatedOn';
        this.arrDateFilters = [
            { columnName: 'ValidFromValidTill', displayValue: 'Valid From - Valid Till' },
            { columnName: 'CreatedOn', displayValue: 'Created On' },
            { columnName: 'UpdatedOn', displayValue: 'Updated On' },
        ];
        this.arrStatus = [];
        this.arrSelectedStatus = [];
        this.selDateRange = {
            startDate: moment().subtract(Constants.SELECT_DEFAULT_LAST_DAYS, 'days'),
            endDate: moment()
        };
        this.dropdownSettings = {};
        this.maxDate = moment();
        this.minDate = moment('2019-11-01');
        this.ranges = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };
        this.objDateRangeSettings = {
            format: 'YYYY-MM-DD',
            applyLabel: 'Set Date',
            dateLimit: 2,
            customRangeLabel: 'Custom Range'
        };
        this.objPagination = {
            currentPage: 1,
            itemsPerPage: Pagination.pageSize,
            totalItems: Pagination.pageSize,
            allowPaginationAfter: Pagination.allowPaginationAfter,
            sortField: 'CreatedOn',
            sortOrder: 'DESC',
        };
        this.displayedColumns = ['SrNo', 'BusinessName', 'CustomerType', 'ValidFrom', 'ValidTill', 'Status', 'CreatedOn', 'UpdatedOn', 'Action'];
    }
    ngAfterViewInit() {}
    ngOnInit() {
        this.objUser = this.globalService.getCurrentUser();
        this.arrStatus = [
            { statusKey: 'APPROVED', statusValue: 'Approved' },
            { statusKey: 'PENDING', statusValue: 'Pending' },
            { statusKey: 'REJECTED', statusValue: 'Rejected' }
        ];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'statusKey',
            textField: 'statusValue',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: false
        };
        this.resetAndLoadBusinessList();
    }
    resetAndLoadBusinessList() {
        this.objPagination.currentPage = 1;
        this.loadBusinessList();
    }
    clearSearchField() {
        this.searchField = '';
    }
    onApplyFilters() {
        this.loadBusinessList();
    }
    loadBusinessList() {
        const arrSelectedStatus = this.arrSelectedStatus.map(objStatus => objStatus.statusKey);
        const objParams = {
            Pagination: {
                Page: this.objPagination.currentPage - 1,
                Limit: this.objPagination.allowPaginationAfter,
                SortField: this.objPagination.sortField,
                SortOrder: this.objPagination.sortOrder.toUpperCase(),
            },
            SearchString: this.control.value,
            DateRange: {
                StartDate: moment(this.selDateRange['startDate']).format('YYYY-MM-DD'),
                EndDate: moment(this.selDateRange['endDate']).format('YYYY-MM-DD')
            },
            ApplyDateRangeOnColumn: this.selectedDateColumn,
            Status: arrSelectedStatus.length === 3 ? [] : arrSelectedStatus,
            CustomerId: this.objUser.CustomerId,
        };
        console.log('objParams', objParams.DateRange);
        this.globalService.spinner.show();
        this.businessService.getBusinesssList(objParams)
            .subscribe((objResp) => {
                this.globalService.spinner.hide();
                if (objResp && 'data' in objResp && 'count' in objResp.data) {
                    this.arrMyBusiness = objResp.data['rows'];
                }
                if (this.objPagination.currentPage === 1) {
                    this.objPagination.totalItems = objResp.data.count;
                }
            }, (error) => {}).add(() => {
                this.globalService.spinner.hide();
            });
    }

    onPageChanged($event) {
        this.objPagination.currentPage = $event;
        this.loadBusinessList();
    }
    getBusinessDetails(objBusiness, openDialogInMode = 'edit') {
        if (openDialogInMode === 'edit' && objBusiness.Status !== 'PENDING' && objBusiness.Status !== 'APPROVED') {
            alert(`Please note that you can't update business details, if status changed is ${objBusiness.Status} `);
            openDialogInMode = 'view';
        }
        const objParams = {
            BusinessId: objBusiness.BusinessId,
            CustomerId: this.objUser.CustomerId
        };
        this.loadingBusinessId = objBusiness.BusinessId;
        this.globalService.spinner.show();
        const subscription = this.businessService.getBusinessDetails(objParams)
            .subscribe((objResp) => {
                this.globalService.spinner.hide();
                if (objResp && objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    const objBusinessDetails = Object.assign({}, objBusiness, objResp.data);
                    this.onEditBusiness(objBusinessDetails, openDialogInMode);
                }
            }, error => {
                alert(`Unable get business ${objBusiness.BusinessName} details, please try again`);
            }, () => {
                setTimeout(() => {
                    this.loadingBusinessId = undefined;
                }, 500);
                subscription.unsubscribe();
            }).add(() => {
                this.globalService.spinner.hide();
            });
    }
    onAddBusiness() {
        this.onEditBusiness(new BusinessModel());
    }
    onViewBusiness(objBusinessModel) {
        console.log('objBusinessModel', objBusinessModel);
        const dialogRef = this.dialog.open(AddBusinessComponent, { data: { objBusinessModel }, width: '600px', disableClose: true });
        dialogRef.afterClosed().subscribe(resp => {
            if (!resp) {
                return;
            }
            console.log('afterClosed resp', resp);
        });
    }
    onEditBusiness(objBusinessModel, openDialogInMode = 'edit') {
        console.log('objBusinessModel', objBusinessModel);
        const dialogRef = this.dialog.open(AddBusinessComponent, { data: { objBusinessModel, openDialogInMode }, width: '600px', disableClose: true });
        dialogRef.afterClosed().subscribe(resp => {
            this.resetAndLoadBusinessList();
            if (!resp) {
                return;
            } else {}
        });
    }
    deleteBusiness(objBusiness) {
        const objParams = {
            BusinessId: objBusiness,
            CustomerId: this.objUser.CustomerId,
        };
        const subscription = this.businessService.deleteBusiness(objParams)
            .subscribe((objResp) => {
                swal.fire('Deleted!', objResp.message, 'success');
            }, (error) => {}, () => {
                this.resetAndLoadBusinessList();
            }).add(() => subscription.unsubscribe());
    }
    setDefaultBusiness(BusinessId) {
        this.globalService.spinner.show();
        const unsubscribe = this.businessService.setDefaultBusiness({ BusinessId: BusinessId })
            .subscribe((objResp) => {
                this.globalService.spinner.hide();
                if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                    swal.fire('Business Id Set!', objResp.message, 'success');
                    const zxs = objResp;
                    console.log('sssds==>>', zxs);
                    console.log(zxs.data.BusinessId);
                    let existing = JSON.parse(localStorage.getItem('user'));
                    existing = existing ? existing : {};
                    existing.BusinessData['BusinessId'] = zxs.data.BusinessId;
                    existing.BusinessData['BusinessName'] = zxs.data.BusinessName;
                    existing.BusinessData['CustomerType'] = zxs.data.CustomerType;
                    existing.BusinessData['Status'] = zxs.data.Status;
                    localStorage.setItem('user', JSON.stringify(existing));
                    // this.dialogRef.close();
                } else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                    alert(objResp.message);
                } else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                    alert(objResp.message);
                }
            }, (error) => {
                alert('Faield to delete business.');
                console.log('deleteBusinessImage', error);
            }, () => {
                unsubscribe.unsubscribe();
            }).add(() => {
                this.globalService.spinner.hide();
            });
    }
};
tslib_1.__decorate([
    ViewChild(MatSort, { static: true }),
    tslib_1.__metadata("design:type", MatSort)
], BusinessComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], BusinessComponent.prototype, "paginator", void 0);
BusinessComponent = tslib_1.__decorate([
    Component({
        selector: 'app-business',
        templateUrl: './business.component.html',
        styleUrls: ['./business.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [ProductService,
        BusinessService,
        FormBuilder,
        Router,
        MatDialog, GlobalService
    ])
], BusinessComponent);
export { BusinessComponent };
const ELEMENT_DATA = [];
//# sourceMappingURL=business.component.js.map