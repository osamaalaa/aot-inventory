import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-operation-view',
  templateUrl: './store-operation-view.component.html',
  styleUrls: ['./store-operation-view.component.scss']
})
export class StoreOperationViewComponent implements OnInit {
  operationsList:any[] = [
    {
      "img": "assets/images/avatars/open_balance.jpg",
      "name": "OPEN_BALANCE_MENU",
      "key":"OPEN_BALANCE_MENU",
      "note": "Open Balance Operation",
      "url": "open-balance"
    },
    {
      "img": "assets/images/avatars/transfer.jpg",
      "name": "TRANSFER",
      "key":"TRANSFER",
      "note": "Transfer Operations",
      "url": "transfers"
    },
    {
      "img": "assets/images/avatars/job_order_req.jpg",
      "name": "Job Order Requests",
      "key":"Job Order Requests",
      "note": "Job Order Requests Document Operation",
      "url": "job-order-req"
    },
    {
      "img": "assets/images/avatars/job_order_issue.jpg",
      "name": "JOB_ORDER_ISSUES",
      "key":"JOB_ORDER_ISSUES",
      "note": "Job Order Issues ",
      "url": "job-order-disp"
    },
    {
      "img": "assets/images/avatars/item_balance.jpg",
      "name": "ITEM_BALANCE",
      "key":"ITEM_BALANCE",
      "note": "Item Balance ",
      "url": "item-balance"
    },
    {
      "img": "assets/images/avatars/temporary_rece.jpg",
      "name": "TEMPORARY_RECEIVING",
      "key":"TEMPORARY_RECEIVING",
      "note": "Temporary Receiving ",
      "url": "rcv-temp"
    },
    {
      "img": "assets/images/avatars/inspection.jpg",
      "name": "Inspection",
      "key":"Inspection",
      "note": "Inspection ",
      "url": "rcv-insp"
    },
    {
      "img": "assets/images/avatars/receiving.jpg",
      "name": "Receiving",
      "key":"RCV_DOC_ITEM_FINAL_RECEIVE",
      "note": "Receiving Document Operation",
      "url": "rcv-doc"
    },
    {
      "img": "assets/images/avatars/physical_inventory.jpg",
      "name": "PHYSICAL_INVENTORY",
      "key":"PHYSICAL_INVENTORY",
      "note": "Physical Inventory ",
      "url": "stock-taking"
    },
    {
      "img": "assets/images/avatars/return_request.jpg",
      "name": "Return Request",
      "key":"Return Request",
      "note": "Return Request ",
      "url": "req-doc"
    },
    {
      "img": "assets/images/avatars/custody_transfer.jpg",
      "name": "Custody Transfer",
      "key":"Custody Transfer",
      "note": "Custody Transfer ",
      "url": "transfers-custody"
    },
    {
      "img": "assets/images/avatars/item_return_request.jpg",
      "name": "ITEM_RETURN_REQUEST",
      "key":"ITEM_RETURN_REQUEST",
      "note": "Item Return Request ",
      "url": "req-item-return"
    },
    {
      "img": "assets/images/avatars/custody_request.jpg",
      "name": "CUSTODY_REQUEST",
      "key":"CUSTODY_REQUEST",
      "note": "Custody Request ",
      "url": "req-emp-custody"
    },
    {
      "img": "assets/images/avatars/item_lost_request.jpg",
      "name": "ITEM_LOST_REQUEST",
      "key":"ITEM_LOST_REQUEST",
      "note": "Item Lost Request ",
      "url": "req-item-lost"
    },
    {
      "img": "assets/images/avatars/transactions.jpg",
      "name": "TRANSACTIONS",
      "note": "Transactions ",
      "key":"TRANSACTIONS",
      "url": "transactions"
    },
    {
      "img": "assets/images/avatars/purchase_requests.jpg",
      "name": "PURCHASE_REQUESTS",
      "note": "Purchase Requests ",
      "key":"PURCHASE_REQUESTS",
      "url": "purchase"
    },
    {
      "img": "assets/images/avatars/dispense_tran.jpg",
      "name": "DISPENSE_TXN",
      "note": "Dispense Txn ",
      "key":"DISPENSE_TXN",
      "url": "dsp-txn"
    },
    
    // {
    //   "img": "assets/images/avatars/settings.png",
    //   "name": "Store Balance",
    //   "note": "Store Balance ",
    //   "key":"STORE_BALANCE",
    //   "url": "store-bal"
    // },
  ]
  constructor() { }

  ngOnInit() {
  }

}
