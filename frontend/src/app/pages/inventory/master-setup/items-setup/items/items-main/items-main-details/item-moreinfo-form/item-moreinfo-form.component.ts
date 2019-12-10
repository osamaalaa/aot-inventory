import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITEM_MORE_INFO_MESSAGES } from './item-moreinfo-form.validations.messages';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-moreinfo-form',
  templateUrl: './item-moreinfo-form.component.html',
})
export class ItemMoreinfoFormComponent implements OnInit {

  @Input() form: FormGroup;

  validation_messages: any = ITEM_MORE_INFO_MESSAGES;

  constructor() {}
  data= [ ]
  ngOnInit() {}

  // get ACCEPTABLE_RATE_DECREASE() {
  //   return this.form.controls.ACCEPTABLE_RATE_DECREASE
  // }
  // get WARRANTY_VENDOR_ID() {
  //   return this.form.controls.WARRANTY_VENDOR_ID
  // }
  // get ACCEPTABLE_RATE_INCREASE() {
  //   return this.form.controls.ACCEPTABLE_RATE_INCREASE
  // }
  // get MAX_WARRANTY_AMOUNT() {
  //   return this.form.controls.MAX_WARRANTY_AMOUNT
  // }
  // get ASSET_CATEGORY_ID() {
  //   return this.form.controls.ASSET_CATEGORY_ID
  // }


}
