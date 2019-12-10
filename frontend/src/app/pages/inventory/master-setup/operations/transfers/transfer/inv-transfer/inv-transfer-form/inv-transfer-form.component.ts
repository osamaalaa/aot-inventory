import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { invtransfer_Validation } from './invtransfer_ValidationMessages';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';
import { OperationsService } from 'src/app/services/operations.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { ItemsService } from 'src/app/services/items.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-inv-transfer-form',
  templateUrl: './inv-transfer-form.component.html',
  styles: [
    `
      nz-date-picker
        {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class InvTransferFormComponent implements OnInit {
  dateFormat = 'yyyy/MM/dd';

  form: FormGroup;

  isCustodyTransfer: boolean;

  validation_messages: any = invtransfer_Validation;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null;
  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()
  // @Input() STORES_ID = null;
  _readOnly: boolean = false;
  @Input() set readOnly(readOnly: boolean) {
    this._readOnly = readOnly;
    this.disableFormIfReadonly();
  }

  get readOnly() {
    return this._readOnly;
  }
  constructor(
    private _fb: FormBuilder,
    private operationsService: OperationsService,
    private itemsService: ItemsService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private ui: UIService) {
    this.route
      .data
      .subscribe(v => {
        this.isCustodyTransfer = v.isTransferCustody;
      });
    this.createForm()

  }

  custodyFrom:''
  custodyTo:''

  ngOnInit() {
    this.onLangugateChange()
    this.fetchCurrentLanguage()
    this.getAllLookups()
    this.checkIfEditModeAndPatchForm();
    this.disableFormIfReadonly();

    this.storeList.forEach(o=>{
      if(o.EMPLOYEE_NAME){
        console.log(o.EMPLOYEE_NAME,o.STORES_ID)
      }
    })
    this.form.controls.STORES_ID.valueChanges.subscribe(data=>{
      this.custodyFrom = this.storeList.filter(o=>o.STORES_ID== data)[0].EMPLOYEE_NAME
    })
    this.form.controls.TRANSFER_STORE_ID.valueChanges.subscribe(data=>{
      this.custodyTo = this.storeList.filter(o=>o.STORES_ID== data)[0].EMPLOYEE_NAME
    })

  }
  /** Create Form */

  lang
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }


  createForm(): void {
    this.form = this._fb.group({
      DOCUMENT_TYPE_ID: [CONSTANTS.DOCUMENT_TYPE.TRANSFER_REQUEST, [Validators.required]],
      DOCUMENT_DATE: [null, [Validators.required]],
      INVENTORY_PERIODS_ID: [null, [Validators.required]],
      STORES_ID: [null, [Validators.required]],
      TRANSFER_DATE: [null, [Validators.required]],
      DOCUMENT_NO: [null, [Validators.required]],
      BASE_DOCUMENT_ID: [null],
      BASE_DOCUMENT_TYPE_ID: [null],
      SUBSIDIARY_ID: [1, [Validators.required]],//TODO:Remove hardcoded value
      JOURNALS_ID: [1, [Validators.required]],
      SOURCE_TYPE: [CONSTANTS.SOURCE_TYPE.INTERNAL, [Validators.required]],
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


  isEditMode:boolean ;
  checkIfEditModeAndPatchForm(): void {
    this.isEditMode = this.formData ? true : false
    if (this.isEditMode) {

      this.form.patchValue(this.formData)
      this.STORES_ID.disable();
    }
  }

  /************LOOKUPS****************** */
  isfetchingLookup: boolean = false
  Documnettypelist: any[] = []
  BaseDocumenttuplist: any[] = []
  sourcetypelist: any[] = []
  inventoryperiodlist: any[] = []
  subsidiarylist: any[] = []
  storeList: any[] = [];
  transferStoreList:any[] = []
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
        let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID;

        this.isfetchingLookup = false;
        this.Documnettypelist = results[0].rows;
        this.sourcetypelist = results[1].rows;
        this.inventoryperiodlist = results[2].rows;

        if (this.isCustodyTransfer) {
          this.storeList = results[3].rows.filter(o=>o.STORE_TYPE == 4);
          this.transferStoreList = this.storeList.filter(o=>o.STORE_KEEPER == EMPLOYEE_ID)
          // this.storeList = results[3].rows
        }else{
          this.storeList = results[3].rows.filter(o=>o.STORE_TYPE != 4) ;
          this.transferStoreList = this.storeList.filter(o=>o.STORE_TYPE != 4 && o.STORE_KEEPER == EMPLOYEE_ID)

        }
        // this.storeList = HelperUtil.treeify(results[3]['rows'], 'STORES_ID', 'PARENT_STORES_ID', null)
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
      const body = { ...this.form.getRawValue() };
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
