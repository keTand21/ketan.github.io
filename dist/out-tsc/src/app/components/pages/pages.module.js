import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { BlogModule } from '../blog/blog.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { BusinessComponent } from './business/business.component';
import { AddBusinessComponent } from './business/add-business/add-business.component';
// import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DealComponent } from './deal/deal.component';
import { AddDealComponent } from './deal/add-deal/add-deal.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { HelpComponent } from './help/help.component';
import { LifeAtMedrevoComponent } from './life-at-medrevo/life-at-medrevo.component';
import { MypurchaseComponent } from './mypurchase/mypurchase.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { PolicyComponent } from './policy/policy.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { PayementsComponent } from './payements/payements.component';
import { ShippingComponent } from './shipping/shipping.component';
import { CancelReturnsComponent } from './cancel-returns/cancel-returns.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { SecurityComponent } from './security/security.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination';
import { MypurchasedetailsComponent } from './mypurchase/mypurchasedetails/mypurchasedetails.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
let PagesModule = class PagesModule {
};
PagesModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            PagesRoutingModule,
            SharedModule,
            PerfectScrollbarModule,
            NgxPaginationModule,
            NgxDaterangepickerMd.forRoot()
        ],
        declarations: [
            CartComponent,
            ContactComponent,
            WishlistComponent,
            CompareComponent,
            CheckoutComponent,
            MyAccountComponent,
            FaqComponent,
            AboutUsComponent,
            LoginComponent,
            ErrorPageComponent,
            BusinessComponent,
            AddBusinessComponent,
            DealComponent,
            AddDealComponent,
            MyProfileComponent,
            HelpComponent,
            LifeAtMedrevoComponent,
            PolicyComponent,
            MypurchaseComponent,
            OrderdetailsComponent,
            OurStoryComponent,
            TestimonialComponent,
            PayementsComponent,
            ShippingComponent,
            CancelReturnsComponent,
            TermsOfUseComponent,
            SecurityComponent,
            PrivacyComponent,
            SitemapComponent,
            MypurchasedetailsComponent,
        ],
        entryComponents: [
            MypurchasedetailsComponent,
            AddBusinessComponent,
            AddDealComponent,
        ],
        exports: [
            NgxPaginationModule
        ]
    })
], PagesModule);
export { PagesModule };
//# sourceMappingURL=pages.module.js.map