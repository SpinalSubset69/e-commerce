import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { PagingComponent } from './Components/paging/paging.component';




@NgModule({
  declarations: [
    PagingHeaderComponent,    
    PagingComponent
    
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],exports:[
    PaginationModule ,
    PagingHeaderComponent,
    PagingComponent
  ]
})
export class SharedModule { }
