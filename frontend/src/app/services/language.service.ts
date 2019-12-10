import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, ar_EG, en_US } from 'ng-zorro-antd';
var en = require('../../assets/i18n/en.json')
var ar = require('../../assets/i18n/ar.json')
import arNz from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common'
registerLocaleData(arNz);

@Injectable()
export class LanguageService {

  private renderer: Renderer2;

  constructor(
    private translate: TranslateService,
    private i18n: NzI18nService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initialize();
   }

  initialize() {
    this.setTranslationStrings();
    this.setDefaultLanguage();
    this.checkLocalStorageAndSetLanugage()
    this.languageChangeListener();
    // this.setCssForCurrentLanguage();
  }

  setDefaultLanguage(){
    this.translate.setDefaultLang('ar');
  }

  checkLocalStorageAndSetLanugage(){
    let lang = localStorage.getItem("lang");
    this.setLanguage(lang)
  }

  setLanguage(lang){
    this.translate.use(lang);
    if(lang == 'en'){
      this.translate.use('en')
      this.i18n.setLocale(en_US);
      this.removeArabicCss();
    }else{
      this.translate.use('ar')
      this.i18n.setLocale(ar_EG);
      this.addArabicCss()
    }
  }

  setTranslationStrings(){
    this.translate.setTranslation('en', en);
    this.translate.setTranslation('ar', ar);
  }

  languageChangeListener(){
    this.translate.onLangChange.subscribe(lang => {
      localStorage.setItem("lang",lang.lang)
      this.setLanguage(lang.lang)
    })
  }

  setCssForCurrentLanguage(){
    let currentLang = this.translate.currentLang;
    if (currentLang == 'ar') {
      this.addArabicCss()
    } else {
      this.removeArabicCss();
    }
  }

  addArabicCss() {
    this.renderer.addClass(document.body, 'rtl-ar');
  }

  removeArabicCss() {
    this.renderer.removeClass(document.body, 'rtl-ar');
  }
}
