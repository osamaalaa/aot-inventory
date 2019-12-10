import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector:"default-cell-renderer",
    template:`
        <span>{{data}}</span>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class DefaultCellRenderer{
    @Input() data:any;
}