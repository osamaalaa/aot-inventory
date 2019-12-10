import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationsService } from 'src/app/services/operations.service';
import { StoresItemsBalanceService } from './store-bal-details.model.service';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, flatMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-store-bal-details',
  templateUrl: './store-bal-details.component.html',
  styleUrls: ['./store-bal-details.component.scss'],
  providers: [StoresItemsBalanceService]
})
export class StoreBalDetailsComponent implements OnInit {

  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  /** Table loader */
  isDataLoading: boolean = false

  STORES_ID: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private operationService: OperationsService,
    public storesItemsBalanceService: StoresItemsBalanceService,
    private translate: TranslateService,
    private ui:UIService
  ) {
    this.getStoreId();
  }

  ngOnInit() {

    this.fetchData();
    this.onLangugateChange()
    this.fetchCurrentLanguage();

  }


  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  getStoreId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID']
  }


  purchaseOrderTempData:any = {};


  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.operationService.purchaseOrderRequest(this.STORES_ID)
     .pipe(
       switchMap(_=> this.operationService.getPurchaseOrder(this.STORES_ID)),
       switchMap(poTempData=>{
         console.log()
        if(poTempData['rows'].length > 0){
          this.purchaseOrderTempData = poTempData['rows'][0];

        }
        let PO_TEMP_ID = poTempData['rows'][0].PO_TEMP_ID 
        return this.operationService.getPurchaseOrderItemsList(PO_TEMP_ID)})
     ).subscribe(result=>{
        this.storesItemsBalanceService.savedData = result['rows']
        this.storesItemsBalanceService.displayData = result['rows']
        this.isDataLoading = false;
       
      },
      error => {
        this.isDataLoading = false
      
     })
   
    // this.operationService.getPurchaseOrderItemsList(this.STORES_ID).subscribe(
  
    // )
  }


  /** Search Items against search text*/
  searchItems(): void {
    this.storesItemsBalanceService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.storesItemsBalanceService.sortData(sort)
  }


  /**Search English name and filter from the table*/
  searchName(): void {
    this.storesItemsBalanceService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.storesItemsBalanceService.searchName(this.searchValue)
  }

  finishPurchaseLoading:boolean;

  finishPurchase(){
    let isDataValid:boolean = this.validateData();

    if(isDataValid){
      this.finishPurchaseLoading = true;
      let resouces = [];
      this.storesItemsBalanceService.displayData.forEach(o=>{
        let body = {...o}
        delete body.invalidQty;
        delete body.UNITS_NAME;
        delete body.ITEM_EN_NAME;
        delete body.ITEM_AR_NAME;
        delete body.ITEM_CODE;
        resouces.push(this.operationService.updatePurchaseItem(body.PO_TEMP_ITEMS_ID,body))
      });

      forkJoin(resouces).pipe(
        flatMap(_=>this.operationService.purchaseOrderRequestFinish(this.STORES_ID))
      ).subscribe(_=>{
        this.finishPurchaseLoading = false; 
        this.router.navigate(['../../pur-req-view'],{relativeTo:this.route})
        this.ui.createMessage("success","Done")
      },e=>{
        this.finishPurchaseLoading = false; 
      })


    }
  }

  validateData():boolean{
    let isValid = true;
    this.storesItemsBalanceService.displayData.forEach((item)=>{
      if(item.SELECTED == 1 && item.PO_QUANTITY == 0){
        item.invalidQty =  true;
        isValid = false;
      }else{
        item.invalidQty =  false
      }
    })

    return isValid;
   
  }

}
