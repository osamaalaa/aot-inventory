import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { STORES_VALIDATION_MESSAGES } from './stores-form.validations.messages';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';

const STORE_TYPE_LIST = [{
  id: 1,
  label: 'Store'
},
{
  id: 2,
  label: 'Receiving Area'
},
{
  id: 3,
  label: 'Inspection Area'
}]

@Component({
  selector: 'app-stores-form',
  templateUrl: './stores-form.component.html',
  styleUrls: ['./stores-form.component.scss']
})
export class StoresFormComponent implements OnInit {


  lang: string;

  storesForm: FormGroup;

  validation_messages: any = STORES_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private storesService: StoresService,
    private ui: UIService,
    public translate: TranslateService) {
    this.getAllLookups();
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();

  }

  store_type_list = [{
    id: 1, label: {
      en: "Main Store",
      ar: "المستودع الرئيسي",
    }
  }, {
    id: 5, label: {
      en: "ٌReturn Store",
      ar: "مستودع الاسترجاع",
    }
  }]

  /** Create Form */
  createForm(): void {
    this.storesForm = this._fb.group({
      STORES_CODE: [null, [Validators.required]],
      AR_NAME: [null, [Validators.required]],
      EN_NAME: [null, [Validators.required]],
      PARENT_STORES_ID: [null],
      STORE_TYPE: [null, [Validators.required]],
      ISSUE_POLICY: [1, [Validators.required]],
      PROFIT_MARGIN: [0],
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]],
      COST_METHOD: [12300, [Validators.required]],
      PICKING_RULE_ID: [null],
      MATERIAL_ACCOUNT: [null],
      MATERIAL_OVERHEAD_ACCOUNT: [null],
      MATL_OVHD_ABSORPTION_ACCT: [null],
      RESOURCE_ACCOUNT: [null],
      PURCHASE_PRICE_VAR_ACCOUNT: [null],
      AP_ACCRUAL_ACCOUNT: [null],
      OVERHEAD_ACCOUNT: [null],
      OUTSIDE_PROCESSING_ACCOUNT: [null],
      INTRANSIT_INV_ACCOUNT: [null],
      INTERORG_RECEIVABLES_ACCOUNT: [null],
      INTERORG_PRICE_VAR_ACCOUNT: [null],
      INTERORG_PAYABLES_ACCOUNT: [null],
      COST_OF_SALES_ACCOUNT: [null],
      ENCUMBRANCE_ACCOUNT: [null],
      PROJECT_COST_ACCOUNT: [null],
      STORE_KEEPER: [null],
      INTERORG_TRANSFER_CR_ACCOUNT: [null],
      INVOICE_PRICE_VAR_ACCOUNT: [null],
      AVERAGE_COST_VAR_ACCOUNT: [null],
      SALES_ACCOUNT: [null],
      CREATED_BY: [null],
      EXPENSE_ACCOUNT: [null],
      BORRPAY_MATL_VAR_ACCOUNT: [null],
      BORRPAY_MOH_VAR_ACCOUNT: [null],
      BORRPAY_RES_VAR_ACCOUNT: [null],
      BORRPAY_OSP_VAR_ACCOUNT: [null],
      BORRPAY_OVH_VAR_ACCOUNT: [null],
      DEFERRED_COGS_ACCOUNT: [null],

    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.storesForm.patchValue(this.formData)
    }
  }



  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {

      this.lang = lang.lang
      console.log(this.lang)
    })
  }



  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  get STORES_CODE() {
    return this.storesForm.controls.STORES_CODE
  }
  get AR_NAME() {
    return this.storesForm.controls.AR_NAME
  }
  get EN_NAME() {
    return this.storesForm.controls.EN_NAME
  }
  get PARENT_STORES_ID() {
    return this.storesForm.controls.PARENT_STORES_ID
  }
  get STORE_TYPE() {
    return this.storesForm.controls.STORE_TYPE
  }
  get ISSUE_POLICY() {
    return this.storesForm.controls.ISSUE_POLICY
  }
  get PROFIT_MARGIN() {
    return this.storesForm.controls.PROFIT_MARGIN
  }
  get SUBSIDIARY_ID() {
    return this.storesForm.controls.SUBSIDIARY_ID
  }
  get COST_METHOD() {
    return this.storesForm.controls.COST_METHOD
  }
  get PICKING_RULE_ID() {
    return this.storesForm.controls.PICKING_RULE_ID
  }
  get MATERIAL_ACCOUNT() {
    return this.storesForm.controls.MATERIAL_ACCOUNT
  }
  get MATERIAL_OVERHEAD_ACCOUNT() {
    return this.storesForm.controls.MATERIAL_OVERHEAD_ACCOUNT
  }
  get MATL_OVHD_ABSORPTION_ACCT() {
    return this.storesForm.controls.MATL_OVHD_ABSORPTION_ACCT
  }
  get RESOURCE_ACCOUNT() {
    return this.storesForm.controls.RESOURCE_ACCOUNT
  }
  get PURCHASE_PRICE_VAR_ACCOUNT() {
    return this.storesForm.controls.PURCHASE_PRICE_VAR_ACCOUNT
  }
  get AP_ACCRUAL_ACCOUNT() {
    return this.storesForm.controls.AP_ACCRUAL_ACCOUNT
  }
  get OVERHEAD_ACCOUNT() {
    return this.storesForm.controls.OVERHEAD_ACCOUNT
  }
  get OUTSIDE_PROCESSING_ACCOUNT() {
    return this.storesForm.controls.OUTSIDE_PROCESSING_ACCOUNT
  }
  get INTRANSIT_INV_ACCOUNT() {
    return this.storesForm.controls.INTRANSIT_INV_ACCOUNT
  }
  get INTERORG_RECEIVABLES_ACCOUNT() {
    return this.storesForm.controls.INTERORG_RECEIVABLES_ACCOUNT
  }
  get INTERORG_PRICE_VAR_ACCOUNT() {
    return this.storesForm.controls.INTERORG_PRICE_VAR_ACCOUNT
  }
  get INTERORG_PAYABLES_ACCOUNT() {
    return this.storesForm.controls.INTERORG_PAYABLES_ACCOUNT
  }
  get COST_OF_SALES_ACCOUNT() {
    return this.storesForm.controls.COST_OF_SALES_ACCOUNT
  }
  get ENCUMBRANCE_ACCOUNT() {
    return this.storesForm.controls.ENCUMBRANCE_ACCOUNT
  }
  get PROJECT_COST_ACCOUNT() {
    return this.storesForm.controls.PROJECT_COST_ACCOUNT
  }
  get INTERORG_TRANSFER_CR_ACCOUNT() {
    return this.storesForm.controls.INTERORG_TRANSFER_CR_ACCOUNT
  }
  get INVOICE_PRICE_VAR_ACCOUNT() {
    return this.storesForm.controls.INVOICE_PRICE_VAR_ACCOUNT
  }
  get AVERAGE_COST_VAR_ACCOUNT() {
    return this.storesForm.controls.AVERAGE_COST_VAR_ACCOUNT
  }
  get SALES_ACCOUNT() {
    return this.storesForm.controls.SALES_ACCOUNT
  }
  get EXPENSE_ACCOUNT() {
    return this.storesForm.controls.EXPENSE_ACCOUNT
  }
  get BORRPAY_MATL_VAR_ACCOUNT() {
    return this.storesForm.controls.BORRPAY_MATL_VAR_ACCOUNT
  }
  get BORRPAY_MOH_VAR_ACCOUNT() {
    return this.storesForm.controls.BORRPAY_MOH_VAR_ACCOUNT
  }
  get BORRPAY_RES_VAR_ACCOUNT() {
    return this.storesForm.controls.BORRPAY_RES_VAR_ACCOUNT
  }
  get BORRPAY_OSP_VAR_ACCOUNT() {
    return this.storesForm.controls.BORRPAY_OSP_VAR_ACCOUNT
  }
  get BORRPAY_OVH_VAR_ACCOUNT() {
    return this.storesForm.controls.BORRPAY_OVH_VAR_ACCOUNT
  }
  get DEFERRED_COGS_ACCOUNT() {
    return this.storesForm.controls.DEFERRED_COGS_ACCOUNT
  }
  get STORE_KEEPER() {
    return this.storesForm.controls.STORE_KEEPER
  }


  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  chartsOfAccountList = [];
  storeTypeList = STORE_TYPE_LIST;
  storeList = [];
  costOfMethods = [];
  pickingRule = [];
  issuePolicy = [];
  employeeList = [];
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.storesService.getChartsOfAccounts(),
      this.storesService.getAllStores(),
      this.storesService.getLookUps(CONSTANTS.LOOKUPS.costmethodStore),
      this.storesService.getLookUps(CONSTANTS.LOOKUPS.pickingRule),
      this.storesService.getLookUps(CONSTANTS.LOOKUPS.issuePolicy),
      this.storesService.getAllEmployees()
    ).subscribe(
      results => {
        this.isfetchingLookup = false;

        this.chartsOfAccountList = HelperUtil.treeify(results[0].rows, 'CHART_OF_ACCOUNTS_ID', 'PARENT_ACCOUNTS_ID', null)
        this.storeList = HelperUtil.treeify(results[1].rows, 'STORES_ID', 'PARENT_STORES_ID', null);
        this.costOfMethods = results[2].rows;
        this.pickingRule = results[3].rows;
        this.issuePolicy = results[4].rows;
        this.employeeList = results[5].rows;
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }

  removeSelf


  /** On Form Submit */
  submitForm(): void {
    if (this.storesForm.valid) {
      this.onSubmit.emit(this.storesForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}
