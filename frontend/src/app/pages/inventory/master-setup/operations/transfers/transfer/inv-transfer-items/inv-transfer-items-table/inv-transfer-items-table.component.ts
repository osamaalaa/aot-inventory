import { Component, OnInit, Input } from '@angular/core'
import { NzDrawerService } from 'ng-zorro-antd'
import { OperationMasterService } from '../../../../lib/OperationMasterService'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-inv-transfer-items-table',
  templateUrl: './inv-transfer-items-table.component.html',
})
export class InvTransferItemsTableComponent implements OnInit {
  lang: any

  @Input() INV_TRANSFER_ID: string

  @Input() isCustodyTransfer:boolean;

  _invTransferItems: any[] = []
  @Input() set invTransferItems(invTransferItems: any[]) {
    this._invTransferItems = invTransferItems
    this.operationMasterService.setItems(invTransferItems)
  }

  showWorkFlowButton: boolean = false

  get invTransferItems() {
    return this._invTransferItems
  }

  @Input() readOnly: boolean

  ngOnInit(): void {
    this.operationMasterService.setMasterId(this.INV_TRANSFER_ID)
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

  expandParentRow(isRowExpanded: boolean, INV_TRANSFER_ITEMS_ID: string) {
    if (isRowExpanded) {
      this.operationMasterService.getDetails(INV_TRANSFER_ITEMS_ID).subscribe()
    }
  }

  deleteDetails(INV_TRANSFER_ITEMS_ID: string, formData): void {
    this.operationMasterService
      .deleteDetail(INV_TRANSFER_ITEMS_ID, formData.INV_TRANSFER_ITEMS_D_ID)
      .subscribe()
  }

  addItem() {
    this.operationMasterService.addItem().subscribe()
  }

  updateItem(formData: any) {
    this.operationMasterService.updateItem(formData).subscribe()
  }

  deleteBalItem(INV_TRANSFER_ITEMS_ID: string): void {
    this.operationMasterService.deleteItem(INV_TRANSFER_ITEMS_ID).subscribe()
  }

  addDetail(INV_TRANSFER_ITEMS_ID: string) {
    this.operationMasterService.addDetail(INV_TRANSFER_ITEMS_ID).subscribe()
  }

  updateDetail(INV_TRANSFER_ITEMS_ID: string, formData: any) {
    this.operationMasterService.updateDetail(INV_TRANSFER_ITEMS_ID, formData).subscribe()
  }
}
