import { Component, OnInit } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { RcvDocumentModelService } from './rcv-document.model.service'
import { CONSTANTS } from 'src/app/services/constants.service'
import { OperationsService } from 'src/app/services/operations.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-rcv-document',
  templateUrl: './rcv-document.component.html',
  providers: [RcvDocumentModelService],
})
export class RcvDocumentComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  lang: any

  // STORES_ID: string | number;

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    public rcvDocumentModelService: RcvDocumentModelService,
    private operationsService: OperationsService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    // this.fetchStoreId();
    this.fetchData()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  // fetchStoreId(): void {
  //   this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  // }

  fetchData(): void {
    this.isDataLoading = true
    let validatedDocumentStatus = CONSTANTS.DOCUMENT_STATUS.NEW
    this.operationsService.getRcvDocumentAgainstStoreId(null, validatedDocumentStatus).subscribe(
      data => {
        this.rcvDocumentModelService.savedData = data.rows
        this.rcvDocumentModelService.displayData = data.rows
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

  /** Search Items against search text*/
  searchItems(): void {
    this.rcvDocumentModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.rcvDocumentModelService.sortData(sort)
  }

  /**Search */
  searchName(): void {
    this.rcvDocumentModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.rcvDocumentModelService.searchName(this.searchValue)
  }

  deleteRcvDocument(DOCUMENT_ID: number | string): void {
    this.operationsService.deleteRcvDocument(DOCUMENT_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Rcv Document deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Rcv Document'),
    )
  }
}
