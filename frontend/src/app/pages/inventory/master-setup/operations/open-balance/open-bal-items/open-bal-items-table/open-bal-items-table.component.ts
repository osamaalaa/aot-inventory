import { Component, OnInit, Input } from '@angular/core'
import { NzDrawerService } from 'ng-zorro-antd'
import { OperationMasterService } from '../../../lib/OperationMasterService'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-open-bal-items-table',
  templateUrl: './open-bal-items-table.component.html',
  styleUrls: ['./open-bal-items-table.component.scss'],
})
export class OpenBalItemsTableComponent implements OnInit {
  lang: any

  @Input() INV_OPEN_BALANCE_ID: string

  _openBalanceItems: any[] = []
  @Input() set openBalanceItems(openBalanceItems: any[]) {
    this._openBalanceItems = openBalanceItems
    this.operationMasterService.setItems(openBalanceItems)
  }

  showWorkFlowButton: boolean = false

  get openBalanceItems() {
    return this._openBalanceItems
  }

  @Input() readOnly: boolean

  ngOnInit(): void {
    this.operationMasterService.setMasterId(this.INV_OPEN_BALANCE_ID)
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

  constructor(
    public operationMasterService: OperationMasterService,
    public drawerService: NzDrawerService,
    private translate: TranslateService,
  ) {}

  expandParentRow(isRowExpanded: boolean, INV_OPEN_BALANCE_ITEMS_ID: string) {
    if (isRowExpanded) {
      this.operationMasterService.getDetails(INV_OPEN_BALANCE_ITEMS_ID).subscribe()
    }
  }

  deleteDetails(INV_OPEN_BALANCE_ITEMS_ID: string, formData): void {
    this.operationMasterService
      .deleteDetail(INV_OPEN_BALANCE_ITEMS_ID, formData.INV_OPEN_BALANCE_ITEMS_D_ID)
      .subscribe()
  }

  addItem() {
    this.operationMasterService.addItem().subscribe()
  }

  updateItem(formData: any) {
    this.operationMasterService.updateItem(formData).subscribe()
  }

  deleteBalItem(INV_OPEN_BALANCE_ITEMS_ID: string): void {
    this.operationMasterService.deleteItem(INV_OPEN_BALANCE_ITEMS_ID).subscribe()
  }

  addDetail(INV_OPEN_BALANCE_ITEMS_ID: string) {
    this.operationMasterService.addDetail(INV_OPEN_BALANCE_ITEMS_ID).subscribe()
  }

  updateDetail(INV_OPEN_BALANCE_ITEMS_ID: string, formData: any) {
    this.operationMasterService.updateDetail(INV_OPEN_BALANCE_ITEMS_ID, formData).subscribe()
  }
}
