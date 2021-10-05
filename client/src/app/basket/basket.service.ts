import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  private basketTotalSource = new BehaviorSubject<IBasketTotal>(null);
  basket$ = this.basketSource.asObservable();
  basketTotal$ = this.basketTotalSource.asObservable();
  
  constructor(private http:HttpClient) { }

  getBasket(id:string){
    return this.http.get(`${this.baseUrl}basket?id=${id}`)
    .pipe(
      map((basket:IBasket) => {
        //Set content of basket to the variable
        this.basketSource.next(basket);
        this.CalculateTotals();
      })
    )
  }

  setBasket(basket:IBasket){
    console.log(basket);
    return this.http.post(`${this.baseUrl}basket`, basket).subscribe((response:IBasket) => {
      this.basketSource.next(response);
      this.CalculateTotals();
    }, error => {
      console.log(error);
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1){
    const itemToAdd:IBasketItem = this.mapProductItemsToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.CreateBasket();    
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);  
    this.setBasket(basket);
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {  
    const index = items.findIndex(i => i.id == itemToAdd.id);      
    if(index == -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }else{
      items[index].quantity += quantity;
    }
    return items;
  }

  incremetnItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if(basket.items[foundItemIndex].quantity > 1){
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }else{
      this.removeItemFromBasket(item);
    }    
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue()  ;
    if(basket.items.some(x => x.id === item.id)){
      basket.items = basket.items.filter(i => i.id !== item.id);
      if(basket.items.length > 0 ){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(`${this.baseUrl}basket?id=${basket.id}`).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, err => {
      console.log(err);
    })
  }

  private CreateBasket(): IBasket {
    const basket = new Basket();    
    //Save id on local storage to retrieve basket of the user
    localStorage.setItem('basket_id', basket.id);
    console.log(basket.id);
    return basket;
  }
  
    private mapProductItemsToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      type: item.productType,
      brand: item.productBrand
    }
  }

  private CalculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((totalSum,item) => (item.price * item.quantity) + totalSum, 0) //0 initial value of totalSum
    const total = shipping + subtotal;
    this.basketTotalSource.next({
      shipping,
      total, 
      subtotal
    });
  }

}


