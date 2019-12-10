import { Component, OnInit, Input } from '@angular/core';
import { FormGroup  } from '@angular/forms';
import { ITEM_ACCOUNTING_MESSAGES } from './item-accounting-form.validations.messages';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-accounting-form',
  templateUrl: './item-accounting-form.component.html',
})
export class ItemAccountingFormComponent implements OnInit {

  @Input() form: FormGroup;

  validation_messages: any = ITEM_ACCOUNTING_MESSAGES;

  constructor(
    private itemsService: ItemsService,
    private ui: UIService) {

    this.getAllLookups();

  }


  ngOnInit() {}

  /** ------------Lookups---------------- */
  isfetchingLookup: boolean = false
  chartsOfAccountsData: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getChartsOfAccounts()
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.chartsOfAccountsData = HelperUtil.treeify(results[0].rows, 'CHART_OF_ACCOUNTS_ID', 'PARENT_ACCOUNTS_ID', null)
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }

  // get COST_OF_SALES_ACCOUNT() {
  //   return this.form.controls.COST_OF_SALES_ACCOUNT
  // }
  // get SALES_ACCOUNT() {
  //   return this.form.controls.SALES_ACCOUNT
  // }
  // get EXPENSE_ACCOUNT() {
  //   return this.form.controls.EXPENSE_ACCOUNT
  // }
  // get ENCUMBRANCE_ACCOUNT() {
  //   return this.form.controls.ENCUMBRANCE_ACCOUNT
  // }

}
