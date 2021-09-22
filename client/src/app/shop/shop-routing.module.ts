import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {path: '', component: ShopComponent},
  {path: ':id', component: ProductDetailsComponent},
]

@NgModule({
  declarations: [],
  imports: [
    //INdicates that these routes wont be able at the ap module
    RouterModule.forChild(routes)
  ], exports:[
    RouterModule
  ]
})
export class ShopRoutingModule { }
