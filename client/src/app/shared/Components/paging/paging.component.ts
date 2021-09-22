import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {
  @Input() totalCount:number;
  @Input() pageSize:number;
  //Must be imported from @agnular/core
  @Output() pageChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onPagerChanged(event: any){
    //With emit we pass the value to the parent component
    this.pageChanged.emit(event.page);
  }

}
