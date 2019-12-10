import { Component, OnInit } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { CONSTANTS } from 'src/app/services/constants.service'
import { JOReqDocModelService } from './jo-req-doc.model.service'
import { OperationsService } from 'src/app/services/operations.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-jo-req-doc',
  templateUrl: './jo-req-doc.component.html',
  providers: [JOReqDocModelService],
})
export class JOReqDocComponent implements OnInit {
  searchText = ''

  searchValue = ''

  lang: any

  // STORES_ID: string | number;

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private operationsService: OperationsService,
    public reqDocModelService: JOReqDocModelService,
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

  // fetchStoreId():void{
  //   this.STORES_ID = this.route.snapshot.params['STORES_ID'];
  // }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    let validatedDocumentStatus = CONSTANTS.DOCUMENT_STATUS.NEW
    this.operationsService.getJobOrderReqDocAgainstStoreId(null, validatedDocumentStatus).subscribe(
      data => {
        this.reqDocModelService.savedData = data.rows
        this.reqDocModelService.displayData = data.rows
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
