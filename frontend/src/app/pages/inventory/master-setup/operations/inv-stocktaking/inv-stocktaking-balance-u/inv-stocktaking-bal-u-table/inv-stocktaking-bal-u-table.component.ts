import { Component, OnInit, Input } from '@angular/core'
import { OperationsService } from 'src/app/services/operations.service'
import { NzDrawerService } from 'ng-zorro-antd'
import { InvStocktakingBalUFormComponent } from '../inv-stocktaking-bal-u-form/inv-stocktaking-bal-u-form.component'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-inv-stocktaking-bal-u-table',
  templateUrl: './inv-stocktaking-bal-u-table.component.html',
  styleUrls: ['./inv-stocktaking-bal-u-table.component.scss'],
})
export class InvStocktakingBalUTableComponent implements OnInit {
  dataList = []

  lang: any

  @Input() INV_STOCKTAKING_ID
  @Input() readOnly

  isDataLoading: boolean

  constructor(
    private operationsService: OperationsService,
    private drawerService: NzDrawerService,
    private translate: TranslateService,
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

  fetchData() {
    this.isDataLoading = true
    this.operationsService.getInvStocktakingBalanceU(this.INV_STOCKTAKING_ID).subscribe(data => {
      this.dataList = data['rows']
      console.table( this.dataList)
      this.isDataLoading = false
    })
  }

  updateItem(data) {
    this.openComp('Update Balance', data).subscribe(response => {
      if (response) {
        this.operationsService
          .updateInvStocktakingBalanceU(data.INV_STOCKTAKING_BALANCE_U_ID, response)
          .subscribe(_ => {
            this.fetchData()
          })
      }
    })
  }

  public openComp(title: string, formData?: any): Observable<any> {
    const drawerRef = this.drawerService.create<
      InvStocktakingBalUFormComponent,
      {
        formData: any
      },
      string
    >({
      nzTitle: title,
      nzContent: InvStocktakingBalUFormComponent,
      nzContentParams: {
        formData,
      },
      nzWidth: 720,
    })
    return drawerRef.afterClose
  }

  deleteData(data) {
    this.operationsService
      .updateInvStocktakingBalanceU(data.INV_STOCKTAKING_BALANCE_U_ID, { deleted: 1 })
      .subscribe(_ => {
        this.fetchData()
      })
  }
}
