import { Pipe, PipeTransform } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Pipe({ name: 'translatenumber', pure: false })
export class TranslateNumberPipe implements PipeTransform {
    currlang;
    constructor(private translate: TranslateService) {
        this.currlang = translate.currentLang;

        translate.onLangChange.subscribe(lang => {
            this.currlang = lang.lang;
        })
    }


    transform(string) {
        return this.currlang == 'ar' ? this.convertToArabic(string) : string
    }


    convertToArabic(string) {
        if(!string)return null;
        var id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return string.toString().replace(/[0-9]/g, function (w) {
            return id[+w];
        });
    };

}
