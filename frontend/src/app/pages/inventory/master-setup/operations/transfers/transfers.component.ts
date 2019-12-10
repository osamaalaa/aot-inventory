import { Component } from '@angular/core';

@Component({
    selector:'app-transfers',
    templateUrl:'./transfers.component.html'
})
export class TransfersComponent{
    list:any[] = [

        {
          "img": "assets/images/avatars/transfer_req.jpg",
          "name": "Transfer Request",
          "key":"Transfer Request",
          "note": "Transfer Request  Operation",
          "url": "inv-transfer"
        },
        {
          "img": "assets/images/avatars/transfer_inn.jpg",
          "name": "TRANSFER_RECEIVING",
          "key":"TRANSFER_RECEIVING",
          "note": "Transfer Receving Operation",
          "url": "inv-transfer-r"
        }
      ]
      constructor() { }
    
      ngOnInit() {
      }
}