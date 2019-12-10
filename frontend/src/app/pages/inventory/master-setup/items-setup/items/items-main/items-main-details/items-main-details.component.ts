import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ItemsMainDetailsService } from './items-main-details.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-items-main-details',
  templateUrl: './items-main-details.component.html',
  styleUrls: ['./items-main-details.component.scss'],
  providers:[ItemsMainDetailsService]
})
export class ItemsMainDetailsComponent implements OnInit {

  itemDetailsForm:FormGroup;

  isDataLoading: boolean;


  constructor(
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private itemsMainDetailsService:ItemsMainDetailsService,
    private ui:UIService
  ) { }

  ngOnInit() {

    this.getItemId()
    this.createForm();
    this.getItemDetail();
  }

  getItemId() {
    let  ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
    this.itemsMainDetailsService.ITEMS_ID = ITEMS_ID;
  }

  getItemDetail() {
    this.isDataLoading = true;
    this.itemsMainDetailsService.getItemDetails().subscribe(data => {
      this.isDataLoading = false;
      if(!this.itemsMainDetailsService.isNewEntry){
        this.itemDetailsForm.patchValue(data)
      }
    },_=>{
      this.isDataLoading = false;
    })
  }

    /**Create Form  */
  createForm() {
      this.itemDetailsForm = this.fb.group({
        ITEMS_ID: [this.itemsMainDetailsService.ITEMS_ID, [Validators.required]],
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
        COST_OF_SALES_ACCOUNT: [null, [Validators.required]],
        SALES_ACCOUNT: [null, [Validators.required]],
        EXPENSE_ACCOUNT: [null, [Validators.required]],
        ENCUMBRANCE_ACCOUNT: [null, [Validators.required]],
        ACCEPTABLE_RATE_INCREASE: [null, [Validators.required]],
        ACCEPTABLE_RATE_DECREASE: [null, [Validators.required]],
        ORDER_COST: [null, [Validators.required]],
        MINIMUM_ORDER_QUANTITY: [null, [Validators.required]],
        FIXED_ORDER_QUANTITY: [null, [Validators.required]],
        FIXED_DAYS_SUPPLY: [null, [Validators.required]],
        MAXIMUM_ORDER_QUANTITY: [null, [Validators.required]],
        VENDOR_WARRANTY_FLAG: [0],
        PREVENTIVE_MAINTENANCE_FLAG: [0],
        WARRANTY_VENDOR_ID: [null, [Validators.required]],
        MAX_WARRANTY_AMOUNT: [null, [Validators.required]],
        OUTSIDE_OPERATION_FLAG: [0],
        VEHICLE_ITEM_FLAG: [0],
        ELECTRONIC_FLAG: [0],
        ASSET_CATEGORY_ID: [null, [Validators.required]]
      })
    }
  
    isSavingData:boolean;
    updateDetails(){
      this.isSavingData = true;
      this.itemsMainDetailsService.saveData(this.itemDetailsForm.value).subscribe(
        _=>{
          this.isSavingData = false;
          this.ui.createMessage('success', 'Details Updated');
        },
        error=>{
          this.isSavingData = false;
          this.ui.createMessage("error",error && error.error ? error.error.message : "Something went wrong!")
        }
      )
      console.log(this.itemDetailsForm.value)
    }

}
