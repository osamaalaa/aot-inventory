import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class InvStockTakingModelService extends TableBase {

    constructor() {
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInINV_STOCKTAKING_ID = (item: any) =>
                item.INV_STOCKTAKING_ID ? item.INV_STOCKTAKING_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInDOCUMENT_AR_NAME = (item: any) =>
                item.DOCUMENT_AR_NAME ? item.DOCUMENT_AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInDOCUMENT_NO = (item: any) =>
                item.DOCUMENT_NO ? item.DOCUMENT_NO.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false


            this.displayData = this.savedData.filter(
                item =>
                    isTextInINV_STOCKTAKING_ID(item) ||
                    isTextInDOCUMENT_AR_NAME(item) ||
                    isTextInDOCUMENT_NO(item) 
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

}
