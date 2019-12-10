import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispense-transactions',
  templateUrl: './dispense-transactions.component.html',
  styleUrls: ['./dispense-transactions.component.scss']
})
export class DispenseTransactionsComponent implements OnInit {

  list: any[] = [
    {
      "img": "assets/images/avatars/items_request.png",
      "name": "REQUEST_ITEMS",
      "note": "Request Items ",
      "key":"REQUEST_ITEMS",
      "url": "req-items"
    },
    {
      "img": "assets/images/avatars/items_request_receive.jpg",
      "name": "REQUEST_ITEM_RECEIVE",
      "note": "Request Items ",
      "key":"REQUEST_ITEM_RECEIVE",
      "url": "req-items-re"
    },
  ]
  constructor() {}

  ngOnInit () {

  }


}
