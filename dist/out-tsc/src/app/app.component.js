import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
let AppComponent = class AppComponent {
    constructor(spinner) {
        this.spinner = spinner;
        this.title = 'Medrevo';
    }
    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {
        /** spinner starts on init */
        this.spinner.show(undefined, {
            // type: 'ball-atom'
            // type: 'ball-circus'
            // type: 'ball-clip-rotate-pulse'
            // type: 'ball-clip-rotate-pulse'
            type: 'ball-fussion',
        });
        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
        }, 2000);
        window.scroll(0, 0);
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [NgxSpinnerService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map