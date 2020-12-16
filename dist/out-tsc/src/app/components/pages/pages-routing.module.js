import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { BusinessComponent } from './business/business.component';
import { DealComponent } from './deal/deal.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { HelpComponent } from './help/help.component';
import { LifeAtMedrevoComponent } from './life-at-medrevo/life-at-medrevo.component';
import { PolicyComponent } from './policy/policy.component';
import { MypurchaseComponent } from './mypurchase/mypurchase.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { PayementsComponent } from './payements/payements.component';
import { ShippingComponent } from './shipping/shipping.component';
import { CancelReturnsComponent } from './cancel-returns/cancel-returns.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { SecurityComponent } from './security/security.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SitemapComponent } from './sitemap/sitemap.component';
const routes = [
    {
        path: '',
        children: [
            { path: 'about', component: AboutUsComponent },
            { path: 'cart', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'wishlist', component: WishlistComponent },
            { path: 'compare', component: CompareComponent },
            { path: 'my-account', component: MyAccountComponent },
            { path: 'login', component: LoginComponent },
            { path: 'error', component: ErrorPageComponent },
            { path: 'business', component: BusinessComponent },
            { path: 'deal', component: DealComponent },
            { path: 'myprofile', component: MyProfileComponent },
            { path: 'help', component: HelpComponent },
            { path: 'life-at-medrevo', component: LifeAtMedrevoComponent },
            { path: 'policy', component: PolicyComponent },
            { path: 'mypurchase', component: MypurchaseComponent },
            { path: 'our-story', component: OurStoryComponent },
            { path: 'testimonial', component: TestimonialComponent },
            { path: 'payments', component: PayementsComponent },
            { path: 'shipping', component: ShippingComponent },
            { path: 'cancel-returns', component: CancelReturnsComponent },
            { path: 'terms-of-use', component: TermsOfUseComponent },
            { path: 'security', component: SecurityComponent },
            { path: 'privacy', component: PrivacyComponent },
            { path: 'sitemap', component: SitemapComponent },
        ]
    }
];
let PagesRoutingModule = class PagesRoutingModule {
};
PagesRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PagesRoutingModule);
export { PagesRoutingModule };
//# sourceMappingURL=pages-routing.module.js.map