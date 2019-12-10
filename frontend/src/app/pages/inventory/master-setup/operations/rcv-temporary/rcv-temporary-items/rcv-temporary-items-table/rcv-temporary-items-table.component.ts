import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { NzDrawerService } from 'ng-zorro-antd'
import { UIService } from 'src/app/services/ui.service'
import { RcvTemporaryItemsFormComponent } from '../rcv-temporary-items-form/rcv-temporary-items-form.component'
import { RcvTemporaryItemsDetailsFormComponent } from '../../rcv-temporary-items-details/rcv-temporary-items-details-form/rcv-temporary-items-details-form.component'
import { OperationsService } from 'src/app/services/operations.service'
import { OperationMasterService } from '../../../lib/OperationMasterService'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-rcv-temporary-items-table',
  templateUrl: './rcv-temporary-items-table.component.html',
})
export class RcvTemporaryItemsTableComponent implements OnInit {
  lang: any

  @Input() DOCUMENT_ID: string

  _items: any[] = []
  @Input() set items(items: any[]) {
    this._items = items
    this.operationMasterService.setItems(items)
  }

  showWorkFlowButton: boolean = false

  get items() {
    return this._items
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

  expandParentRow(isRowExpanded: boolean, RCV_TEMP_ITEMS_ID: string) {
    if (isRowExpanded) {
      this.operationMasterService.getDetails(RCV_TEMP_ITEMS_ID).subscribe()
    }
  }

  deleteDetails(RCV_TEMP_ITEMS_ID: string, formData): void {
    this.operationMasterService
      .deleteDetail(RCV_TEMP_ITEMS_ID, formData.RCV_TEMP_ITEMS_D_ID)
      .subscribe()
  }

  addItem() {
    this.operationMasterService.addItem().subscribe()
  }

  updateItem(formData: any) {
    this.operationMasterService.updateItem(formData).subscribe()
  }

  deleteBalItem(RCV_TEMP_ITEMS_ID: string): void {
    this.operationMasterService.deleteItem(RCV_TEMP_ITEMS_ID).subscribe()
  }

  addDetail(RCV_TEMP_ITEMS_ID: string) {
    this.operationMasterService.addDetail(RCV_TEMP_ITEMS_ID).subscribe()
  }

  updateDetail(RCV_TEMP_ITEMS_ID: string, formData: any) {
    this.operationMasterService.updateDetail(RCV_TEMP_ITEMS_ID, formData).subscribe()
  }
}
