import { Component, OnInit } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { CONSTANTS } from 'src/app/services/constants.service'
import { DispenceModelService } from './disp-doc.model.service'
import { OperationsService } from 'src/app/services/operations.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-disp-doc',
  templateUrl: './disp-doc.component.html',
  providers: [DispenceModelService],
})
export class DipsDocComponent implements OnInit {
  searchText = ''

  searchValue = ''

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private operationsService: OperationsService,
    public dispenceModelService: DispenceModelService,
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


  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    let validatedDocumentStatus = CONSTANTS.DOCUMENT_STATUS.NEW
    this.operationsService.getDispenceAgainstStoreId(null, validatedDocumentStatus).subscribe(
      data => {
        var rows = data.rows.filter(o => {
          return o.DOCUMENT_TYPE_ID == CONSTANTS.DOCUMENT_TYPE.DISPENSE
        })
        this.dispenceModelService.savedData = rows
        this.dispenceModelService.displayData = rows
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
        this.ui.createMessagedelete('success1', 'Deleted successfully')
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
