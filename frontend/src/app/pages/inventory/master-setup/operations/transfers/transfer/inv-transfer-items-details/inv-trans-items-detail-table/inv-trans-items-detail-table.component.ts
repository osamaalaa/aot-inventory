import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inv-trans-items-detail-table',
  templateUrl: './inv-trans-items-detail-table.component.html',
  styleUrls: ['./inv-trans-items-detail-table.component.scss']
})
export class InvTransItemsDetailTableComponent implements OnInit {

  _dataList = [];
  @Input() set dataList(dataList:any[]){
    this._dataList = dataList || [];
  }

  get dataList(){
    return this._dataList;
  }

  @Input() readOnly:boolean;

  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();


  constructor(
  ) { }

  ngOnInit() {
  }

}
