/**
 * @author : Renil Babu
 * @date : 17/06/2019
 *
 * * Model service for Subsidiary Inv Setup.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class SubsidiaryInvModelService extends TableBase {


  constructor() {
    super()
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayTemplateData */
  public searchItems(searchText: string): void {
    if (searchText) {
      // let isTextInITEM_EN_NAME = (item: any) =>
      //   item.ITEM_EN_NAME.toString()
      //     .toLowerCase()
      //     .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInSUBSIDIARY_ID = (item: any) =>
        item.SUBSIDIARY_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      // let isTextInEN_NAME = (item: any) =>
      //   item.EN_NAME.toString()
      //     .toLowerCase()
      //     .indexOf(searchText.toString().toLowerCase()) !== -1

      // let isTextInACCOUNT_CODE = (item: any) =>
      //   item.ACCOUNT_CODE.toString()
      //     .toLowerCase()
      //     .indexOf(searchText.toString().toLowerCase()) !== -1
      
      this.displayData = this.savedData.filter(
        item =>
        isTextInSUBSIDIARY_ID(item)
      )
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }
}
