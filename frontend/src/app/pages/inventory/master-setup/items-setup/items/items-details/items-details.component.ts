import { Component, OnInit } from '@angular/core';
import { ITEMS_DETAILS_VALIDATION_MESSAGES } from './items-details.validations.messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { reject } from 'q';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.scss']
})
export class ItemsDetailsComponent implements OnInit {

  lang:string;

  itemDetailsForm: FormGroup;

  validation_messages: any = ITEMS_DETAILS_VALIDATION_MESSAGES;

  ITEMS_ID:string | number;

  itemDetail:any;

  /** If true , then it means that item is not present in item_template_details table */
  isNewEntry:boolean = false;


  formatterPercent = (value: number) => `${value} %`;

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private uIService: UIService,
    private router:Router,
    private route:ActivatedRoute,
    public translate: TranslateService
  ) {
    this.getAllLookups();
  }

  ngOnInit() {
    this
    .getItemId()
    .getItemDetailsData()
    .createForm()
    .checkIfNewEntryElsePatchData()
    // this.getItemId()
    // this.getItemDetailsData();
    // this.createForm();
    // this.checkIfNewEntryElsePatchData();
    this.onLangugateChange();
    this.fetchCurrentLanguage()

  }

  /** Get item item id from route param */
  getItemId(){
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
    return this
  }

  /** Get item detail data from resolve */
  private getItemDetailsData() {
    this.itemDetail = this.route.snapshot.data['itemDetailData'].rows[0];
    return this
  }

  /** Check if item detail is present in database . If not new entry , then patch with the value*/
  private checkIfNewEntryElsePatchData():void{
    this.isNewEntry = this.itemDetail ? false : true;
    if(!this.isNewEntry){
      this.patchForm();
    }
  }

  /** Patch form data */
  private patchForm():void{
    this.itemDetailsForm.patchValue(this.itemDetail);
  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm(): void {
    let isEditMode: boolean = this.itemDetailsForm ? true : false

    if (isEditMode) {
      let body = {...this.itemDetailsForm}
      // body.FOR_SALE = body.FOR_SALE == 1 ? true : false //parsing for FOR_SALE checkbox
      this.itemDetailsForm.patchValue(body)
    }
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      
      this.lang = lang.lang
      console.log(this.lang)
    })
  }

 
  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  /**Create Form  */
  createForm() {
    this.itemDetailsForm = this.fb.group({
      ITEMS_ID: [this.ITEMS_ID, [Validators.required]],
      SHIPPABLE_ENABLED_FLAG: [0],
      PURCHASING_ENABLED_FLAG: [0],
      CUSTOMER_ORDER_ENABLED_FLAG: [0],
      INTERNAL_ORDER_ENABLED_FLAG: [0],
      INVOICEABLE_ITEM_FLAG: [0],
      RETURNABLE_FLAG: [0],
      INSPECTION_REQUIRED_FLAG: [0],
      RECEIPT_REQUIRED_FLAG: [0],
      RFQ_REQUIRED_FLAG: [0],
      ALLOW_SUBSTITUTE_RECEIPTS_FLAG: [0],
      ALLOW_UNORDERED_RECEIPTS_FLAG: [0],
      ALLOW_EXPRESS_DELIVERY_FLAG: [0],
      INVOICE_ENABLED_FLAG: [0],
      COSTING_ENABLED_FLAG: [0],
      ORDERABLE_ON_WEB_FLAG: [0],
      COST_OF_SALES_ACCOUNT: [11, [Validators.required]],
      SALES_ACCOUNT: [11, [Validators.required]],
      EXPENSE_ACCOUNT: [11, [Validators.required]],
      ENCUMBRANCE_ACCOUNT: [11, [Validators.required]],
      ACCEPTABLE_RATE_INCREASE: [0, [Validators.required]],
      ACCEPTABLE_RATE_DECREASE: [0, [Validators.required]],
      ORDER_COST: [null, [Validators.required]],
      MINIMUM_ORDER_QUANTITY: [null, [Validators.required]],
      FIXED_ORDER_QUANTITY: [0, [Validators.required]],
      FIXED_DAYS_SUPPLY: [0, [Validators.required]],
      MAXIMUM_ORDER_QUANTITY: [null, [Validators.required]],
      VENDOR_WARRANTY_FLAG: [0],
      PREVENTIVE_MAINTENANCE_FLAG: [0],
      WARRANTY_VENDOR_ID: [1, [Validators.required]],
      MAX_WARRANTY_AMOUNT: [0, [Validators.required]],
      OUTSIDE_OPERATION_FLAG: [0],
      VEHICLE_ITEM_FLAG: [0],
      ELECTRONIC_FLAG: [0],
      ASSET_CATEGORY_ID: [null, [Validators.required]]
    })

    return this
  }

  /** ------------Lookups---------------- */
  isfetchingLookup: boolean = false
  chartsOfAccountsData: any[] = []
  groups: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(
      this.itemsService.getChartsOfAccounts(),
      this.itemsService.getallgroups()

    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.chartsOfAccountsData = HelperUtil.treeify(results[0].rows, 'CHART_OF_ACCOUNTS_ID', 'PARENT_ACCOUNTS_ID', null)
        this.groups = HelperUtil.treeify(results[1].rows, 'ITEMS_GROUP_ID', 'PARENT_ITEMS_GROUP_ID', null)
      },
      error => {
        this.isfetchingLookup = false;
        this.uIService.createMessage('error', 'error while getting data : ' + error);
      },
    )
  }


  /** When user submits */
  onSubmit() {
    if(this.itemDetailsForm.valid){

      this.isNewEntry ? this.addItemDetails(this.itemDetailsForm.value) : this.updateItemDetails(this.itemDetailsForm.value);


    }else{
      this.uIService.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }
  

  /** Add item details if not exist */
  private addItemDetails(body:any){
    this.itemsService.insertItemDetails(body).subscribe(
      data => {
        this.uIService.createMessage('success', 'Added item details');
        this.navigateToMain()
      },
      error=>{
        this.uIService.createMessage('error', 'Error while adding details');
      }
    )
  }


  /** Update item details */
  private updateItemDetails(body:any):void{
    this.itemsService.updateItemDetails(this.ITEMS_ID,body).subscribe(
      data => {
        this.uIService.createMessage('success', 'Updated item  details');
        this.navigateToMain()
      },
      error => {
        this.uIService.createMessage('error', 'Error while updating  details');
      }
    )
  }

  /** On Cancel, navigate to edit item template */
  cancel() {
    this.router.navigate(['..'],{relativeTo:this.route})
  }

  navigateToMain():void{
    this.router.navigate(['..'],{relativeTo:this.route})
  }


  get COST_OF_SALES_ACCOUNT() {
    return this.itemDetailsForm.controls.COST_OF_SALES_ACCOUNT
  }
  get SALES_ACCOUNT() {
    return this.itemDetailsForm.controls.SALES_ACCOUNT
  }
  get EXPENSE_ACCOUNT() {
    return this.itemDetailsForm.controls.EXPENSE_ACCOUNT
  }
  get ENCUMBRANCE_ACCOUNT() {
    return this.itemDetailsForm.controls.ENCUMBRANCE_ACCOUNT
  }
  get ACCEPTABLE_RATE_INCREASE() {
    return this.itemDetailsForm.controls.ACCEPTABLE_RATE_INCREASE
  }
  get ACCEPTABLE_RATE_DECREASE() {
    return this.itemDetailsForm.controls.ACCEPTABLE_RATE_DECREASE
  }
  get ORDER_COST() {
    return this.itemDetailsForm.controls.ORDER_COST
  }
  get MINIMUM_ORDER_QUANTITY() {
    return this.itemDetailsForm.controls.MINIMUM_ORDER_QUANTITY
  }
  get FIXED_ORDER_QUANTITY() {
    return this.itemDetailsForm.controls.FIXED_ORDER_QUANTITY
  }
  get FIXED_DAYS_SUPPLY() {
    return this.itemDetailsForm.controls.FIXED_DAYS_SUPPLY
  }
  get MAXIMUM_ORDER_QUANTITY() {
    return this.itemDetailsForm.controls.MAXIMUM_ORDER_QUANTITY
  }
  get WARRANTY_VENDOR_ID() {
    return this.itemDetailsForm.controls.WARRANTY_VENDOR_ID
  }
  get MAX_WARRANTY_AMOUNT() {
    return this.itemDetailsForm.controls.MAX_WARRANTY_AMOUNT
  }
  get ASSET_CATEGORY_ID() {
    return this.itemDetailsForm.controls.ASSET_CATEGORY_ID
  }
}
