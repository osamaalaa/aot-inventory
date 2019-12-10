/**
 * @author : Ahmed hussien
 * @date : 22/05/2019
 *
 * * Model service for item Alias.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ItemGroupModelService extends TableBase {


  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInEN_Name = (item: any) =>
        item.EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
      let isTextInAR_NAME = (item: any) =>
        item.AR_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

          let isTextInITEMS_GROUP_CODE = (item: any) =>
          item.ITEMS_GROUP_CODE.toString()
            .toLowerCase()
            .indexOf(searchText.toString().toLowerCase()) !== -1;
  



      let isTextInITEMS_GROUP_ID = (item: any) =>                     
        item.ITEMS_GROUP_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
      this.displayData = this.savedData.filter(
        item => isTextInEN_Name(item) || isTextInAR_NAME(item) || isTextInITEMS_GROUP_ID(item)  || isTextInITEMS_GROUP_CODE(item)
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }


}
