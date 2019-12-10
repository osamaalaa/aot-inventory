
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { INVENTORY_PERIODS_GROUP_VALIDATION_MESSAGES } from './inventory-periods-form.validations.messages';
import { ItemsService } from 'src/app/services/items.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-inventory-periods-form',
  templateUrl: './inventory-periods-form.component.html',
  styleUrls: ['./inventory-periods-form.component.scss']
})

export class InventoryPeriodsFormComponent implements OnInit {
  inventoryperiodsgroupForm: FormGroup;
  validation_messages: any = INVENTORY_PERIODS_GROUP_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private itemsService: ItemsService,
    private translate: TranslateService,
    private ui: UIService) {

    this.createForm()
    //this.getAllLookups()
  }
  createForm(): void {
    this.inventoryperiodsgroupForm = this._fb.group({

      INVENTORY_PERIODS_CODE: [null, [Validators.required]],
      AR_NAME: [null, [Validators.required]],
      EN_NAME: [null, [Validators.required]],
      END_DATE: [null],
      START_DATE: [null],
      AR_DESCRIPTION: [null, [Validators.required]],
      EN_DESCRIPTION: [null, [Validators.required]],
      STATUS: [CONSTANTS.status.enabled, [Validators.required]],
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]],
      FINANCIAL_PERIODS_ID: [1, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]],

    })
  }


  cancel(): void {
    this.onCancel.emit()
  }

  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.inventoryperiodsgroupForm.patchValue(this.formData)
    }
  }

  get INVENTORY_PERIODS_CODE() {
    return this.inventoryperiodsgroupForm.controls.INVENTORY_PERIODS_CODE
  }

  get AR_NAME() {
    return this.inventoryperiodsgroupForm.controls.AR_NAME
  }

  get EN_NAME() {
    return this.inventoryperiodsgroupForm.controls.EN_NAME
  }

  get AR_DESCRIPTION() {
    return this.inventoryperiodsgroupForm.controls.AR_DESCRIPTION
  }

  get EN_DESCRIPTION() {
    return this.inventoryperiodsgroupForm.controls.EN_DESCRIPTION
  }

  get SUBSIDARIE_EN_NAME() {
    return this.inventoryperiodsgroupForm.controls.SUBSIDARIE_EN_NAME
  }

  get STATUS() {
    return this.inventoryperiodsgroupForm.controls.STATUS
  }

  get END_DATE() {
    return this.inventoryperiodsgroupForm.controls.END_DATE
  }

  get START_DATE() {
    return this.inventoryperiodsgroupForm.controls.START_DATE
  }

  ngOnInit() {
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  lang
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.inventoryperiodsgroupForm.valid) {
      this.onSubmit.emit(this.inventoryperiodsgroupForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

}
