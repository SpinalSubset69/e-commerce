import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule, } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { PagingComponent } from './Components/paging/paging.component';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';



@NgModule({
  declarations: [
    PagingHeaderComponent,    
    PagingComponent, OrderTotalsComponent
    
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],exports:[
    PaginationModule ,
    PagingHeaderComponent,
    PagingComponent,
    CarouselModule,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
