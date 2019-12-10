import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { STORE_DOCUMENT_TYPES_VALIDATION_MESSAGES } from './stores-document-types.validations.messages';
import { StoresService } from 'src/app/services/stores.service';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-stores-document-types-form',
  templateUrl: './stores-document-types-form.component.html',
  styleUrls: ['./stores-document-types-form.component.scss']
})
export class StoresDocumentTypesFormComponent implements OnInit {


  storeItemsNoForm: FormGroup;

  validation_messages: any = STORE_DOCUMENT_TYPES_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() STORES_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private storesService: StoresService, private ui: UIService) {
   
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
  }

  /** Create Form */
  createForm():void {
    this.storeItemsNoForm = this._fb.group({
      STORES_ID:[this.STORES_ID],
      DOCUMENT_TYPE_ID: [null, [Validators.required]], 
      STATUS: [CONSTANTS.status.enabled, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm():void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.storeItemsNoForm.patchValue(this.formData)
    }
  }

  get DOCUMENT_TYPE_ID() {
    return this.storeItemsNoForm.controls.DOCUMENT_TYPE_ID;
  }
  get STATUS() {
    return this.storeItemsNoForm.controls.STATUS;
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  documentTypeList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.storesService.getallDocumentTypeList(),
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.documentTypeList = results[0].rows;
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
