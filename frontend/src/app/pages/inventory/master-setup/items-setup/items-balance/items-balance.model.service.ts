/**
 * @author : Renil Babu
 * @date : 13/05/2019
 *
 * * Model service for item Balance.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ItemBalanceModelService extends TableBase {


  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayTemplateData */
  public searchItems(searchText: string): void {
    if (searchText) {
      // let isTextInITEM_EN_NAME = (item: any) =>
      //   item.ITEM_EN_NAME.toString()
      //     .toLowerCase()
      //     .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInITEMS_BALANCE_ID = (item: any) =>
        item.ITEMS_BALANCE_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInSTORE_EN_NAME = (item: any) =>
        item.CREATED_BY.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInSTORE_LOCATION_EN_NAME = (item: any) =>
        item.STORE_LOCATION_EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1
      
      this.displayData = this.savedData.filter(
        item =>
          isTextInITEMS_BALANCE_ID(item) ||
          isTextInSTORE_EN_NAME(item) ||
          isTextInSTORE_LOCATION_EN_NAME(item),
      )
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

 
}
