import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OPEN_BAL_VALIDATION_MESSAGES } from '../../open-balance/open-bal/open-bal-form/open-bal-form.validations.messages';
import { OperationsService } from 'src/app/services/operations.service';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { forkJoin } from 'rxjs';
import { InvStocktakingService } from "../inv-stocktaking.service"
@Component({
  selector: 'app-inv-stocktaking-form',
  templateUrl: './inv-stocktaking-form.component.html',
  styleUrls: ['./inv-stocktaking-form.component.scss']
})
export class InvStocktakingFormComponent implements OnInit {


  form: FormGroup;

  physicalEntry:boolean

  validation_messages: any = OPEN_BAL_VALIDATION_MESSAGES;

  @Input() formData = null;

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
    private operationsService: OperationsService,
    private itemsService: ItemsService,
    private invStocktakingService:InvStocktakingService,
    private ui: UIService) {
    this.createForm();
    this.getAllLookups()
  }

  ngOnInit() {

    this.checkIfEditModeAndPatchForm();
    this.disableFormIfReadonly();
  }


  disableFormIfReadonly() {
    if (this.readOnly) {
      this.form.disable();
    }
  }

  /** Create Form */
  createForm(): void {
    this.form = this._fb.group({
      STORES_ID: [null, [Validators.required]],
      DOCUMENT_TYPE_ID: [
        CONSTANTS.DOCUMENT_TYPE.STOCKTAKING,
        [Validators.required]],
      STOCKTAKING_TYPE_ID: [
        CONSTANTS.DOCUMENT_TYPE.STOCKTAKING,
        [Validators.required]],
      DOCUMENT_DATE: [null, [Validators.required]],
      START_DATE: [null, [Validators.required]],
      END_DATE: [null, [Validators.required]],
      INVENTORY_PERIODS_ID: [null, [Validators.required]],
      DOCUMENT_NO: [null, [Validators.required]],
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]],
      JOURNALS_ID: [null],
      BASE_DOCUMENT_ID: [null],
      BASE_DOCUMENT_TYPE_ID: [null],
      DOCUMENT_STATUS: [CONSTANTS.DOCUMENT_STATUS.NEW, [Validators.required]],
      NOTES: [null],
      VALDIATED_BY: [null],
      VALDIATED_DATE: [null],
      CONFIRMED_BY: [null],
      CONFIRMED_DATE: [null],
      CREATED_BY: [null], 
    })
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false

    if (isEditMode) {
      this.form.patchValue(this.formData)
    }
  }

  get DOCUMENT_TYPE_ID() {
    return this.form.controls.DOCUMENT_TYPE_ID;
  }
  get DOCUMENT_DATE() {
    return this.form.controls.DOCUMENT_DATE;
  }
  get INVENTORY_PERIODS_ID() {
    return this.form.controls.INVENTORY_PERIODS_ID;
  }
  get DOCUMENT_NO() {
    return this.form.controls.DOCUMENT_NO;
  }
  get JOURNALS_ID() {
    return this.form.controls.JOURNALS_ID;
  }
  get SOURCE_TYPE() {
    return this.form.controls.SOURCE_TYPE;
  }
  get DOCUMENT_STATUS() {
    return this.form.controls.DOCUMENT_STATUS;
  }
  get NOTES() {
    return this.form.controls.NOTES;
  }
  get WF_REQUEST_ID() {
    return this.form.controls.WF_REQUEST_ID;
  }
  get STORES_ID() {
    return this.form.controls.STORES_ID;
  }
  get START_DATE() {
    return this.form.controls.START_DATE;
  }
  get END_DATE() {
    return this.form.controls.END_DATE;
  }

  // *--------- lookups --------------* //

  isfetchingLookup: boolean = false
  documentTypeList: any[] = []
  inverntoryPeriodsList: any[] = []
  sourceTypeList: any[] = []
  documentStatusList: any[] = [];
  storeList: any[] = [];

  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.operationsService.getallInventoryPeriod(),
      this.operationsService.getLookUps(CONSTANTS.LOOKUPS.sourceType),
      this.itemsService.getAllStore(),

    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.inverntoryPeriodsList = results[0].rows;
        this.sourceTypeList = results[1].rows;
        this.storeList = HelperUtil.treeify(results[2].rows, 'STORES_ID', 'PARENT_STORES_ID', null)

        // this.documentStatusList = results[2].rows;
        // this.documentTypeList = results[3].rows;
      },
      error => {
        this.isfetchingLookup = false;
        this.ui.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }

  onPhysicalEntryChange(e){
    this.invStocktakingService.isPhysicalEntryEnabled = e;
    this.invStocktakingService.onPhysicalEntrySwitchChange.next(e)
  }




  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

  saveItem() {
    if (this.form.valid) {
      let body = { ...this.form.getRawValue() };
      this.onSubmit.emit(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }
}
