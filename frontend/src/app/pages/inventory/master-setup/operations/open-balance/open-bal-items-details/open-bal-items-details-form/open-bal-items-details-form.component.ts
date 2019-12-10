import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { OPEN_BAL_ITEMS_DETAILS_VALIDATION_MESSAGES } from './open-bal-items-details.validation.messages';

@Component({
  selector: 'app-open-bal-items-details-form',
  templateUrl: './open-bal-items-details-form.component.html',
  styleUrls: ['./open-bal-items-details-form.component.scss']
})
export class OpenBalItemsDetailsFormComponent implements OnInit {


  invOpenBalanceItemDetailsForm: FormGroup;

  validation_messages: any = OPEN_BAL_ITEMS_DETAILS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() INV_OPEN_BALANCE_ID = null;
  @Input() INV_OPEN_BALANCE_ITEMS_ID = null;

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
    this.patchOpenBalanceItemsId();
    this.patchArrangementNo();
    this.detectCostChangeAndUpdateTotalCost();
  }

  patchOpenBalanceId(){
    this.invOpenBalanceItemDetailsForm.controls.INV_OPEN_BALANCE_ID.setValue(this.INV_OPEN_BALANCE_ID)

  }

  /**
   * !REMOVE : TODO : remove this field. Server needs to implement this
   */
  patchArrangementNo(){
    this.invOpenBalanceItemDetailsForm.controls.ARRANGEMENT_NO.setValue(1)
  }

  patchOpenBalanceItemsId(){
    this.invOpenBalanceItemDetailsForm.controls.INV_OPEN_BALANCE_ITEMS_ID.setValue(this.INV_OPEN_BALANCE_ITEMS_ID)
  }

   /**
   * * Subscriber to listen to COST change and patch the total cost .
   */
  detectCostChangeAndUpdateTotalCost(){
    this.invOpenBalanceItemDetailsForm.controls.ITEM_COST.valueChanges.subscribe(value=>{
       this.patchTotalCost();
    })
    this.invOpenBalanceItemDetailsForm.controls.UNIT_QUANTITY.valueChanges.subscribe(value=>{
       this.patchTotalCost();
    })
  }


  /**
   * *Patches total_cost only when all vlues are present
   */
  private patchTotalCost(){
     let ITEM_COST = this.invOpenBalanceItemDetailsForm.get('ITEM_COST').value;
     let UNIT_QUANTITY = this.invOpenBalanceItemDetailsForm.get('UNIT_QUANTITY').value;

     if(ITEM_COST && UNIT_QUANTITY){
      this.invOpenBalanceItemDetailsForm.get('TOTAL_COST').setValue(ITEM_COST * UNIT_QUANTITY)
     }
  }

  /** Create Form */
  createForm():void {
    this.invOpenBalanceItemDetailsForm = this._fb.group({
      INV_OPEN_BALANCE_ITEMS_D_ID:[null],
      INV_OPEN_BALANCE_ID:[null,[Validators.required]],
      INV_OPEN_BALANCE_ITEMS_ID:[null,[Validators.required]],
      ARRANGEMENT_NO: [null, [Validators.required]], 
      BATCH_NUMBER: [null, [Validators.required]], 
      EXPIRY_DATE: [null, [Validators.required]], 
      SERIAL_NUMBER: [null, [Validators.required]], 
      UNIT_QUANTITY: [null, [Validators.required]], 
      DEFAULT_UNIT_QUANTITY: [null, [Validators.required]], 
      BASE_UNIT_QUANTITY: [null, [Validators.required]], 
      ITEM_COST: [0, [Validators.required]], 
      TOTAL_COST: [0, [Validators.required]], 
      ITEM_PRICE: [0, [Validators.required]], 
      TOTAL_PRICE: [0, [Validators.required]], 
      NOTES: [null], 
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], 
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm():void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.invOpenBalanceItemDetailsForm.patchValue(this.formData)
    }
  }

  get ARRANGEMENT_NO() {
    return this.invOpenBalanceItemDetailsForm.controls.ARRANGEMENT_NO;
  }
  get BATCH_NUMBER() {
    return this.invOpenBalanceItemDetailsForm.controls.BATCH_NUMBER;
  }
  get EXPIRY_DATE() {
    return this.invOpenBalanceItemDetailsForm.controls.EXPIRY_DATE;
  }
  get SERIAL_NUMBER() {
    return this.invOpenBalanceItemDetailsForm.controls.SERIAL_NUMBER;
  }
  get UNIT_QUANTITY() {
    return this.invOpenBalanceItemDetailsForm.controls.UNIT_QUANTITY;
  }
  get DEFAULT_UNIT_QUANTITY() {
    return this.invOpenBalanceItemDetailsForm.controls.DEFAULT_UNIT_QUANTITY;
  }
  get BASE_UNIT_QUANTITY() {
    return this.invOpenBalanceItemDetailsForm.controls.BASE_UNIT_QUANTITY;
  }
  get ITEM_COST() {
    return this.invOpenBalanceItemDetailsForm.controls.ITEM_COST;
  }
  get TOTAL_COST() {
    return this.invOpenBalanceItemDetailsForm.controls.TOTAL_COST;
  }
  get ITEM_PRICE() {
    return this.invOpenBalanceItemDetailsForm.controls.ITEM_PRICE;
  }
  get TOTAL_PRICE() {
    return this.invOpenBalanceItemDetailsForm.controls.TOTAL_PRICE;
  }
  get NOTES() {
    return this.invOpenBalanceItemDetailsForm.controls.NOTES;
  }



  /** On Form Submit */
  submitForm(): void {
    if (this.invOpenBalanceItemDetailsForm.valid) {
      let body = {...this.invOpenBalanceItemDetailsForm.getRawValue()};
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
