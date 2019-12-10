import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})

export class TopbarComponent {
  currentLang:string;
  languageSwitch;
  constructor(private translateService:TranslateService){
    this.currentLang = translateService.currentLang;
    this.checkCurrentLang()
  }
  checkCurrentLang(){
    if(this.currentLang == 'ar') {
      this.languageSwitch = false
    }
    else{
      this.languageSwitch = true
    }
  }
  changeLang(lang){
    this.translateService.use(lang);
  }
  onLanguageChange(lang){
    if(lang){
      this.changeLang('en')
    } else {
      this.changeLang('ar')
    }
    // console.log(lang)
  }
 }
// export class TopbarComponent {
//   currentLang:string;
//   constructor(private translateService:TranslateService){
//     this.currentLang = translateService.currentLang;
//   }

//   changeLang(lang){ 
//     this.translateService.use(lang);
//   } 
// }
