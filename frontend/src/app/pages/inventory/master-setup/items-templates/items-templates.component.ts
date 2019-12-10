import { Component, OnInit } from '@angular/core'
import { ItemsService } from '../../../../services/items.service'
import { ItemTemplateModelService } from './items-templates.model.service'
import { UIService } from 'src/app/services/ui.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-items-templates',
  templateUrl: './items-templates.component.html',
  styleUrls: ['./items-templates.component.scss'],
  providers: [ItemTemplateModelService],
})
export class ItemsTemplatesComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public itemTemplateModelService: ItemTemplateModelService,
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
    this.itemsService.getItemTemplates().subscribe(
      data => {
        this.itemTemplateModelService.savedData = data.rows
        this.itemTemplateModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting template list')
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.itemTemplateModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemTemplateModelService.sortData(sort)
  }

  /** Deletes item template */
  deleteItemTemplate(ITEM_TEMPLATE_ID: number | string): void {
    this.itemsService.deleteItemTemplate(ITEM_TEMPLATE_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Item deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting template'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemTemplateModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemTemplateModelService.searchName(this.searchValue)
  }
}
