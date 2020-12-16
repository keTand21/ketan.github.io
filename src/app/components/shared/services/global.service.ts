import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { all } from 'q';

@Injectable({

    providedIn: 'root'
})
export class GlobalService {



    public currency: string = 'INR';
    public dataSrcMyAccount: BehaviorSubject<any> = new BehaviorSubject({});
    public obsMyAccount = this.dataSrcMyAccount.asObservable();

    public currentCardCount: BehaviorSubject<any> = new BehaviorSubject(0);
    public currentCount = this.currentCardCount.asObservable();

    public dataSrcGlobalSearch: BehaviorSubject<any> = new BehaviorSubject({});
    public obsGlobalSearch = this.dataSrcGlobalSearch.asObservable();

    public Constants = Constants;



    constructor(
        public spinner: NgxSpinnerService,
        private router: Router
    ) {

    }

    public markAsTouched(objectControl) {
        Object.keys(objectControl).forEach(controlName => {
            if (objectControl[controlName].hasOwnProperty('controls')) {
                this.markAsTouched(objectControl[controlName].controls);
            } else {
                objectControl[controlName].markAsTouched();
            }
        });
    }






    refreshCount(count: any) {
        this.currentCardCount.next(count);
    }

    refreshGlobalSearch(searchString: any) {
        this.dataSrcGlobalSearch.next(searchString);
    }



    scrollTop() {
        window.scroll({
            top: 10,
            left: 100,
            behavior: 'smooth'
        });
    }

}

// Sweet alert message type
export enum MessageType {
    SUCCESS = 'success',
    ERROR = 'error',
    CONFIRM = 'warning',
    INFO = 'info',

}
const perPage = 10;
export const dealShowPage = 12;

export const Pagination = {
    pageSize: perPage,
    pageSizeOptions: [perPage, 20, 30, 40, 50],
    allowPaginationAfter: perPage,
};

export const arrGST = [0, 5, 12, 18, 28];
export const arrPackType = ['Bottle', 'Box',
    'Device', 'Jar', 'Kit', 'Packet', 'Pouch', 'Sachet', 'Strip',
    'Tin', 'Tube', 'Vial', 'Disposables', 'Poly', 'Packet', 'Other'
];

export class DataSourceClass {
    ev: string;
    value: any;
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
        YYYY_MM_DD: 'yyyy-MM-dd',  // eg <year-month-data>  2019-12-02
        YYYY_MM_DD_HH_MM: 'yyyy-MM-dd HH:mm', // eg <year-month-data hours:miuntes>  2019-12-02 00:00
        YYYY_MM_DD_HH_MM_SS: 'yyyy-MM-dd HH:mm:ss', // 2019-12-25 21:15:10

    },
    DATE: {
        YYYY_MM_DD: 'YYYY-MM-DD',
        HH_MM_ss: 'HH:mm:ss',
    },
    CUSTOMER_TYPE: {
        RETAILER: 0,
        WHOLESALER: 1
    },
    MOMENT_DATE_FORMAT: {
        YYYY_MM_DD_HH_MM_SS: 'YYYY-MM-DD HH-mm-ss', // 2019-12-25 21:15:10
        YYYY_MM_DD: 'yyyy-MM-dd',  // eg <year-month-data>  2019-12-02
        YYYY_MM_DD_HH_MM: 'yyyy-MM-dd HH:mm'  // eg <year-month-data hours:miuntes>  2019-12-02 00:00
    },
    CONDITION: {
        VALUEONE: 1,
        VALUEZERO: 0,
        DAY: 3
    },
    PASSWORD_ALGORITHM: {
        ALGORITHM: 'aes-256-ctr',
        PASSWORD: 'RJ23edrf'
    },
    MAXSIZE: {
        SIZE: 5242880,
    },
    PASSWORDVALIDATION: {
        PASSWORD: '123456$#@$^@1ERF'
    },
};

export class ResponseModel {
    status: string;
    data: any;
    statusCode: number;
    message: string;
}

export class TableDataResultModel {
    rows: any[];
    count: number;
}

export function ShowAlert(messageType: any, msgTitle: string, description?: any,
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
    } else {
        return Swal.fire({
            icon: messageType,
            title: msgTitle,
            text: description,
        });
    }

}
export const arrDilivaryStatus = [
    { value: 'PENDING', DilivaryStatus: 'PENDING' },
    { value: 'DELIVERED', DilivaryStatus: 'DELIVERED' },
    { value: 'SCHEDULED', DilivaryStatus: 'SCHEDULED' },
    { value: 'CANCELLED', DilivaryStatus: 'CANCELLED' },
    { value: 'DISPATCHED', DilivaryStatus: 'DISPATCHED' },
    { value: 'REJECTED', DilivaryStatus: 'REJECTED' },
    { value: 'PARTIALLY DELIVERED', DilivaryStatus: 'PARTIALLY DELIVERED' },
    { value: 'PACKAGE SLIP GENEARTED', DilivaryStatus: 'PACKAGE SLIP GENEARTED' },

];

export const Status = {
    DELETED: 'DELETED',
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPETED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    BILLED: 'BILLED',
    INPROGRESS: 'IN PROGRESS',
    PAID: 'PAID',
    REFUNDED: 'REFUNDED',
    SCHEDULED: 'SCHEDULED',
    APPROVED: 'APPROVED',
    CLOSED: 'CLOSED',
    DELIVERED: 'DELIVERED',
    PACKAGESLIPGENEARTED: 'PACKAGE SLIP GENEARTED',
    DISPATCHED: 'DISPATCHED',
    PARTITALLYDELIVERED: 'PARTITALLY DELIVERED',
    REJECTED: 'REJECTED',
    PARTIALLYDELIVERED: 'PARTIALLY DELIVERED',

}
export const arrOrderStatus = [
    { statusKey: 'PENDING', OrderStatus: 'PENDING' },
    { statusKey: 'ACCEPTED', OrderStatus: 'ACCEPTED' },
    { statusKey: 'COMPLETED', OrderStatus: 'COMPLETED' },
    { statusKey: 'IN PROGRESS', OrderStatus: 'IN PROGRESS' },
    { statusKey: 'CANCELLED', OrderStatus: 'CANCELLED' },
    { statusKey: 'DELETED', OrderStatus: 'DELETED' },
    { statusKey: 'DELIVERED', OrderStatus: 'DELIVERED' },
    { statusKey: 'BILLED', OrderStatus: 'BILLED' },
    { statusKey: 'REJECTED', OrderStatus: 'REJECTED' },
    { statusKey: 'PARTITALLY DELIVERED', OrderStatus: 'PARTITALLY DELIVERED' },
    { statusKey: 'DISPATCHED', OrderStatus: 'DISPATCHED' },
];

export const arrTransactionStatus = [
    { statusKey: 'PENDING', TransactionStatus: 'PENDING' },
    { statusKey: 'PAID', TransactionStatus: 'PAID' },
    { statusKey: 'CANCELLED', TransactionStatus: 'CANCELLED' },
    { statusKey: 'REFUNDED', TransactionStatus: 'REFUNDED' },
    { statusKey: 'PATIALLY REFUNDED', TransactionStatus: 'PATIALLY REFUNDED' },
];
export const arrSearchDilivaryStatus = [
    { statusKey: 'PENDING', statusValue: 'PENDING' },
    { statusKey: 'DELIVERED', statusValue: 'DELIVERED' },
    { statusKey: 'SCHEDULED', statusValue: 'SCHEDULED' },
    { statusKey: 'CANCELLED', statusValue: 'CANCELLED' },
    { statusKey: 'DISPATCHED', statusValue: 'DISPATCHED' },
    { statusKey: 'REJECTED', statusValue: 'REJECTED' },
    { statusKey: 'PARTIALLY DELIVERED', statusValue: 'PARTIALLY DELIVERED' },
    { statusKey: 'PACKAGE SLIP GENEARTED', statusValue: 'PACKAGE SLIP GENEARTED' },
]

export const arrsearchOrderStatus = [
    { statusKey: 'PENDING', statusValue: 'PENDING' },
    { statusKey: 'ACCEPTED', statusValue: 'ACCEPTED' },
    { statusKey: 'COMPLETED', statusValue: 'COMPLETED' },
    { statusKey: 'IN PROGRESS', statusValue: 'IN PROGRESS' },
    { statusKey: 'CANCELLED', statusValue: 'CANCELLED' },
    { statusKey: 'DELETED', statusValue: 'DELETED' },
    { statusKey: 'DELIVERED', statusValue: 'DELIVERED' },
    { statusKey: 'BILLED', statusValue: 'BILLED' },
    { statusKey: 'REJECTED', statusValue: 'REJECTED' },
    { statusKey: 'PARTITALLY DELIVERED', statusValue: 'PARTITALLY DELIVERED' },
    { statusKey: 'DISPATCHED', statusValue: 'DISPATCHED' },
]
export const WholesalerType = 1;
export const schemeType = 1;

export const delivaryCharge = 50;
export const delivaryPrice = 1499;
export const discount = 0;
export const percentage = 100;
