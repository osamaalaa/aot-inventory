import { Component, OnInit } from '@angular/core';
import { TransactionModelService } from './translactions.model.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  viewProviders:[TransactionModelService]
})
export class TransactionsComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = '';

  searchValue = '';

  // STORES_ID: string | number;

  /** Table loader */
  isDataLoading: boolean = false

  cacheData:{[key:string]:any[]} = {}

  constructor(
    public transactionModelService: TransactionModelService,
    private operationsService:OperationsService,
    private translate: TranslateService

  ) { }

  ngOnInit() {
    this.fetchData();
    this.onLangugateChange();
    this.fetchCurrentLanguage()
  }
  lang
  onLangugateChange(){
    this.translate.onLangChange.subscribe(lang=>{
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {

    this.lang = this.translate.currentLang
    console.log(this.lang)
  }


  fetchData(): void {
    this.isDataLoading = true;
    this.operationsService.getTransactions().subscribe(
      data => {
        this.transactionModelService.savedData = data.rows

        data.rows.forEach(item => {
          this.cacheData[item.INV_TRANSACTIONS_ID] = []
        });
        this.transactionModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        // this.ui.createMessage('error', 'Error while getting Store item list : ' + error.error.message)
      },
    )
  }


  expandParentRow(isRowExpanded,INV_TRANSACTIONS_ID){
    if (isRowExpanded) {
      if(this.cacheData[INV_TRANSACTIONS_ID].length == 0){
      
        this.operationsService.getTransactionItems(INV_TRANSACTIONS_ID).subscribe(data=>{
          this.cacheData[INV_TRANSACTIONS_ID] = data.rows
        })
      }
    }
    
  }

   /** Search Items against search text*/
   searchItems(): void {
    this.transactionModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.transactionModelService.sortData(sort)
  }

  /**Search */
  searchName(): void {
    this.transactionModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.transactionModelService.searchName(this.searchValue)
  }
}
