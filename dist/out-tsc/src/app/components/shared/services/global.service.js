import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
/* models */
/* import { TabMenuModel } from '../models/tabs-model';
import { NotificationModel } from '../models/notification-model'; */
let GlobalService = class GlobalService {
    constructor(spinner, router) {
        // public Constants = Constants;
        // public dataSource = new Subject<DataSourceClass>();
        // public data$ = this.dataSource.asObservable();
        this.spinner = spinner;
        this.router = router;
        this.currency = 'INR';
        this.dataSrcMyAccount = new BehaviorSubject({});
        this.obsMyAccount = this.dataSrcMyAccount.asObservable();
        this.Constants = Constants;
        // constructor(
        //     private router: Router,
        // ) {
        // }
    }
    markAsTouched(objectControl) {
        Object.keys(objectControl).forEach(controlName => {
            if (objectControl[controlName].hasOwnProperty('controls')) {
                this.markAsTouched(objectControl[controlName].controls);
            }
            else {
                objectControl[controlName].markAsTouched();
            }
        });
    }
    logout() {
        localStorage.clear();
        // this.router.navigate(['']);
        this.router.navigate(['/']);
        this.refreshMyAccountDropdown(undefined);
    }
    getCurrentUser() {
        if (!this.objUser) {
            let objUser = localStorage.getItem('user');
            if (objUser && objUser != null && objUser != '') {
                objUser = JSON.parse(objUser);
                this.objUser = objUser;
            }
            return this.objUser;
        }
        else {
            return this.objUser;
        }
    }
    setCurrentUser(objCustomer) {
        if (objCustomer && objCustomer != null &&
            typeof objCustomer === 'object' && Object.keys(objCustomer).length) {
            this.objUser = objCustomer;
            localStorage.setItem('user', JSON.stringify(objCustomer));
            this.objUser = objCustomer;
        }
    }
    refreshMyAccountDropdown(user) {
        this.objUser = user;
        this.dataSrcMyAccount.next(user);
    }
    loginToContinue() {
        localStorage.clear();
        this.refreshMyAccountDropdown(undefined);
        ShowAlert(MessageType.ERROR, 'Log in or Sign up first');
        this.router.navigate(['/pages/login']);
    }
};
GlobalService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [NgxSpinnerService,
        Router])
], GlobalService);
export { GlobalService };
// Sweet alert message type
export var MessageType;
(function (MessageType) {
    MessageType["SUCCESS"] = "success";
    MessageType["ERROR"] = "error";
    MessageType["CONFIRM"] = "warning";
    MessageType["INFO"] = "info";
})(MessageType || (MessageType = {}));
const perPage = 10;
export const Pagination = {
    pageSize: perPage,
    pageSizeOptions: [perPage, 20, 30, 40, 50],
    allowPaginationAfter: perPage
};
export const arrGST = [0, 5, 12, 18, 28];
export const arrPackType = ['Bottle', 'Box',
    'Device', 'Jar', 'Kit', 'Packet', 'Pouch', 'Sachet', 'Strip',
    'Tin', 'Tube', 'Vial', 'Disposables', 'Poly', 'Packet', 'Other'
];
export class DataSourceClass {
}
export const arrState = [
    { abbreviation: 'AP', stateName: 'Andhra Pradesh' },
    { abbreviation: 'AR', stateName: 'Arunachal Pradesh' },
    { abbreviation: 'AS', stateName: 'Assam' },
    { abbreviation: 'BR', stateName: 'Bihar' },
    { abbreviation: 'CG', stateName: 'Chhattisgarh' },
    { abbreviation: 'GA', stateName: 'Goa' },
    { abbreviation: 'GJ', stateName: 'Gujarat' },
    { abbreviation: 'HR', stateName: 'Haryana' },
    { abbreviation: 'HP', stateName: 'Himachal Pradesh' },
    { abbreviation: 'JK', stateName: 'Jammu and Kashmir' },
    { abbreviation: 'JH', stateName: 'Jharkhand' },
    { abbreviation: 'KA', stateName: 'Karnataka' },
    { abbreviation: 'KL', stateName: 'Kerala' },
    { abbreviation: 'MP', stateName: 'Madhya Pradesh' },
    { abbreviation: 'MH', stateName: 'Maharashtra' },
    { abbreviation: 'MN', stateName: 'Manipur' },
    { abbreviation: 'ML', stateName: 'Meghalaya' },
    { abbreviation: 'MZ', stateName: 'Mizoram' },
    { abbreviation: 'NL', stateName: 'Nagaland' },
    { abbreviation: 'OR', stateName: 'Orissa' },
    { abbreviation: 'PB', stateName: 'Punjab' },
    { abbreviation: 'RJ', stateName: 'Rajasthan' },
    { abbreviation: 'SK', stateName: 'Sikkim' },
    { abbreviation: 'TN', stateName: 'Tamil Nadu' },
    { abbreviation: 'TR', stateName: 'Tripura' },
    { abbreviation: 'UK', stateName: 'Uttarakhand' },
    { abbreviation: 'UP', stateName: 'Uttar Pradesh' },
    { abbreviation: 'WB', stateName: 'West Bengal' },
    { abbreviation: 'AN', stateName: 'Andaman and Nicobar Islands' },
    { abbreviation: 'CH', stateName: 'Chandigarh' },
    { abbreviation: 'DH', stateName: 'Dadra and Nagar Haveli' },
    { abbreviation: 'DD', stateName: 'Daman and Diu' },
    { abbreviation: 'DL', stateName: 'Delhi' },
    { abbreviation: 'LD', stateName: 'Lakshadweep' },
    { abbreviation: 'PY', stateName: 'Pondicherry' },
    { abbreviation: 'TS', stateName: 'Telangana' },
    { abbreviation: 'LA', stateName: 'Ladakh' },
];
export const Constants = {
    SELECT_DEFAULT_LAST_DAYS: 29,
    HTTP_CODE: {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        UNAUTHORISED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        REQUEST_TIMEOUT: 408,
        INTERNAL_SERVER_ERROR: 500,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        FAILURE: 520
    },
    AWS: {
        IS_UPLOAD_ON_AWS: true,
        BASE_URI: `https://medrevo-assets.s3.ap-south-1.amazonaws.com/`,
    },
    DISPLAY_DATE_FORMAT: {
        YYYY_MM_DD: 'yyyy-MM-dd',
        YYYY_MM_DD_HH_MM: 'yyyy-MM-dd HH:mm' // eg <year-month-data hours:miuntes>  2019-12-02 00:00
    },
    MOMENT_DATE_FORMAT: {
        YYYY_MM_DD_HH_MM_SS: 'YYYY-MM-DD HH-mm-ss',
        YYYY_MM_DD: 'yyyy-MM-dd',
        YYYY_MM_DD_HH_MM: 'yyyy-MM-dd HH:mm' // eg <year-month-data hours:miuntes>  2019-12-02 00:00
    }
};
export class ResponseModel {
}
export class TableDataResultModel {
}
export function ShowAlert(messageType, msgTitle, description, 
// tslint:disable-next-line:align
confirmBtnTxt = 'Ok') {
    if (messageType === MessageType.CONFIRM) {
        return Swal.fire({
            title: msgTitle,
            text: description,
            icon: messageType,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmBtnTxt
        }).then(resp => {
            return new Promise((resolve) => {
                resolve(resp.value);
            });
        });
    }
    else {
        return Swal.fire({
            icon: messageType,
            title: msgTitle,
            text: description,
        });
    }
}
//# sourceMappingURL=global.service.js.map