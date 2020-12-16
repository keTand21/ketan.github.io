import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarMenuService } from '../shared/sidebar/sidebar-menu.service';
import { GlobalService } from 'src/app/components/shared/services/global.service';
let MainComponent = class MainComponent {
    constructor(router, globalService, cartService, sidenavMenuService) {
        this.router = router;
        this.globalService = globalService;
        this.cartService = cartService;
        this.sidenavMenuService = sidenavMenuService;
        this.currencies = ['USD', 'EUR'];
        this.flags = [
            { name: 'English', image: 'assets/images/flags/gb.svg' },
            { name: 'German', image: 'assets/images/flags/de.svg' },
        ];
        this.shoppingCartItems = [];
        this.banners = [];
        this.wishlistItems = [];
        this.globalService.spinner.show();
        this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
        this.router.events.subscribe((event) => {
            this.globalService.spinner.hide();
            if (event instanceof NavigationEnd) {
                this.url = event.url;
            }
        }).add(() => {
            this.globalService.spinner.hide();
        });
    }
    ngOnInit() {
        this.currency = this.currencies[0];
        this.flag = this.flags[0];
    }
    changeCurrency(currency) {
        this.currency = currency;
    }
    changeLang(flag) {
        this.flag = flag;
    }
};
MainComponent = tslib_1.__decorate([
    Component({
        selector: 'app-main',
        templateUrl: './main.component.html',
        styleUrls: ['./main.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [Router, GlobalService, CartService, SidebarMenuService])
], MainComponent);
export { MainComponent };
//# sourceMappingURL=main.component.js.map