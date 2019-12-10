import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { NzDrawerRef, NzOptionComponent } from 'ng-zorro-antd';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { OPEN_BAL_ITEMS_VALIDATION_MESSAGES } from './open-bal-items.validations.messages';
import { OperationsService } from 'src/app/services/operations.service';
import { flatMap } from 'rxjs/operators';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-open-bal-items-form',
  templateUrl: './open-bal-items-form.component.html',
  styleUrls: ['./open-bal-items-form.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OpenBalItemsFormComponent implements OnInit {

  form: FormGroup;

  validation_messages: any = OPEN_BAL_ITEMS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() INV_OPEN_BALANCE_ID = null;

  constructor(
    private _fb: FormBuilder,
    private operationsService:OperationsService,
    private drawerRef: NzDrawerRef,
    private itemService:ItemsService,
    private ui: UIService) {

    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm();
    this.patchInvOpenBalanceId();
    this.checkIfEditModeAndPatchForm();
    this.patchArrangementNo();
    // this.detectCostChangeAndUpdateTotalCost();
  }

  listenForUnitFactorAndUnitQuantityChange(){
    this.form.controls.UNIT_QUANTITY.valueChanges.subscribe(value => {
      // this.patchBaseUnitQuantity();
    })
    this.form.controls.UNIT_FACTOR.valueChanges.subscribe(value => {
      // this.patchBaseUnitQuantity();
    })
  }



  /**
   * * Subscriber to listen to COST change and patch the total cost .
   */
  // detectCostChangeAndUpdateTotalCost() {
  //   this.form.controls.ITEM_COST.valueChanges.subscribe(value => {
  //     this.patchTotalCost();
  //   })
  //   this.form.controls.UNIT_FACTOR.valueChanges.subscribe(value => {
  //     this.patchTotalCost();
  //   })
  // }


  /**
   * *Patches total_cost only when all vlues are present
   */
  // private patchTotalCost() {
  //   let ITEM_COST = this.form.get('ITEM_COST').value;
  //   let UNIT_FACTOR = this.form.get('UNIT_FACTOR').value;

  //   if (ITEM_COST && UNIT_FACTOR) {
  //     this.form.get('TOTAL_COST').setValue(ITEM_COST * UNIT_FACTOR)
  //   }
  // }

  patchInvOpenBalanceId() {
    this.form.controls.INV_OPEN_BALANCE_ID.setValue(this.INV_OPEN_BALANCE_ID)
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
      INV_OPEN_BALANCE_ITEMS_ID: [null],
      INV_OPEN_BALANCE_ID: [null, [Validators.required]],
      ARRANGEMENT_NO: [0, [Validators.required]],
      ITEMS_ID: [null, [Validators.required]],
      UNITS_ID: [null, [Validators.required]],
      UNIT_FACTOR: [{
        value:null,
        disabled:true
      }, [Validators.required]],
      UNIT_QUANTITY: [null, [Validators.required]],
      ITEM_COST: [0, [Validators.required]],
      TOTAL_COST: [0, [Validators.required]],
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
  unitList: any[] = [];
  itemListSaved:any[] = []
  getAllLookups() {
    // this.isfetchingLookup = true
    forkJoin(
      // this.operationsService.getLookUps(CONSTANTS.LOOKUPS.units),
      this.operationsService.getallitems(),
    ).subscribe(
      results => {
        // this.isfetchingLookup = false;
        // this.unitList = results[0].rows;
        this.itemList = results[0].rows;
        this.itemListSaved = results[0].rows;
      },
      error => {
        // this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }

  filterOption(input,option:NzOptionComponent){
    if(option.nzLabel.indexOf(input) > -1){
      return true;
    }else{
      return false
    }
    // console.log(input,option)
  }

  search(value: string): void {
    this.itemList = this.itemListSaved.filter(item=>{

      
      return (item.EN_NAME? item.EN_NAME.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1:false) ||  (item.ITEM_CODE? item.ITEM_CODE.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1:false) ||(item.NATURE_NAME? item.NATURE_NAME.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1:false) ||(item.GROUP_EN_NAME? item.GROUP_EN_NAME.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1:false)
      //  item.NATURE_NAME.toLowerCase().indexOf(value) > -1||
      //  item.GROUP_EN_NAME.toLowerCase().indexOf(value) > -1||
   
    })
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
  get ITEM_COST() {
    return this.form.controls.ITEM_COST;
  }
  get TOTAL_COST() {
    return this.form.controls.TOTAL_COST;
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
