import { Pipe, PipeTransform } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Pipe({ name: 'translatecui',pure:false })
export class TranslateCustomPipe implements PipeTransform {
  currlang;
  constructor( private translate:TranslateService){
      this.currlang = translate.currentLang;

      translate.onLangChange.subscribe(lang=>{
        this.currlang = lang.lang;
      })
  }
  transform(validationObj) {
    return validationObj[this.currlang]
  }
 
}
