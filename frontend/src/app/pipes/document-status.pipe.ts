import { Pipe, PipeTransform } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { CONSTANTS } from '../services/constants.service'

@Pipe({ name: 'documentstatus', pure: false })
export class DocumentStatus implements PipeTransform {
    constructor(
        private translate:TranslateService
    ) {

    }
    transform(value): number {
        switch(value){
            case CONSTANTS.DOCUMENT_STATUS.NEW: return this.translate.instant('NEW')
            case CONSTANTS.DOCUMENT_STATUS.PENDING: return this.translate.instant('PENDING')
            case CONSTANTS.DOCUMENT_STATUS.CANCELLED: return this.translate.instant('CANCELLED')
            case CONSTANTS.DOCUMENT_STATUS.VALIDATED: return this.translate.instant('VALIDATED')
            default: return this.translate.instant('NEW')
        }
        return Math.floor(value)
    }
}
