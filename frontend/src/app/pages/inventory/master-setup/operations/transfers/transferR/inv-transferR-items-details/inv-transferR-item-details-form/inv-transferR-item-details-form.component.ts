import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UIService } from 'src/app/services/ui.service'
import { CONSTANTS } from 'src/app/services/constants.service'
import { forkJoin } from 'rxjs'
import { INV_TRANSFER_ITEMS_DETAILS_VALIDATION_MESSAGES } from './inv-transferR-items-details.validations.messages';
import { NzDrawerRef } from 'ng-zorro-antd';
import { OperationsService } from 'src/app/services/operations.service';
// import { INV_TRANSFER_ITEMS_DETAILS_VALIDATION_MESSAGES } from './inv-transfer-items-details.validations.messages';

@Component({
  selector: 'app-inv-transferR-item-details-form',
  templateUrl: './inv-transferR-item-details-form.component.html',
  styles: [`
  .footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    border-top: 1px solid rgb(232, 232, 232);
    padding: 10px 16px;
    text-align: right;
    left: 0px;
    background: #fff;
  }`]
})
export class InvTransferRItemDetailsFormComponent implements OnInit {


  invTransferItemsDetailsForm: FormGroup

  validation_messages: any = INV_TRANSFER_ITEMS_DETAILS_VALIDATION_MESSAGES

  /** Formdata to patch . Used for edit mode */
  @Input() INV_TRANSFER_R_ITEMS_ID = null;
  @Input() formData = null
  @Input() INV_TRANSFER_R_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private drawerRef: NzDrawerRef,
  ) {
  }

  ngOnInit() {
    this.createForm()
    this.checkIfEditModeAndPatchForm()
    this.detectCostChangeAndUpdateTotalCost()
    this.detectCostChangeAndUpdateTotalPrice()
    this.patchArrangementNo()
  }

  /** Create Form */
  createForm(): void {
    this.invTransferItemsDetailsForm = this._fb.group({
      INV_TRANSFER_R_ID: [this.INV_TRANSFER_R_ID],
      INV_TRANSFER_ITEMS_D_ID: [null],
      INV_TRANSFER_R_ITEMS_ID: [this.INV_TRANSFER_R_ITEMS_ID, [Validators.required]],
      ARRANGEMENT_NO: [1, [Validators.required]],
      BATCH_NUMBER: ['0', [Validators.required]],
      SERIAL_NUMBER: [null, [Validators.required]],
      UNIT_QUANTITY: [null, [Validators.required]],
      DEFAULT_UNIT_QUANTITY: [null, [Validators.required]],
      BASE_UNIT_QUANTITY: [null, [Validators.required]],
      ITEM_COST: [0, [Validators.required]],
      TOTAL_COST: [0, [Validators.required]],
      ITEM_PRICE: [0, [Validators.required]],
      TOTAL_PRICE: [0, [Validators.required]],
      NOTES: [null],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false
    console.log(this.formData)
    if (isEditMode) {
      this.invTransferItemsDetailsForm.patchValue(this.formData)
    }
  }



  get ARRANGEMENT_NO() {
    return this.invTransferItemsDetailsForm.controls.ARRANGEMENT_NO
  }
  get BATCH_NUMBER() {
    return this.invTransferItemsDetailsForm.controls.BATCH_NUMBER
  }
  get EXPIRY_DATE() {
    return this.invTransferItemsDetailsForm.controls.EXPIRY_DATE
  }
  get SERIAL_NUMBER() {
    return this.invTransferItemsDetailsForm.controls.SERIAL_NUMBER
  }

  get UNIT_QUANTITY() {
    return this.invTransferItemsDetailsForm.controls.UNIT_QUANTITY
  }
  get DEFAULT_UNIT_QUANTITY() {
    return this.invTransferItemsDetailsForm.controls.DEFAULT_UNIT_QUANTITY
  }
  get BASE_UNIT_QUANTITY() {
    return this.invTransferItemsDetailsForm.controls.BASE_UNIT_QUANTITY
  }
  get ITEM_COST() {
    return this.invTransferItemsDetailsForm.controls.ITEM_COST
  }
  get TOTAL_COST() {
    return this.invTransferItemsDetailsForm.controls.TOTAL_COST
  }
  get ITEM_PRICE() {
    return this.invTransferItemsDetailsForm.controls.ITEM_PRICE
  }
  get TOTAL_PRICE() {
    return this.invTransferItemsDetailsForm.controls.TOTAL_PRICE
  }
  get NOTES() {
    return this.invTransferItemsDetailsForm.controls.NOTES
  }
  get CREATED_BY() {
    return this.invTransferItemsDetailsForm.controls.CREATED_BY
  }

  detectCostChangeAndUpdateTotalCost() {
    this.invTransferItemsDetailsForm.controls.ITEM_COST.valueChanges.subscribe(value => {
      this.patchTotalCost()
    })
    this.invTransferItemsDetailsForm.controls.UNIT_QUANTITY.valueChanges.subscribe(value => {
      this.patchTotalCost()
    })

  }
  detectCostChangeAndUpdateTotalPrice() {
    this.invTransferItemsDetailsForm.controls.ITEM_PRICE.valueChanges.subscribe(value => {
      this.patchTotalPrice()
    })
    this.invTransferItemsDetailsForm.controls.UNIT_QUANTITY.valueChanges.subscribe(value => {
      this.patchTotalPrice()
    })
  }

  /**
   * *Patches total_cost only when all vlues are present
   */
  private patchTotalCost() {
    const ITEM_COST = this.invTransferItemsDetailsForm.get('ITEM_COST').value
    const UNIT_QUANTITY = this.invTransferItemsDetailsForm.get('UNIT_QUANTITY').value
    if (ITEM_COST && UNIT_QUANTITY) {
      this.invTransferItemsDetailsForm.get('TOTAL_COST').setValue(ITEM_COST * UNIT_QUANTITY)
    }

  }
  private patchTotalPrice() {
    const ITEM_PRICE = this.invTransferItemsDetailsForm.get('ITEM_PRICE').value
    const UNIT_QUANTITY = this.invTransferItemsDetailsForm.get('UNIT_QUANTITY').value
    if (ITEM_PRICE && UNIT_QUANTITY) {
      this.invTransferItemsDetailsForm.get('TOTAL_PRICE').setValue(ITEM_PRICE * UNIT_QUANTITY)
    }

  }
  patchArrangementNo() {
    this.invTransferItemsDetailsForm.controls.ARRANGEMENT_NO.setValue(1)
  }


  // *--------- lookups --------------* //

  /** On Form Submit */
  submitForm(): void {
    if (this.invTransferItemsDetailsForm.valid) {
      const body = { ...this.invTransferItemsDetailsForm.getRawValue() };
      this.onSubmit.emit(body)
      this.closeModal(body)

    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  closeModal(data: any = null) {
    this.drawerRef.close(data)
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }


}
