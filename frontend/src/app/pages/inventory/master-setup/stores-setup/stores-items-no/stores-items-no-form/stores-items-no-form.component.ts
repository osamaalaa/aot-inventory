import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { STORE_ITEMS_NO_VALIDATION_MESSAGES } from './stores-items-no-form.validations.messages';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-stores-items-no-form',
  templateUrl: './stores-items-no-form.component.html',
  styleUrls: ['./stores-items-no-form.component.scss']
})
export class StoresItemsNoFormComponent implements OnInit {

  lang: string;

  storeItemsNoForm: FormGroup;

  validation_messages: any = STORE_ITEMS_NO_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() STORES_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private storesService: StoresService, private ui: UIService, public translate: TranslateService
  ) {

    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();

  }

  /** Create Form */
  createForm(): void {
    this.storeItemsNoForm = this._fb.group({
      STORES_ID: [this.STORES_ID],
      ITEMS_ID: [null, [Validators.required]],
      STATUS: [CONSTANTS.status.enabled, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
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

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.storeItemsNoForm.patchValue(this.formData)
    }
  }

  get ITEMS_ID() {
    return this.storeItemsNoForm.controls.ITEMS_ID;
  }
  get STATUS() {
    return this.storeItemsNoForm.controls.STATUS;
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  itemsList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.storesService.getallitems(),
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.itemsList = results[0].rows;
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.storeItemsNoForm.valid) {
      this.onSubmit.emit(this.storeItemsNoForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }


}
