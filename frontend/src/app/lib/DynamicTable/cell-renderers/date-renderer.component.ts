import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
const DEFAULT_DATE_FORMAT = 'longDate'
@Component({
    selector:"date-cell-renderer",
    template:`
        <span>{{date | date:dateFormat}}</span>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class DateCellRenderer{
    @Input('data') date :any;

    /** Angular DatePipe formats only */
    @Input() dateFormat:string = DEFAULT_DATE_FORMAT;
}