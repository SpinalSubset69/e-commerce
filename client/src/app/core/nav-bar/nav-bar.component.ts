import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  array = [1,2,3,4,5,6,7,1];  
  constructor() { }

  ngOnInit(): void {
  }

}
