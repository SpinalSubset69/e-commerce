import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CarouselConfig } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ], exports:
  [
    HomeComponent
  ], providers:[
    {provide: CarouselConfig, useValue: {interval: 3500, noPause: true, showIndicators: true}}
  ]
})
export class HomeModule { }
