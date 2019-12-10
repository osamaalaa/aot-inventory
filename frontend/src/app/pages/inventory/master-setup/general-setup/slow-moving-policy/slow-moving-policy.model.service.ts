import { TableBase } from 'src/app/common/Table-base';
import { Injectable } from '@angular/core';

@Injectable()
export class SlowMovingPolicyService extends TableBase {


  constructor() {
    super()
  }


  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInSLOW_POLICY_ID = (item: any) =>
        item.SLOW_POLICY_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInEN_DESCRIPTION = (item: any) =>
        item.EN_DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;




      let isTextInSLOW_MOVING_POLICY_TYPE = (item: any) =>
        item.SLOW_MOVING_POLICY_TYPE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;


      let isTextInSLOW_MOVING_MINIMUM_VALUE = (item: any) =>
        item.SLOW_MOVING_MINIMUM_VALUE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;


      let isTextInSLOW_MOVING_POLICY_DAYS = (item: any) =>
        item.SLOW_MOVING_POLICY_DAYS.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInAR_DESCRIPTION = (item: any) =>
        item.AR_DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;


      this.displayData = this.savedData.filter(
        item => isTextInSLOW_POLICY_ID(item) || isTextInEN_DESCRIPTION(item) || isTextInSLOW_MOVING_POLICY_TYPE(item) || isTextInSLOW_MOVING_MINIMUM_VALUE(item) || isTextInSLOW_MOVING_POLICY_DAYS(item) || isTextInAR_DESCRIPTION(item)     ,
      );

    } else {
      this.displayData = this.savedData
    }

    this.displayData = [...this.displayData] // refresh
  }

}
