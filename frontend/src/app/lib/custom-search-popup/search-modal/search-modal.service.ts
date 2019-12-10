import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SearchModalService{
    
    /**
     * *When user submits the form . It is passed to this Observable.
     * * Table is listening to this Observable and gets the formdata/filter.
     * * Table shows only those rows that this filter satifies
     */
    public filterChanged$ = new Subject();

    /**
     * * Selected items are updated when user selects a row in the table.
     * * This data is used by the directive to emit the selected data
     */
    public selectedItems = [];

    constructor(){}
} 