import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'transfer-custody',
  templateUrl: './transfer-custody.component.html',
})
export class TransferCustodyComponent {
  lang: any

  list: any[] = [
    {
      img: 'assets/images/avatars/custody_transfer_between_employees.jpg',
      nameEn: 'Custody Out',
      nameAr: 'طلب نقل العهدة',
      key:"CUSTODY_TRANSFER_BWT_EMP",
      noteEn: 'Custody Out Operation',
      noteAr: 'عملية طلب نقل عهدة',
      url: 'inv-transfer',
    },
    {
      img: 'assets/images/avatars/custody_transfer_receive.jpg',
      nameEn: 'Custody  In',
      nameAr: 'إثبات العهدة على الموظفين',
      key:"CUSTODY_TRANSFER_RECEIVE",
      noteEn: 'Custody in Receving Operation',
      noteAr: 'عملية إثبات العهدة على الموظفين',
      url: 'inv-transfer-r',
    },
  ]
  constructor(private translate: TranslateService) {}

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit () {
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
