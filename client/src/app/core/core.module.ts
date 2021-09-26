import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
//NGX BOOTSTRAP
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    SectionHeaderComponent,    
  ],
  imports: [
    TooltipModule.forRoot(),
    CommonModule,
    RouterModule,
    BreadcrumbModule
  ],exports:[
    NavBarComponent,
    SectionHeaderComponent,    
  ]
})
export class CoreModule { }
