import { Pipe, PipeTransform } from '@angular/core';
import { format, parseNumber, formatNumber, AsYouType } from 'libphonenumber-js'

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {

    transform(value: any, args: any) {
        if (!value) {
            return value
          }
          return format(value, 'International')
        }
}
