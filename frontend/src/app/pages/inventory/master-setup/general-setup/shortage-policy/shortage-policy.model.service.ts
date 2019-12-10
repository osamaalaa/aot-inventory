/**
 * @author : Srikanth
 * @date : 18/06/2019
 *
 * * Model service for Shortage Policys.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ShortagePolicyModelService extends TableBase {


    constructor() {
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInSHORTAGE_POLICY_ID = (item: any) =>
                item.SHORTAGE_POLICY_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInSHORTAGE_POLICY_VALUE = (item: any) =>
                item.SHORTAGE_POLICY_VALUE.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            let isTextInEN_NAME = (item: any) =>
                item.EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1

            this.displayData = this.savedData.filter(
                item =>
                    isTextInSHORTAGE_POLICY_ID(item) ||
                    isTextInSHORTAGE_POLICY_VALUE(item) ||
                    isTextInEN_NAME(item)
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }
}
