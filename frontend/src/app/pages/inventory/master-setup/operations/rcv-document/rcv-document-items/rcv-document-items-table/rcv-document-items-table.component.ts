import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { NzDrawerService } from 'ng-zorro-antd'
import { OperationMasterService } from '../../../lib/OperationMasterService'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-rcv-document-items-table',
  templateUrl: './rcv-document-items-table.component.html',
})
export class RcvDocumentItemsTableComponent implements OnInit {
  lang: any

  @Input() DOCUMENT_ID: string

  _rcvDocumentItems: any[] = []
  @Input() set rcvDocumentItems(rcvDocumentItems: any[]) {
    this._rcvDocumentItems = rcvDocumentItems
    this.operationMasterService.setItems(rcvDocumentItems)
  }

  showWorkFlowButton: boolean = false

  get rcvDocumentItems() {
    return this._rcvDocumentItems
  }

  @Input() readOnly: boolean

  ngOnInit(): void {
    this.operationMasterService.setMasterId(this.DOCUMENT_ID)
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

  expandParentRow(isRowExpanded: boolean, RCV_DOCUMENT_ITEMS_ID: string) {
    if (isRowExpanded) {
      this.operationMasterService.getDetails(RCV_DOCUMENT_ITEMS_ID).subscribe()
    }
  }

  deleteDetails(RCV_DOCUMENT_ITEMS_ID: string, formData): void {
    this.operationMasterService
      .deleteDetail(RCV_DOCUMENT_ITEMS_ID, formData.RCV_DOCUMENT_ITEMS_D_ID)
      .subscribe()
  }

  addItem() {
    this.operationMasterService.addItem().subscribe()
  }

  updateItem(formData: any) {
    this.operationMasterService.updateItem(formData).subscribe()
  }

  deleteBalItem(RCV_DOCUMENT_ITEMS_ID: string): void {
    this.operationMasterService.deleteItem(RCV_DOCUMENT_ITEMS_ID).subscribe()
  }

  addDetail(RCV_DOCUMENT_ITEMS_ID: string) {
    this.operationMasterService.addDetail(RCV_DOCUMENT_ITEMS_ID).subscribe()
  }

  updateDetail(RCV_DOCUMENT_ITEMS_ID: string, formData: any) {
    this.operationMasterService.updateDetail(RCV_DOCUMENT_ITEMS_ID, formData).subscribe()
  }
}
