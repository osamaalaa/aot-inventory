/**
 * @author : Renil Babu
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
export class ItemAliasesModelService extends TableBase {


  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInITEMS_ALIASES_ID = (item: any) =>
        item.ITEMS_ALIASES_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
      let isTextInALIAS_TYPE_PRIMARY_NAME = (item: any) =>
        item.ALIAS_TYPE_PRIMARY_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
      let isTextInITEM_CODE = (item: any) =>
        item.ITEM_CODE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
      // let isTextInDEFAULT_ALIASES = (item: any) =>
      //   item.ITEM_CODE.toString()
      //     .toLowerCase()
      //     .indexOf(searchText.toString().toLowerCase()) !== -1;
      this.displayData = this.savedData.filter(
        item => isTextInITEMS_ALIASES_ID(item) || isTextInALIAS_TYPE_PRIMARY_NAME(item) || isTextInITEM_CODE(item),
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }


}
