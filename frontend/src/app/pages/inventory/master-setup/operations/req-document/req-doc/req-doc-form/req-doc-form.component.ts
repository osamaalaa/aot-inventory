import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { REQ_DOC_VALIDATION_MESSAGES } from './req-doc-form.validations.messages';
import { OperationsService } from 'src/app/services/operations.service';
import { ItemsService } from 'src/app/services/items.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-req-doc-form',
  templateUrl: './req-doc-form.component.html',
  styles:[`

  `]
})
export class ReqDocFormComponent implements OnInit {


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
    private route:ActivatedRoute,
    private ui: UIService) {
  
    this.getAllLookups()
  }
  isItemReturnRequest:any;
  isItemLostRequest:any;
  isEmployeeCustodyRequest:any;
  isReturnRequest:any;
  isRequestItems:any;
  ngOnInit() {


    // this.patchStoreId();

    this.route
    .data
    .subscribe(v => {
      this.isItemReturnRequest = v.isItemReturnRequest;
      this.isItemLostRequest = v.isItemLostRequest;
      this.isEmployeeCustodyRequest = v.isEmployeeCustodyRequest;
      this.isReturnRequest = v.isReturnRequest;
      this.isRequestItems = v.isRequestItems;
      this.createForm();
      this.addEmployeeValidator();
      this.checkIfEditModeAndPatchForm();
      this.disableFormIfReadonly();
    });

    this.fetchEmployeeList()
  }

  addEmployeeValidator(){
    if(this.isEmployeeCustodyRequest){
      this.form.controls.EMPLOYEE_ID.setValidators(Validators.required)
    }
  }

  // patchStoreId(){
  //   this.form.controls.STORES_ID.patchValue(this.STORES_ID)
  // }

  disableFormIfReadonly(){
    try{
      if(this.readOnly){
        this.form.disable();
      }
    }catch(e){
      
    }
  }

  /** Create Form */
  createForm():void {
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID;
    let document_type = this.getDocumentType();
    
    this.form = this._fb.group({
      STORES_ID:[null,[Validators.required]],
      DOCUMENT_TYPE_ID: [
        document_type, 
        [Validators.required]], 
      DOCUMENT_DATE: [null, [Validators.required]], 
      REQ_DATE: [null, [Validators.required]], 
      INVENTORY_PERIODS_ID: [null, [Validators.required]], 
      DOCUMENT_NO: [null, [Validators.required]], 
      SUPPLIER_ID: [null], 
      BASE_DOCUMENT_ID: [null], 
      EMPLOYEE_ID: [null], 
      DEPARTMENT_ID: [1, [Validators.required]], 
      BASE_DOCUMENT_TYPE_ID: [CONSTANTS.DOCUMENT_TYPE.REQUEST], 
      SOURCE_TYPE: [CONSTANTS.SOURCE_TYPE.INTERNAL],
      DOCUMENT_STATUS: [CONSTANTS.DOCUMENT_STATUS.NEW, [Validators.required]], 
      NOTES: [null], 
      CREATED_BY: [null], 
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]], 
      JOURNALS_ID: [null], 
      WF_REQUEST_ID:[null],
    })


    
  }

  getDocumentType(){
    let document_type;
    if(this.isItemReturnRequest){
      document_type = CONSTANTS.DOCUMENT_TYPE.RETURN_ITEMS_REQUEST
    }else if (this.isItemLostRequest){
      document_type = CONSTANTS.DOCUMENT_TYPE.ITEMS_LOSE_REQUEST

    }else if(this.isEmployeeCustodyRequest){
      document_type = CONSTANTS.DOCUMENT_TYPE.ADD_TO_EMPLOYEE_CUSTODY

    }else if(this.isRequestItems){
      document_type = CONSTANTS.DOCUMENT_TYPE.REQUEST_ITEM

    }else if(this.isReturnRequest){
      document_type = CONSTANTS.DOCUMENT_TYPE.RETURN_REQUEST

    }
    
    return document_type;

  }

  
  employeeList = []
  fetchEmployeeList(){
    this.isfetchingLookup = true;
    this.operationsService.getEmployeeList().subscribe(data=>{
      this.isfetchingLookup = false;
      this.employeeList = data['rows'];
    })
  }



  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm():void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.form.patchValue(this.formData);
      this.form.controls.STORES_ID.disable();
    }
  }

  get EMPLOYEE_ID() {
    return this.form.controls.EMPLOYEE_ID;
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
      this.itemsService.getsuppliers(),
      this.itemsService.getAllStore(),

      ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.inverntoryPeriodsList = results[0].rows;
        this.supplierlist = results[1].rows;
        if(this.isItemReturnRequest || this.isReturnRequest){
        this.storeList = results[2].rows.filter(o=>o.STORE_TYPE == CONSTANTS.STORE_TYPE.RETURN_STORAGE)

        }else if ( this.isItemLostRequest){
          this.storeList = results[2].rows.filter(o=>o.STORE_TYPE == CONSTANTS.STORE_TYPE.CUSTODY)

        }else if (this.isEmployeeCustodyRequest){
          this.storeList = results[2].rows.filter(o=>o.STORE_TYPE != CONSTANTS.STORE_TYPE.CUSTODY)
        }else if(this.isRequestItems){
          this.storeList = results[2].rows.filter(o=>o.STORE_TYPE == CONSTANTS.STORE_TYPE.STORE)

        }
        else{
          this.storeList = results[2].rows.filter(o=>o.STORE_TYPE == CONSTANTS.STORE_TYPE.RETURN_STORAGE)

        }
        
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


}
