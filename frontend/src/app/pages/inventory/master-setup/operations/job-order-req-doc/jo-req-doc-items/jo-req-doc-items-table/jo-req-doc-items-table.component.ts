import { Component, OnInit, Input } from '@angular/core'
import { NzDrawerService } from 'ng-zorro-antd'
import { OperationMasterService } from '../../../lib/OperationMasterService'
import { JOReqDocItemsService } from '../../../lib/Strategy/job-order-req-doc/job-order-req-doc-items.strategy'
import { JOReqDocDetailService } from '../../../lib/Strategy/job-order-req-doc/job-order-req-doc-details.strategy'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-jo-req-doc-items-table',
  templateUrl: './jo-req-doc-items-table.component.html',
  styleUrls: ['./jo-req-doc-items-table.component.scss'],
})
export class JOReqDocItemsTableComponent implements OnInit {
  lang: any

  @Input() DOCUMENT_ID: string

  _reqDocItems: any[] = []
  @Input() set reqDocItems(reqDocItems: any[]) {
    this._reqDocItems = reqDocItems
    this.operationMasterService.setItems(reqDocItems)
  }

  showWorkFlowButton: boolean = false

  get reqDocItems() {
    return this._reqDocItems
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
    private reqDocItemsService: JOReqDocItemsService,
    private reqDocDetailService: JOReqDocDetailService,
    private translate: TranslateService,
  ) {
    this.operationMasterService.setItemStrategy(this.reqDocItemsService)
    this.operationMasterService.setDetailStrategy(this.reqDocDetailService)
    this.operationMasterService.setMasterKey('DOCUMENT_ID')
    this.operationMasterService.setItemsKey('REQ_DOCUMENT_ITEMS_ID')
    this.operationMasterService.setDetailsKey('REQ_DOCUMENT_ITEMS_D_ID')
  }

  expandParentRow(isRowExpanded: boolean, REQ_DOCUMENT_ITEMS_ID: string) {
    if (isRowExpanded) {
      this.operationMasterService.getDetails(REQ_DOCUMENT_ITEMS_ID).subscribe()
    }
  }

  deleteDetails(REQ_DOCUMENT_ITEMS_ID: string, formData): void {
    this.operationMasterService
      .deleteDetail(REQ_DOCUMENT_ITEMS_ID, formData.REQ_DOCUMENT_ITEMS_D_ID)
      .subscribe()
  }

  addItem() {
    this.operationMasterService.addItem().subscribe()
  }

  updateItem(formData: any) {
    this.operationMasterService.updateItem(formData).subscribe()
  }

  deleteBalItem(REQ_DOCUMENT_ITEMS_ID: string): void {
    this.operationMasterService.deleteItem(REQ_DOCUMENT_ITEMS_ID).subscribe()
  }

  addDetail(REQ_DOCUMENT_ITEMS_ID: string) {
    this.operationMasterService.addDetail(REQ_DOCUMENT_ITEMS_ID).subscribe()
  }

  updateDetail(REQ_DOCUMENT_ITEMS_ID: string, formData: any) {
    this.operationMasterService.updateDetail(REQ_DOCUMENT_ITEMS_ID, formData).subscribe()
  }
}
