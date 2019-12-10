import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RCV_TEMPORARY_VALIDATION_MESSAGES } from './rcv-temporary-form.validations.messages';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { ItemsService } from 'src/app/services/items.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rcv-temporary-form',
  templateUrl: './rcv-temporary-form.component.html',
})
export class RcvTemporaryFormComponent implements OnInit {

  public date = new Date();

  form: FormGroup;

  validation_messages: any = RCV_TEMPORARY_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  // @Input() STORES_ID = null;

  _readOnly: boolean = false;
  @Input() set readOnly(readOnly: boolean) {
    this._readOnly = readOnly;
    this.disableFormIfReadonly();
  }

  get readOnly() {
    return this._readOnly;
  }

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private generalSetupService: GeneralSetupService,
    private ui: UIService,
    private operationsService:OperationsService,
    private translate:TranslateService,
    private itemsService:ItemsService

  ) {
    this.getAllLookups();
    this.createForm();
  }

  ngOnInit() {
  
    this.checkIfEditModeAndPatchForm();
    this.disableFormIfReadonly();
    // this.patchStoreId();
    this.onLangugateChange();
    this.fetchCurrentLanguage()
  }

  lang
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }


  // patchStoreId(){
  //   this.form.controls.STORES_ID.patchValue(this.STORES_ID)
  // }

  /** Create Form */
  createForm(): void {
    this.form = this._fb.group({
      DOCUMENT_TYPE_ID: [CONSTANTS.DOCUMENT_TYPE.TEMPORARY_RECEIVING, Validators.required],
      INVENTORY_PERIODS_ID: [null, Validators.required],
      STORES_ID: [null],
      DOCUMENT_NO: [null, Validators.required],
      BASE_DOCUMENT_ID: [null],
      BASE_DOCUMENT_TYPE_ID: [null],
      SUBSIDIARY_ID: [1, Validators.required],
      JOURNALS_ID: [1, Validators.required],
      SOURCE_TYPE: [CONSTANTS.SOURCE_TYPE.INTERNAL, Validators.required],
      SUPPLIER_ID: [null, Validators.required],
      PO_NUMBER: [null, Validators.required],
      PI_NUMBER: [null, Validators.required],
      DELIVERED_BY: [null, Validators.required],
      SHIPMENT_NUMBER: [null, Validators.required],
      SHIPMENT_POLICY_NO: [null, Validators.required],
      DOCUMENT_STATUS: [CONSTANTS.DOCUMENT_STATUS.NEW, Validators.required],
      CREATED_BY: [CONSTANTS.CREATED_BY, Validators.required],
      NOTES: [null],
      VALDIATED_BY: [CONSTANTS.CREATED_BY],
      CONFIRMED_BY: [CONSTANTS.CREATED_BY],
      MODIFIED_BY: [CONSTANTS.CREATED_BY]
    })
  }

  disableFormIfReadonly() {
    if (this.readOnly) {
      this.form.disable();
    }
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.formData.DOCUMENT_DATE = this.formData.DOCUMENT_DATE ? new Date(this.formData.DOCUMENT_DATE) : null;
      this.form.patchValue(this.formData)
    }
  }

  get DOCUMENT_TYPE_ID() {
    return this.form.controls.DOCUMENT_TYPE_ID;
  }
  get INVENTORY_PERIODS_ID() {
    return this.form.controls.INVENTORY_PERIODS_ID;
  }
  get DOCUMENT_NO() {
    return this.form.controls.DOCUMENT_NO;
  }
  get BASE_DOCUMENT_ID() {
    return this.form.controls.BASE_DOCUMENT_ID;
  }
  get BASE_DOCUMENT_TYPE_ID() {
    return this.form.controls.BASE_DOCUMENT_TYPE_ID;
  }
  get SUBSIDIARY_ID() {
    return this.form.controls.SUBSIDARY_ID;
  }
  get JOURNALS_ID() {
    return this.form.controls.JOURNALS_ID;
  }
  get SOURCE_TYPE() {
    return this.form.controls.SOURCE_TYPE;
  }
  get SUPPLIER_ID() {
    return this.form.controls.SUPPLIER_ID;
  }
  get PO_NUMBER() {
    return this.form.controls.PO_NUMBER;
  }
  get PI_NUMBER() {
    return this.form.controls.PI_NUMBER;
  }
  get DELIVERED_BY() {
    return this.form.controls.DELIVERED_BY;
  }
  get SHIPMENT_NUMBER() {
    return this.form.controls.SHIPMENT_NUMBER;
  }
  get SHIPMENT_POLICY_NO() {
    return this.form.controls.SHIPMENT_POLICY_NO;
  }
  get DOCUMENT_STATUS() {
    return this.form.controls.DOCUMENT_STATUS;
  }
  get NOTES() {
    return this.form.controls.NOTES;
  }
  get STORES_ID() {
    return this.form.controls.STORES_ID;
  }

  // *--------- lookups --------------* //
  isfetchingLookup: boolean = false
  documentTypeList: any[] = []
  inverntoryPeriodsList: any[] = []
  sourceTypeList: any[] = []
  supplierIdList: any[] = []
  baseDocumentId: any[] = []
  storeList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin([
      this.operationsService.getallDocumentTypes(),
      this.operationsService.getallInventoryPeriod(),
      this.operationsService.getLookUps(CONSTANTS.LOOKUPS.sourceType),
      this.generalSetupService.getSupplierall(),
      this.operationsService.getAllBaseDocumentId(),
      this.itemsService.getAllStore(),

    ]).subscribe(
      results => {

        this.isfetchingLookup = false;
        this.documentTypeList = results[0].rows;
        this.inverntoryPeriodsList = results[1].rows;
        this.sourceTypeList = results[2].rows;
        this.supplierIdList = results[3].rows;
        this.baseDocumentId = results[4].rows;
        this.storeList = HelperUtil.treeify(results[5].rows, 'STORES_ID', 'PARENT_STORES_ID', null)


        console.table( this.supplierIdList)
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }

  /** On Form Submit */
  submitForm(): void {
    if (this.form.valid) {
      let body = { ...this.form.value };
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
