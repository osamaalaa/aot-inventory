import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rcv-doc-items-details-table',
  templateUrl: './rcv-doc-items-details-table.component.html',
  styleUrls: ['./rcv-doc-items-details-table.component.scss']
})
export class RcvDocItemsDetailsTableComponent implements OnInit {

  _dataList = [];
  @Input() set dataList(dataList: any[]) {
    this._dataList = dataList || [];
  }

  get dataList() {
    return this._dataList;
  }

  @Input() readOnly: boolean;

  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();


  constructor() {}

  ngOnInit() {}

}
