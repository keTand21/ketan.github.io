import * as tslib_1 from "tslib";
import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { MainComponent } from './components/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './components/shop/shop.module';
import { SharedModule } from './components/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from 'src/app/components/shared/helpers/http.interceptor';
import { ErrorInterceptor } from 'src/app/components/shared/helpers/error.interceptor';
// import { DealComponent } from '../app/components/pages/deal/deal.component';
import { NgxPaginationModule } from 'ngx-pagination';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            MainComponent,
        ],
        imports: [
            NgxSpinnerModule,
            BrowserModule,
            SharedModule,
            ShopModule,
            HttpClientModule,
            BrowserAnimationsModule,
            NoopAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            AppRoutingModule,
            NgxImgZoomModule,
            JwtModule.forRoot({
                config: {
                    // tslint:disable-next-line:object-literal-shorthand
                    tokenGetter: tokenGetter,
                    whitelistedDomains: ['localhost:3000', 'localhost:4200']
                }
            }),
            NgxPaginationModule
        ],
        providers: [
            { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
export function tokenGetter() {
    return localStorage.getItem('token');
}
//# sourceMappingURL=app.module.js.map