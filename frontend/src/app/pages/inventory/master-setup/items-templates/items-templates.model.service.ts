/**
 * @author : Renil Babu
 * @date : 13/05/2019
 * 
 * * Model service for item template. 
 * 
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ItemTemplateModelService extends TableBase {
 

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

      let isTextInTemplateID = (item: any) =>
        item.ITEMS_TEMPLATE_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInEN_Description = (item: any) =>
        item.EN_DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
          

      this.displayData = this.savedData.filter(
        item => isTextInEN_Name(item) || isTextInTemplateID(item) || isTextInEN_Description(item),
      );
    } else {
      this.displayData = this.savedData;
    }
    this.displayData = [...this.displayData]; // refresh
  }


}
