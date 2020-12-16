import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
const appRoutes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: MainComponent,
        children: [
            {
                path: '',
                loadChildren: './components/shop/shop.module#ShopModule'
            }
        ]
    },
    {
        path: 'pages',
        loadChildren: './components/pages/pages.module#PagesModule'
    },
    // {
    //   path: 'my-business',
    //   loadChildren: './components/my-business/my-business.module#MyBusinessModule'
    // },
    {
        path: '**',
        redirectTo: 'home/one'
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        declarations: [],
        imports: [
            RouterModule.forRoot(appRoutes)
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map