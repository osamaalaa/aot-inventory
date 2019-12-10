import { Component, OnInit } from '@angular/core'
import { StoresService } from 'src/app/services/stores.service'
import { UIService } from 'src/app/services/ui.service'
import { StoresModelService } from './stores.model.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  providers: [StoresModelService],
})
export class StoresComponent implements OnInit {
  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private storesService: StoresService,
    public storesModelService: StoresModelService,
    private ui: UIService,
    private translate: TranslateService,
  ) { }

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

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.storesService.getAllStores().subscribe(
      data => {
        this.storesModelService.savedData = data.rows
        this.storesModelService.displayData = data.rows
        this.isDataLoading = false

        console.log(data.rows)
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Store list : ' + error.error.message)
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.storesModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.storesModelService.sortData(sort)
  }

  /** Deletes store */
  deleteStore(STORES_ID: number | string): void {
    this.storesService.deleteStore(STORES_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Store deleted successfully')
        this.fetchData()
      },
      error => {
        if (error.error && error.error.message == 'Child Nodes Found') {
          this.ui.createMessage('warn', 'This Store Has child Stores.Cannot Delete ')
        } else {
          this.ui.createMessage('error', 'Error while deleting store ')
        }
      },
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.storesModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.storesModelService.searchName(this.searchValue)
  }
}
