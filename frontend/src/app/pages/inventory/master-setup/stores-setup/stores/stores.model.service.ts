/**
 * @author : Renil Babu
 * @date : 6/9/2019
 *
 * * Model service for Store.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class StoresModelService extends TableBase {

    constructor() {
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInSTORES_ID = (item: any) =>
                item.STORES_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInEN_NAME = (item: any) =>
                item.EN_NAME ? item.EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInAR_NAME = (item: any) =>
                item.AR_NAME ? item.AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInPARENT_STORE_EN_NAME = (item: any) =>
                item.PARENT_STORE_EN_NAME ? item.PARENT_STORE_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInPARENT_STORE_AR_NAME = (item: any) =>
                item.PARENT_STORE_AR_NAME ? item.PARENT_STORE_AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInUNITS_NAME = (item: any) =>
                item.UNITS_NAME ? item.UNITS_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            this.displayData = this.savedData.filter(
                item =>
                    isTextInSTORES_ID(item) ||
                    isTextInEN_NAME(item) ||
                    isTextInAR_NAME(item) ||
                    isTextInUNITS_NAME(item) ||
                    isTextInPARENT_STORE_AR_NAME(item) ||
                    isTextInPARENT_STORE_EN_NAME(item)
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

}
