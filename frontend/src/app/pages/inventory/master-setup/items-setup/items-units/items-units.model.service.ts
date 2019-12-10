/**
 * @author : Renil Babu
 * @date : 28/08/2019
 *
 * * Model service for item units.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ItemUnitsModelService extends TableBase {
  

  constructor() {
    super();
  }

  /** Searches  in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {
      // let isTextInITEM_EN_NAME = (item: any) =>
      //   item.ITEM_EN_NAME ? item.ITEM_EN_NAME.toString()
      //     .toLowerCase()
      //     .indexOf(searchText.toString().toLowerCase()) !== -1 : false

      let isTextInITEMS_BALANCE_UNITS_ID = (item: any) =>
        item.ITEMS_BALANCE_UNITS_ID ? item.ITEMS_BALANCE_UNITS_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false

      let isTextInSTORE_EN_NAME = (item: any) =>
        item.STORE_EN_NAME ? item.STORE_EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false

      let isTextInUNITS_NAME = (item: any) =>
        item.UNITS_NAME ? item.UNITS_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false
      let isTextInSTORE_AR_NAME = (item: any) =>
        item.STORE_AR_NAME ? item.STORE_AR_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false

      this.displayData = this.savedData.filter(
        item =>
          isTextInITEMS_BALANCE_UNITS_ID(item) ||
          isTextInSTORE_EN_NAME(item) ||
          isTextInSTORE_AR_NAME(item) ||
          isTextInUNITS_NAME(item),
      )
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

  
}
