import { Component, OnInit } from '@angular/core'
import { StoresItemsModelService } from './stores-items.model.service'
import { StoresService } from 'src/app/services/stores.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-stores-items',
  templateUrl: './stores-items.component.html',
  styleUrls: ['./stores-items.component.scss'],
  providers: [StoresItemsModelService],
})
export class StoresItemsComponent implements OnInit {
  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  STORES_ID: string | number

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private storesService: StoresService,
    public storesItemsModelService: StoresItemsModelService,
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
    this.storesService.getStoreItems(this.STORES_ID).subscribe(
      data => {
        this.storesItemsModelService.savedData = data.rows
        this.storesItemsModelService.displayData = data.rows
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
    this.storesItemsModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.storesItemsModelService.sortData(sort)
  }

  /** Deletes store item */
  deleteStoreItem(STORES_ITEMS_ID: number | string): void {
    this.storesService.deleteStoreItem(STORES_ITEMS_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Store Item deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting store item'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.storesItemsModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.storesItemsModelService.searchName(this.searchValue)
  }
}
