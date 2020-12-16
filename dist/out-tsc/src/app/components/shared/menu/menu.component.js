import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let MenuComponent = class MenuComponent {
    constructor() { }
    ngOnInit() {
    }
    openMegaMenu() {
        let pane = document.getElementsByClassName('cdk-overlay-pane');
        [].forEach.call(pane, function (el) {
            if (el.children.length > 0) {
                if (el.children[0].classList.contains('mega-menu')) {
                    el.classList.add('mega-menu-pane');
                }
            }
        });
    }
};
MenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menu',
        templateUrl: './menu.component.html',
        styleUrls: ['./menu.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], MenuComponent);
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map