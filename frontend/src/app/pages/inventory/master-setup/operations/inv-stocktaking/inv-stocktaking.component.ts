import { Component, OnInit } from '@angular/core'
import { InvStockTakingModelService } from './inv-stocktaking.model.service'
import { OperationsService } from 'src/app/services/operations.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { CONSTANTS } from 'src/app/services/constants.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-inv-stocktaking',
  templateUrl: './inv-stocktaking.component.html',
  styleUrls: ['./inv-stocktaking.component.scss'],
  providers: [InvStockTakingModelService],
})
export class InvStocktakingComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    public invStockTakingModelService: InvStockTakingModelService,
    private operationsService: OperationsService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
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

  fetchData(): void {
    this.isDataLoading = true
    let validatedDocumentStatus = CONSTANTS.DOCUMENT_STATUS.NEW
    this.operationsService.getInvStocking(null, validatedDocumentStatus).subscribe(
      data => {
        this.invStockTakingModelService.savedData = data.rows
        this.invStockTakingModelService.displayData = data.rows
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
    this.invStockTakingModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.invStockTakingModelService.sortData(sort)
  }

  /**Search */
  searchName(): void {
    this.invStockTakingModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.invStockTakingModelService.searchName(this.searchValue)
  }

  deleteInvStocktaking(INV_STOCKTAKING_ID: number | string): void {
    this.operationsService.updateInvStocking(INV_STOCKTAKING_ID, { deleted: 1 }).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while Deleting'),
    )
  }
}
