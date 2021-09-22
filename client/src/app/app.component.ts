import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { IResponse } from 'src/app/shared/Models/Response';
import { IProduct } from './shared/Models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Luis Ecommerce';
  
  constructor(){}
  
  ngOnInit(): void {   
  }
  
}
