import * as tslib_1 from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { SidebarMenuService } from './sidebar-menu.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
let SidebarComponent = class SidebarComponent {
    constructor(sidenavMenuService, router) {
        this.sidenavMenuService = sidenavMenuService;
        this.router = router;
        this.ariaExpanded = this.expanded;
        if (this.depth === undefined) {
            this.depth = 0;
        }
    }
    ngOnInit() {
        this.sidenavMenuService.currentUrl.subscribe((url) => {
            if (this.item.route && url) {
                // console.log(`Checking '/${this.item.route}' against '${url}'`);
                this.expanded = url.indexOf(`/${this.item.route}`) === 0;
                this.ariaExpanded = this.expanded;
                // console.log(`${this.item.route} is expanded: ${this.expanded}`);
            }
        });
    }
    onItemSelected(item) {
        if (!item.children || !item.children.length) {
            this.router.navigate([item.route]);
        }
        if (item.children && item.children.length) {
            this.expanded = !this.expanded;
        }
    }
};
tslib_1.__decorate([
    HostBinding('attr.aria-expanded'),
    tslib_1.__metadata("design:type", Object)
], SidebarComponent.prototype, "ariaExpanded", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SidebarComponent.prototype, "item", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], SidebarComponent.prototype, "depth", void 0);
SidebarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.scss'],
        animations: [
            trigger('indicatorRotate', [
                state('collapsed', style({ transform: 'rotate(0deg)' })),
                state('expanded', style({ transform: 'rotate(180deg)' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
            ])
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [SidebarMenuService, Router])
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map