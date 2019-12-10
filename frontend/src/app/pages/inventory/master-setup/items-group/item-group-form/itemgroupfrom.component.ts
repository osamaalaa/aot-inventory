import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { ITEM_GROUP_VALIDATION_MESSAGES } from './itemgroupfrom.validations.messages';
import { ItemsService } from 'src/app/services/items.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-itemgroupfrom',
  templateUrl: './itemgroupfrom.component.html',
  styleUrls: ['./itemgroupfrom.component.scss']
})
export class ItemgroupfromComponent implements OnInit {
  itemgroupForm: FormGroup;
  validation_messages: any = ITEM_GROUP_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() formData = null

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private itemsService: ItemsService,
    private ui: UIService) {
    this.createForm()
    this.getAllLookups()
  }
  createForm(): void {
    this.itemgroupForm = this._fb.group({
      ITEMS_GROUP_CODE: [null, [Validators.required]],
      AR_NAME: [null, [Validators.required]],
      EN_NAME: ["en_name", [Validators.required]],
      PARENT_ITEMS_GROUP_ID: [null],
      ITEM_CLASS: [12284, Validators.required],
      SUBSIDIARY_ID: [CONSTANTS.SUBSIDIARY_ID, [Validators.required]], //TODO: Remove this field
      COST_METHOD: [12300, [Validators.required]],//this field is not implemented
      PROFIT_MARGIN: [null],
      TREE_LEVEL: [null],
      BRAND_ID: [null],
      STATUS: [1, [Validators.required]],
      TAX_SCHEME_ID: [null],
      SHORTAGE_POLICY_ID: [null],
      SLOW_POLICY_ID: [null],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]], //TODO: Remove this field
    })
  }

  isfetchingLookup: boolean = false;
  groups: any[] = []
  itemclassList: any[] = []
  taxschema: any[] = []
  ShortagePolicy: any[] = []
  subsidiary: any[] = []
  costmethodlist: any[] = []
  slowMovingPolicyList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true;
    forkJoin(
      this.itemsService.getallitemgroup(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemClass),
      this.itemsService.getTaxSchemes(),
      this.itemsService.getsubsDiary(),
      this.itemsService.getShortagePolicy(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.costmethod),
      this.itemsService.getSlowMovingPolicyList()
    ).subscribe(results => {
      this.groups = HelperUtil.treeify(results[0].rows, 'ITEMS_GROUP_ID', 'PARENT_ITEMS_GROUP_ID', null);
      this.itemclassList = results[1].rows;
      this.taxschema = results[2].rows;
      this.subsidiary = results[3].rows;
      this.ShortagePolicy = results[4].rows;
      this.costmethodlist = results[5].rows;
      this.slowMovingPolicyList = results[6].rows;
      this.isfetchingLookup = false;
    }, error => {
      this.isfetchingLookup = false;
      this.ui.createMessage('error', 'Error while fetching data' + error && error.error ? error.error.message : '')
    })
  }


  cancel(): void {
    this.onCancel.emit()
  }

  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.formData ? true : false
    if (isEditMode) {
      this.itemgroupForm.patchValue(this.formData)
    }
  }

  get ITEMS_GROUP_CODE() {
    return this.itemgroupForm.controls.ITEMS_GROUP_CODE
  }
  get AR_NAME() {
    return this.itemgroupForm.controls.AR_NAME
  }
  get EN_NAME() {
    return this.itemgroupForm.controls.EN_NAME
  }
  get PARENT_ITEMS_GROUP_ID() {
    return this.itemgroupForm.controls.PARENT_ITEMS_GROUP_ID
  }
  get SUBSIDIARY_ID() {
    return this.itemgroupForm.controls.SUBSIDIARY_ID
  }
  get ITEM_CLASS() {
    return this.itemgroupForm.controls.ITEM_CLASS
  }
  get COST_METHOD() {
    return this.itemgroupForm.controls.COST_METHOD
  }

  get PROFIT_MARGIN() {
    return this.itemgroupForm.controls.PROFIT_MARGIN
  }
  get TREE_LEVEL() {
    return this.itemgroupForm.controls.TREE_LEVEL
  }

  get BRAND_ID() {
    return this.itemgroupForm.controls.BRAND_ID
  }
  get STATUS() {
    return this.itemgroupForm.controls.STATUS
  }
  get TAX_SCHEME_ID() {
    return this.itemgroupForm.controls.TAX_SCHEME_ID
  }
  get SHORTAGE_POLICY_ID() {
    return this.itemgroupForm.controls.SHORTAGE_POLICY_ID
  }
  get SLOW_POLICY_ID() {
    return this.itemgroupForm.controls.SLOW_POLICY_ID
  }
  get CREATED_BY() {
    return this.itemgroupForm.controls.CREATED_BY
  }

  ngOnInit() {
    this.checkIfEditModeAndPatchForm();
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.itemgroupForm.valid) {
      this.onSubmit.emit(this.itemgroupForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }



}
