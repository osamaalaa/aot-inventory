import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { invtransfer_Validation } from './invtransferR_ValidationMessages';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-inv-transferR-form',
  templateUrl: './inv-transferR-form.component.html',
  styles: [
    `
      nz-date-picker
        {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class InvTransferRFormComponent implements OnInit {
  dateFormat = 'yyyy/MM/dd';

  form: FormGroup;

  validation_messages: any = invtransfer_Validation;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()
  // @Input() STORES_ID = null;
  @Input() readOnly: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private operationsService: OperationsService,
    private itemsService: ItemsService,
    private ui: UIService) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.checkIfEditModeAndPatchForm();
    this.disableFormIfReadonly()
  }
  /** Create Form */


  createForm(): void {
    this.form = this._fb.group({
      DOCUMENT_TYPE_ID: [null, [Validators.required]],
      DOCUMENT_DATE: [null, [Validators.required]],
      INVENTORY_PERIODS_ID: [null, [Validators.required]],
      STORES_ID: [null, [Validators.required]],
      TRANSFER_DATE: [null, [Validators.required]],
      DOCUMENT_NO: [null, [Validators.required]],
      BASE_DOCUMENT_ID: [null, [Validators.required]],
      BASE_DOCUMENT_TYPE_ID: [null, [Validators.required]],
      SUBSIDIARY_ID: [1, [Validators.required]],//TODO:Remove hardcoded value
      JOURNALS_ID: [1, [Validators.required]],
      SOURCE_TYPE: [null, [Validators.required]],
      DOCUMENT_STATUS: [CONSTANTS.DOCUMENT_STATUS.NEW, [Validators.required]],
      NOTES: [null],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]],
      VALDIATED_BY: [null],
      VALDIATED_DATE: [null],
      CONFIRMED_BY: [null],
      CONFIRMED_DATE: [null],
      TRANSFER_STORE_ID: [null, [Validators.required]],
    })
  }
  get DOCUMENT_TYPE_ID() {
    return this.form.controls.DOCUMENT_TYPE_ID
  }
  get DOCUMENT_DATE() {
    return this.form.controls.DOCUMENT_DATE
  }
  get TRANSFER_DATE() {
    return this.form.controls.TRANSFER_DATE
  }
  get INVENTORY_PERIODS_ID() {
    return this.form.controls.INVENTORY_PERIODS_ID
  }
  get INV_TRANSFER_ID() {
    return this.form.controls.INV_TRANSFER_ID
  }
  get DOCUMENT_NO() {
    return this.form.controls.DOCUMENT_NO
  }
  get BASE_DOCUMENT_ID() {
    return this.form.controls.BASE_DOCUMENT_ID
  }
  get BASE_DOCUMENT_TYPE_ID() {
    return this.form.controls.BASE_DOCUMENT_TYPE_ID
  }
  get SOURCE_TYPE() {
    return this.form.controls.SOURCE_TYPE
  }
  get DOCUMENT_STATUS() {
    return this.form.controls.DOCUMENT_STATUS
  }
  get NOTES() {
    return this.form.controls.NOTES
  }
  get TRANSFER_STORE_ID() {
    return this.form.controls.TRANSFER_STORE_ID
  }
  get STORES_ID() {
    return this.form.controls.STORES_ID
  }

  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false
    if (isEditMode) {
      this.form.patchValue(this.formData)
    }
  }

  /************LOOKUPS****************** */
  isfetchingLookup: boolean = false
  Documnettypelist: any[] = []
  BaseDocumenttuplist: any[] = []
  sourcetypelist: any[] = []
  inventoryperiodlist: any[] = []
  subsidiarylist: any[] = []
  storeList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.operationsService.getallDocumentTypeList(),
      this.operationsService.getLookUps(CONSTANTS.LOOKUPS.sourceType),
      this.operationsService.getAllInventoryPeriod(),
      this.itemsService.getAllStore(),

      //this.itemservice.getsubsDiary(),
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.Documnettypelist = results[0].rows;
        this.sourcetypelist = results[1].rows;
        this.inventoryperiodlist = results[2].rows;
        this.storeList = HelperUtil.treeify(results[3]['rows'], 'STORES_ID', 'PARENT_STORES_ID', null)
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }

  disableFormIfReadonly() {
    if (this.readOnly) {
      this.form.disable();
    }
  }

  /** On Form Submit */
  submitForm(): void {
    if (this.form.valid) {
      const body = { ...this.form.value };
      body.VALDIATED_DATE = null
      body.CONFIRMED_DATE = null
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
