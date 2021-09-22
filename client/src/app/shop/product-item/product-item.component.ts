import { Component, OnInit,Input } from '@angular/core';
import { IProduct } from 'src/app/shared/Models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  //Obtenemos informacion del componente padre
  @Input() product: IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
