/**
 *
 * * Model service for item Components .
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ItemComponentsModelService extends TableBase {
 
  /**
   * TODO: Remove this usecase
   */
  datalength:string | number;


  constructor() { 
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {

    if (searchText) {

      let isTextInQUANTITY = (item: any) =>
        item.QUANTITY.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInITEM_PRICE = (item: any) =>
        item.ITEM_PRICE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInUNITSENNAME = (item: any) =>
        item.UNITS_EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
         
          let isTextInUNITSARNAME = (item: any) =>
          item.UNITS_AR_NAME.toString()
            .toLowerCase()
            .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInCOSTPERCENTAGE = (item: any) =>
        item.COST_PERCENTAGE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInCOMPONENTITEMENNAME = (item: any) =>
        item.COMPONENT_ITEM_EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

          let isTextInCOMPONENTITEMARNAME = (item: any) =>
          item.COMPONENT_ITEM_AR_NAME.toString()
            .toLowerCase()
            .indexOf(searchText.toString().toLowerCase()) !== -1;
      let isTextInITEMENNAME = (item: any) =>
        item.ITEM_EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
         
          let isTextInITEMARNAME = (item: any) =>
          item.ITEM_AR_NAME.toString()
            .toLowerCase()
            .indexOf(searchText.toString().toLowerCase()) !== -1;
  

          let isTextInITEMSCOMPONENTSID = (item: any) =>
          item.ITEMS_COMPONENTS_ID.toString()
            .toLowerCase()
            .indexOf(searchText.toString().toLowerCase()) !== -1;    
      this.displayData = this.savedData.filter(
        item => isTextInQUANTITY(item) || isTextInITEM_PRICE(item) || isTextInUNITSENNAME(item) || isTextInUNITSARNAME(item)|| isTextInCOSTPERCENTAGE(item) || isTextInCOMPONENTITEMENNAME(item) || isTextInITEMENNAME(item) || isTextInITEMSCOMPONENTSID(item) || isTextInITEMARNAME(item) || isTextInCOMPONENTITEMARNAME(item),

      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

  
}
