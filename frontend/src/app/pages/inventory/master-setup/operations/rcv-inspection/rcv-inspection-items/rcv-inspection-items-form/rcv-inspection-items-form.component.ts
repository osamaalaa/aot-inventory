

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RCV_INSPECTIONS_ITEMS_VALIDATION_MESSAGES } from './rcv-inspection-items-form.validations.messages';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin, Observable, of } from 'rxjs';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { CONSTANTS } from 'src/app/services/constants.service';
import { NzDrawerRef } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationsService } from 'src/app/services/operations.service';
import { flatMap } from 'rxjs/operators';
import { ItemsService } from 'src/app/services/items.service';


@Component({
  selector: 'app-rcv-inspection-items-form',
  templateUrl: './rcv-inspection-items-form.component.html',
  styles: [
    `
    
        #first {
          width: 90%;
          float: left;
        }
        #second {
          width: 10%;
          float: left;
        }
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


export class RcvInspectionItemsFormComponent implements OnInit {


  form: FormGroup;

  validation_messages: any = RCV_INSPECTIONS_ITEMS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() DOCUMENT_ID = null;

  constructor(
    private _fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private itemService:ItemsService,
    private ui: UIService) {}

  ngOnInit() {
    this.createForm();
    this.patchDocumentId();
    this.checkIfEditModeAndPatchForm();
    this.listenForUnitFactorAndUnitQuantityChange()
  }

  listenForUnitFactorAndUnitQuantityChange(){
    this.form.controls.UNIT_QUANTITY.valueChanges.subscribe(value => {
      this.patchDefaultUnitQuantity();
    })
    this.form.controls.UNIT_FACTOR.valueChanges.subscribe(value => {
      this.patchDefaultUnitQuantity();
    })
  }


  patchDefaultUnitQuantity(){
    let UNIT_QUANTITY = this.form.get('UNIT_QUANTITY').value;
    let UNIT_FACTOR = this.form.get('UNIT_FACTOR').value;

    if (UNIT_QUANTITY && UNIT_FACTOR) {
      this.form.get('DEFAULT_UNIT_QUANTITY').setValue(UNIT_QUANTITY * UNIT_FACTOR)
    }
  }



  patchDocumentId() {
    this.form.controls.DOCUMENT_ID.setValue(this.DOCUMENT_ID)
  }



  /** Create Form */
  createForm(): void {
    this.form = this._fb.group({
      RCV_INSPECTION_ITEMS_ID: [null],
      DOCUMENT_ID: [null, [Validators.required]],
      ARRANGEMENT_NO: [0, [Validators.required]],
      ITEMS_ID: [null, [Validators.required]],
      UNITS_ID: [null, [Validators.required]],
      UNIT_FACTOR: [{
        value:null,
        disabled:true
      }, [Validators.required]],
      UNIT_QUANTITY: [null, [Validators.required]],
      BASE_UNIT_QUANTITY: [0, [Validators.required]],
      ITEM_COST: [0, [Validators.required]],
      DEFAULT_UNIT_QUANTITY: [{value:null, disabled:true}, [Validators.required]],
      TOTAL_COST: [0, [Validators.required]],
      TOTAL_PRICE: [0, [Validators.required]],
      ITEM_PRICE: [0, [Validators.required]],
      NOTES: [null],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]],
    })
  }

  onUnitsChange(UNITS_ID){
    if(UNITS_ID){
      let UNIT_FACTOR = this.unitList.filter(o=>o.UNITS_ID == UNITS_ID)[0].UNIT_FACTOR
      this.form.controls.UNIT_FACTOR.setValue(UNIT_FACTOR);
    }
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
      this.fetchUnitListForItems(this.formData.ITEMS_ID).subscribe()
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
  get ITEM_COST() {
    return this.form.controls.ITEM_COST;
  }
  get TOTAL_COST() {
    return this.form.controls.TOTAL_COST;
  }
  get NOTES() {
    return this.form.controls.NOTES;
  }
  get BASE_UNIT_QUANTITY() {
    return this.form.controls.BASE_UNIT_QUANTITY;
  }
  get DEFAULT_UNIT_QUANTITY() {
    return this.form.controls.DEFAULT_UNIT_QUANTITY;
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
      this.resetUnitControl();
      this.resetUnitFactorControl();
      this.form.get('ITEMS_ID').patchValue(e[0].ITEMS_ID);
      this.fetchUnitListForItems(e[0].ITEMS_ID).subscribe()

    }
  }

  resetUnitControl(){
    this.form.controls.UNITS_ID.reset();
  }
  resetUnitFactorControl(){
    this.form.controls.UNIT_FACTOR.reset();
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
      data.UNITS_NAME = unit.UNITS_NAME;

    }
    this.drawerRef.close(data)
  }

  /** When cancel button click */
  cancel(): void {
    this.closeModal(null)
  }

}
