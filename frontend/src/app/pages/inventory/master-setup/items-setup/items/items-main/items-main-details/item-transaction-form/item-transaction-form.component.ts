import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITEM_TRANSACTION_MESSAGES } from './item-transaction.validations.messages';

@Component({
  selector: 'app-item-transaction-form',
  templateUrl: './item-transaction-form.component.html',
})
export class ItemTransactionFormComponent implements OnInit {

  @Input() form: FormGroup;

  validation_messages: any = ITEM_TRANSACTION_MESSAGES;

  constructor() {}

  ngOnInit() {}

  get FIXED_DAYS_SUPPLY() {
    return this.form.controls.FIXED_DAYS_SUPPLY
  }
  get ORDER_COST() {
    return this.form.controls.ORDER_COST
  }
  get MINIMUM_ORDER_QUANTITY() {
    return this.form.controls.MINIMUM_ORDER_QUANTITY
  }
  get MAXIMUM_ORDER_QUANTITY() {
    return this.form.controls.MAXIMUM_ORDER_QUANTITY
  }
  get FIXED_ORDER_QUANTITY() {
    return this.form.controls.FIXED_ORDER_QUANTITY
  }
}
