import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Constants } from '../../shared/services/global.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Pagination } from '../../shared/services/global.service';
import { MatPaginator, MatDialog, MatSort } from '@angular/material';
import { GlobalService } from '../../shared/services/global.service';
import * as moment from 'moment';
import { DealService } from '../../shared/services/deal.service';
import { DealModel } from '../deal/deal.model';
import { AddDealComponent } from '../deal/add-deal/add-deal.component';
let DealComponent = class DealComponent {
    constructor(fb, router, dialog, globalService, dealservice) {
        this.fb = fb;
        this.router = router;
        this.dialog = dialog;
        this.globalService = globalService;
        this.dealservice = dealservice;
        this.objConstants = Constants;
        this.searchField = '';
        this.selectedDateColumn = 'UpdatedOn';
        this.arrDateFilters = [
            { columnName: 'StartOn-EndOn', displayValue: 'StartOn-EndOn' },
            { columnName: 'ProdMfgDate', displayValue: 'ProdMfgDate' },
            { columnName: 'ProdExpiryDate', displayValue: 'ProdExpiryDate' },
            { columnName: 'CreatedOn', displayValue: 'CreatedOn' },
            { columnName: 'UpdatedOn', displayValue: 'UpdatedOn' },
        ];
        this.arrStatuss = [];
        this.arrDataSource = [];
        this.arrSelectedStatus = [];
        this.selDateRange = {
            startDate: moment().subtract(Constants.SELECT_DEFAULT_LAST_DAYS, 'days'),
            endDate: moment()
        };
        this.dropdownList = [];
        this.dropdownSettings = {};
        this.maxDate = moment();
        this.minDate = moment('2019-11-01');
        this.singleSelection = [];
        this.control = new FormControl('');
        this.pagination = Pagination;
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
            applyLabel: 'Set',
            dateLimit: 2,
            customRangeLabel: 'Custom Range'
        };
        this.objPagination = {
            currentPage: 1,
            itemsPerPage: Pagination.pageSize,
            totalItems: Pagination.pageSize,
            allowPaginationAfter: Pagination.allowPaginationAfter,
            sortField: 'StartOn',
            sortOrder: 'DESC',
        };
        this.objCustomer = {};
        this.displayedColumns = ['StartOn', 'EndOn', 'Discount', 'Buy', 'Get', 'SearchCount',
            'Status', 'CreatedOn', 'UpdatedOn', 'Action'];
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
        this.objUser = this.globalService.getCurrentUser();
        this.arrStatuss = [
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
        this.resetAndLoadDealsList();
    }
    resetAndLoadDealsList() {
        this.objPagination.currentPage = 1;
        this.loadDealsList();
    }
    onApplyFilters() {
        this.loadDealsList();
    }
    loadDealsList() {
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
            CreatedByUserId: this.objUser.BusinessData.CustomerId,
            BusinessId: this.objUser.BusinessData.BusinessId
        };
        console.log('objParams', objParams.DateRange);
        this.globalService.spinner.show();
        this.dealservice.getDeals(objParams)
            .subscribe((objResp) => {
            this.globalService.spinner.hide();
            if (objResp && 'data' in objResp && 'count' in objResp.data) {
                this.arrDataSource = objResp.data['rows'];
            }
            if (this.objPagination.currentPage === 1) {
                this.objPagination.totalItems = objResp.data.count;
            }
        }, (error) => {
        }).add(() => {
            this.globalService.spinner.hide();
        });
    }
    onPageChanged($event) {
        this.objPagination.currentPage = $event;
        this.loadDealsList();
    }
    submit() {
        console.log(this.form.value);
    }
    getDealsDetails(objDeal, openDialogInMode = 'edit') {
        if (openDialogInMode === 'edit' && objDeal.Status !== 'PENDING') {
            alert(`Please note that you can't update deals details, if status changed is ${objDeal.Status} `);
            openDialogInMode = 'view';
        }
        const objParams = {
            DealId: objDeal.DealId,
        };
        this.loadingDealsId = objDeal.DealId;
        const subscription = this.dealservice.getDealsDetails(objParams)
            .subscribe((objResp) => {
            if (objResp && objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                const objDealsDetails = Object.assign({}, objDeal, objResp.data);
                this.onEditDeals(objDealsDetails, openDialogInMode);
            }
        }, error => {
            alert(`Unable get deal ${objDeal.ProdTitle} details, please try again`);
        }, () => {
            setTimeout(() => {
                this.loadingDealsId = undefined;
            }, 500);
            subscription.unsubscribe();
        });
    }
    onViewBusiness(objDealModel) {
        console.log('objDealModel', objDealModel);
        const dialogRef = this.dialog.open(AddDealComponent, { data: { objDealModel }, width: '620px', disableClose: true });
        dialogRef.afterClosed().subscribe(resp => {
            if (!resp) {
                return;
            }
            console.log('afterClosed resp', resp);
        });
    }
    onAddEditDeals() {
        this.onEditDeals(new DealModel());
    }
    deleteDeals(objDeaals) {
        const objParams = {
            DealId: objDeaals,
            CustomerId: this.objUser.CustomerId,
        };
        const subscription = this.dealservice.deleteDeals(objParams)
            .subscribe((objResp) => {
            swal.fire('Deleted!', objResp.message, 'success');
        }, (error) => {
        }, () => {
            this.resetAndLoadDealsList();
        }).add(() => subscription.unsubscribe());
    }
    clearSearchField() {
        this.searchField = '';
    }
    onEditDeals(objDealModel, openDialogInMode = 'edit') {
        const dialogRef = this.dialog.open(AddDealComponent, { data: { objDealModel, openDialogInMode }, width: '600px', disableClose: true });
        dialogRef.afterClosed().subscribe(resp => {
            this.resetAndLoadDealsList();
            if (!resp) {
                return;
            }
            else {
            }
        });
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DealComponent.prototype, "childlist", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true }),
    tslib_1.__metadata("design:type", MatSort)
], DealComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], DealComponent.prototype, "paginator", void 0);
DealComponent = tslib_1.__decorate([
    Component({
        selector: 'app-deal',
        templateUrl: './deal.component.html',
        styleUrls: ['./deal.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        Router,
        MatDialog, GlobalService,
        DealService])
], DealComponent);
export { DealComponent };
const ELEMENT_DATA = [];
//# sourceMappingURL=deal.component.js.map