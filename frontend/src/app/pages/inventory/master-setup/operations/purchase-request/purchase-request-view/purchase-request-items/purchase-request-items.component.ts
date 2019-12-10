import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-purchase-request-items',
  templateUrl: './purchase-request-items.component.html',
  styleUrls: ['./purchase-request-items.component.scss']
})
export class PurchaseRequestItemsComponent implements OnInit {

  @Input() DOCUMENT_ID;

  searchText
  constructor(
    private ui: UIService,
    private http:HttpClient,
    private translate:TranslateService
  ) { }

  ngOnInit() {
    this.fetchData();
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  lang
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }


  data = [];
  isDataLoading
  fetchData(): void {
    this.isDataLoading = true
    this.http.get(`/purorderdoc/selectAllpurDocDetails?DOCUMENT_ID=${this.DOCUMENT_ID}`).subscribe(
      data => {
   
        this.data = data['rows']
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting template list')
      },
    )
  }

}
