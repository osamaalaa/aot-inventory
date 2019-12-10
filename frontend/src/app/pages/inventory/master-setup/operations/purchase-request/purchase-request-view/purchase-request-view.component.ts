import { Component, OnInit } from '@angular/core';
import { PurchaseRequestItemsComponent } from './purchase-request-items/purchase-request-items.component';
import { PurchaseRequestModelService } from './purchase-request.model';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-purchase-request-view',
  templateUrl: './purchase-request-view.component.html',
  styleUrls: ['./purchase-request-view.component.scss'],
  providers:[PurchaseRequestModelService]
})
export class PurchaseRequestViewComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
      private itemsService: ItemsService,
      private http:HttpClient,
      public purchaseRequestModelService: PurchaseRequestModelService,
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
    this.isDataLoading = true;
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID;
    this.http.get('/purorderdoc/selectAllpurDoc?EMPLOYEE_ID='+EMPLOYEE_ID ).subscribe(
      data => {
   
        this.purchaseRequestModelService.savedData = data['rows']
        this.purchaseRequestModelService.displayData = data['rows']
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
    this.purchaseRequestModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.purchaseRequestModelService.sortData(sort)
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.purchaseRequestModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.purchaseRequestModelService.searchName(this.searchValue)
  }

  public onClick(DOCUMENT_ID) {

    const drawerRef = this.drawerService.create<PurchaseRequestItemsComponent,
        {

          DOCUMENT_ID:any

        }, string>({
            nzTitle: this.lang == 'en' ? 'Items' :'الاصناف',
            nzContent: PurchaseRequestItemsComponent,
            nzContentParams: {DOCUMENT_ID:DOCUMENT_ID},
            nzWidth: 1500,
            nzPlacement: this.lang == 'ar' ? 'left' :'right'
        });
    return drawerRef.afterClose
}

}
