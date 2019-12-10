import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
    selector:"cell-renderer-factory",
    template:`
    <ng-container [ngSwitch]="type">
    <status-cell-renderer *ngSwitchCase="'status'" [data]="cellData"></status-cell-renderer>
    <date-cell-renderer *ngSwitchCase="'date'"  [data]="cellData"></date-cell-renderer   >
    <default-cell-renderer  *ngSwitchDefault [data]="cellData"></default-cell-renderer>
</ng-container>
      
    `,
    changeDetection:ChangeDetectionStrategy.OnPush

})
export class CellRendererFactory{
    @Input() type:string;
    @Input() cellData:any;
}
// <status-cell-renderer *ngIf="type=='status'"  [data]="cellData"></status-cell-renderer>
// <date-cell-renderer *ngIf="type=='date'"  [data]="cellData"></date-cell-renderer   >
// <default-cell-renderer  *ngIf="type!='date' && type!='status'" [data]="cellData"></default-cell-renderer>