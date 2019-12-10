import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { forkJoin } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';
import { ITEM_TEMPLATE_DETAILS_VALIDATION_MESSAGES } from './details-item-template.validation.messages';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-details-item-template',
  templateUrl: './details-item-template.component.html',
  styleUrls: ['./details-item-template.component.scss']
})
export class DetailsItemTemplateComponent implements OnInit {

  itemTemplateDetailForm: FormGroup;

  itemTemplatesDetailsData: any;

  validation_messages: any = ITEM_TEMPLATE_DETAILS_VALIDATION_MESSAGES;

  ITEM_TEMPLATE_ID:number | string;

  /** If true , then it means that item is not present in item_template_details table */
  isNewEntry:boolean = false;

  formatterPercent = (value: number) => `${value} %`;

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private itemsService:ItemsService,
    private ui: UIService,
    private router:Router
  ) {
    this.createForm();
    this.getItemTemplateDetailsData();
    this.checkIfNewEntryElsePatchData();
    this.getLookupData();
    this.getItemTemplateIdFromRoute();
  }
  

  ngOnInit() {}

  /** Get template detail data from resolve */
  private getItemTemplateDetailsData(): void {
    this.itemTemplatesDetailsData = this.route.snapshot.data['itemTemplateDetailData'].rows[0];
  }

  /**Get Route Template id */
  private getItemTemplateIdFromRoute():void{
    this.ITEM_TEMPLATE_ID  = this.route.snapshot.paramMap.get('ITEMS_TEMPLATE_ID');
  }

  /** Patch form data */
  private patchForm():void{
    this.itemTemplateDetailForm.patchValue(this.itemTemplatesDetailsData);
  }

  /** Check if template detail is present in database . If not new entry , then patch with the value*/
  private checkIfNewEntryElsePatchData():void{
    this.isNewEntry = this.itemTemplatesDetailsData ? false : true;
    if(!this.isNewEntry){
      this.patchForm();
    }
  }

  /** Fetch Lookups for the select tags */
  chartsOfAccountsData = [];
  private getLookupData():void{
    let resources = [this.itemsService.getChartsOfAccounts()];
    forkJoin(resources).subscribe(
      results => {
        this.chartsOfAccountsData = results[0].rows;
      },
      error => {
        this.ui.createMessage('error', 'Error while getting lookups')
      }
    )
  }

  /** Create Form */
  private createForm():void {
    this.itemTemplateDetailForm = this._fb.group({
      SHIPPABLE_ENABLED_FLAG: [false],
      PURCHASING_ENABLED_FLAG: [false],
      CUSTOMER_ORDER_ENABLED_FLAG: [false],
      INTERNAL_ORDER_ENABLED_FLAG: [false],
      INVOICEABLE_ITEM_FLAG: [false],
      RETURNABLE_FLAG: [false],
      INSPECTION_REQUIRED_FLAG: [false],
      RECEIPT_REQUIRED_FLAG: [false],
      RFQ_REQUIRED_FLAG: [false],
      ALLOW_SUBSTITUTE_RECEIPTS_FLAG: [false],
      ALLOW_UNORDERED_RECEIPTS_FLAG: [false],
      ALLOW_EXPRESS_DELIVERY_FLAG: [false],
      INVOICE_ENABLED_FLAG: [false],
      COSTING_ENABLED_FLAG: [false],
      ORDERABLE_ON_WEB_FLAG: [false],
      COST_OF_SALES_ACCOUNT: [null, [Validators.required]],
      SALES_ACCOUNT: [null, [Validators.required]],
      EXPENSE_ACCOUNT: [null, [Validators.required]],
      ENCUMBRANCE_ACCOUNT: [null, [Validators.required]],
      ACCEPTABLE_RATE_INCREASE: [0, [Validators.required]],
      ACCEPTABLE_RATE_DECREASE: [0, [Validators.required]],
      ORDER_COST: [null, [Validators.required]],
      MINIMUM_ORDER_QUANTITY: [null, [Validators.required]],
      FIXED_ORDER_QUANTITY: [null, [Validators.required]],
      FIXED_DAYS_SUPPLY: [null, [Validators.required]],
      MAXIMUM_ORDER_QUANTITY: [null, [Validators.required]],
      VENDOR_WARRANTY_FLAG: [false],
      PREVENTIVE_MAINTENANCE_FLAG: [false],
      WARRANTY_VENDOR_ID: [null, [Validators.required]],
      MAX_WARRANTY_AMOUNT: [null, [Validators.required]],
      OUTSIDE_OPERATION_FLAG: [false],
      VEHICLE_ITEM_FLAG: [false],
      ELECTRONIC_FLAG: [false],
      ASSET_CATEGORY_ID: [null, [Validators.required]],
      CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]]
    })
  }


  /** When user submits */
  onSubmit() {
    if(this.itemTemplateDetailForm.valid){
      //hit the update api

      let body = this.itemTemplateDetailForm.value;
      body['ITEMS_TEMPLATE_ID'] = this.ITEM_TEMPLATE_ID
      

      this.isNewEntry ? this.addTemplateDetails(body) : this.updateTemplateDetails(body);


    }else{
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }
  

  /** Add template details if not exist */
  private addTemplateDetails(body:any){
    this.itemsService.insertItemTemplateDetails(body).subscribe(
      data => {
        this.ui.createMessage('success', 'Added item template details');
        this.navigateToList()
      },
      error=>{
        this.ui.createMessage('error', 'Error while adding template details');
      }
    )
  }


  /** Update template details */
  private updateTemplateDetails(body:any):void{
    this.itemsService.updateItemTemplateDetails(body).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated item template details');
        this.navigateToList();
      },
      error => {
        this.ui.createMessage('error', 'Error while updating template details');
      }
    )
  }

  navigateToList(){
    this.router.navigate(["../.."],{
      relativeTo:this.route
    })
  }

  /** On Cancel, navigate to edit item template */
  cancel() {
    this.router.navigate(['..'],{relativeTo:this.route})
  }


  get COST_OF_SALES_ACCOUNT() {
    return this.itemTemplateDetailForm.controls.COST_OF_SALES_ACCOUNT
  }
  get SALES_ACCOUNT() {
    return this.itemTemplateDetailForm.controls.SALES_ACCOUNT
  }
  get EXPENSE_ACCOUNT() {
    return this.itemTemplateDetailForm.controls.EXPENSE_ACCOUNT
  }
  get ENCUMBRANCE_ACCOUNT() {
    return this.itemTemplateDetailForm.controls.ENCUMBRANCE_ACCOUNT
  }
  get ACCEPTABLE_RATE_INCREASE() {
    return this.itemTemplateDetailForm.controls.ACCEPTABLE_RATE_INCREASE
  }
  get ACCEPTABLE_RATE_DECREASE() {
    return this.itemTemplateDetailForm.controls.ACCEPTABLE_RATE_DECREASE
  }
  get ORDER_COST() {
    return this.itemTemplateDetailForm.controls.ORDER_COST
  }
  get MINIMUM_ORDER_QUANTITY() {
    return this.itemTemplateDetailForm.controls.MINIMUM_ORDER_QUANTITY
  }
  get FIXED_ORDER_QUANTITY() {
    return this.itemTemplateDetailForm.controls.FIXED_ORDER_QUANTITY
  }
  get FIXED_DAYS_SUPPLY() {
    return this.itemTemplateDetailForm.controls.FIXED_DAYS_SUPPLY
  }
  get MAXIMUM_ORDER_QUANTITY() {
    return this.itemTemplateDetailForm.controls.MAXIMUM_ORDER_QUANTITY
  }
  get WARRANTY_VENDOR_ID() {
    return this.itemTemplateDetailForm.controls.WARRANTY_VENDOR_ID
  }
  get MAX_WARRANTY_AMOUNT() {
    return this.itemTemplateDetailForm.controls.MAX_WARRANTY_AMOUNT
  }
  get ASSET_CATEGORY_ID() {
    return this.itemTemplateDetailForm.controls.ASSET_CATEGORY_ID
  }

}
