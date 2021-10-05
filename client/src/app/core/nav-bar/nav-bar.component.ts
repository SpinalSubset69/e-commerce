import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from 'src/app/shared/Models/Basket';
import { IProduct } from 'src/app/shared/Models/Product';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  array:IBasketItem[] = [];  
  basket$: Observable<IBasket>;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;    
  }

}
