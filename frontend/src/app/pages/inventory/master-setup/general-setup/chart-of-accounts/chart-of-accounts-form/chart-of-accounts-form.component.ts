import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CHART_OF_ACCOUNTS_VALIDATION_MESSAGES } from './chart-of-accounts.validations.messages';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { CONSTANTS } from 'src/app/services/constants.service';
import { ItemsService } from 'src/app/services/items.service';
// import { HelperUtil } from 'src/app/common/Helper.Util';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-chart-of-accounts-form',
  templateUrl: './chart-of-accounts-form.component.html',
  styleUrls: ['./chart-of-accounts-form.component.scss']
})
export class ChartOfAccountsFormComponent implements OnInit {

  lang:string;

  chartOfAccountForm: FormGroup

  validation_messages: any = CHART_OF_ACCOUNTS_VALIDATION_MESSAGES

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder, 
    private generalSetupService: GeneralSetupService, 
    private itemsService:ItemsService,
    private ui: UIService,public translate: TranslateService) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.checkIfEditModeAndPatchForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  /** Create Form */
  createForm() {
    this.chartOfAccountForm = this._fb.group({
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID],
      ACCOUNT_CODE: [null, [Validators.required]],
      AR_NAME: [null, [Validators.required]],
      EN_NAME: [null, [Validators.required]],
      AR_DESCRIPTION: [null],
      EN_DESCRIPTION: [null],
      SUB_JOURNALS_COMPULSION: [0],
      SUB_JOURNALS_ID: [null],
      COST_CENTER_COMPULSION: [0],
      COST_CENTER_PATTERNS_ID: [null],
      ACCOUNT_TYPE: [1, [Validators.required]],
      ACCOUNT_NATURE: [1, [Validators.required]],
      GENERAL_CHART_OF_ACCOUNT_ID: [null],
      PARENT_ACCOUNTS_ID: [null],
      TREE_LEVEL: [null],
      TREE_PARENT_CODE: [null],
      FULL_ACCOUNT_CODE: [null],
      STATUS: [CONSTANTS.status.enabled, [Validators.required]],
      CREATED_BY:[1]
    })
  }

  /**
   * *Check if edit mode and patch the form
   */
  checkIfEditModeAndPatchForm() {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.chartOfAccountForm.patchValue(this.formData)
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

  get SUBSIDIARY_ID() {
    return this.chartOfAccountForm.controls.SUBSIDIARY_ID
  }
  get ACCOUNT_CODE() {
    return this.chartOfAccountForm.controls.ACCOUNT_CODE
  }
  get AR_NAME() {
    return this.chartOfAccountForm.controls.AR_NAME
  }
  get EN_NAME() {
    return this.chartOfAccountForm.controls.EN_NAME
  }
  get AR_DESCRIPTION() {
    return this.chartOfAccountForm.controls.AR_DESCRIPTION
  }
  get EN_DESCRIPTION() {
    return this.chartOfAccountForm.controls.EN_DESCRIPTION
  }
  get SUB_JOURNALS_COMPULSION() {
    return this.chartOfAccountForm.controls.SUB_JOURNALS_COMPULSION
  }
  get SUB_JOURNALS_ID() {
    return this.chartOfAccountForm.controls.SUB_JOURNALS_ID
  }
  get COST_CENTER_COMPULSION() {
    return this.chartOfAccountForm.controls.COST_CENTER_COMPULSION
  }
  get COST_CENTER_PATTERNS_ID() {
    return this.chartOfAccountForm.controls.COST_CENTER_PATTERNS_ID
  }
  get ACCOUNT_TYPE() {
    return this.chartOfAccountForm.controls.ACCOUNT_TYPE
  }
  get ACCOUNT_NATURE() {
    return this.chartOfAccountForm.controls.ACCOUNT_NATURE
  }
  get GENERAL_CHART_OF_ACCOUNT_ID() {
    return this.chartOfAccountForm.controls.GENERAL_CHART_OF_ACCOUNT_ID
  }
  get PARENT_ACCOUNTS_ID() {
    return this.chartOfAccountForm.controls.PARENT_ACCOUNTS_ID
  }
  get TREE_LEVEL() {
    return this.chartOfAccountForm.controls.TREE_LEVEL
  }
  get TREE_PARENT_CODE() {
    return this.chartOfAccountForm.controls.TREE_PARENT_CODE
  }
  get FULL_ACCOUNT_CODE() {
    return this.chartOfAccountForm.controls.FULL_ACCOUNT_CODE
  }
  get STATUS() {
    return this.chartOfAccountForm.controls.STATUS
  }

  // --------- lookups --------------

  isfetchingLookup: boolean = false
  storeList: any[] = []
  storeLocationList: any[] = [];
  accountTypeList:any[] = [];
  accountNatureList:any[] = [];
  chartOfAccounts = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.generalSetupService.getChartOfAccounts(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.accType),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.accNature),
    ).subscribe(
      results => {
        
        // this.storeLocationList = results[0].rows
        this.chartOfAccounts = HelperUtil.treeify(results[0].rows, 'CHART_OF_ACCOUNTS_ID', 'PARENT_ACCOUNTS_ID', null)
        this.accountTypeList = results[1].rows;
        this.accountNatureList = results[2].rows;
        this.isfetchingLookup = false
      },
      error => {
        this.isfetchingLookup = false
        this.ui.createMessage('error', 'error while getting data : ' + error)
      },
    )
  }

  /** On Form Submit */
  submitForm(): void {
    if (this.chartOfAccountForm.valid) {
      this.onSubmit.emit(this.chartOfAccountForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}
