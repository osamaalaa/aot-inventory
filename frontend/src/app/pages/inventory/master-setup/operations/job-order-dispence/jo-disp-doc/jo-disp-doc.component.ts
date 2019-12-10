import { Component, OnInit } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { CONSTANTS } from 'src/app/services/constants.service'
import { JODispenceModelService } from './jo-disp-doc.model.service'
import { OperationsService } from 'src/app/services/operations.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-jo-disp-doc',
  templateUrl: './jo-disp-doc.component.html',
  providers: [JODispenceModelService],
})
export class JODipsDocComponent implements OnInit {
  searchText = ''

  searchValue = ''

  lang: any
  // STORES_ID: string | number;

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private operationsService: OperationsService,
    public dispenceModelService: JODispenceModelService,
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
    this.operationsService
      .getJobOrderDispenceAgainstStoreId(null, validatedDocumentStatus)
      .subscribe(
        data => {
          this.dispenceModelService.savedData = data.rows
          this.dispenceModelService.displayData = data.rows
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
    this.dispenceModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.dispenceModelService.sortData(sort)
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
    this.dispenceModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.dispenceModelService.searchName(this.searchValue)
  }
}
