import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { ITEM_BALANCE_VALIDATION_MESSAGES } from './item-balance-form.validation.messages'
import { ItemsService } from 'src/app/services/items.service'
import { UIService } from 'src/app/services/ui.service'
import { forkJoin } from 'rxjs';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { CONSTANTS } from 'src/app/services/constants.service';
// import { NzDrawerRef } from 'ng-zorro-antd';



@Component({
  selector: 'app-item-balance-form',
  templateUrl: './item-balance-form.component.html',
  styleUrls: ['./item-balance-form.component.scss'],
})
export class ItemBalanceFormComponent implements OnInit {
  itemBalanceForm: FormGroup

  validation_messages: any = ITEM_BALANCE_VALIDATION_MESSAGES

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() ITEMS_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder, 
    private itemsService: ItemsService,
    // private drawerRef: NzDrawerRef,
    private ui: UIService) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.checkIfEditModeAndPatchForm()
  }

  /** Create Form */
  createForm() {
    this.itemBalanceForm = this._fb.group({
      ITEMS_ID: [this.ITEMS_ID],
      STORES_ID: [null, [Validators.required]],
      OPEN_BALANCE: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      ITEM_COST: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX),Validators.max(CONSTANTS.INPUT_MAX)]],
      AVERAGE_COST: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      CURRENT_BALANCE: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ON_HAND: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_RESERVED: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_TRANSFER_TO: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_TRANSFER_FROM: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      OTY_DISPOSED: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ON_POR: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ON_SOR: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ON_SO: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ON_PO: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_REQUESTED: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_SO_CONSIGMENT: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_PO_CONSIGMENT: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_IN: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_OUT: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      REORDER_LIMIT: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      MAX_LIMIT: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      MIN_LIMIT: [null, [Validators.required,Validators.max(CONSTANTS.INPUT_MAX)]],
      CONFIRMED: [null, [Validators.required]],
      STORES_LOCATIONS_ID: [null, [Validators.required]],
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]], //TODO: Remove this field
    })
  }

  /**
   * *Check if edit mode and patch the form
   */
  checkIfEditModeAndPatchForm() {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.itemBalanceForm.patchValue(this.formData)
    }
  }


  get STORES_ID() {
    return this.itemBalanceForm.controls.STORES_ID
  }
  get OPEN_BALANCE() {
    return this.itemBalanceForm.controls.OPEN_BALANCE
  }
  get ITEM_COST() {
    return this.itemBalanceForm.controls.ITEM_COST
  }
  get AVERAGE_COST() {
    return this.itemBalanceForm.controls.AVERAGE_COST
  }
  get CURRENT_BALANCE() {
    return this.itemBalanceForm.controls.CURRENT_BALANCE
  }
  get QTY_ON_HAND() {
    return this.itemBalanceForm.controls.QTY_ON_HAND
  }
  get QTY_RESERVED() {
    return this.itemBalanceForm.controls.QTY_RESERVED
  }
  get QTY_TRANSFER_TO() {
    return this.itemBalanceForm.controls.QTY_TRANSFER_TO
  }
  get QTY_TRANSFER_FROM() {
    return this.itemBalanceForm.controls.QTY_TRANSFER_FROM
  }
  get OTY_DISPOSED() {
    return this.itemBalanceForm.controls.OTY_DISPOSED
  }
  get QTY_ON_POR() {
    return this.itemBalanceForm.controls.QTY_ON_POR
  }
  get QTY_ON_SOR() {
    return this.itemBalanceForm.controls.QTY_ON_SOR
  }
  get QTY_ON_SO() {
    return this.itemBalanceForm.controls.QTY_ON_SO
  }
  get QTY_ON_PO() {
    return this.itemBalanceForm.controls.QTY_ON_PO
  }
  get QTY_REQUESTED() {
    return this.itemBalanceForm.controls.QTY_REQUESTED
  }
  get QTY_SO_CONSIGMENT() {
    return this.itemBalanceForm.controls.QTY_SO_CONSIGMENT
  }
  get QTY_PO_CONSIGMENT() {
    return this.itemBalanceForm.controls.QTY_PO_CONSIGMENT
  }
  get QTY_IN() {
    return this.itemBalanceForm.controls.QTY_IN
  }
  get QTY_OUT() {
    return this.itemBalanceForm.controls.QTY_OUT
  }
  get REORDER_LIMIT() {
    return this.itemBalanceForm.controls.REORDER_LIMIT
  }
  get MAX_LIMIT() {
    return this.itemBalanceForm.controls.MAX_LIMIT
  }
  get MIN_LIMIT() {
    return this.itemBalanceForm.controls.MIN_LIMIT
  }
  get CONFIRMED() {
    return this.itemBalanceForm.controls.CONFIRMED
  }
  get STORES_LOCATIONS_ID() {
    return this.itemBalanceForm.controls.STORES_LOCATIONS_ID
  }

  // --------- lookups --------------

  isfetchingLookup: boolean = false
  storeList: any[] = []
  storeLocationList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getAllStoreLocations(),
      this.itemsService.getAllStore(),
    ).subscribe(
      results => {
        
        this.storeLocationList = results[0].rows
        this.storeList = HelperUtil.treeify(results[1].rows, 'STORES_ID', 'PARENT_STORES_ID', null)
        this.isfetchingLookup = false
      },
      error => {
        this.isfetchingLookup = false
        this.ui.createMessage('error', 'error while getting data : ' + error)
      },
    )
  }

  /** On Form Submit */
  submitForm(): void {
    if (this.itemBalanceForm.valid) {
      this.onSubmit.emit(this.itemBalanceForm.value);
      // this.drawerRef.close(this.itemBalanceForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    // this.drawerRef.close()
    this.onCancel.emit()
  }
}
