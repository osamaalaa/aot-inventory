import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITEM_VALIDATION_MESSAGES } from './item-main-form.validations.messages';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { CONSTANTS } from 'src/app/services/constants.service';
import { forkJoin, Subscription } from 'rxjs';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { ActivatedRoute } from '@angular/router';
import { ItemMainService } from '../items-main.service';

@Component({
  selector: 'app-item-main-form',
  templateUrl: './item-main-form.component.html',
  styleUrls: ['./item-main-form.component.scss']
})
export class ItemMainFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  isDataLoading: boolean;

  validation_messages: any = ITEM_VALIDATION_MESSAGES;

  imageChangeSubscription$: Subscription

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private uIService: UIService,
    private route: ActivatedRoute,
    private itemMainService: ItemMainService
  ) {
    this.getAllLookups();
  }

  ngOnInit() {
    this.getItemId();
    this.createForm();
    this.getItemData();
    this.getImage();
  }

  image;
  getImage() {
    this.imageChangeSubscription$ = this.itemMainService.onImageListChange.subscribe(imageList => {

      this.image = imageList && imageList.length > 0 ?
        imageList[0].url : ``

    })
  }

  ITEMS_ID: string | number;
  getItemId() {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }

  getItemData() {
    this.isDataLoading = true;
    this.itemsService.getoneitem(this.ITEMS_ID).subscribe(data => {
      this.form.patchValue(data.rows[0])
      this.isDataLoading = false;
    }, error => {
      this.isDataLoading = false;
    })
  }

  /**Create Form  */
  createForm(): void {
    this.form = this.fb.group({
      AR_NAME: [null, [Validators.required, Validators.required]],
      EN_NAME: [null, [Validators.required]],
      ITEMS_GROUP_ID: [null, [Validators.required]],
      ITEM_CODE: [{
        value: null,
        disabled: true
      }, [Validators.required]],
      ITEM_KIND: [null, [Validators.required]],
      ITEM_CLASS: [null, [Validators.required]],
      ITEM_NATURE: [null, [Validators.required]],
      BALANCE_NATURE: [null, [Validators.required]],
      FOR_SALE: [null, [Validators.required]],
      STATUS: [null, [Validators.required]],
      IMAGES_ID: [1, [Validators.required]],//TODO : Remove default value of image
      TAX_SCHEME_ID: [null, [Validators.required]],
      SHORTAGE_POLICY_ID: [null, [Validators.required]],
      ITEMS_TEMPLATE_ID: [{
        value: null,
        disabled: true
      }, [Validators.required]],
      SLOW_POLICY_ID: [null, [Validators.required]],
      ALIASES_TYPE_ID: [{
        value: null,
        disabled: true
      }, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]]// TODO: Remove this field 
    })
  }

  /** ------------Lookups---------------- */
  isfetchingLookup: boolean = false
  groups: any[] = []
  kinds: any[] = []
  classes: any[] = []
  natures: any[] = []
  bnatures: any[] = [];
  slowMovingPolicyList: any[] = [];
  taxList: any[] = []
  shortagePolicyList: any[] = [];
  templateList: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getallgroups(),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemKind),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemClass),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.itemNature),
      this.itemsService.getLookUps(CONSTANTS.LOOKUPS.bNature),
      this.itemsService.getSlowMovingPolicyList(),
      this.itemsService.getShortagePolicy(),
      this.itemsService.getTaxList(),
      this.itemsService.getItemTemplates()
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.kinds = results[1].rows;
        this.classes = results[2].rows;
        this.natures = results[3].rows;
        this.bnatures = results[4].rows;
        this.slowMovingPolicyList = results[5].rows;
        this.shortagePolicyList = results[6].rows;
        this.taxList = results[7].rows;
        this.templateList = results[8].rows;
        this.groups = HelperUtil.treeify(results[0].rows, 'ITEMS_GROUP_ID', 'PARENT_ITEMS_GROUP_ID', null)
      },
      error => {
        this.isfetchingLookup = false;
        this.uIService.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }

  onTemplateSelect(e) {
    if (e) {
      e.FOR_SALE = e.FOR_SALE == 1 ? true : false
      this.form.patchValue(e)
    } else {
      this.form.reset()
    }

    /**
 * TODO: Remove this setting
 */
    this.form.controls.CREATED_BY.setValue(1)
    this.form.controls.SUBSIDIARY_ID.setValue(1)
    this.form.controls.IMAGES_ID.setValue(1)
    console.log(e)
  }


  isSavingData: boolean = false;
  /**Submit form data. Form value is emitted to parent component */
  submitForm() {
    if (this.form.valid) {
      this.isSavingData = true;
      this.itemsService.updateItem(this.ITEMS_ID, this.form.getRawValue()).subscribe(data => {
        this.isSavingData = false;
        this.uIService.createMessage('success', 'Item Updated')

      }, error => {
        this.isSavingData = false;
      })
      // body.FOR_SALE = body.FOR_SALE == true ? 1 : body.FOR_SALE == 1 ? 1 : 0;
    } else {
      this.uIService.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** On Cancel. Event is emitted to parent component */
  cancel(): void {

  }


  get AR_NAME() {
    return this.form.controls.AR_NAME
  }
  get EN_NAME() {
    return this.form.controls.EN_NAME
  }
  get ITEMS_GROUP_ID() {
    return this.form.controls.ITEMS_GROUP_ID
  }
  get ITEM_KIND() {
    return this.form.controls.ITEM_KIND
  }
  get ITEM_CLASS() {
    return this.form.controls.ITEM_CLASS
  }
  get ITEM_NATURE() {
    return this.form.controls.ITEM_NATURE
  }
  get BALANCE_NATURE() {
    return this.form.controls.BALANCE_NATURE
  }

  get FOR_SALE() {
    return this.form.controls.FOR_SALE
  }
  get STATUS() {
    return this.form.controls.STATUS
  }
  get IMAGES_ID() {
    return this.form.controls.IMAGES_ID
  }
  get TAX_SCHEME_ID() {
    return this.form.controls.TAX_SCHEME_ID
  }
  get SHORTAGE_POLICY_ID() {
    return this.form.controls.SHORTAGE_POLICY_ID
  }
  get SLOW_POLICY_ID() {
    return this.form.controls.SLOW_POLICY_ID
  }
  get CREATED_BY() {
    return this.form.controls.CREATED_BY
  }
  get ITEM_CODE() {
    return this.form.controls.ITEM_CODE
  }
  get ALIASES_TYPE_ID() {
    return this.form.controls.ALIASES_TYPE_ID
  }

  ngOnDestroy() {
    if (this.imageChangeSubscription$) {
      this.imageChangeSubscription$.unsubscribe()
    }
  }
}
