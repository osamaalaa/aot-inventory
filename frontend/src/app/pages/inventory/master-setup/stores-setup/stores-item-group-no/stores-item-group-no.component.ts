import { Component, OnInit } from '@angular/core'
import { StoresService } from 'src/app/services/stores.service'
import { StoresItemsGroupNoModelService } from './stores-items-group-no-model.services'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-stores-item-group-no',
  templateUrl: './stores-item-group-no.component.html',
  styleUrls: ['./stores-item-group-no.component.scss'],
  providers: [StoresItemsGroupNoModelService],
})
export class StoresItemGroupNoComponent implements OnInit {
  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  STORES_ID: string | number

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private storesService: StoresService,
    public storesItemsGroupNoModelService: StoresItemsGroupNoModelService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.fetchItemId()
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

  fetchItemId(): void {
    this.STORES_ID = this.route.snapshot.params['STORES_ID']
  }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true

    this.storesService.storesitemgroupnoComponentss(this.STORES_ID).subscribe(
      data => {
        this.storesItemsGroupNoModelService.savedData = data.rows
        this.storesItemsGroupNoModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting template list : ' + error)
      },
    )
  }

  /** Search Stores Items Group No against search text*/
  searchItems(): void {
    this.storesItemsGroupNoModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.storesItemsGroupNoModelService.sortData(sort)
  }

  /** Deletes Stores Items Group No */
  deleteStoresItemGroupNoComponents(STORES_ITEMS_GROUP_NO_ID: number | string): void {
    this.storesService.deleteStoresItemGroupNoComponents(STORES_ITEMS_GROUP_NO_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Stores Items Group No deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting template : ' + error),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.storesItemsGroupNoModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.storesItemsGroupNoModelService.searchName(this.searchValue)
  }
}
