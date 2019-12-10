import { Component, OnInit } from '@angular/core';
import { ItemComponentsModelService } from './item-components.model.services';
import { ItemsService } from 'src/app/services/items.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-item-components',
  templateUrl: './item-components.component.html',
  styleUrls: ['./item-components.component.scss'],
  providers: [ItemComponentsModelService],
})
export class ItemComponentsComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = '';

  searchValue = '';

  ITEMS_ID: string | number;

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public itemComponentModelService: ItemComponentsModelService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.fetchItemId();
    this.fetchData();
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
    this.itemsService.getItemComponentss(this.ITEMS_ID).subscribe(
      data => {
        this.itemComponentModelService.savedData = data.rows;
        this.itemComponentModelService.displayData = data.rows;
        /**
         * TODO:Remove this datalength. Not required
         */
        this.itemComponentModelService.datalength = this.itemComponentModelService.savedData.length;
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
    this.itemComponentModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemComponentModelService.sortData(sort)
  }

  /** Deletes item template */
  deleteItemComponent(ITEMS_COMPONENTS_ID: number | string): void {
    this.itemsService.deleteItemComponent(ITEMS_COMPONENTS_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Item Component deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Item component'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemComponentModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemComponentModelService.searchName(this.searchValue)
  }
}
