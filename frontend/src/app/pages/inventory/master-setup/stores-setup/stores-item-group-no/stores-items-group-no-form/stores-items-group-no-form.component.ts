
import { StoresService } from 'src/app/services/stores.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { STORES_ITEMS_GROUP_NO_VALIDATION_MESSAGES } from './stores-items-group-no-form.validation.messages';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-stores-items-group-no-form',
  templateUrl: './stores-items-group-no-form.component.html',
  styleUrls: ['./stores-items-group-no-form.component.scss']
})
export class StoresItemsGroupNoFormComponent implements OnInit {

  lang: string;


  storesitemgroupnoform: FormGroup;
  validation_messages: any = STORES_ITEMS_GROUP_NO_VALIDATION_MESSAGES;
  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() STORES_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private storesService: StoresService, private ui: UIService, public translate: TranslateService) {

    this.getAllItemGroup()
  }
  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
  }

  /** Create Form */
  createForm(): void {
    this.storesitemgroupnoform = this._fb.group({
      STORES_ID: [this.STORES_ID],
      ITEMS_GROUP_ID: [null, [Validators.required]],
      STATUS: [CONSTANTS.status.enabled, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }


  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.storesitemgroupnoform.patchValue(this.formData)
    }
  }

  get ITEMS_GROUP_ID() {
    return this.storesitemgroupnoform.controls.ITEMS_GROUP_ID
  }
  get STATUS() {
    return this.storesitemgroupnoform.controls.STATUS
  }

  storesitemgroupalldata: any[] = []
  getAllItemGroup() {
    this.storesService.getallgroups().subscribe(
      results => {
        this.storesitemgroupalldata = results.rows;

      },
      error => {
        this.ui.createMessage('error', 'error while getting data : ' + error);
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
    if (this.storesitemgroupnoform.valid) {
      this.onSubmit.emit(this.storesitemgroupnoform.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}

