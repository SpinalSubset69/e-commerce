import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
//NGX BOOTSTRAP
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    CommonModule,
    RouterModule
  ],exports:[
    NavBarComponent
  ]
})
export class CoreModule { }
