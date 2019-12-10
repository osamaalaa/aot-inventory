import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ItemsService } from 'src/app/services/items.service'
import { forkJoin } from 'rxjs'
import { UIService } from 'src/app/services/ui.service'
import { ITEM_TEMPLATE_VALIDATION_MESSAGES } from './item-template-validation.messages'
import { CONSTANTS } from 'src/app/services/constants.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-item-template-form',
  templateUrl: './item-template-form.component.html',
  styleUrls: ['./item-template-form.component.scss'],
})
export class ItemTemplateFormComponent implements OnInit {

  lang: string;

  itemTemplateForm: FormGroup

  validation_messages: any = ITEM_TEMPLATE_VALIDATION_MESSAGES

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private itemsService: ItemsService, private ui: UIService, public translate: TranslateService) {
    this.createForm()
    this.getAllLookups()
  }

  ngOnInit() {
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage()

  }

  /** Create Form */
  createForm() {
    this.itemTemplateForm = this._fb.group({
      AR_NAME: ['', [Validators.required, Validators.required]],
      EN_NAME: ['', [Validators.required]],
      AR_DESCRIPTION: [''],
      EN_DESCRIPTION: [''],
      ITEMS_GROUP_ID: [null, [Validators.required]],
      ITEM_KIND: [null, [Validators.required]],
      ITEM_CLASS: [null, [Validators.required]],
      ITEM_NATURE: [null, [Validators.required]],
      BALANCE_NATURE: [null, [Validators.required]],
      NUMBER_OF_UNITS: [null, [Validators.required]],
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]], //TODO: Remove this field
      PROFIT_MARGIN: [null, [Validators.required]],
      QTY_ON_ORDER: [null, [Validators.required]],
      FOR_SALE: [1],
      STATUS: [CONSTANTS.status.enabled, [Validators.required]],
      IMAGES_ID: [1, []], //TODO: Remove this field
      TAX_SCHEME_ID: [null, [Validators.required]],
      SHORTAGE_POLICY_ID: [null, [Validators.required]],
      SLOW_POLICY_ID: [null, [Validators.required]],
    })
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
  /**
   * *Check if edit mode and patch the form
   */
  checkIfEditModeAndPatchForm() {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.itemTemplateForm.patchValue(this.formData)
    }
  }



  get AR_NAME() {
    return this.itemTemplateForm.controls.AR_NAME
  }
  get EN_NAME() {
    return this.itemTemplateForm.controls.EN_NAME
  }
  get AR_DESCRIPTION() {
    return this.itemTemplateForm.controls.AR_DESCRIPTION
  }
  get EN_DESCRIPTION() {
    return this.itemTemplateForm.controls.EN_DESCRIPTION
  }
  get ITEMS_GROUP_ID() {
    return this.itemTemplateForm.controls.ITEMS_GROUP_ID
  }
  get ITEM_KIND() {
    return this.itemTemplateForm.controls.ITEM_KIND
  }
  get ITEM_CLASS() {
    return this.itemTemplateForm.controls.ITEM_CLASS
  }
  get ITEM_NATURE() {
    return this.itemTemplateForm.controls.ITEM_NATURE
  }
  get BALANCE_NATURE() {
    return this.itemTemplateForm.controls.BALANCE_NATURE
  }
  get NUMBER_OF_UNITS() {
    return this.itemTemplateForm.controls.NUMBER_OF_UNITS
  }
  get SUBSIDIARY_ID() {
    return this.itemTemplateForm.controls.SUBSIDIARY_ID
  }
  get PROFIT_MARGIN() {
    return this.itemTemplateForm.controls.PROFIT_MARGIN
  }
  get QTY_ON_ORDER() {
    return this.itemTemplateForm.controls.QTY_ON_ORDER
  }
  get FOR_SALE() {
    return this.itemTemplateForm.controls.FOR_SALE
  }
  get STATUS() {
    return this.itemTemplateForm.controls.STATUS
  }
  get IMAGES_ID() {
    return this.itemTemplateForm.controls.IMAGES_ID
  }
  get TAX_SCHEME_ID() {
    return this.itemTemplateForm.controls.TAX_SCHEME_ID
  }
  get SHORTAGE_POLICY_ID() {
    return this.itemTemplateForm.controls.SHORTAGE_POLICY_ID
  }
  get SLOW_POLICY_ID() {
    return this.itemTemplateForm.controls.SLOW_POLICY_ID
  }
  get CREATED_BY() {
    return this.itemTemplateForm.controls.CREATED_BY
  }

  // --------- lookups --------------

  isfetchingLookup: boolean = false
  groups: any[] = []
  kinds: any[] = []
  classes: any[] = []
  natures: any[] = []
  bnatures: any[] = []
  subsidaries: any[] = []
  taxList: any[] = []
  slowMovingPolicyList: any[] = []
  shortagePolicyList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getallgroups(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemKind),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemClass),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemNature),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.bNature),
      this.itemsService.getTaxList(),
      this.itemsService.getSlowMovingPolicyList(),
      this.itemsService.getShortagePolicy(),
    ).subscribe(
      results => {
        this.groups = HelperUtil.treeify(results[0].rows, 'ITEMS_GROUP_ID', 'PARENT_ITEMS_GROUP_ID', null)
        this.kinds = results[1].rows
        this.classes = results[2].rows
        this.natures = results[3].rows
        this.bnatures = results[4].rows
        this.taxList = results[5].rows
        this.slowMovingPolicyList = results[6].rows
        this.shortagePolicyList = results[7].rows
        this.isfetchingLookup = false

      
      },
      error => {
        this.isfetchingLookup = false
        this.ui.createMessage('error', 'error while getting data')
      },
    )
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.itemTemplateForm.valid) {
      let body = { ...this.itemTemplateForm.value }
      body.FOR_SALE = body.FOR_SALE == true ? 1 : body.FOR_SALE == 1 ? 1 : 0;

      this.onSubmit.emit(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }
}
