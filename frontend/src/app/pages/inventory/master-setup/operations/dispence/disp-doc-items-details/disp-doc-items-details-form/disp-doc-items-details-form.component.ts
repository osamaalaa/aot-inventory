import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DISPENCE_ITEMS_DETAILS_VALIDATION_MESSAGES } from './disp-doc-items-details.validation.messages';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-disp-doc-items-details-form',
  templateUrl: './disp-doc-items-details-form.component.html',
  styles:[
    `
    .footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      border-top: 1px solid rgb(232, 232, 232);
      padding: 10px 16px;
      text-align: right;
      left: 0px;
      background: #fff;
    }
    `
  ]
})
export class DipsDocItemsDetailsFormComponent implements OnInit {


  form: FormGroup;

  validation_messages: any = DISPENCE_ITEMS_DETAILS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() DOCUMENT_ID = null;
  @Input() DSP_DOCUMENT_ITEMS_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder, 
    private drawerRef: NzDrawerRef,
    private ui: UIService) {
   
  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
    this.patchOpenBalanceId();
    this.patchDispenceItemsId();
    this.patchArrangementNo();
    this.detectCostChangeAndUpdateTotalCost();
  }

  patchOpenBalanceId(){
    this.form.controls.DOCUMENT_ID.setValue(this.DOCUMENT_ID)

  }

  /**
   * !REMOVE : TODO : remove this field. Server needs to implement this
   */
  patchArrangementNo(){
    this.form.controls.ARRANGEMENT_NO.setValue(1)
  }

  patchDispenceItemsId(){
    this.form.controls.DSP_DOCUMENT_ITEMS_ID.setValue(this.DSP_DOCUMENT_ITEMS_ID)
  }

   /**
   * * Subscriber to listen to COST change and patch the total cost .
   */
  detectCostChangeAndUpdateTotalCost(){
    this.form.controls.ITEM_COST.valueChanges.subscribe(value=>{
       this.patchTotalCost();
    })
    this.form.controls.UNIT_QUANTITY.valueChanges.subscribe(value=>{
       this.patchTotalCost();
    })
  }


  /**
   * *Patches total_cost only when all vlues are present
   */
  private patchTotalCost(){
     let ITEM_COST = this.form.get('ITEM_COST').value;
     let UNIT_QUANTITY = this.form.get('UNIT_QUANTITY').value;

     if(ITEM_COST && UNIT_QUANTITY){
      this.form.get('TOTAL_COST').setValue(ITEM_COST * UNIT_QUANTITY)
     }
  }

  /** Create Form */
  createForm():void {
    this.form = this._fb.group({
      DSP_DOCUMENT_ITEMS_D_ID:[null],
      DOCUMENT_ID:[null,[Validators.required]],
      DSP_DOCUMENT_ITEMS_ID:[null,[Validators.required]],
      ARRANGEMENT_NO: [null, [Validators.required]], 
      BATCH_NUMBER: [null, [Validators.required]], 
      EXPIRY_DATE: [null, [Validators.required]], 
      SERIAL_NUMBER: [null, [Validators.required]], 
      UNIT_QUANTITY: [null, [Validators.required]], 
      DEFAULT_UNIT_QUANTITY: [null, [Validators.required]], 
      BASE_UNIT_QUANTITY: [null, [Validators.required]], 
      ITEM_COST: [null, [Validators.required]], 
      TOTAL_COST: [{
        value:null,
        disabled:true
      }, [Validators.required]], 
      ITEM_PRICE: [null, [Validators.required]], 
      TOTAL_PRICE: [null, [Validators.required]], 
      NOTES: [null], 
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], 
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm():void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.form.patchValue(this.formData)
    }
  }

  get ARRANGEMENT_NO() {
    return this.form.controls.ARRANGEMENT_NO;
  }
  get BATCH_NUMBER() {
    return this.form.controls.BATCH_NUMBER;
  }
  get EXPIRY_DATE() {
    return this.form.controls.EXPIRY_DATE;
  }
  get SERIAL_NUMBER() {
    return this.form.controls.SERIAL_NUMBER;
  }
  get UNIT_QUANTITY() {
    return this.form.controls.UNIT_QUANTITY;
  }
  get DEFAULT_UNIT_QUANTITY() {
    return this.form.controls.DEFAULT_UNIT_QUANTITY;
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
      let body = {...this.form.getRawValue()};
      this.onSubmit.emit(body);
      this.closeModal(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit();
    this.drawerRef.close()
  }

    /** 
   * * FUnction to close modal and notify the one who triggered the modal
   */
  closeModal(data:any = null){
    this.drawerRef.close(data)
  }


}
