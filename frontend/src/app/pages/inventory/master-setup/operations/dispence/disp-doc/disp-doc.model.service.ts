/**
 * @author : Renil Babu
 * @date : 27th June 2019
 *
 * * Model service for Inv Open Balance.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class DispenceModelService extends TableBase {

    constructor() {
        super();
     }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInDOCUMENT_ID = (item: any) =>
                item.DOCUMENT_ID ? item.DOCUMENT_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1:false


            let isTextInINVENTORY_PERIODS_EN_NAME = (item: any) =>
                item.INVENTORY_PERIODS_EN_NAME ? item.INVENTORY_PERIODS_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1:false

            let isTextInDOCUMENT_NO = (item: any) =>
                item.DOCUMENT_NO ? item.DOCUMENT_NO.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1:false


            this.displayData = this.savedData.filter(
                item =>
                isTextInDOCUMENT_ID(item) ||
                isTextInINVENTORY_PERIODS_EN_NAME(item) ||
                isTextInDOCUMENT_NO(item) 
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

}
