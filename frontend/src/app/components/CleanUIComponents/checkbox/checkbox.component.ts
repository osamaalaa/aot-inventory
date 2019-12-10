import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NG_VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
}
@Component({
  selector: 'cui-checkbox',
  template: `
  <label 
      nz-checkbox 
      (ngModelChange)="onChange($event)"
      [(ngModel)]="checked">{{label}}
  </label>
`,
  providers: [NG_VALUE_ACCESSOR_PROVIDER]
})
export class CheckboxComponent implements ControlValueAccessor {

  @Input()
  _checked = null;

  @Input()
  label:string = ''

  get checked() {
    return this._checked;
  }

  set checked(val) {
    this._checked = val;
    this.propagateChange(this._checked == (true || 1) ? 1 : 0);
  }


  @Input() nzPlaceHolder: string;
  @Input() nzDisabled: boolean;




  writeValue(value: any) {
    setTimeout(() => {
      if (value) {
        this.checked = value == (true || 1) ? true : false;
      }
    })
  }


  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  onChange(e) {
    this.checked = e;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled)
    this.nzDisabled = isDisabled;
  }

  constructor() { }



}
