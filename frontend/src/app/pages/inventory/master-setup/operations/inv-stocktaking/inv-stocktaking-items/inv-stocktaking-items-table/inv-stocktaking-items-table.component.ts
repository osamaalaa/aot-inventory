import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Observable, forkJoin, Subscription } from 'rxjs'
import { NzDrawerService } from 'ng-zorro-antd'
import { InvStocktakingItemsFormComponent } from '../inv-stocktaking-items-form/inv-stocktaking-items-form.component'
import { OperationsService } from 'src/app/services/operations.service'
import { InvStocktakingService } from '../../inv-stocktaking.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-inv-stocktaking-items-table',
  templateUrl: './inv-stocktaking-items-table.component.html',
  styleUrls: ['./inv-stocktaking-items-table.component.scss'],
})
export class InvStocktakingItemsTableComponent implements OnInit, OnDestroy {
  dataList = []

  lang: any

  @Input() INV_STOCKTAKING_ID

  @Input() readOnly: boolean

  constructor(
    private drawerService: NzDrawerService,
    private operationsService: OperationsService,
    private invStocktakingService: InvStocktakingService,
    private translate: TranslateService,
  ) {}

  showTable: boolean = true
  subscription: Subscription
  ngOnInit() {
    this.fetchData()
    this.onLangugateChange()
    this.fetchCurrentLanguage()

    this.subscription = this.invStocktakingService.onPhysicalEntrySwitchChange.subscribe(
      shouldDeleteAllItems => {
        if (shouldDeleteAllItems) {
          this.showTable = false
          var resources = []
          this.dataList.forEach(data => {
            resources.push(
              this.operationsService.updateInvStockingItem(data.INV_STOCKTAKING_ITEMS_ID, {
                deleted: 1,
              }),
            )
          })

          forkJoin(resources).subscribe(_ => {
            this.fetchData()
          })
        } else {
          this.showTable = true
        }
      },
    )
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  addItem() {
    this.openComp('Add Item').subscribe(data => {
      if (data) {
        this.operationsService.addInvStockingItem(data).subscribe(result => {
          this.fetchData()
        })
      }
    })
  }

  updateItem(formData) {
    this.openComp('Update Item', formData).subscribe(data => {
      if (data) {
        this.operationsService
          .updateInvStockingItem(formData.INV_STOCKTAKING_ITEMS_ID, data)
          .subscribe(result => {
            this.fetchData()
          })
      }
    })
  }

  fetchData() {
    this.operationsService.getInvStocktakingItems(this.INV_STOCKTAKING_ID).subscribe(data => {
      this.dataList = data['rows']
      if (this.dataList.length > 0) {
        this.invStocktakingService.isItemsEmpty = false
      } else {
        this.invStocktakingService.isItemsEmpty = true
      }
    })
  }

  deleteData(data) {
    this.operationsService
      .updateInvStockingItem(data.INV_STOCKTAKING_ITEMS_ID, { deleted: 1 })
      .subscribe(_ => {
        this.fetchData()
      })
  }

  public openComp(title: string, formData?: any): Observable<any> {
    const drawerRef = this.drawerService.create<
      InvStocktakingItemsFormComponent,
      {
        INV_STOCKTAKING_ID: any
        formData: any
      },
      string
    >({
      nzTitle: title,
      nzContent: InvStocktakingItemsFormComponent,
      nzContentParams: {
        INV_STOCKTAKING_ID: this.INV_STOCKTAKING_ID,
        formData,
      },
      nzWidth: 720,
    })
    return drawerRef.afterClose
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
