import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ApprovalModelService extends TableBase {

  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayTemplateData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInCHART_OF_ACCOUNTS_ID = (item: any) =>
        item.CHART_OF_ACCOUNTS_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInEN_NAME = (item: any) =>
        item.EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInACCOUNT_CODE = (item: any) =>
        item.ACCOUNT_CODE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1
      
      this.displayData = this.savedData.filter(
        item =>
        isTextInCHART_OF_ACCOUNTS_ID(item) ||
        isTextInEN_NAME(item) ||
          isTextInACCOUNT_CODE(item),
      )
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }
}
