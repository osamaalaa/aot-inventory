import { Component, OnInit } from '@angular/core'
import { StoresDocmentTypesModelService } from './stores-document-types.model.service'
import { StoresService } from 'src/app/services/stores.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-stores-document-types',
  templateUrl: './stores-document-types.component.html',
  styleUrls: ['./stores-document-types.component.scss'],
  providers: [StoresDocmentTypesModelService],
})
export class StoresDocumentTypesComponent implements OnInit {
  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  STORES_ID: string | number

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private storesService: StoresService,
    public storesDocmentTypesModelService: StoresDocmentTypesModelService,
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
    this.storesService.getStoreDocumentTypes(this.STORES_ID).subscribe(
      data => {
        this.storesDocmentTypesModelService.savedData = data.rows
        this.storesDocmentTypesModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting Store Document Type list : ' + error.error.message,
        )
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.storesDocmentTypesModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.storesDocmentTypesModelService.sortData(sort)
  }

  /** Deletes store Document type */
  deleteStoreDocumentType(STORES_DOCUMENT_TYPES_ID: number | string): void {
    this.storesService.deleteStoreDocumentType(STORES_DOCUMENT_TYPES_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Store Document Type deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Document Type'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.storesDocmentTypesModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.storesDocmentTypesModelService.searchName(this.searchValue)
  }
}
