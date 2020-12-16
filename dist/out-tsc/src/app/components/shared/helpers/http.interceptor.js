import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let JwtInterceptor = class JwtInterceptor {
    intercept(request, next) {
        // add authorization header with jwt token if available
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        }
        return next.handle(request);
    }
};
JwtInterceptor = tslib_1.__decorate([
    Injectable()
], JwtInterceptor);
export { JwtInterceptor };
//# sourceMappingURL=http.interceptor.js.map