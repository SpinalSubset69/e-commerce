import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { IResponse } from 'src/app/shared/Models/Response';
import { BasketService } from './basket/basket.service';
import { IProduct } from './shared/Models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Luis Ecommerce';
  
  constructor(private basketService:BasketService){}
  
  ngOnInit(): void {   
    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('Initialized basket')
      }, err => {
        console.log(err);
      });
    }
  }
  
}
