import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DISPENCE_ITEMS_VALIDATION_MESSAGES } from './disp-doc-items.validations.messages';
import { OperationsService } from 'src/app/services/operations.service';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { REQ_DOC_ITEMS_VALIDATION_MESSAGES } from '../../../job-order-req-doc/jo-req-doc-items/jo-req-doc-items-form/jo-req-doc-items.validations.messages';
import { ItemsService } from 'src/app/services/items.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-disp-doc-items-form',
  templateUrl: './disp-doc-items-form.component.html',
  styles:[`
  #first {
      width: 90%;
      float: left;
  }
  #second {
      width: 10%;
      float: left;
  }
  `]
})
export class DipsDocItemsFormComponent implements OnInit {

  form: FormGroup;

  validation_messages: any = REQ_DOC_ITEMS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() DOCUMENT_ID = null;
  @Input() STORES_ID = null;
  @Input() readOnly;

  constructor(
    private _fb: FormBuilder,
    private operationsService:OperationsService,
    private drawerRef: NzDrawerRef,
    private ui: UIService,
    private itemService:ItemsService,
    ) {
     

  }

  queryParam = {
    STORES_ID:null
  }

  ngOnInit() {
    this.createForm();
    this.patchDocumentId();
    this.checkIfEditModeAndPatchForm();
    this.patchArrangementNo();
    // this.detectCostChangeAndUpdateTotalCost();
    this.queryParam.STORES_ID = this.STORES_ID
    // this.listenForUnitFactorAndUnitQuantityChange();

  }




  patchDocumentId() {
    this.form.controls.DOCUMENT_ID.setValue(this.DOCUMENT_ID)
  }

  /**
   * !TODO: REMOVE this key
   */
  patchArrangementNo() {
    this.form.controls.ARRANGEMENT_NO.setValue(1)
  }

  /** Create Form */
  createForm(): void {
   
      this.form = this._fb.group({
        DSP_DOCUMENT_ITEMS_ID: [null],
        DOCUMENT_ID: [null, [Validators.required]],
        ARRANGEMENT_NO: [null, [Validators.required]],
        ITEMS_ID: [null, [Validators.required]],
        UNITS_ID: [{value:null,disabled:true}, [Validators.required]],
        UNIT_FACTOR: [{
          value:null,
          disabled:true
        }, [Validators.required]],
        // UNIT_QUANTITY: [null, [Validators.required]],
        UNIT_QUANTITY: [null, [Validators.required],this.validateUnitQuantity.bind(this)],
        BASE_UNIT_QUANTITY: [0, [Validators.required]],//
        ITEM_COST: [0, [Validators.required]],
        TOTAL_COST: [0, [Validators.required]],
        ITEM_PRICE: [0, [Validators.required]],//
        TOTAL_PRICE: [0, [Validators.required]],//
        NOTES: [{value:null,disabled:true}],
        CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]],
      })
    
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.itemList = [{
        ITEMS_ID: this.formData.ITEMS_ID,
        EN_NAME: this.formData.ITEM_EN_NAME,
        AR_NAME: this.formData.ITEM_AR_NAME
      }]
      this.form.patchValue(this.formData);
      this.unitList = [{
        UNITS_ID:this.formData.UNITS_ID,
        UNITS_NAME:this.formData.UNITS_NAME || this.formData.UNIT_EN_NAME
      }]
      // this.fetchUnitListForItems(this.formData.ITEMS_ID).subscribe()
    }
  }


  onUnitsChange(UNITS_ID){
    if(UNITS_ID){
      let UNIT_FACTOR = this.unitList.filter(o=>o.UNITS_ID == UNITS_ID)[0].UNIT_FACTOR
      this.form.controls.UNIT_FACTOR.setValue(UNIT_FACTOR);
    }
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  itemList: any[] = []
  unitList: any[] = []

  get ARRANGEMENT_NO() {
    return this.form.controls.ARRANGEMENT_NO;
  }
  get ITEMS_ID() {
    return this.form.controls.ITEMS_ID;
  }
  get UNITS_ID() {
    return this.form.controls.UNITS_ID;
  }
  get UNIT_FACTOR() {
    return this.form.controls.UNIT_FACTOR;
  }
  get UNIT_QUANTITY() {
    return this.form.controls.UNIT_QUANTITY;
  }
  get BASE_UNIT_QUANTITY() {
    return this.form.controls.BASE_UNIT_QUANTITY;
  }
  get ITEM_COST() {
    return this.form.controls.ITEM_COST;
  }
  get TOTAL_COST() {
    return this.form.controls.TOTAL_COST;
  }
  get ITEM_PRICE() {
    return this.form.controls.ITEM_PRICE;
  }
  get TOTAL_PRICE() {
    return this.form.controls.TOTAL_PRICE;
  }
  get NOTES() {
    return this.form.controls.NOTES;
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.form.valid) {
      let body = { ...this.form.getRawValue() };
      this.closeModal(body);
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  onSelectItems(e) {
    if (e && e.length) {
      this.itemList = e;
      this.form.get('ITEMS_ID').patchValue(e[0].ITEMS_ID);
      this.resetUnitControl();
      this.resetUnitFactorControl();
      // this.fetchUnitListForItems(e[0].ITEMS_ID).subscribe()
      this.unitList = this.itemList.filter(o=>o.ITEMS_ID == e[0].ITEMS_ID)
    }
  }

  resetUnitControl(){
    this.form.controls.UNITS_ID.reset();
  }
  resetUnitFactorControl(){
    this.form.controls.UNIT_FACTOR.reset();
  }

  fetchUnitListForItems(ITEMS_ID:string):Observable<any>{
     return this.itemService.getItemUnits(ITEMS_ID)
     .pipe(
       flatMap(results=>{
        this.unitList = results.rows;
         return of(results)
       })
     )
  }

  /** 
   * * FUnction to close modal and notify the one who triggered the modal
   */
  closeModal(data: any = null) {
    if (data) {
      let item = this.itemList.filter(o => o.ITEMS_ID == data.ITEMS_ID)[0]
      let unit = this.unitList.filter(o => o.UNITS_ID == data.UNITS_ID)[0]


      data.ITEM_EN_NAME = item.EN_NAME;
      data.ITEM_AR_NAME = item.AR_NAME;
      data.UNITS_NAME = unit ? unit.UNITS_NAME : this.formData.UNITS_NAME;
      data.UNITS_ID = unit ? unit.UNITS_ID : this.formData.UNITS_ID;

    }
    this.drawerRef.close(data)
  }

  /** When cancel button click */
  cancel(): void {
    this.closeModal(null)
  }

  availableQty = 0;
  validateUnitQuantity(control: AbstractControl) {
    let ITEMS_ID = this.ITEMS_ID.value;
    let UNITS_ID = this.UNITS_ID.value
    return this.operationsService.getQuantityOfItem(this.STORES_ID,ITEMS_ID,UNITS_ID)
    .map(res => {
      
      let qtyOnHand = res['rows'][0] ? res['rows'][0].QTY_ON_HAND : 0;

      if(qtyOnHand == 0){
        return { noQuantity : true}
      }else if(control.value > qtyOnHand){
        this.availableQty = qtyOnHand;
        return { invalidQty: true}
      }else{
        return null;
      }
    });
  }
}
