import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NG_VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
}
@Component({
  selector: 'cui-switch',
  template: `
    <nz-switch
      [ngModel]="switchSatus" 
      [nzDisabled]="nzDisabled"
      (ngModelChange)="onChange($event)">
    </nz-switch>
  `,
  providers:[NG_VALUE_ACCESSOR_PROVIDER]
})
export class SwitchComponent implements ControlValueAccessor {

  @Input()
  _switchSatus = null; 

  get switchSatus() {
    return this._switchSatus;
  }

  set switchSatus(val) {
    this._switchSatus = val;
    this.propagateChange(this._switchSatus == (true || 1) ? 1 : 0);
  }


  @Input() nzPlaceHolder: string;
  @Input() nzDisabled: boolean;




  writeValue(value: any) {
    setTimeout(() => {
      if (value) {
        this.switchSatus = value == (true || 1 ) ? true : false;
      }
    })
  }


  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  onChange(e) {
    this.switchSatus = e;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled)
    this.nzDisabled = isDisabled;
  }

  constructor() { }



}
