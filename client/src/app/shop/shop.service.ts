import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/Models/Brands';
import { IType } from '../shared/Models/ProductType';
import { IResponse } from '../shared/Models/Response';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/Models/ShopParams';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0){
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if(shopParams.search){
      params = params.append("search", shopParams.search);
    }
    
      params = params.append('sort', shopParams.sort);
    
      params = params.append('pageIndex', shopParams.pageIndex.toString());
      params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IResponse>(`${this.baseUrl}products`, {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body; //It would be an IPagination model
      })
    );
  }

  getTypes(){
    return this.http.get<IBrand[]>(`${this.baseUrl}products/types`);
  }

  getBrands(){
    return this.http.get<IType[]>(`${this.baseUrl}products/brands`);
  }

  getProduct(id:number){
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
  }
}
