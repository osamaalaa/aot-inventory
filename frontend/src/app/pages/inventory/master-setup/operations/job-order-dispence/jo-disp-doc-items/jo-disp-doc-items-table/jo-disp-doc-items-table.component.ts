import { Component, OnInit, Input } from '@angular/core'
import { NzDrawerService } from 'ng-zorro-antd'
import { OperationMasterService } from '../../../lib/OperationMasterService'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-jo-disp-doc-items-table',
  templateUrl: './jo-disp-doc-items-table.component.html',
  styles: [
    `
      .parentButton {
        float: right;
        z-index: 1;
        top: 3.5em;
        margin: 0.5em;
        right: 1em;
      }
      .childButton {
        float: right;
        top: 3em;
        z-index: 1;
      }
    `,
  ],
})
export class JODipsDocItemsTableComponent implements OnInit {
  lang: any
  @Input() DOCUMENT_ID: string

  _dispenceItems: any[] = []
  @Input() set dispenceItems(dispenceItems: any[]) {
    this._dispenceItems = dispenceItems
    this.operationMasterService.setItems(dispenceItems)
  }

  showWorkFlowButton: boolean = false

  get dispenceItems() {
    return this._dispenceItems
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

  expandParentRow(isRowExpanded: boolean, DSP_DOCUMENT_ITEMS_ID: string) {
    if (isRowExpanded) {
      this.operationMasterService.getDetails(DSP_DOCUMENT_ITEMS_ID).subscribe()
    }
  }

  deleteDetails(DSP_DOCUMENT_ITEMS_ID: string, formData): void {
    this.operationMasterService
      .deleteDetail(DSP_DOCUMENT_ITEMS_ID, formData.DSP_DOCUMENT_ITEMS_D_ID)
      .subscribe()
  }

  addItem() {
    this.operationMasterService.addItem().subscribe()
  }

  updateItem(formData: any) {
    this.operationMasterService.updateItem(formData).subscribe()
  }

  deleteBalItem(DSP_DOCUMENT_ITEMS_ID: string): void {
    this.operationMasterService.deleteItem(DSP_DOCUMENT_ITEMS_ID).subscribe()
  }

  addDetail(DSP_DOCUMENT_ITEMS_ID: string) {
    this.operationMasterService.addDetail(DSP_DOCUMENT_ITEMS_ID).subscribe()
  }

  updateDetail(DSP_DOCUMENT_ITEMS_ID: string, formData: any) {
    this.operationMasterService.updateDetail(DSP_DOCUMENT_ITEMS_ID, formData).subscribe()
  }
}
