import { Component, OnInit } from '@angular/core'
import { ItemsService } from 'src/app/services/items.service'
import { UIService } from 'src/app/services/ui.service'
import { ItemBalanceModelService } from './items-balance.model.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-items-balance',
  templateUrl: './items-balance.component.html',
  styleUrls: ['./items-balance.component.scss'],
  providers: [ItemBalanceModelService],
})
export class ItemsBalanceComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  ITEMS_ID: string | number

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public itemBalanceModelService: ItemBalanceModelService,
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
    this.itemsService.getItemBalances(this.ITEMS_ID).subscribe(
      data => {
        this.itemBalanceModelService.savedData = data.rows
        this.itemBalanceModelService.displayData = data.rows
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
    this.itemBalanceModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemBalanceModelService.sortData(sort)
  }

  /** Deletes item balance */
  deleteItemBalance(ITEMS_BALANCE_ID: number | string): void {
    this.itemsService.deleteItemBalance(ITEMS_BALANCE_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Item deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting template '),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemBalanceModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemBalanceModelService.searchName(this.searchValue)
  }
}
