import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
let SidebarMenuService = class SidebarMenuService {
    constructor(router) {
        this.router = router;
        this.currentUrl = new BehaviorSubject(undefined);
    }
};
SidebarMenuService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], SidebarMenuService);
export { SidebarMenuService };
//# sourceMappingURL=sidebar-menu.service.js.map