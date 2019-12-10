import { Component, OnInit } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { CONSTANTS } from 'src/app/services/constants.service'
import { ReqDocModelService } from './req-doc.model.service'
import { OperationsService } from 'src/app/services/operations.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-req-doc',
  templateUrl: './req-doc.component.html',
  providers: [ReqDocModelService],
})
export class ReqDocComponent implements OnInit {
  lang: any

  searchText = ''

  searchValue = ''

  // STORES_ID: string | number;

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private operationsService: OperationsService,
    public reqDocModelService: ReqDocModelService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  isItemReturnRequest: any
  isItemLostRequest: any
  isEmployeeCustodyRequest: any
  isRequestItems: any
  isReturnRequest: any
  ngOnInit() {
    this.onLangugateChange()
    this.fetchCurrentLanguage()
    // this.fetchStoreId();
    this.route.data.subscribe(v => {
      this.isItemReturnRequest = v.isItemReturnRequest
      this.isItemLostRequest = v.isItemLostRequest
      this.isEmployeeCustodyRequest = v.isEmployeeCustodyRequest
      this.isRequestItems = v.isRequestItems
      this.isReturnRequest = v.isReturnRequest
      this.fetchData()
    })
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  // fetchStoreId():void{
  //   this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  // }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    let validatedDocumentStatus = CONSTANTS.DOCUMENT_STATUS.NEW
    this.operationsService.getReqDocAgainstStoreId(null, validatedDocumentStatus).subscribe(
      data => {
        var rows = this.getDataBasedOnType(data.rows)
        this.reqDocModelService.savedData = rows
        this.reqDocModelService.displayData = rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting Store item list : ' + error.error.message,
        )
      },
    )
  }


  getDataBasedOnType(data){
    let result = [];
    if(this.isItemReturnRequest){
      result = data.filter(o=>o.DOCUMENT_TYPE_ID == CONSTANTS.DOCUMENT_TYPE.RETURN_ITEMS_REQUEST)
    }else if (this.isItemLostRequest){
      result = data.filter(o=>o.DOCUMENT_TYPE_ID == CONSTANTS.DOCUMENT_TYPE.ITEMS_LOSE_REQUEST)

    }else if(this.isEmployeeCustodyRequest){
      result = data.filter(o=>o.DOCUMENT_TYPE_ID == CONSTANTS.DOCUMENT_TYPE.ADD_TO_EMPLOYEE_CUSTODY)

    }else if(this.isRequestItems){
      result = data.filter(o=>o.DOCUMENT_TYPE_ID == CONSTANTS.DOCUMENT_TYPE.REQUEST_ITEM)

    }else if(this.isReturnRequest){
      result = data.filter(o=>o.DOCUMENT_TYPE_ID == CONSTANTS.DOCUMENT_TYPE.RETURN_REQUEST)

    }
    
    return result;

  }

  /** Search Items against search text*/
  searchItems(): void {
    this.reqDocModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.reqDocModelService.sortData(sort)
  }

  /** Delete */
  deleteDispence(DOCUMENT_ID: number | string): void {
    this.operationsService.deleteDispence(DOCUMENT_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting store item'),
    )
  }

  /**Search */
  searchName(): void {
    this.reqDocModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.reqDocModelService.searchName(this.searchValue)
  }
}
