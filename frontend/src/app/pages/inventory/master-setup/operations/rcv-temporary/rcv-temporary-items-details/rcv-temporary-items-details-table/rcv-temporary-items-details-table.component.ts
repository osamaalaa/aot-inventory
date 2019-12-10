import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-rcv-temp-items-details-table',
  templateUrl: './rcv-temporary-items-details-table.component.html',
  styleUrls: ['./rcv-temporary-items-details-table.component.scss'],
})
export class RcvTemporaryItemsDetailsTableComponent implements OnInit {
  lang: any

  _dataList = []
  @Input() set dataList(dataList: any[]) {
    this._dataList = dataList || []
  }

  get dataList() {
    return this._dataList
  }

  @Input() readOnly: boolean

  @Output() onEditClick = new EventEmitter()
  @Output() onDeleteClick = new EventEmitter()

  constructor(private translate: TranslateService) {}

  ngOnInit() {
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
}
