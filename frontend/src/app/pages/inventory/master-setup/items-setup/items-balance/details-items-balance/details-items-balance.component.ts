import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { forkJoin } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';
import { ITEM_BALANCE_DETAILS_VALIDATION_MESSAGES } from './details-items-balance.validation.messages';
// import { HelperUtil } from 'src/app/common/Helper.Util';

@Component({
  selector: 'app-details-items-balance',
  templateUrl: './details-items-balance.component.html',
  styleUrls: ['./details-items-balance.component.scss']
})
export class DetailsItemsBalanceComponent implements OnInit {

  @Input() formData = null;
   @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()
  itemsBalanceDetailForm: FormGroup;

  itemBalanceDetailsData: any;

  validation_messages: any = ITEM_BALANCE_DETAILS_VALIDATION_MESSAGES;

  ITEMS_BALANCE_ID: number | string;
  ITEMS_ID: number | string;
  ITEMS_BALANCE_DETAIL_ID: number | string;

  /** If true , then it means that item is not present in item_Balance_details table */
  isNewEntry: boolean = false;

  formatterPercent = (value: number) => `${value} %`;

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private ui: UIService,
    private router: Router
  ) {
    this.createForm();
    this.getItemTemplateDetailsData();
    this.checkIfNewEntryElsePatchData();
    this.getLookupData();
    this.getItemTemplateIdFromRoute();
    this.getItemBalancesFromRoute();
    this.fetchItemId();
  }


  ngOnInit() {}



  /** Get Balance detail data from resolve */
  private getItemTemplateDetailsData(): void {
    this.itemBalanceDetailsData = this.route.snapshot.data['itemBalanceDetailData'].rows[0];
  }

  /**Get Route Balance id */
  private getItemTemplateIdFromRoute(): void {
    this.ITEMS_BALANCE_ID = this.route.snapshot.paramMap.get('ITEMS_BALANCE_ID');
  }


  private getItemBalancesFromRoute(): void {
    this.ITEMS_BALANCE_DETAIL_ID = this.route.snapshot.paramMap.get('ITEMS_BALANCE_DETAIL_ID');
  }

  private fetchItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID']
  }

  /** Patch form data */
  private patchForm(): void {
    this.itemsBalanceDetailForm.patchValue(this.itemBalanceDetailsData);
  }

  /** Check if Balance detail is present in database . If not new entry , then patch with the value*/
  private checkIfNewEntryElsePatchData(): void {
    this.isNewEntry = this.itemBalanceDetailsData ? false : true;
    if (!this.isNewEntry) {
      this.patchForm();
    }
  }

  /** Fetch Lookups for the select tags */
  OpenBalanceItemsDData = [];
  private getLookupData(): void {
    let resources = [];
    forkJoin(
      this.itemsService.getofOpenBalanceItemsD(),


    ).subscribe(

      results => {
        this.OpenBalanceItemsDData = results[0].rows;
      

      },
      error => {
        this.ui.createMessage('error', 'Error while getting lookups')
      }
    )
  }

  /** Create Form */
  private createForm(): void {
    this.itemsBalanceDetailForm = this._fb.group({

      ITEMS_BALANCE_ID: [this.ITEMS_BALANCE_ID],
      BATCH_NUMBER: [null, [Validators.required]],
      SERIAL_NUMBER: [null, [Validators.required]],
      EXPIRY_DATE: [null],
      OPEN_BALANCE: [null, [Validators.required]],
      OPEN_BALANCE_DATE: [null],
      ITEM_COST: [null, [Validators.required]],
      AVERAGE_COST: [null, [Validators.required]],
      CURRENT_BALANCE: [null, [Validators.required]],
      QTY_ON_HAND: [null, [Validators.required]],
      QTY_RESERVED: [null, [Validators.required]],
      QTY_TRANSFER_TO: [null, [Validators.required]],
      QTY_TRANSFER_FROM: [null, [Validators.required]],
      OTY_DISPOSED: [null, [Validators.required]],
      QTY_ON_POR: [null, [Validators.required]],
      QTY_ON_SOR: [null, [Validators.required]],
      QTY_ON_SO: [null, [Validators.required]],
      QTY_ON_PO: [null, [Validators.required]],
      QTY_REQUESTED: [null, [Validators.required]],
      QTY_SO_CONSIGMENT: [null, [Validators.required]],
      QTY_PO_CONSIGMENT: [null, [Validators.required]],
      QTY_IN: [null, [Validators.required]],
      QTY_OUT: [null, [Validators.required]],
      LAST_SOLD: [null],
      LAST_RECIEVED: [null],
      CONFIRMED: [null, [Validators.required]],

    })
  }

  /** When user submits */
  submitForm() {
    if (this.itemsBalanceDetailForm.valid) {
      let body = this.itemsBalanceDetailForm.value;
      this.onSubmit.emit(body)
      body['ITEMS_BALANCE_ID'] = this.ITEMS_BALANCE_ID
      this.isNewEntry ? this.addBalanceDetails(body) : this.updateBalanceDetails(body);
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }



  /** Add Balance details if not exist */
  private addBalanceDetails(body: any) {

    this.itemsService.insertItemBalanceDetails(body).subscribe(
      data => {
        this.ui.createMessage('success', 'Added item Balance details');
        this.navigateToList();
      },
      error => {
        this.ui.createMessage('error', 'Error while adding Balance details');
      }
    )
  }


  /** Update Balance details */
  private updateBalanceDetails(body: any): void {

    this.itemsService.updateItemBalanceDetails(this.ITEMS_BALANCE_ID, body).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated item Balance details');
        this.navigateToList()
      },
      error => {
        this.ui.createMessage('error', 'Error while updating Balance details');
      }
    )
  }

  navigateToList(){
    this.router.navigate(['..'],{relativeTo:this.route})
  }

  /** On Cancel, navigate to edit item Balance */
  cancel() {
    this.router.navigate(['..'], { relativeTo: this.route })
  }


  get BATCH_NUMBER() {
    return this.itemsBalanceDetailForm.controls.BATCH_NUMBER
  }
  get SERIAL_NUMBER() {
    return this.itemsBalanceDetailForm.controls.SERIAL_NUMBER
  }
  get EXPIRY_DATE() {
    return this.itemsBalanceDetailForm.controls.EXPIRY_DATE
  }
  get OPEN_BALANCE() {
    return this.itemsBalanceDetailForm.controls.OPEN_BALANCE
  }
  get OPEN_BALANCE_DATE() {
    return this.itemsBalanceDetailForm.controls.OPEN_BALANCE_DATE
  }
  get ITEM_COST() {
    return this.itemsBalanceDetailForm.controls.ITEM_COST
  }
  get AVERAGE_COST() {
    return this.itemsBalanceDetailForm.controls.AVERAGE_COST
  }
  get CURRENT_BALANCE() {
    return this.itemsBalanceDetailForm.controls.CURRENT_BALANCE
  }
  get QTY_ON_HAND() {
    return this.itemsBalanceDetailForm.controls.QTY_ON_HAND
  }
  get QTY_TRANSFER_TO() {
    return this.itemsBalanceDetailForm.controls.QTY_TRANSFER_TO
  }
  get QTY_TRANSFER_FROM() {
    return this.itemsBalanceDetailForm.controls.QTY_TRANSFER_FROM
  }
  get OTY_DISPOSED() {
    return this.itemsBalanceDetailForm.controls.OTY_DISPOSED
  }
  get QTY_ON_POR() {
    return this.itemsBalanceDetailForm.controls.QTY_ON_POR
  }
  get QTY_ON_SOR() {
    return this.itemsBalanceDetailForm.controls.QTY_ON_SOR
  }
  get QTY_ON_SO() {
    return this.itemsBalanceDetailForm.controls.QTY_ON_SO
  }
  get QTY_ON_PO() {
    return this.itemsBalanceDetailForm.controls.QTY_ON_PO
  }
  get QTY_REQUESTED() {
    return this.itemsBalanceDetailForm.controls.QTY_REQUESTED
  }
  get QTY_SO_CONSIGMENT() {
    return this.itemsBalanceDetailForm.controls.QTY_SO_CONSIGMENT
  }
  get QTY_PO_CONSIGMENT() {
    return this.itemsBalanceDetailForm.controls.QTY_PO_CONSIGMENT
  }
  get QTY_IN() {
    return this.itemsBalanceDetailForm.controls.QTY_IN
  }
  get QTY_OUT() {
    return this.itemsBalanceDetailForm.controls.QTY_OUT
  }
  get LAST_SOLD() {
    return this.itemsBalanceDetailForm.controls.LAST_SOLD
  }
  get QTY_RESERVED() {
    return this.itemsBalanceDetailForm.controls.QTY_RESERVED
  }
  get LAST_RECIEVED() {
    return this.itemsBalanceDetailForm.controls.LAST_RECIEVED
  }
  get CONFIRMED() {
    return this.itemsBalanceDetailForm.controls.CONFIRMED
  }


}