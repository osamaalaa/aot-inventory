import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { SUB_INV_VALIDATION_MESSAGES } from './subsidiary-inv-setup-form.validations.messages';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';
import { ItemsService } from 'src/app/services/items.service';



@Component({
  selector: 'app-subsidiary-inv-setup-form',
  templateUrl: './subsidiary-inv-setup-form.component.html',
  styleUrls: ['./subsidiary-inv-setup-form.component.scss']
})
export class SubsidiaryInvSetupFormComponent implements OnInit {

  lang: string;

  subidiaryInvForm: FormGroup;

  validation_messages: any = SUB_INV_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder, 
    private generalSetupService: GeneralSetupService, 
    private itemsService:ItemsService,
    private ui: UIService, 
    public translate: TranslateService) {

    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();

  }

  /** Create Form */
  createForm() {
    this.subidiaryInvForm = this._fb.group({
      COST_METHOD: [null, [Validators.required]],
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
      INTERORG_TRANSFER_CR_ACCOUNT: [null],
      INVOICE_PRICE_VAR_ACCOUNT: [null],
      AVERAGE_COST_VAR_ACCOUNT: [null],
      SALES_ACCOUNT: [null],
      EXPENSE_ACCOUNT: [null],
      BORRPAY_MATL_VAR_ACCOUNT: [null],
      BORRPAY_MOH_VAR_ACCOUNT: [null],
      BORRPAY_RES_VAR_ACCOUNT: [null],
      BORRPAY_OSP_VAR_ACCOUNT: [null],
      BORRPAY_OVH_VAR_ACCOUNT: [null],
      DEFERRED_COGS_ACCOUNT: [null],
      COSTING_CURRENCY_ID: [null, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]]
    })
  }

  /**
   * *Check if edit mode and patch the form
   */
  checkIfEditModeAndPatchForm() {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.formData.LAST_RECIEVED = this.formData.LAST_RECIEVED ? new Date(this.formData.LAST_RECIEVED) : null;
      this.formData.LAST_SOLD = this.formData.LAST_SOLD ? new Date(this.formData.LAST_SOLD) : null;

      this.subidiaryInvForm.patchValue(this.formData)
    }
  }


  get COST_METHOD() {
    return this.subidiaryInvForm.controls.COST_METHOD
  }
  get PICKING_RULE_ID() {
    return this.subidiaryInvForm.controls.PICKING_RULE_ID
  }

  get MATERIAL_ACCOUNT() {
    return this.subidiaryInvForm.controls.MATERIAL_ACCOUNT
  }
  get MATERIAL_OVERHEAD_ACCOUNT() {
    return this.subidiaryInvForm.controls.MATERIAL_OVERHEAD_ACCOUNT
  }
  get MATL_OVHD_ABSORPTION_ACCT() {
    return this.subidiaryInvForm.controls.MATL_OVHD_ABSORPTION_ACCT
  }
  get RESOURCE_ACCOUNT() {
    return this.subidiaryInvForm.controls.RESOURCE_ACCOUNT
  }
  get PURCHASE_PRICE_VAR_ACCOUNT() {
    return this.subidiaryInvForm.controls.PURCHASE_PRICE_VAR_ACCOUNT
  }
  get AP_ACCRUAL_ACCOUNT() {
    return this.subidiaryInvForm.controls.AP_ACCRUAL_ACCOUNT
  }
  get OVERHEAD_ACCOUNT() {
    return this.subidiaryInvForm.controls.OVERHEAD_ACCOUNT
  }

  get OUTSIDE_PROCESSING_ACCOUNT() {
    return this.subidiaryInvForm.controls.OUTSIDE_PROCESSING_ACCOUNT
  }

  get INTRANSIT_INV_ACCOUNT() {
    return this.subidiaryInvForm.controls.INTRANSIT_INV_ACCOUNT
  }
  get INTERORG_RECEIVABLES_ACCOUNT() {
    return this.subidiaryInvForm.controls.INTERORG_RECEIVABLES_ACCOUNT
  }

  get INTERORG_PRICE_VAR_ACCOUNT() {
    return this.subidiaryInvForm.controls.INTERORG_PRICE_VAR_ACCOUNT
  }
  get INTERORG_PAYABLES_ACCOUNT() {
    return this.subidiaryInvForm.controls.INTERORG_PAYABLES_ACCOUNT
  }
  get COST_OF_SALES_ACCOUNT() {
    return this.subidiaryInvForm.controls.COST_OF_SALES_ACCOUNT
  }
  get ENCUMBRANCE_ACCOUNT() {
    return this.subidiaryInvForm.controls.ENCUMBRANCE_ACCOUNT
  }

  get PROJECT_COST_ACCOUNT() {
    return this.subidiaryInvForm.controls.PROJECT_COST_ACCOUNT
  }
  get INTERORG_TRANSFER_CR_ACCOUNT() {
    return this.subidiaryInvForm.controls.INTERORG_TRANSFER_CR_ACCOUNT
  }
  get INVOICE_PRICE_VAR_ACCOUNT() {
    return this.subidiaryInvForm.controls.INVOICE_PRICE_VAR_ACCOUNT
  }

  get AVERAGE_COST_VAR_ACCOUNT() {
    return this.subidiaryInvForm.controls.AVERAGE_COST_VAR_ACCOUNT
  }
  get SALES_ACCOUNT() {
    return this.subidiaryInvForm.controls.SALES_ACCOUNT
  }
  get EXPENSE_ACCOUNT() {
    return this.subidiaryInvForm.controls.EXPENSE_ACCOUNT
  }
  get BORRPAY_MATL_VAR_ACCOUNT() {
    return this.subidiaryInvForm.controls.BORRPAY_MATL_VAR_ACCOUNT
  }

  get BORRPAY_MOH_VAR_ACCOUNT() {
    return this.subidiaryInvForm.controls.BORRPAY_MOH_VAR_ACCOUNT
  }
  get BORRPAY_RES_VAR_ACCOUNT() {
    return this.subidiaryInvForm.controls.BORRPAY_RES_VAR_ACCOUNT
  }
  get BORRPAY_OSP_VAR_ACCOUNT() {
    return this.subidiaryInvForm.controls.BORRPAY_OSP_VAR_ACCOUNT
  }

  get BORRPAY_OVH_VAR_ACCOUNT() {
    return this.subidiaryInvForm.controls.BORRPAY_OVH_VAR_ACCOUNT
  }
  get DEFERRED_COGS_ACCOUNT() {
    return this.subidiaryInvForm.controls.DEFERRED_COGS_ACCOUNT
  }
  get COSTING_CURRENCY_ID() {
    return this.subidiaryInvForm.controls.COSTING_CURRENCY_ID
  }


  // --------- lookups --------------

  isfetchingLookup: boolean = false
  chartsOfAccountList = []
  costMethods = []
  pickingRule = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.generalSetupService.getChartOfAccounts(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.costmethod),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.pickingRule)

    ).subscribe(
      results => {
        this.chartsOfAccountList = HelperUtil.treeify(results[0].rows, 'CHART_OF_ACCOUNTS_ID', 'PARENT_ACCOUNTS_ID', null),
        this.costMethods = results[1].rows
        this.pickingRule = results[2].rows
        this.isfetchingLookup = false
      },
      error => {
        this.isfetchingLookup = false
        this.ui.createMessage('error', 'error while getting data : ' + error)
      },
    )
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

  /** On Form Submit */
  submitForm(): void {
    if (this.subidiaryInvForm.valid) {
      this.onSubmit.emit(this.subidiaryInvForm.valid)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }


  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}
