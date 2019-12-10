/**
 * @author : Renil Babu
 * @date : 10th June 2019
 *
 * * Model service for Stores Document Types.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class StoresDocmentTypesModelService extends TableBase {
    

    constructor() {
        super();
     }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInSTORES_DOCUMENT_TYPES_ID = (item: any) =>
                item.STORES_DOCUMENT_TYPES_ID.toString()
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

            let isTextInDOCUMENT_EN_NAME = (item: any) =>
                item.DOCUMENT_EN_NAME ? item.DOCUMENT_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInDOCUMENT_AR_NAME = (item: any) =>
            item.DOCUMENT_AR_NAME ? item.DOCUMENT_AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            this.displayData = this.savedData.filter(
                item =>
                isTextInSTORES_DOCUMENT_TYPES_ID(item) ||
                isTextInSTORE_EN_NAME(item) ||
                isTextInSTORE_AR_NAME(item) ||
                isTextInDOCUMENT_EN_NAME(item) ||
                isTextInDOCUMENT_AR_NAME(item)
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

   
}
