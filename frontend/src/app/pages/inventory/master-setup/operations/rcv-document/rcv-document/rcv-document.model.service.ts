import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class RcvDocumentModelService extends TableBase {

    constructor() {
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInRCV_DOCUMENT_ID = (item: any) =>
                item.RCV_DOCUMENT_ID ? item.RCV_DOCUMENT_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInDOCUMENT_TYPE_ID = (item: any) =>
                item.DOCUMENT_TYPE_ID ? item.DOCUMENT_TYPE_ID.toString()
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

            let isTextInSUPPLIER_EN_NAME = (item: any) =>
                item.SUPPLIER_EN_NAME ? item.SUPPLIER_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            this.displayData = this.savedData.filter(
                item =>
                    isTextInRCV_DOCUMENT_ID(item) ||
                    isTextInDOCUMENT_TYPE_ID(item) ||
                    isTextInDOCUMENT_AR_NAME(item) ||
                    isTextInDOCUMENT_NO(item) ||
                    isTextInSUPPLIER_EN_NAME(item)
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

}
