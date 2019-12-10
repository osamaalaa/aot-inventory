import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const NG_VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerComponent),
  multi: true
}
@Component({
  selector: 'cui-datepicker',
  template: `
    <nz-date-picker
        [nzFormat]="'M/d/yyy'" 
        [nzPlaceHolder]="nzPlaceHolder" 
        [ngModel]="date"
        [nzDisabled]="nzDisabled"
        [nzDateRender]="tplRender"
        (ngModelChange)="onChange($event)">
    </nz-date-picker>
  
    
    <ng-template #tplRender let-current>
    <div class="ant-calendar-date" >
      {{ current.getDate()  | translatenumber}}
    
    </div>
  </ng-template>
  `,
  providers: [NG_VALUE_ACCESSOR_PROVIDER]
})
export class DatepickerComponent implements ControlValueAccessor {

  @Input()
  _date = null; 

  get date() {
    return this._date;
  }

  set date(val) {
    this._date = val;
    this.propagateChange(formatDate(this._date));
  }


  @Input() nzPlaceHolder: string;

  @Input() nzFormat: string;

  @Input() nzDisabled: boolean;

  writeValue(value: any) {
    setTimeout(() => {
      if (value) {
        this.date = new Date(value);
      }
    })
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  onChange(e:Date) {
    this.date = e;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

}


/**
  * To tranform Javascript date to string date(25-January-2019)
  * @param date Javascript date
  */
const formatDate = (date:Date) => {
  if (!date) return date
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];


  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + '-' + monthNames[monthIndex] + '-' + year;
}