import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Routes
const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'products/:CategoryId', component: ProductLeftSidebarComponent },
  // { path: 'product/:id', component: ProductDetailsComponent },
  // { path: 'wishlist', component: WishlistComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
