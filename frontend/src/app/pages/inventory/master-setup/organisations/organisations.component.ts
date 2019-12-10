import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {


  organizationViewData = [
    {
      "img": "assets/images/avatars/inventory_periods.jpg",
      "name": "Inventory Periods",
      "key": "INVENTORY_PERIODS",
      "note": "Inventory Periods, Internal, External, boundaries etc ..",
      "url": "/inv/setup/inventory-periods"
    },
    {
      "img": "assets/images/avatars/chart_of_acc.jpg",
      "name": "Chart of Accounts",
      "key": "Chart of Accounts",
      "note": "Chart of Accounts, Internal, External, boundaries etc ..",
      "url": "/inv/setup/chart-of-accounts"
    },
    {
      "img": "assets/images/avatars/subsidiary_inv_setup.jpg",
      "name": "Subsidiary Inv Setup",
      "key": "SUBSIDIARY_INV_SETUP",
      "note": "Subsidiary Inv Setup, Internal, External, boundaries etc ..",
      "url": "/inv/setup/subsidiary-inv-setup"
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
