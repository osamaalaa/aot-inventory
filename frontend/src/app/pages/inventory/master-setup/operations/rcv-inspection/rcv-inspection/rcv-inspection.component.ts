import { Component, OnInit } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { RcvInspectionModelService } from './rcv-inspection.model.service'
import { CONSTANTS } from 'src/app/services/constants.service'
import { OperationsService } from 'src/app/services/operations.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-rcv-inspection',
  templateUrl: './rcv-inspection.component.html',
  providers: [RcvInspectionModelService],
})
export class RcvInspectionsComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  lang: any

  // STORES_ID: string | number;

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    public rcvInspectionModelService: RcvInspectionModelService,
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
    this.operationsService.getRcvInspectionAgainstStoreId(null, validatedDocumentStatus).subscribe(
      data => {
        this.rcvInspectionModelService.savedData = data.rows
        this.rcvInspectionModelService.displayData = data.rows
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
    this.rcvInspectionModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.rcvInspectionModelService.sortData(sort)
  }

  /**Search */
  searchName(): void {
    this.rcvInspectionModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.rcvInspectionModelService.searchName(this.searchValue)
  }

  deleteRcvInspection(DOCUMENT_ID: number | string): void {
    this.operationsService.deleteRcvInspection(DOCUMENT_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Rcv Inspection deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Rcv Inspection'),
    )
  }
}
