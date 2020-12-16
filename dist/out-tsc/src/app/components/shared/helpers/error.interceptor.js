import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
// import { GlobalService, MessageType } from 'src/app/components/shared/services/global.service';
let ErrorInterceptor = class ErrorInterceptor {
    constructor(objAuthService) {
        this.objAuthService = objAuthService;
    }
    intercept(request, next) {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                alert('Your session has expired. Please log in again');
                this.objAuthService.logout();
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
};
ErrorInterceptor = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [AuthService])
], ErrorInterceptor);
export { ErrorInterceptor };
//# sourceMappingURL=error.interceptor.js.map