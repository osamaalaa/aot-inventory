import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inv-transR-items-detail-table',
  templateUrl: './inv-transR-items-detail-table.component.html',
  styleUrls: ['./inv-transR-items-detail-table.component.scss']
})
export class InvTransRItemsDetailTableComponent implements OnInit {

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
