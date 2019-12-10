import { Component, OnInit } from '@angular/core'
import { ItemAliasesModelService } from './items-aliases.model.service'
import { ItemsService } from 'src/app/services/items.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-items-aliases',
  templateUrl: './items-aliases.component.html',
  styleUrls: ['./items-aliases.component.scss'],
  providers: [ItemAliasesModelService],
})
export class ItemsAliasesComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  ITEMS_ID: string | number

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public itemAliasesModelService: ItemAliasesModelService,
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
    this.itemsService.getItemAliases(this.ITEMS_ID).subscribe(
      data => {
        this.itemAliasesModelService.savedData = data.rows
        this.itemAliasesModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting template list : ' + error.error.message)
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.itemAliasesModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemAliasesModelService.sortData(sort)
  }

  /** Deletes item template */
  deleteItemAlias(ITEMS_ALIASES_ID: number | string): void {
    this.itemsService.deleteItemAlias(ITEMS_ALIASES_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Item deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting template'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemAliasesModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemAliasesModelService.searchName(this.searchValue)
  }
}
