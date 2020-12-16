import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { CartService } from '../../shared/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { Constants, GlobalService, ShowAlert, MessageType } from '../../shared/services/global.service';
import { Router } from '@angular/router';
import { Pagination } from '../../shared/services/global.service';
import { MatDialog } from '@angular/material';
import swal from 'sweetalert2';
import { ProductService } from 'src/app/components/shared/services/product.service';
let WishlistComponent = class WishlistComponent {
    constructor(productsService, wishlistService, dialog, cartService, globalService, router) {
        this.productsService = productsService;
        this.wishlistService = wishlistService;
        this.dialog = dialog;
        this.cartService = cartService;
        this.globalService = globalService;
        this.router = router;
        this.product = of([]);
        this.wishlistItems = [];
        this.arrCategories = [];
        this.quantity = [];
        this.Mrp = [];
        this.objConstants = Constants;
        this.pagination = Pagination;
        // public objCardData: any;
        this.objPagination = {
            currentPage: 1,
            itemsPerPage: Pagination.pageSize,
            totalItems: Pagination.pageSize,
            allowPaginationAfter: Pagination.allowPaginationAfter,
            // sortField: 'OrderDate',
            sortOrder: 'DESC',
        };
    }
    // displayedColumns: string[] = ['StartOn', 'EndOn', 'Discount', 'Buy', 'Get', 'SearchCount',
    //   'Status', 'CreatedOn', 'UpdatedOn', 'Action'];
    // @ViewChild(MatSort, { static: true }) sort: MatSort;
    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    ngOnInit() {
        this.objUser = this.globalService.getCurrentUser();
        this.resetAndLoadWishlistsList();
    }
    resetAndLoadWishlistsList() {
        this.objPagination.currentPage = 1;
        this.getItems();
    }
    getItems() {
        // let Customer = this.globalService.getCurrentUser();
        //  console.log("CustomerId", Customer.CustomerId);
        // this.CustomerId = Customer.CustomerId;
        if (this.objUser) {
            const objParams = {
                CustomerId: this.objUser.CustomerId,
                Pagination: {
                    Page: this.objPagination.currentPage - 1,
                    Limit: this.objPagination.allowPaginationAfter,
                    //SortField: this.objPagination.sortField,
                    SortOrder: this.objPagination.sortOrder.toUpperCase(),
                },
            };
            if (this.CustomerId) {
                this.globalService.spinner.show();
                this.wishlistService.getItems(objParams)
                    .subscribe((objResp) => {
                    if (objResp && 'data' in objResp && 'count' in objResp.data) {
                        this.arrCategories = objResp.data['rows'];
                        const objCardData = objResp.data.rows;
                        console.log('wishlist', objCardData);
                    }
                    if (this.objPagination.currentPage === 1) {
                        this.objPagination.totalItems = objResp.data.count;
                    }
                }, (error) => {
                }, () => {
                }).add(() => {
                    this.globalService.spinner.hide();
                });
            }
        }
        else {
            this.globalService.loginToContinue();
        }
        // else {
        //   ShowAlert(MessageType.ERROR, 'You should login or signup to add in a wishlist');
        //   this.router.navigate(['/pages/login']);
        // }
    }
    // Remove from wishlist
    removeItem(item) {
        let Customer = JSON.parse(localStorage.getItem('user'));
        this.CustomerId = Customer.CustomerId;
        const objParams = {
            WishId: item,
            CustomerId: this.CustomerId
        };
        this.globalService.spinner.show();
        const unsubscribe = this.wishlistService.removeItem(objParams)
            .subscribe((objResp) => {
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                ShowAlert(MessageType.SUCCESS, '', objResp.message);
                this.getItems();
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                ShowAlert(MessageType.ERROR, '', objResp.message);
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                ShowAlert(MessageType.ERROR, '', objResp.message);
            }
        }, (error) => {
            ShowAlert(MessageType.ERROR, '', error.message);
        }, () => {
            this.getItems();
        }).add(() => {
            this.globalService.spinner.hide();
            unsubscribe.unsubscribe();
        });
    }
    onPageChanged($event) {
        this.objPagination.currentPage = $event;
        this.getItems();
    }
    openImage(imageUrl) {
        swal.fire({
            imageUrl: imageUrl,
            imageHeight: 400,
            imageWidth: 600,
            confirmButtonText: 'Close'
        });
    }
    placeCard(DealId, MinQtyPerRetailer) {
        //console.log(item);
        let Customer = JSON.parse(localStorage.getItem('user'));
        const objParams = {
            DealId: DealId,
            CustomerId: Customer.CustomerId,
            Quantity: MinQtyPerRetailer,
            Type: "Wishlist"
        };
        this.globalService.spinner.show();
        const unsubscribe = this.cartService.addToCart(objParams)
            .subscribe((objResp) => {
            // this.globalService.spinner.hide();
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
                this.router.navigate(['/pages/cart']);
                ShowAlert(MessageType.SUCCESS, '', objResp.message);
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
                ShowAlert(MessageType.ERROR, '', objResp.message);
            }
            else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
                ShowAlert(MessageType.ERROR, '', objResp.message);
            }
        }, (error) => {
            ShowAlert(MessageType.ERROR, '', error);
        }, () => {
            unsubscribe.unsubscribe();
        }).add(() => {
            this.globalService.spinner.hide();
        });
    }
};
WishlistComponent = tslib_1.__decorate([
    Component({
        selector: 'app-wishlist',
        templateUrl: './wishlist.component.html',
        styleUrls: ['./wishlist.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [ProductService,
        WishlistService,
        MatDialog,
        CartService,
        GlobalService,
        Router])
], WishlistComponent);
export { WishlistComponent };
//# sourceMappingURL=wishlist.component.js.map