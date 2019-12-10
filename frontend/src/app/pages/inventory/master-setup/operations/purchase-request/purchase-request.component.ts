import { Component } from '@angular/core';

@Component({
  selector:'app-purchase-request',
  templateUrl:'./purchase-request.component.html'
})
export class PurchaseRequestComponent{
  list:any[] = [

    {
      "img": "assets/images/avatars/purchase_requests.jpg",
      "name": "Purchase Request",
      "key":"PURCHASE_REQUESTS",
      "note": "Purchase Request  Operation",
      "url": "pur-req"
    },
    {
      "img": "assets/images/avatars/purchase_request_view.jpg",
      "name": "Purchase Request View",
      "key":"PURCHASE_REQUEST_VIEW",
      "note": "Purchase Request View Operation",
      "url": "pur-req-view"
    }
  ]
  constructor() { }

  ngOnInit() {
  }
}