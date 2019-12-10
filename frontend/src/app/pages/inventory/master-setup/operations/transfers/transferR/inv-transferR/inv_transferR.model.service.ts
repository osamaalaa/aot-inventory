/**
 * @author : Ahmed Hussein
 * @date : 6/27/2019
 *
 * * Model service for Store.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'

@Injectable()
export class invtransferRModelService {
    displayData = []

    /** All table data is stored in Saved data. Not changed*/
    savedData = []

    /** Sort key  */
    sortID: string | null = null

    /** Ascending/descending */
    sortValue: string | null = null

    constructor() { } 

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchinvtransferR(searchText: string): void {
        if (searchText) {
            let isTextInINV_TRANSFER_R_ID = (storetrans: any) =>
                storetrans. INV_TRANSFER_R_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInDOCUMENT_AR_NAME = (storetrans: any) =>
                storetrans.DOCUMENT_AR_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextSTORE_EN_NAME=(storetrans:any)=>
                storetrans.STORE_EN_NAME.toString()
                .toLowerCase()
                .indexOf(searchText.toString().toLowerCase()) !==-1   

            let isTextInSTATUS_NAME = (storetrans: any) =>
               storetrans.STATUS_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 



            this.displayData = this.savedData.filter(
                storetrans =>
                    isTextInINV_TRANSFER_R_ID(storetrans) ||
                    isTextInDOCUMENT_AR_NAME(storetrans)||
                    isTextSTORE_EN_NAME(storetrans)||
                    isTextInSTATUS_NAME(storetrans) 
                   
                  
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

    /** Sorts data */
    public sortData(sort: { key: string; value: string }) {
        this.sortID = sort.key
        this.sortValue = sort.value
        this.search()
    }

    /**
     * !NOT USED
     * TODO: Remove if not used
     *
     */
    private search(): void {
        if (this.sortID && this.sortValue) {
            this.displayData = this.displayData.sort((a, b) =>
                this.sortValue === 'ascend'
                    ? a[this.sortID] > b[this.sortID]
                        ? 1
                        : -1
                    : b[this.sortID] > a[this.sortID]
                        ? 1
                        : -1,
            )
        } else {
            this.displayData = this.displayData
        }
        this.displayData = [...this.displayData] // refresh
    }

    /**
     * *Only used to search name field in table
     * !NOT USED
     * TODO: Remove if not used
     */
    public searchName(searchText): void {
        if (searchText) {
            this.displayData = this.savedData.filter(storetrans => searchText === storetrans.INVENTORY_PERIODS_EN_NAME)
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }
}
