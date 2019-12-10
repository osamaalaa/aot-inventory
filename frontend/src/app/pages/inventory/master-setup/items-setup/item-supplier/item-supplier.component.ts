import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { ItemSuppliersModelService } from './items-suppliers.model.service';
import { ItemsService } from 'src/app/services/items.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-item-supplier',
  templateUrl: './item-supplier.component.html',
  styleUrls: ['./item-supplier.component.scss'],
  providers: [ItemSuppliersModelService]
})
export class ItemSupplierComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = '';

  lang: any

  ITEMS_ID: string | number;
  /** Table loader */
  isDataLoading: boolean = false
  constructor(
    private itemsService: ItemsService,
    public itemSupplierModelService: ItemSuppliersModelService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.fetchItemId();
    this.fetchData()
    this.onLangugateChange();
    this.fetchCurrentLanguage()
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {

    this.lang = this.translate.currentLang
    console.log(this.lang)
  }

  fetchItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID']
  }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.itemsService.getallitemsupplier(this.ITEMS_ID).subscribe(
      data => {
        this.itemSupplierModelService.savedData = data.rows
        this.itemSupplierModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Item Balance units')
      },
    )
  }
  searchItems(): void {
    this.itemSupplierModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemSupplierModelService.sortData(sort)
  }


  /** Deletes item Supplier */
  deleteItemSuppliedr(ITEMS_SUPPLIERS_ID: number | string): void {

    this.itemsService.deleteItemSupplier(ITEMS_SUPPLIERS_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Item  Supplier deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Item Supplier'),
    )
  }
  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemSupplierModelService.searchName(this.searchValue)
  }
  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemSupplierModelService.searchName(this.searchValue)
  }
}
