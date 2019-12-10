import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { RouterModule } from '@angular/router'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateCustomPipe } from './pipes/translateCustom.pipe'
import { TranslateNumberPipe } from './pipes/arabic-numerals.pipe'
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
const MODULES = [CommonModule, RouterModule, NgZorroAntdModule, TranslateModule]

@NgModule({
  declarations:[TranslateCustomPipe,TranslateNumberPipe],

  imports: [...MODULES],
  exports: [...MODULES,TranslateCustomPipe,TranslateNumberPipe]
})
export class SharedModule { }
