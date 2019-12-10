import { Component, OnInit } from '@angular/core'
import { StoresService } from 'src/app/services/stores.service'
import { StoresItemsGroupModelService } from './stores-items-group.model.services'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-stores-items-group',
  templateUrl: './stores-items-group.component.html',
  styleUrls: ['./stores-items-group.component.scss'],
  providers: [StoresItemsGroupModelService],
})
export class StoresItemsGroupComponent implements OnInit {
  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  STORES_ID: string | number

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private storesService: StoresService,
    public storesItemsGroupModelService: StoresItemsGroupModelService,
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

    this.storesService.storesitemgroupComponentss(this.STORES_ID).subscribe(
      data => {
        this.storesItemsGroupModelService.savedData = data.rows
        this.storesItemsGroupModelService.displayData = data.rows

        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting template list : ' + error)
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.storesItemsGroupModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.storesItemsGroupModelService.sortData(sort)
  }

  /** Deletes item template */
  deleteStoresItemGroupComponents(STORES_ITEMS_GROUP_ID: number | string): void {
    this.storesService.deleteStoresItemGroupComponents(STORES_ITEMS_GROUP_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Stores Items Group  deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting template : ' + error),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.storesItemsGroupModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.storesItemsGroupModelService.searchName(this.searchValue)
  }
}
