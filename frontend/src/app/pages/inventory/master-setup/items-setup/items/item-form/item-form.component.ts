import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ITEM_VALIDATION_MESSAGES } from './items.validations.messages';
import { forkJoin } from 'rxjs';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { CONSTANTS } from 'src/app/services/constants.service';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  lang: string;

  itemForm: FormGroup;

  validation_messages: any = ITEM_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;

  /**Event Emitters */
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();


  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private uIService: UIService,
    private drawer: NzDrawerRef,
    public translate: TranslateService
  ) {
    this.getAllLookups();
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();

  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      let body = { ...this.formData }
      this.itemForm.patchValue(body)
    }
  }

  /**Create Form  */
  createForm(): void {
    this.itemForm = this.fb.group({
      AR_NAME: [null, [Validators.required, Validators.required]],
      EN_NAME: [null, [Validators.required]],
      AR_DESCRIPTION: [null],
      EN_DESCRIPTION: [null],
      ITEMS_GROUP_ID: [null, [Validators.required]],
      ITEM_KIND: [null, [Validators.required]],
      ITEM_CLASS: [null, [Validators.required]],
      ITEM_NATURE: [null, [Validators.required]],
      BALANCE_NATURE: [null, [Validators.required]],
      NUMBER_OF_UNITS: [0, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required],],// TODO: Remove this field 
      PROFIT_MARGIN: [1, [Validators.required]],
      QTY_ON_ORDER: [1, [Validators.required]],
      FOR_SALE: [1, [Validators.required]],
      STATUS: [CONSTANTS.status.enabled, [Validators.required]],
      IMAGES_ID: [1, [Validators.required]],//TODO : Remove default value of image
      TAX_SCHEME_ID: [null, [Validators.required]],
      SHORTAGE_POLICY_ID: [null, [Validators.required]],
      SLOW_POLICY_ID: [null, [Validators.required]],
      ITEM_CODE: [null, [Validators.required],this.validateItemCode.bind(this)],
      ITEMS_TEMPLATE_ID: [null],
      ALIASES_TYPE_ID: [null, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]]// TODO: Remove this field 
    })
  }

  /** ------------Lookups---------------- */
  isfetchingLookup: boolean = false
  groups: any[] = []
  kinds: any[] = []
  classes: any[] = []
  natures: any[] = []
  bnatures: any[] = [];
  slowMovingPolicyList: any[] = [];
  taxList: any[] = []
  shortagePolicyList: any[] = [];
  templateList: any[] = [];
  aliasTypeList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getallgroups(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemKind),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemClass),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemNature),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.bNature),
      this.itemsService.getSlowMovingPolicyList(),
      this.itemsService.getShortagePolicy(),
      this.itemsService.getTaxList(),
      this.itemsService.getItemTemplates(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.aliasType)
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.kinds = results[1].rows;
        this.classes = results[2].rows;
        this.natures = results[3].rows;
        this.bnatures = results[4].rows;
        this.slowMovingPolicyList = results[5].rows;
        this.shortagePolicyList = results[6].rows;
        this.taxList = results[7].rows;
        this.templateList = results[8].rows;
        this.aliasTypeList = results[9].rows;
        this.groups = HelperUtil.treeify(results[0].rows, 'ITEMS_GROUP_ID', 'PARENT_ITEMS_GROUP_ID', null)
      },
      error => {
        this.isfetchingLookup = false;
        this.uIService.createMessage('error', 'error while getting data : ' + error);
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

  onTemplateSelect(e) {
    if (e) {
      this.itemForm.patchValue(e)
    } else {
      this.itemForm.reset()
    }

    /**
 * TODO: Remove this setting
 */
    this.itemForm.controls.CREATED_BY.setValue(1)
    this.itemForm.controls.SUBSIDIARY_ID.setValue(1)
    this.itemForm.controls.IMAGES_ID.setValue(1)
    this.itemForm.controls.STATUS.setValue(e.STATUS.toString())
    console.log(e)
  }


  /**Submit form data. Form value is emitted to parent component */
  submitForm() {
    if (this.itemForm.valid) {
      let body = { ...this.itemForm.value }
      this.drawer.close(body)
      this.onSubmit.emit(body);
    } else {
      this.uIService.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** On Cancel. Event is emitted to parent component */
  cancel(): void {

    this.drawer.close()
  }


  get AR_NAME() {
    return this.itemForm.controls.AR_NAME
  }
  get EN_NAME() {
    return this.itemForm.controls.EN_NAME
  }
  get AR_DESCRIPTION() {
    return this.itemForm.controls.AR_DESCRIPTION
  }
  get EN_DESCRIPTION() {
    return this.itemForm.controls.EN_DESCRIPTION
  }
  get ITEMS_GROUP_ID() {
    return this.itemForm.controls.ITEMS_GROUP_ID
  }
  get ITEM_KIND() {
    return this.itemForm.controls.ITEM_KIND
  }
  get ITEM_CLASS() {
    return this.itemForm.controls.ITEM_CLASS
  }
  get ITEM_NATURE() {
    return this.itemForm.controls.ITEM_NATURE
  }
  get BALANCE_NATURE() {
    return this.itemForm.controls.BALANCE_NATURE
  }
  get NUMBER_OF_UNITS() {
    return this.itemForm.controls.NUMBER_OF_UNITS
  }
  get SUBSIDIARY_ID() {
    return this.itemForm.controls.SUBSIDIARY_ID
  }
  get PROFIT_MARGIN() {
    return this.itemForm.controls.PROFIT_MARGIN
  }
  get QTY_ON_ORDER() {
    return this.itemForm.controls.QTY_ON_ORDER
  }
  get FOR_SALE() {
    return this.itemForm.controls.FOR_SALE
  }
  get STATUS() {
    return this.itemForm.controls.STATUS
  }
  get IMAGES_ID() {
    return this.itemForm.controls.IMAGES_ID
  }
  get TAX_SCHEME_ID() {
    return this.itemForm.controls.TAX_SCHEME_ID
  }
  get SHORTAGE_POLICY_ID() {
    return this.itemForm.controls.SHORTAGE_POLICY_ID
  }
  get SLOW_POLICY_ID() {
    return this.itemForm.controls.SLOW_POLICY_ID
  }
  get CREATED_BY() {
    return this.itemForm.controls.CREATED_BY
  }
  get ALIASES_TYPE_ID() {
    return this.itemForm.controls.ALIASES_TYPE_ID
  }
  get ITEM_CODE() {
    return this.itemForm.controls.ITEM_CODE
  }

  validateItemCode(control: AbstractControl) {
    let ITEM_CODE = control.value ? control.value.trim() : control.value;
    return this.itemsService.checkItemCode(ITEM_CODE)
    .pipe(
      map(res => {
        if(res.status == 200){
          return { codeExists: true}
        }else{
          return null
        }
      })
    )
    
  }

}
