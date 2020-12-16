import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Constants, GlobalService } from '../../shared/services/global.service';
let MainBannerComponent = class MainBannerComponent {
    constructor(globalService) {
        this.globalService = globalService;
        this.slides = [];
        this.config = {};
        this.objConstants = Constants;
        this.pagination = {
            el: '.swiper-pagination',
            clickable: true
        };
    }
    ngOnInit() {
        // this.getBaneerList();
    }
    getBaneerList() {
        // const objParams = {
        //   Page: 0,
        //   Limit: Pagination.pageSize,
        //   SortOrder: 'DESC',
        //   SortField: 'UpdatedOn',
        // };
        // this.productService.getProducts(objParams)
        //   .subscribe((objResp: ResponseModel) => {
        //     if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS &&
        //       'rows' in objResp.data && Array.isArray(objResp.data.rows)) {
        //       this.slides = Object.values(objResp.data.rows);
        //     }
        //   });
    }
    // tslint:disable-next-line:use-lifecycle-interface
    ngAfterViewInit() {
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: this.pagination,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            effect: 'slide'
        };
    }
};
tslib_1.__decorate([
    Input('slides'),
    tslib_1.__metadata("design:type", Array)
], MainBannerComponent.prototype, "slides", void 0);
MainBannerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-main-banner',
        templateUrl: './main-banner.component.html',
        styleUrls: ['./main-banner.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [GlobalService])
], MainBannerComponent);
export { MainBannerComponent };
//# sourceMappingURL=main-banner.component.js.map