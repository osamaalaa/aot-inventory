import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxSchemeDetailsModelService {
  displayTemplateData = [];

  /** All table data is stored in template data. Not changed*/
  templateData = [];

  /** Sort key  */
  sortID: string | null = null;

  /** Ascending/descending */
  sortValue: string | null = null;

  constructor() {}


  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayTemplateData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInEN_Name = (item: any) =>
        item.EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1
      let isTextInTemplateID = (item: any) =>
        item.ITEMS_TEMPLATE_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInEN_Description = (item: any) =>
        item.EN_DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
          

      this.displayTemplateData = this.templateData.filter(
        item => isTextInEN_Name(item) || isTextInTemplateID(item) || isTextInEN_Description(item),
      );
    } else {
      this.displayTemplateData = this.templateData;
    }
    this.displayTemplateData = [...this.displayTemplateData]; // refresh
  }


  /** Sorts data */
  public sortData(sort: { key: string; value: string }) {
    this.sortID = sort.key
    this.sortValue = sort.value
    this.search()
  }

  private search(): void {
    if (this.sortID && this.sortValue) {
      this.displayTemplateData = this.displayTemplateData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortID] > b[this.sortID]
            ? 1
            : -1
          : b[this.sortID] > a[this.sortID]
          ? 1
          : -1,
      )
    } else {
      this.displayTemplateData = this.displayTemplateData
    }
    this.displayTemplateData = [...this.displayTemplateData] // refresh
  }

  /** 
   * *Only used to search name field in table
   * TODO: Create a generic search function for all fields.
   */
  public searchName(searchText): void{
    if (searchText) {
      this.displayTemplateData = this.templateData.filter(item => searchText === item.EN_NAME)
    } else {
      this.displayTemplateData = this.templateData
    }
    this.displayTemplateData = [...this.displayTemplateData] // refresh
  }

}
