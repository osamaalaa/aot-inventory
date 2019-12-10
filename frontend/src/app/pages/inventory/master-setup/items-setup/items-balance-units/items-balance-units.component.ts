import { Component, OnInit } from '@angular/core'
import { ItemBalanceUnitsModelService } from './items-balance-units.model.service'
import { ItemsService } from 'src/app/services/items.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-items-balance-units',
  templateUrl: './items-balance-units.component.html',
  styleUrls: ['./items-balance-units.component.scss'],
  providers: [ItemBalanceUnitsModelService],
})
export class ItemsBalanceUnitsComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  ITEMS_ID: string | number

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public itemBalanceUnitsModelService: ItemBalanceUnitsModelService,
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
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID']
  }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.itemsService.getItemBalanceUnits(this.ITEMS_ID).subscribe(
      data => {
        this.itemBalanceUnitsModelService.savedData = data.rows
        this.itemBalanceUnitsModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Item Balance units')
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.itemBalanceUnitsModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemBalanceUnitsModelService.sortData(sort)
  }

  /** Deletes item balance Unit */
  deleteItemBalanceUnit(ITEMS_BALANCE_UNITS_ID: number | string): void {
    this.itemsService.deleteItemBalanceUnit(ITEMS_BALANCE_UNITS_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Item Balance Unit deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Item Balance Unit'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemBalanceUnitsModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemBalanceUnitsModelService.searchName(this.searchValue)
  }
}
