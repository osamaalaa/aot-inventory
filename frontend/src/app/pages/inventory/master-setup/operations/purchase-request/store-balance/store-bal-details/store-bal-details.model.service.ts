
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class StoresItemsBalanceService extends TableBase {

    constructor() {
        super();
    }

    /** Searches for ITEM_CODE, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {

            let isTextInITEM_CODE = (item: any) =>
                item.ITEM_CODE ? item.ITEM_CODE.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInITEM_EN_NAME = (item: any) =>
                item.ITEM_EN_NAME ? item.ITEM_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInITEM_AR_NAME = (item: any) =>
                item.ITEM_AR_NAME ? item.ITEM_AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;


            let isTextInUNITS_NAME = (item: any) =>
                item.UNITS_NAME ? item.UNITS_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            this.displayData = this.savedData.filter(
                item =>
                isTextInITEM_CODE(item) ||
                isTextInITEM_EN_NAME(item) ||
                isTextInITEM_AR_NAME(item) ||
                    isTextInUNITS_NAME(item) 
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

}
