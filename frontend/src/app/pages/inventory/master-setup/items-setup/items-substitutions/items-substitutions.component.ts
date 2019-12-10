import { Component, OnInit } from '@angular/core'
import { ItemsService } from 'src/app/services/items.service'
import { ItemSubstitutionModelService } from './items-substitutions.model.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-items-substitutions',
  templateUrl: './items-substitutions.component.html',
  styleUrls: ['./items-substitutions.component.scss'],
  providers: [ItemSubstitutionModelService],
})
export class ItemsSubstitutionsComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  lang: any

  ITEMS_ID: string | number

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public itemSubstitutionModelService: ItemSubstitutionModelService,
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
    this.itemsService.getItemSubstitution(this.ITEMS_ID).subscribe(
      data => {
        this.itemSubstitutionModelService.savedData = data.rows
        this.itemSubstitutionModelService.displayData = data.rows
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
    this.itemSubstitutionModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemSubstitutionModelService.sortData(sort)
  }

  /** Deletes item substitution */
  deleteItemSubstitution(ITEMS_SUBSTITUTIONS_ID: number | string): void {
    this.itemsService.deleteItemSubstitution(ITEMS_SUBSTITUTIONS_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Item Substitution deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Substitution'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemSubstitutionModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemSubstitutionModelService.searchName(this.searchValue)
  }
}
