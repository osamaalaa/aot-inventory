/**
 * @author : Renil Babu
 * @date : 6/9/2019
 *
 * * Model service for Stores Items.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class StoresItemsModelService extends TableBase{
   

    constructor() {
        super();
     }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInSTORES_ITEMS_ID = (item: any) =>
                item.STORES_ITEMS_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInSTORE_EN_NAME = (item: any) =>
                item.STORE_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInSTORE_AR_NAME = (item: any) =>
                item.STORE_AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInITEM_EN_NAME = (item: any) =>
                item.ITEM_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1;

            let isTextInITEM_AR_NAME = (item: any) =>
                item.ITEM_AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1;

            this.displayData = this.savedData.filter(
                item =>
                isTextInSTORES_ITEMS_ID(item) ||
                isTextInSTORE_EN_NAME(item) ||
                isTextInSTORE_AR_NAME(item) ||
                isTextInITEM_EN_NAME(item) ||
                isTextInITEM_AR_NAME(item)
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

   
}
