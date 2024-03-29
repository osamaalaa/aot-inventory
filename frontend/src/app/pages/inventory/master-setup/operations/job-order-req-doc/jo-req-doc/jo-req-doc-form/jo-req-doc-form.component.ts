import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { REQ_DOC_VALIDATION_MESSAGES } from './jo-req-doc-form.validations.messages';
import { OperationsService } from 'src/app/services/operations.service';
import { ItemsService } from 'src/app/services/items.service';
import { HelperUtil } from 'src/app/common/Helper.Util';


@Component({
  selector: 'app-jo-req-doc-form',
  templateUrl: './jo-req-doc-form.component.html',
  styles:[`

  `]
})
export class JOReqDocFormComponent implements OnInit {


  form: FormGroup;

  validation_messages: any = REQ_DOC_VALIDATION_MESSAGES;

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
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID

    this.form = this._fb.group({
      STORES_ID:[null,[Validators.required]],
      DOCUMENT_TYPE_ID: [
        CONSTANTS.DOCUMENT_TYPE_DISPENCE_ID, 
        [Validators.required]], 
      DOCUMENT_DATE: [null, [Validators.required]], 
      REQ_DATE: [null, [Validators.required]], 
      INVENTORY_PERIODS_ID: [null, [Validators.required]], 
      DOCUMENT_NO: [null, [Validators.required]], 
      SUPPLIER_ID: [null, [Validators.required]], 
      BASE_DOCUMENT_ID: [1, [Validators.required]], 
      EMPLOYEE_ID: [EMPLOYEE_ID, [Validators.required]], 
      DEPARTMENT_ID: [1, [Validators.required]], 
      BASE_DOCUMENT_TYPE_ID: [CONSTANTS.DOCUMENT_TYPE_DISPENCE_ID, [Validators.required]], 
      SOURCE_TYPE: [null, [Validators.required]],
      DOCUMENT_STATUS: [CONSTANTS.DOCUMENT_STATUS.NEW, [Validators.required]], 
      NOTES: [null], 
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]], //TODO:Remove hard coded value
      JOURNALS_ID: [1, [Validators.required]], //TODO:Remove hard coded value
      WF_REQUEST_ID:[null],
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
  get DSP_DATE() {
    return this.form.controls.DSP_DATE;
  }
  get DELIVERED_TO() {
    return this.form.controls.DELIVERED_TO;
  }
  get BASE_DOCUMENT_ID() {
    return this.form.controls.BASE_DOCUMENT_ID;
  }
  get BASE_DOCUMENT_TYPE_ID() {
    return this.form.controls.BASE_DOCUMENT_TYPE_ID;
  }
  get DELIVERED_BY() {
    return this.form.controls.DELIVERED_BY;
  }
  get DELIVERY_DATE() {
    return this.form.controls.DELIVERY_DATE;
  }
  get SUPPLIER_ID() {
    return this.form.controls.SUPPLIER_ID;
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
  baseDocumentList:any[] = [];
  supplierlist: any[] = [];
  storeList: any[] = [];
  baseDocumentId: any[] = [];
  Documnettypelist: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.operationsService.getallInventoryPeriod(),
      this.operationsService.getLookUps(CONSTANTS.LOOKUPS.sourceType),
      this.operationsService.getallDocumentTypes(),
      this.operationsService.getBaseDocumentTypes(),
      this.itemsService.getsuppliers(),
      this.itemsService.getAllStore(),

      ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.inverntoryPeriodsList = results[0].rows;
        this.sourceTypeList = results[1].rows;
        this.documentTypeList = results[2].rows;
        this.baseDocumentList = results[3].rows;
        this.supplierlist = results[4].rows;
        this.storeList = HelperUtil.treeify(results[5].rows, 'STORES_ID', 'PARENT_STORES_ID', null)

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
      let body = {...this.form.value};
      this.onSubmit.emit(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }


}
