/**
 * @author : Renil Babu
 * @date : 10th June 2019
 *
 * * Model service for Stores Location.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class StoresLocationModelService extends TableBase {
 

    constructor() { 
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInSTORES_LOCATIONS_ID = (item: any) =>
                item.STORES_LOCATIONS_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInEN_NAME = (item: any) =>
                item.EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInAR_NAME = (item: any) =>
                item.AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInSTORES_LOCATIONS_CODE = (item: any) =>
                item.STORES_LOCATIONS_CODE.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1;


            this.displayData = this.savedData.filter(
                item =>
                isTextInSTORES_LOCATIONS_ID(item) ||
                isTextInEN_NAME(item) ||
                isTextInAR_NAME(item) ||
                isTextInSTORES_LOCATIONS_CODE(item)
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

  
}
