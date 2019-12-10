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
export class OpenBalModelService extends TableBase {

    constructor() {
        super();
     }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInINV_OPEN_BALANCE_ID = (item: any) =>
                item.INV_OPEN_BALANCE_ID ? item.INV_OPEN_BALANCE_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1:false

            let isTextInDOCUMENT_EN_NAME = (item: any) =>
                item.DOCUMENT_EN_NAME ? item.DOCUMENT_EN_NAME.toString()
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

            let isTextInSTATUS_NAME = (item: any) =>
                item.STATUS_NAME ? item.STATUS_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1:false

            this.displayData = this.savedData.filter(
                item =>
                isTextInINV_OPEN_BALANCE_ID(item) ||
                isTextInDOCUMENT_EN_NAME(item) ||
                isTextInINVENTORY_PERIODS_EN_NAME(item) ||
                isTextInDOCUMENT_NO(item) ||
                isTextInSTATUS_NAME(item)
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

}
