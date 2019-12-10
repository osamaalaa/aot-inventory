import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ITEM_BALANCE_UNITS_VALIDATION_MESSAGES } from './items-balance-units-form.validation.messages';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { HelperUtil } from 'src/app/common/Helper.Util';


@Component({
  selector: 'app-items-balance-units-form',
  templateUrl: './items-balance-units-form.component.html',
  styleUrls: ['./items-balance-units-form.component.scss']
})
export class ItemsBalanceUnitsFormComponent implements OnInit {

  itemBalanceUnitForm: FormGroup;

  validation_messages: any = ITEM_BALANCE_UNITS_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Input() ITEMS_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private itemsService: ItemsService, private ui: UIService) {

    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.checkIfEditModeAndPatchForm()
  }

  /** Create Form */
  createForm() {
    this.itemBalanceUnitForm = this._fb.group({
      ITEMS_ID: [this.ITEMS_ID],
      ITEMS_BALANCE_ID: [null, [Validators.required]],
      STORES_ID: [null, [Validators.required]], //1
      INV_OPEN_BALANCE_ITEMS_ID: [null, [Validators.required]],
      UNITS_ID: [null, [Validators.required]],
      OPEN_BALANCE: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],//1
      ITEM_COST: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],//1
      AVERAGE_COST: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],//1
      CURRENT_BALANCE: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],//1
      QTY_ON_HAND: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],//1
      QTY_RESERVED: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],//1
      QTY_TRANSFER_TO: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_TRANSFER_FROM: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      OTY_DISPOSED: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ON_POR: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ON_SOR: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ON_SO: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ON_PO: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_REQUESTED: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_SO_CONSIGMENT: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_PO_CONSIGMENT: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      QTY_ADDED: [null, [Validators.required, Validators.max(CONSTANTS.INPUT_MAX)]],
      LAST_SOLD: [null, [Validators.required]],
      LAST_RECIEVED: [null, [Validators.required]],
      CONFIRMED: [null, [Validators.required]],//TODO: Check this field
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]],//TODO: Remove this field
    })
  }

  /**
   * *Check if edit mode and patch the form
   */
  checkIfEditModeAndPatchForm() {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.formData.LAST_RECIEVED = this.formData.LAST_RECIEVED ? new Date(this.formData.LAST_RECIEVED) : null;
      this.formData.LAST_SOLD = this.formData.LAST_SOLD ? new Date(this.formData.LAST_SOLD) : null;

      this.itemBalanceUnitForm.patchValue(this.formData)
    }
  }


  get STORES_ID() {
    return this.itemBalanceUnitForm.controls.STORES_ID
  }
  get UNITS_ID() {
    return this.itemBalanceUnitForm.controls.UNITS_ID
  }

  get ITEMS_BALANCE_ID() {
    return this.itemBalanceUnitForm.controls.STORES_ID
  }
  get OPEN_BALANCE() {
    return this.itemBalanceUnitForm.controls.OPEN_BALANCE
  }
  get ITEM_COST() {
    return this.itemBalanceUnitForm.controls.ITEM_COST
  }
  get AVERAGE_COST() {
    return this.itemBalanceUnitForm.controls.AVERAGE_COST
  }
  get CURRENT_BALANCE() {
    return this.itemBalanceUnitForm.controls.CURRENT_BALANCE
  }
  get QTY_ON_HAND() {
    return this.itemBalanceUnitForm.controls.QTY_ON_HAND
  }
  get QTY_RESERVED() {
    return this.itemBalanceUnitForm.controls.QTY_RESERVED
  }
  get QTY_TRANSFER_TO() {
    return this.itemBalanceUnitForm.controls.QTY_TRANSFER_TO
  }
  get QTY_TRANSFER_FROM() {
    return this.itemBalanceUnitForm.controls.QTY_TRANSFER_FROM
  }
  get OTY_DISPOSED() {
    return this.itemBalanceUnitForm.controls.OTY_DISPOSED
  }
  get QTY_ON_POR() {
    return this.itemBalanceUnitForm.controls.QTY_ON_POR
  }
  get QTY_ON_SOR() {
    return this.itemBalanceUnitForm.controls.QTY_ON_SOR
  }
  get QTY_ON_SO() {
    return this.itemBalanceUnitForm.controls.QTY_ON_SO
  }
  get QTY_ON_PO() {
    return this.itemBalanceUnitForm.controls.QTY_ON_PO
  }
  get QTY_REQUESTED() {
    return this.itemBalanceUnitForm.controls.QTY_REQUESTED
  }
  get QTY_SO_CONSIGMENT() {
    return this.itemBalanceUnitForm.controls.QTY_SO_CONSIGMENT
  }
  get QTY_PO_CONSIGMENT() {
    return this.itemBalanceUnitForm.controls.QTY_PO_CONSIGMENT
  }
  get QTY_ADDED() {
    return this.itemBalanceUnitForm.controls.QTY_ADDED
  }

  get LAST_SOLD() {
    return this.itemBalanceUnitForm.controls.LAST_SOLD
  }
  get LAST_RECIEVED() {
    return this.itemBalanceUnitForm.controls.LAST_RECIEVED
  }

  get CONFIRMED() {
    return this.itemBalanceUnitForm.controls.CONFIRMED
  }
  get INV_OPEN_BALANCE_ITEMS_ID() {
    return this.itemBalanceUnitForm.controls.INV_OPEN_BALANCE_ITEMS_ID
  }

  // --------- lookups --------------

  isfetchingLookup: boolean = false
  storeList: any[] = [];
  itemBalanceList: any[] = [];
  unitList: any[] = [];
  openItemBalanceList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getAllStore(),
      this.itemsService.getItemBalances(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.unitList),
      this.itemsService.getOpenItemBalanceList(),

    ).subscribe(
      results => {
        this.storeList = HelperUtil.treeify(results[0].rows, 'STORES_ID', 'PARENT_STORES_ID', null)
        this.itemBalanceList = results[1].rows;
        this.unitList = results[2].rows;
        this.openItemBalanceList = results[3].rows;
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
    if (this.itemBalanceUnitForm.valid) {
      let body = this.itemBalanceUnitForm.value;
      this.onSubmit.emit(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }



  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}
