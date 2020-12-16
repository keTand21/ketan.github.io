import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let PriceComponent = class PriceComponent {
    constructor() {
        this.priceFrom = 0;
        this.priceTo = 10000;
        // Using Output EventEmitter
        this.priceFilters = new EventEmitter();
        // define min, max and range
        this.min = this.priceFrom;
        this.max = this.priceTo;
        this.range = [1000, 5000];
    }
    ngOnInit() { }
    // rangeChanged
    priceChanged(event) {
        setInterval(() => {
            this.priceFilters.emit(event);
        }, 1000);
    }
    priceFilter() {
        this.priceFilters.emit({
            priceFrom: this.priceFrom,
            priceTo: this.priceTo
        });
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], PriceComponent.prototype, "priceFilters", void 0);
PriceComponent = tslib_1.__decorate([
    Component({
        selector: 'app-price',
        templateUrl: './price.component.html',
        styleUrls: ['./price.component.sass']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], PriceComponent);
export { PriceComponent };
//# sourceMappingURL=price.component.js.map