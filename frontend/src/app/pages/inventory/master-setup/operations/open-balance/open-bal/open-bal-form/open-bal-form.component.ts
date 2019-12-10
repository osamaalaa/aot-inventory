import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OPEN_BAL_VALIDATION_MESSAGES } from './open-bal-form.validations.messages';
import { OperationsService } from 'src/app/services/operations.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { ItemsService } from 'src/app/services/items.service';


@Component({
  selector: 'app-open-balance-form',
  templateUrl: './open-bal-form.component.html',
  styles:[`

  `]
})
export class OpenBalFormComponent implements OnInit {


  form: FormGroup;

  validation_messages: any = OPEN_BAL_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  // @Input() STORES_ID = null;

  _readOnly:boolean = false;
  @Input() set readOnly(readOnly:boolean){
    this._readOnly = readOnly;
    this.disableFormIfReadonly();
  }

  get readOnly(){
    return this._readOnly;
  }

  @Output() onSubmit = new EventEmitter()
  @Output() onSaveAndSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder, 
    private operationsService:OperationsService, 
    private itemsService:ItemsService, 
    private ui: UIService) {
    this.createForm();
    this.getAllLookups()
  }

  ngOnInit() {

    this.checkIfEditModeAndPatchForm();
    this.disableFormIfReadonly();
    // this.patchStoreId();
  }

  // patchStoreId(){
  //   this.form.controls.STORES_ID.patchValue(this.STORES_ID)
  // }

  disableFormIfReadonly(){
    if(this.readOnly){
      this.form.disable();
    }
  }

  /** Create Form */
  createForm():void {
    this.form = this._fb.group({
      STORES_ID:[null,[Validators.required]],
      DOCUMENT_TYPE_ID: [
        CONSTANTS.DOCUMENT_TYPE_OPEN_BALANCE_ID, 
        [Validators.required]], 
      DOCUMENT_DATE: [null, [Validators.required]], 
      INVENTORY_PERIODS_ID: [null, [Validators.required]], 
      DOCUMENT_NO: [null, [Validators.required]], 
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]], //TODO:Remove hard coded value
      JOURNALS_ID: [1, [Validators.required]], //TODO:Remove hard coded value
      SOURCE_TYPE: [null, [Validators.required]], 
      DOCUMENT_STATUS: [CONSTANTS.DOCUMENT_STATUS.NEW, [Validators.required]], 
      NOTES: [null], 
      VALDIATED_BY: [null], 
      VALDIATED_DATE: [null], 
      CONFIRMED_BY: [null], 
      CONFIRMED_DATE: [null], 
      // WF_REQUEST_ID:[null],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm():void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.form.patchValue(this.formData)
    }
  }

  get DOCUMENT_TYPE_ID() {
    return this.form.controls.DOCUMENT_TYPE_ID;
  }
  get DOCUMENT_DATE() {
    return this.form.controls.DOCUMENT_DATE;
  }
  get INVENTORY_PERIODS_ID() {
    return this.form.controls.INVENTORY_PERIODS_ID;
  }
  get DOCUMENT_NO() {
    return this.form.controls.DOCUMENT_NO;
  }
  get JOURNALS_ID() {
    return this.form.controls.JOURNALS_ID;
  }
  get SOURCE_TYPE() {
    return this.form.controls.SOURCE_TYPE;
  }
  get DOCUMENT_STATUS() {
    return this.form.controls.DOCUMENT_STATUS;
  }
  get NOTES() {
    return this.form.controls.NOTES;
  }
  get WF_REQUEST_ID() {
    return this.form.controls.WF_REQUEST_ID;
  }
  get STORES_ID() {
    return this.form.controls.STORES_ID;
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  documentTypeList: any[] = []
  inverntoryPeriodsList: any[] = []
  sourceTypeList: any[] = []
  documentStatusList: any[] = [];
  storeList: any[] = [];
 
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.operationsService.getallInventoryPeriod(),
      this.operationsService.getLookUps(CONSTANTS.LOOKUPS.sourceType),
      this.itemsService.getAllStore(),

      ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.inverntoryPeriodsList = results[0].rows;
        this.sourceTypeList = results[1].rows;
        this.storeList = HelperUtil.treeify(results[2].rows, 'STORES_ID', 'PARENT_STORES_ID', null)

        // this.documentStatusList = results[2].rows;
        // this.documentTypeList = results[3].rows;
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }


 

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

  saveItem(){
    if (this.form.valid) {
      let body = {...this.form.getRawValue()};
      this.onSubmit.emit(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  saveAndSubmit(){
    if (this.form.valid) {
      let body = {...this.form.getRawValue()};
      this.onSaveAndSubmit.emit(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }


}
