import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'test-error', component: TestErrorComponent},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), 
  data: { breadcrumb: 'Basket' }}, //Lazy loading for basket module
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)
  , data: {breadcrumb: 'Shop'}},
  {path:'checkout', loadChildren: () => import('./checkout/checkout.module').then(mode => mode.CheckoutModule),
  data: { breadcrumb: 'checkout' }},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
