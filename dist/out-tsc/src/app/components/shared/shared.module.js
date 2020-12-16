import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MaterialModule } from '../shared/material/material/material.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
let SharedModule = class SharedModule {
};
SharedModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            HeaderComponent,
            FooterComponent,
            MenuComponent,
            SidebarComponent,
            OrderByPipe,
        ],
        imports: [
            CommonModule,
            FormsModule,
            RouterModule,
            MatButtonModule,
            MatSnackBarModule,
            MatToolbarModule,
            MatListModule,
            MatSliderModule,
            MatExpansionModule,
            MatMenuModule,
            MatTableModule,
            MatRadioModule,
            MatDialogModule,
            MatChipsModule,
            MatInputModule,
            MatIconModule,
            MatSidenavModule,
            MatSelectModule,
            MatTabsModule,
            MatDividerModule,
            MatCardModule,
            FlexLayoutModule,
            ReactiveFormsModule,
            NgxDaterangepickerMd,
            MaterialModule,
            NgMultiSelectDropDownModule.forRoot()
        ],
        exports: [
            CommonModule,
            MatButtonModule,
            MatSnackBarModule,
            MatToolbarModule,
            MatListModule,
            MatExpansionModule,
            MatMenuModule,
            MatTableModule,
            MatSliderModule,
            MatRadioModule,
            MatDialogModule,
            MatChipsModule,
            MatInputModule,
            MatIconModule,
            MatSidenavModule,
            MatSelectModule,
            MatTabsModule,
            MatDividerModule,
            MatCardModule,
            MaterialModule,
            OrderByPipe,
            HeaderComponent,
            FooterComponent,
            MenuComponent,
            SidebarComponent,
            FlexLayoutModule,
            NgxDaterangepickerMd,
            ReactiveFormsModule,
            FormsModule,
            RouterModule,
            NgMultiSelectDropDownModule
        ],
        providers: [
            ProductService,
            CartService
        ]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map