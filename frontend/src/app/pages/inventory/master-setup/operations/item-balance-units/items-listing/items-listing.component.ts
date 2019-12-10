import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-items-listing',
  templateUrl: './items-listing.component.html',
  styleUrls: ['./items-listing.component.scss']
})
export class ItemsListingComponent implements OnInit {

  itemsList:any[] = []

  constructor(
    private translate:TranslateService
  ) { }

  ngOnInit() {
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

}
