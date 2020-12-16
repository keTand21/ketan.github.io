import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatSort } from '@angular/material';
import { MypurchaseService } from 'src/app/components/shared/services/mypurchase.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService, MessageType, Pagination, Constants, ShowAlert } from 'src/app/components/shared/services/global.service';
import * as moment from 'moment';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MypurchasedetailsComponent } from '../mypurchase/mypurchasedetails/mypurchasedetails.component';
let MypurchaseComponent = class MypurchaseComponent {
    constructor(productsService, MypurchaseService, fb, router, dialog, globalService) {
        this.productsService = productsService;
        this.MypurchaseService = MypurchaseService;
        this.fb = fb;
        this.router = router;
        this.dialog = dialog;
        this.globalService = globalService;
        this.arrOrderList = [];
        this.orderdetails = [];
        this.objConstants = Constants;
        this.pagination = Pagination;
        this.dropdownSettings = {};
        this.arrOrderStatus = [];
        this.arrSelectedOrderStatus = [];
        this.arrTransactionStatus = [];
        this.arrSelectedTransationStatus = [];
        this.selDateRange = {
            startDate: moment().subtract(Constants.SELECT_DEFAULT_LAST_DAYS, 'days'),
            endDate: moment()
        };
        this.dropdownList = [];
        this.maxDate = moment();
        this.minDate = moment('2019-11-01');
        this.singleSelection = [];
        this.objDateRangeSettings = {
            format: 'YYYY-MM-DD',
            applyLabel: 'Set',
            dateLimit: 2,
            customRangeLabel: 'Custom Range'
        };
        this.ranges = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };
        this.objPagination = {
            currentPage: 1,
            itemsPerPage: Pagination.pageSize,
            totalItems: Pagination.pageSize,
            allowPaginationAfter: Pagination.allowPaginationAfter,
            sortField: 'OrderDate',
            sortOrder: 'DESC',
        };
        this.displayedColumns = ['SrNo', 'Quantity', 'GrandTotal', 'OrderDate', 'Status', 'Action'];
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
        this.objUser = this.globalService.getCurrentUser();
        this.arrOrderStatus = [
            { statusKey: 'PENDING', statusValue: 'PENDING' },
            { statusKey: 'ACCEPTED', statusValue: 'ACCEPTED' },
            { statusKey: 'COMPLETED', statusValue: 'COMPLETED' },
            { statusKey: 'CANCELLED', statusValue: 'CANCELLED' },
            { statusKey: 'DELETED', statusValue: 'DELETED' }
        ];
        this.arrTransactionStatus = [
            { statusKey: 'InTRANSITE', statusValue: 'InTRANSITE' },
            { statusKey: 'PENDING', statusValue: 'PENDING' },
            { statusKey: 'SCHEDULED', statusValue: 'SCHEDULED' },
            { statusKey: 'DISPATCHED', statusValue: 'DISPATCHED' },
            { statusKey: 'CANCELLED', statusValue: 'CANCELLED' }
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
        this.resetAndLoadMypurchaseList();
    }
    resetAndLoadMypurchaseList() {
        this.objPagination.currentPage = 1;
        this.getOrdersList();
    }
    // GetOrderList
    getOrdersList() {
        const arrSelectedOrderStatus = this.arrSelectedOrderStatus.map(objStatus => objStatus.statusKey);
        const arrSelectedTransationStatus = this.arrSelectedTransationStatus.map(objStatus => objStatus.statusKey);
        const objParams = {
            Pagination: {
                Page: this.objPagination.currentPage - 1,
                Limit: this.objPagination.allowPaginationAfter,
                SortField: this.objPagination.sortField,
                SortOrder: this.objPagination.sortOrder.toUpperCase(),
            },
            DateRange: {
                StartDate: moment(this.selDateRange['startDate']).format('YYYY-MM-DD'),
                EndDate: moment(this.selDateRange['endDate']).format('YYYY-MM-DD')
            },
            ApplyDateRangeOnColumn: 'OrderDate',
            OrderStatus: arrSelectedOrderStatus.length === 5 ? [] : arrSelectedOrderStatus,
            TransactionStatus: arrSelectedTransationStatus.length === 5 ? [] : arrSelectedTransationStatus,
            CustomerId: this.objUser.BusinessData.CustomerId,
            BusinessId: this.objUser.BusinessData.BusinessId
        };
        this.globalService.spinner.show();
        this.MypurchaseService.getOrdersList(objParams)
            .subscribe((objResp) => {
            this.globalService.spinner.hide();
            if (objResp && 'data' in objResp && 'count' in objResp.data) {
                this.arrOrderList = objResp.data['rows'];
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
        this.getOrdersList();
    }
    deleteOrder(OrderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const subscription = this.MypurchaseService.deleteOrder({ OrderId: OrderId })
                .subscribe((objResp) => {
                ShowAlert(MessageType.SUCCESS, 'Order deleted', objResp.message);
            }, (error) => {
                ShowAlert(MessageType.ERROR, 'Error', error);
            }).add(() => subscription.unsubscribe());
            this.resetAndLoadMypurchaseList();
        });
    }
    getMyperchaseDetails(objMypurchase, openDialogInMode = 'edit') {
        if (openDialogInMode === 'edit' && objMypurchase.OrderStatus !== 'APPROVED') {
            alert(`Please note that you can't update business details, if status changed is ${objMypurchase.OrderStatus} `);
            openDialogInMode = 'view';
        }
        const objParams = {
            OrderId: objMypurchase.OrderId
        };
        this.loadingOrderId = objMypurchase.OrderId;
        this.globalService.spinner.show();
        const subscription = this.MypurchaseService.getOrderDetails(objParams)
            .subscribe((objResp) => {
            this.globalService.spinner.hide();
            if (objResp && objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                const objMypurchaseDetails = Object.assign({}, objMypurchase, objResp.data);
                this.onMypurchasedetails(objMypurchaseDetails, openDialogInMode);
            }
        }, error => {
            alert(`Unable get business ${objMypurchase.OrderDate} details, please try again`);
        }, () => {
            setTimeout(() => {
                this.loadingOrderId = undefined;
            }, 500);
            subscription.unsubscribe();
        }).add(() => {
            this.globalService.spinner.hide();
        });
    }
    onMypurchasedetails(objMypurchaseModel, openDialogInMode = 'edit') {
        console.log('objMypurchaseModel', objMypurchaseModel);
        const dialogRef = this.dialog.open(MypurchasedetailsComponent, { data: { objMypurchaseModel, openDialogInMode }, width: '600px', disableClose: true });
        dialogRef.afterClosed().subscribe(resp => {
            if (!resp) {
                return;
            }
            console.log('afterClosed resp', resp);
        });
    }
    onViewMyparches(objMypurchaseModel, openDialogInMode = 'view') {
        console.log('objMypurchaseModel', objMypurchaseModel);
        const dialogRef = this.dialog.open(MypurchasedetailsComponent, { data: { objMypurchaseModel }, width: '620px', disableClose: true });
        dialogRef.afterClosed().subscribe(resp => {
            if (!resp) {
                return;
            }
            console.log('afterClosed resp', resp);
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatSort, { static: true }),
    tslib_1.__metadata("design:type", MatSort)
], MypurchaseComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], MypurchaseComponent.prototype, "paginator", void 0);
MypurchaseComponent = tslib_1.__decorate([
    Component({
        selector: 'app-mypurchase',
        templateUrl: './mypurchase.component.html',
        styleUrls: ['./mypurchase.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [ProductService,
        MypurchaseService,
        FormBuilder,
        Router,
        MatDialog, GlobalService])
], MypurchaseComponent);
export { MypurchaseComponent };
const ELEMENT_DATA = [];
//# sourceMappingURL=mypurchase.component.js.map