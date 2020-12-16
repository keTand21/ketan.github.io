import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyComponent } from './policy/policy.component';
import { DealComponent } from './deal/deal.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'deal', component: DealComponent },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
