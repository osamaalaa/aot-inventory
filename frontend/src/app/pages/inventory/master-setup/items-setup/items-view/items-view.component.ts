import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss']
})
export class ItemsViewComponent implements OnInit {

  itemViewData = [
    {
      "img": "assets/images/avatars/template.jpg",
      "name": "Template",
      "key":"TEMPLATE",
      "note": "Item Tempate, Internal, External, boundaries etc ..",
      "url": "/inv/setup/item-templates"
    },

    {
      "img": "assets/images/avatars/item_categories.jpg",
      "name": "Item Categories",
      "key":"Item Categories",
      "note": "Item Categories, Internal, External, boundaries etc ..",
      "url": "/inv/setup/item-groups"
    },

    {
      "img": "assets/images/avatars/shortage_policy_setup.jpg",
      "name": "Slow Moving Policy",
      "key":"SLOW_MOVING_POLICY",
      "note": "Slow Moving Policy, Internal, External, boundaries etc ..",
      "url": "/inv/setup/slow-moving-policy"
    },
    {
      "img": "assets/images/avatars/items_description.jpg",
      "name": "Items Definition",
      "key":"Items Definition",
      "note": "Items Definition, Internal, External, boundaries etc ..",
      "url": "/inv/setup/items-setup/items"
    },
      
    {
      "img": "assets/images/avatars/tax_setup.jpg",
      "name": "Tax Scheme Setup",
      "key":"TAX_SCHEME_SETUP",
      "note": "Tax scheme settings",
      "url": "/inv/setup/tax-schemes"
    },
    {
      "img": "assets/images/avatars/shortage_policy_setup.jpg",
      "name": "Shortage Policy",
      "key":"SHORTAGE_POLICY_SETUP",
      "note": "Shortage Policy Setup, ware Houses, Locations etc ..",
      "url": "/inv/setup/shortage-policy"
    },

  ]


  constructor() { }

  ngOnInit() {
  }

}
