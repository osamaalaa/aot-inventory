import { Component, OnInit } from '@angular/core'
import { StoresService } from 'src/app/services/stores.service'
import { StoresItemsNoModelService } from './stores-items-no.model.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-stores-items-no',
  templateUrl: './stores-items-no.component.html',
  styleUrls: ['./stores-items-no.component.scss'],
  providers: [StoresItemsNoModelService],
})
export class StoresItemsNoComponent implements OnInit {
  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  STORES_ID: string | number

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private storesService: StoresService,
    public storesItemsNoModelService: StoresItemsNoModelService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.fetchStoreId()
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

  fetchStoreId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID']
  }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.storesService.getStoreItemsNo(this.STORES_ID).subscribe(
      data => {
        this.storesItemsNoModelService.savedData = data.rows
        this.storesItemsNoModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting Store item No list : ' + error.error.message,
        )
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.storesItemsNoModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.storesItemsNoModelService.sortData(sort)
  }

  /** Deletes store item no */
  deleteStoreItemNo(STORES_ITEMS_NO_ID: number | string): void {
    this.storesService.deleteStoreItemNo(STORES_ITEMS_NO_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Store Item No deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting store item No'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.storesItemsNoModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.storesItemsNoModelService.searchName(this.searchValue)
  }
}
