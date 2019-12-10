import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-open-bal-items-details-table',
  templateUrl: './open-bal-items-details-table.component.html',
  styleUrls: ['./open-bal-items-details-table.component.scss']
})
export class OpenBalItemsDetailsTableComponent implements OnInit {

  _dataList = [];
  @Input() set dataList(dataList:any[]){
    this._dataList = dataList || [];
  }

  get dataList(){
    return this._dataList;
  }

  @Input() readonly:boolean;

  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();


  constructor(
  ) { }

  ngOnInit() {
  }



}
