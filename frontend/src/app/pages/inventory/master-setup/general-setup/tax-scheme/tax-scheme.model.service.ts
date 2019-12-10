import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base'

@Injectable()
export class TaxSchemeModelService extends TableBase {


  constructor() {
    super()
  }


  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInEN_Name = (item: any) =>
        item.EN_DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1
      let isTextInTemplateID = (item: any) =>
        item.TAX_SCHEME_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInAR_Description = (item: any) =>
        item.AR_DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1
      let isTextInSUBSIDARIE_EN_NAME = (item: any) =>
        item.SUBSIDARIE_EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1
      let isTextInSUBSIDARIE_AR_NAME = (item: any) =>
        item.SUBSIDARIE_AR_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      this.displayData = this.savedData.filter(
        item => isTextInEN_Name(item) || isTextInTemplateID(item) || isTextInAR_Description(item)
        || isTextInSUBSIDARIE_EN_NAME(item) || isTextInSUBSIDARIE_AR_NAME(item),
      )
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }
}
