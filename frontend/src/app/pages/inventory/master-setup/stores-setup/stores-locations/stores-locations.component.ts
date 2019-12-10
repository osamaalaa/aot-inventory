import { Component, OnInit } from '@angular/core'
import { StoresLocationModelService } from './stores-locations.model.service'
import { StoresService } from 'src/app/services/stores.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-stores-locations',
  templateUrl: './stores-locations.component.html',
  styleUrls: ['./stores-locations.component.scss'],
  providers: [StoresLocationModelService],
})
export class StoresLocationsComponent implements OnInit {
  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  STORES_ID: string | number

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private storesService: StoresService,
    public storesLocationModelService: StoresLocationModelService,
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
    this.storesService.getStoreLocations(this.STORES_ID).subscribe(
      data => {
        this.storesLocationModelService.savedData = data.rows
        this.storesLocationModelService.displayData = data.rows
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
    this.storesLocationModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.storesLocationModelService.sortData(sort)
  }

  /** Deletes store location */
  deleteStoreLocation(STORES_LOCATIONS_ID: number | string): void {
    this.storesService.deleteStoreLocation(STORES_LOCATIONS_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Store Location deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting store Location'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.storesLocationModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.storesLocationModelService.searchName(this.searchValue)
  }
}
