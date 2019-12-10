import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { INV_TRANSFER_ITEMS_VALIDATION_MESSAGES } from './inv-transferR-items.validations.messages';
import { CONSTANTS } from 'src/app/services/constants.service';
import { forkJoin, Observable, of } from 'rxjs'
import { NzDrawerRef } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { ItemsService } from 'src/app/services/items.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-inv-transferR-items-form',
  templateUrl: './inv-transferR-items-form.component.html',
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
export class InvTransferRItemsFormComponent implements OnInit {


  form: FormGroup;

  validation_messages: any = INV_TRANSFER_ITEMS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null
  @Input() INV_TRANSFER_R_ID = null
  // @Input() STORES_ID = null

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder, 
    private itemService:ItemsService, 
    private operationsService: OperationsService,
    private ui: UIService,
    private drawerRef: NzDrawerRef,

    ) {
   
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.checkIfEditModeAndPatchForm()
    this.detectCostChangeAndUpdateTotalCost()
    this.patchArrangementNo();
    this.listenForUnitFactorAndUnitQuantityChange();
  }


  listenForUnitFactorAndUnitQuantityChange(){
    this.form.controls.UNIT_QUANTITY.valueChanges.subscribe(value => {
      this.patchBaseUnitQuantity();
    })
    this.form.controls.UNIT_FACTOR.valueChanges.subscribe(value => {
      this.patchBaseUnitQuantity();
    })
  }

  patchBaseUnitQuantity(){
    let UNIT_QUANTITY = this.form.get('UNIT_QUANTITY').value;
    let UNIT_FACTOR = this.form.get('UNIT_FACTOR').value;

    if (UNIT_QUANTITY && UNIT_FACTOR) {
      this.form.get('DEFAULT_UNIT_QUANTITY').setValue(UNIT_QUANTITY * UNIT_FACTOR)
    }
  }

  /** Create Form */
  createForm():void {
    this.form = this._fb.group({
      INV_TRANSFER_R_ID:[this.INV_TRANSFER_R_ID],
      INV_TRANSFER_R_ITEMS_ID:[null],
      // STORES_ID: [this.STORES_ID, [Validators.required]], 
      ARRANGEMENT_NO: [0, [Validators.required]], 
      ITEMS_ID: [{
        value:null,
        disabled:true
      }, [Validators.required]], 
      UNITS_ID: [{
        value:null,
        disabled:true
      }, [Validators.required]], 
      UNIT_FACTOR: [{
        value:null,
        disabled:true
      }, [Validators.required]], 
      UNIT_QUANTITY: [null, [Validators.required]], 
      DEFAULT_UNIT_QUANTITY: [{
        value:null,
        disabled:true
      }, [Validators.required]], 
      BASE_UNIT_QUANTITY: [0, [Validators.required]], 
      ITEM_COST: [0, [Validators.required]], 
      TOTAL_COST: [0, [Validators.required]], 
      NOTES: [{
        value:null,
        disabled:true
      }], 
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm():void {
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

  onUnitsChange(UNITS_ID){
    if(UNITS_ID){
      let UNIT_FACTOR = this.unitList.filter(o=>o.UNITS_ID == UNITS_ID)[0].UNIT_FACTOR
      this.form.controls.UNIT_FACTOR.setValue(UNIT_FACTOR);
    }
  }

  get INV_TRANSFER_STORES_ID() {
    return this.form.controls.INV_TRANSFER_STORES_ID;
  }
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
  get NOTES() {
    return this.form.controls.NOTES;
  }
  get CREATED_BY() {
    return this.form.controls.CREATED_BY;
  }

  detectCostChangeAndUpdateTotalCost() {
    this.form.controls.ITEM_COST.valueChanges.subscribe(value => {
       this.patchTotalCost()
    })
    this.form.controls.UNIT_FACTOR.valueChanges.subscribe(value => {
       this.patchTotalCost()
    })
  }


  /**
   * *Patches total_cost only when all vlues are present
   */
  private patchTotalCost(){
     const ITEM_COST = this.form.get('ITEM_COST').value
     const UNIT_FACTOR = this.form.get('UNIT_FACTOR').value
     if (ITEM_COST && UNIT_FACTOR) {
      this.form.get('TOTAL_COST').setValue(ITEM_COST * UNIT_FACTOR)
     }
  }

  patchArrangementNo() {
    this.form.controls.ARRANGEMENT_NO.setValue(1)
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  itemList: any[] = []
  unitList: any[] = []
  getAllLookups() {
    // this.isfetchingLookup = true
    forkJoin(
      this.operationsService.getallitems(),
       this.operationsService.getLookUps(CONSTANTS.LOOKUPS.units)
    ).subscribe(
      results => {
        // this.isfetchingLookup = false;
         this.itemList = results[0].rows;
         this.unitList = results[0].rows;

      },
      error => {
        // this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }

  onSelectItems(e){
    if(e && e.length){
      this.itemList = e;
      this.form.get('ITEMS_ID').patchValue(e[0].ITEMS_ID);
      this.resetUnitControl();
      this.resetUnitFactorControl();
      this.fetchUnitListForItems(e[0].ITEMS_ID).subscribe()
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



  /** On Form Submit */
  submitForm(): void {

    if (this.form.valid) {
      const body = {...this.form.getRawValue()};
      this.onSubmit.emit(body)
      this.closeModal(body)

    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** 
   * * FUnction to close modal and notify the one who triggered the modal
   */
  closeModal(data:any = null) {
    if(data){
      let item = this.itemList.filter(o=>o.ITEMS_ID == data.ITEMS_ID)[0]
      let unit = this.unitList.filter(o=>o.UNITS_ID == data.UNITS_ID)[0]

      data.ITEM_EN_NAME = item.EN_NAME;
      data.ITEM_AR_NAME = item.AR_NAME;
      data.UNITS_NAME = unit ? unit.UNITS_NAME : '' ;

    }
    this.drawerRef.close(data)
  }
  /** When cancel button click */
  cancel(): void {
    this.drawerRef.close()
    this.onCancel.emit()
  }


}
