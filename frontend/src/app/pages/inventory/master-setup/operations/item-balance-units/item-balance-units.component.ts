import { Component, OnInit } from '@angular/core'
import { ItemBalUnitsModelService } from './item-bal-units.model'
import { UIService } from 'src/app/services/ui.service'
import { ItemsService } from 'src/app/services/items.service'
import { TranslateService } from '@ngx-translate/core'
import { NzDrawerService } from 'ng-zorro-antd'
import { Observable } from 'rxjs'
import { ItemsListingComponent } from './items-listing/items-listing.component'

@Component({
  selector: 'app-item-balance-units',
  templateUrl: './item-balance-units.component.html',
  styleUrls: ['./item-balance-units.component.scss'],
  providers: [ItemBalUnitsModelService],
})
export class ItemBalanceUnitsComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public itemBalUnitsModelService: ItemBalUnitsModelService,
    private ui: UIService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
  ) {}

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

  totalItems:any = []

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.itemsService.getAllItemBalance().subscribe(
      data => {
        this.totalItems = data.rows
        this.itemBalUnitsModelService.savedData = this.filterByStore(data.rows)
        this.itemBalUnitsModelService.displayData = this.filterByStore(data.rows)
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
    this.itemBalUnitsModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemBalUnitsModelService.sortData(sort)
  }

  /** Deletes item template */
  deleteItemTemplate(ITEM_TEMPLATE_ID: number | string): void {
    this.itemsService.deleteItemTemplate(ITEM_TEMPLATE_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Item deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting template'),
    )
  }

  filterByStore(list){
    let results = [];
    let lookup = {};

    list.forEach(item=>{
      if(!lookup[item.STORES_ID]){
        results.push(item);
        lookup[item.STORES_ID] = true
      }
    })

    return results;
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemBalUnitsModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemBalUnitsModelService.searchName(this.searchValue)
  }

  public onClick(STORES_ID) {

    let result = this.totalItems.filter(o=>o.STORES_ID == STORES_ID)
    const drawerRef = this.drawerService.create<ItemsListingComponent,
        {

          itemsList:any

        }, string>({
            nzTitle: this.lang == 'en' ? 'Items' :'الاصناف',
            nzContent: ItemsListingComponent,
            nzContentParams: {itemsList:result},
            nzWidth: 1500,
            nzPlacement: this.lang == 'ar' ? 'left' :'right'
        });
    return drawerRef.afterClose
}
}
