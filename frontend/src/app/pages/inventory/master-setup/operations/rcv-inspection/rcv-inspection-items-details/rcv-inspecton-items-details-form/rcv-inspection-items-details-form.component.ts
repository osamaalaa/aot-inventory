
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RCV_INSPECTION_ITEMS_DETAILS_VALIDATION_MESSAGES } from './rcv-inspection-items-details-form.validations.messages';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { NzDrawerRef } from 'ng-zorro-antd';


@Component({
  selector: 'app-rcv-inspection-items-details-form',
  templateUrl: './rcv-inspection-items-details-form.component.html',
  styles:[
    `.footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      border-top: 1px solid rgb(232, 232, 232);
      padding: 10px 16px;
      text-align: right;
      left: 0px;
      background: #fff;
    }`
  ]
})

export class RcvInspectionItemsDetailsFormComponent implements OnInit {

  form: FormGroup;

  validation_messages: any = RCV_INSPECTION_ITEMS_DETAILS_VALIDATION_MESSAGES;

  @Input() RCV_INSPECTION_ITEMS_ID: string | number;

  DOCUMENT_ID: string | number;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder, 
    private ui: UIService,
    private drawerRef: NzDrawerRef) {

  }

  ngOnInit() {
    this.createForm();
    this.checkIfEditModeAndPatchForm();
  }

  /** Create Form */
  createForm(): void {
    this.form = this._fb.group({

      RCV_INSPECTION_ITEMS_ID: [this.RCV_INSPECTION_ITEMS_ID],
      RCV_INSPECTION_ITEMS_D_ID: [null],

      DOCUMENT_ID: [this.DOCUMENT_ID],

      ARRANGEMENT_NO: [0, [Validators.required]],

      BATCH_NUMBER: [null, [Validators.required]],

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
  checkIfEditModeAndPatchForm(): void {
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

  get CREATED_BY() {
    return this.form.controls.CREATED_BY;
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

  submitForm() {
    console.log('===>', this.form.value)
    if (this.form.valid) {
      let body = { ...this.form.value };
      this.onSubmit.emit(body)
      this.closeModal(body);
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }


  closeModal(data: any = null) {
    this.drawerRef.close(data)
  }


}
