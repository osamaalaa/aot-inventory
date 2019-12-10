import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector:"status-cell-renderer",
    template:`
        <span *ngIf="status === 1"  class="badge badge-primary font-size-12">
            Enabled
        </span>
        <span *ngIf="status !== 1" class="badge badge-danger  font-size-12">
            Disabled
        </span>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class StatusCellRenderer{
    @Input('data') status :any;
}