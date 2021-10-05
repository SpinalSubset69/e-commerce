import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string;
  items: IBasketItem[];
}

export interface IBasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  type: string;
  brand: string;
}

export class Basket implements IBasket {
  id =  uuidv4(); //When a new instances is created gonna make a unique uuid
  items: IBasketItem[] = [];
}

export interface IBasketTotal{
  shipping:number,
  subtotal:number,
  total:number
}