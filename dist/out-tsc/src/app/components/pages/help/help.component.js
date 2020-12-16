import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HelpComponent = class HelpComponent {
    constructor() { }
    ngOnInit() {
        window.scroll({
            top: 10,
            left: 100,
            behavior: 'smooth'
        });
    }
};
HelpComponent = tslib_1.__decorate([
    Component({
        selector: 'app-help',
        templateUrl: './help.component.html',
        styleUrls: ['./help.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], HelpComponent);
export { HelpComponent };
//# sourceMappingURL=help.component.js.map