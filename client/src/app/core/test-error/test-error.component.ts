import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl= environment.apiUrl;

  constructor(private http:HttpClient  ) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl + 'products/42').subscribe(respones => {
      console.log(respones);
    });
  }

  get500Error(){
    this.http.get(this.baseUrl + 'products/42').subscribe(respones => {
      console.log(respones);
    });
  }

  get4cdError(){
    this.http.get(this.baseUrl + 'products/42').subscribe(respones => {
      console.log(respones);
    });
  }

}
