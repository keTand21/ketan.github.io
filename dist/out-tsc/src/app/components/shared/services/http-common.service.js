import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const serverAPI = environment.serverAPI;
let HttpCommonService = class HttpCommonService {
    constructor(http) {
        this.http = http;
    }
    get(endpoint, params) {
        if (Object.keys(params).length) {
            return this.http.get(`${serverAPI}/${endpoint}/${params}`);
        }
        else {
            return this.http.get(`${serverAPI}/${endpoint}`);
        }
    }
    post(endpoint, params) {
        return this.http.post(`${serverAPI}/${endpoint}`, params);
    }
    put(endpoint, params) {
        return this.http.put(`${serverAPI}/${endpoint}`, params);
    }
    delete(endpoint, params) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: params,
        };
        return this.http.delete(`${serverAPI}/${endpoint}`, options);
    }
};
HttpCommonService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], HttpCommonService);
export { HttpCommonService };
//# sourceMappingURL=http-common.service.js.map