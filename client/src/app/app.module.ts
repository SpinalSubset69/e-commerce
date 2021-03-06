import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';


import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { LoadingInterceptor } from './core/Interceptors/loading.interceptor';


@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    CoreModule, 
    HomeModule,
    NgxSpinnerModule
  ],
  providers: [
    BrowserAnimationsModule,
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
