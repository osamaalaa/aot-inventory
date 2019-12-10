import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class JobOrderModelService extends TableBase {
  

  constructor() {
    super();
  }

  /** Searches  in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {

      let isTextInCODE = (item: any) =>
        item.CODE ? item.CODE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false

      let isTextInJOB_ORDER_DESC = (item: any) =>
        item.JOB_ORDER_DESC ? item.JOB_ORDER_DESC.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false

      let isTextInPRIMARY_NAME = (item: any) =>
        item.PRIMARY_NAME ? item.PRIMARY_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false
      let isTextInASSET_NAME = (item: any) =>
        item.ASSET_NAME ? item.ASSET_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false

      this.displayData = this.savedData.filter(
        item =>
        isTextInCODE(item) ||
        isTextInJOB_ORDER_DESC(item) ||
        isTextInASSET_NAME(item) ||
        isTextInPRIMARY_NAME(item)
          // isTextInUNITS_NAME(item),
      )
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

  
}
