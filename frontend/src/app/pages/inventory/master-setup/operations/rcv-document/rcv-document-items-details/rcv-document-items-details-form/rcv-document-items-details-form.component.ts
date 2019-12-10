
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RCV_DOCUMENT_ITEMS_DETAILS_VALIDATION_MESSAGES } from './rcv-document-items-details-form.validations.messages';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { NzDrawerRef } from 'ng-zorro-antd';


@Component({
  selector: 'app-rcv-document-items-details-form',
  templateUrl: './rcv-document-items-details-form.component.html',
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

export class RcvDocumentItemsDetailsFormComponent implements OnInit {

  rcvDocumentItemsDetailsForm: FormGroup;

  validation_messages: any = RCV_DOCUMENT_ITEMS_DETAILS_VALIDATION_MESSAGES;

  @Input() RCV_DOCUMENT_ITEMS_ID: string | number;

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
    this.rcvDocumentItemsDetailsForm = this._fb.group({

      RCV_DOCUMENT_ITEMS_ID: [this.RCV_DOCUMENT_ITEMS_ID],

      DOCUMENT_ID: [this.DOCUMENT_ID],

      ARRANGEMENT_NO: [null, [Validators.required]],

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
      this.rcvDocumentItemsDetailsForm.patchValue(this.formData)
    }
  }


  get ARRANGEMENT_NO() {
    return this.rcvDocumentItemsDetailsForm.controls.ARRANGEMENT_NO;
  }

  get BATCH_NUMBER() {
    return this.rcvDocumentItemsDetailsForm.controls.BATCH_NUMBER;
  }

  get SERIAL_NUMBER() {
    return this.rcvDocumentItemsDetailsForm.controls.SERIAL_NUMBER;
  }

  get UNIT_QUANTITY() {
    return this.rcvDocumentItemsDetailsForm.controls.UNIT_QUANTITY;
  }

  get DEFAULT_UNIT_QUANTITY() {
    return this.rcvDocumentItemsDetailsForm.controls.DEFAULT_UNIT_QUANTITY;
  }

  get BASE_UNIT_QUANTITY() {
    return this.rcvDocumentItemsDetailsForm.controls.BASE_UNIT_QUANTITY;
  }

  get ITEM_COST() {
    return this.rcvDocumentItemsDetailsForm.controls.ITEM_COST;
  }

  get TOTAL_COST() {
    return this.rcvDocumentItemsDetailsForm.controls.TOTAL_COST;
  }

  get ITEM_PRICE() {
    return this.rcvDocumentItemsDetailsForm.controls.ITEM_PRICE;
  }

  get TOTAL_PRICE() {
    return this.rcvDocumentItemsDetailsForm.controls.TOTAL_PRICE;
  }

  get NOTES() {
    return this.rcvDocumentItemsDetailsForm.controls.NOTES;
  }

  get CREATED_BY() {
    return this.rcvDocumentItemsDetailsForm.controls.CREATED_BY;
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

  submitForm() {
    console.log('===>', this.rcvDocumentItemsDetailsForm.value)
    if (this.rcvDocumentItemsDetailsForm.valid) {
      let body = { ...this.rcvDocumentItemsDetailsForm.value };
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
