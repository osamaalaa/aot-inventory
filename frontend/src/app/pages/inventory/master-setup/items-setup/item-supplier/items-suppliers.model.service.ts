/**
 * @author : Ahmed Hussien
 * @date : 10/06/2019
 *
 * * Model service for item supplier.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ItemSuppliersModelService extends TableBase {


    constructor() { 
        super();
    }

    /** Searches  in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInITEMS_SUPPLIERS_ID = (item: any) =>
                item.ITEMS_SUPPLIERS_ID ? item.ITEMS_SUPPLIERS_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInITEM_EN_NAME = (item: any) =>
                item.ITEM_EN_NAME ? item.ITEM_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInSUPPLIER_AR_NAME = (item: any) =>
                item.SUPPLIER_AR_NAME ? item.SUPPLIER_AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInSUPPLIER_EN_NAME = (item: any) =>
                item.SUPPLIER_EN_NAME ? item.SUPPLIER_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInSUPPLIER_ITEM_CODE = (item: any) =>
                item.SUPPLIER_ITEM_CODE ? item.SUPPLIER_ITEM_CODE.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;
                    
          

            this.displayData = this.savedData.filter(
                item =>
                isTextInITEMS_SUPPLIERS_ID(item) ||
                    isTextInITEM_EN_NAME(item) ||
                    isTextInSUPPLIER_AR_NAME(item) ||
                    isTextInSUPPLIER_EN_NAME(item) ||
                    isTextInITEMS_SUPPLIERS_ID(item) ||
                    isTextInSUPPLIER_ITEM_CODE(item),
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

   
}
