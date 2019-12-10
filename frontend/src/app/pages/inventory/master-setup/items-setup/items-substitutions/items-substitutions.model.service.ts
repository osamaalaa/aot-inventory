/**
 * @author : Renil Babu
 * @date : 13/05/2019
 *
 * * Model service for item Substitution.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ItemSubstitutionModelService extends TableBase {
 

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

      let isTextInITEMS_SUBSTITUTIONS_ID = (item: any) =>
        item.ITEMS_SUBSTITUTIONS_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInSUBSTITUTION_ITEM_EN_NAME = (item: any) =>
        item.SUBSTITUTION_ITEM_EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInSUBSTITUTION_ITEM_AR_NAME = (item: any) =>
        item.SUBSTITUTION_ITEM_AR_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInUNITS_NAME = (item: any) =>
        item.UNITS_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      this.displayData = this.savedData.filter(
        item =>
          isTextInITEMS_SUBSTITUTIONS_ID(item) ||
          isTextInSUBSTITUTION_ITEM_AR_NAME(item) ||
          isTextInSUBSTITUTION_ITEM_EN_NAME(item) ||
          isTextInUNITS_NAME(item),
      )
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

 
}
