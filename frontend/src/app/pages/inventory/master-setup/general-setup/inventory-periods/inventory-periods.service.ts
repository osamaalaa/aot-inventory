
import { Injectable } from '@angular/core';

export class InventoryPeriodsService {

  displayData = []

  /** All table data is stored in template data. Not changed*/
  savedData = []

  /** Sort key  */
  sortID: string | null = null

  /** Ascending/descending */
  sortValue: string | null = null

  constructor() { }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInINVENTORY_PERIODS_ID = (item: any) =>
        item.INVENTORY_PERIODS_ID.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;


      let isTextInINVENTORY_PERIODS_CODE = (item: any) =>
        item.INVENTORY_PERIODS_CODE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInEN_NAME = (item: any) =>
        item.EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInEN_DESCRIPTION = (item: any) =>
        item.EN_DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;


      let isTextInSUBSIDARIE_EN_NAME = (item: any) =>
        item.SUBSIDARIE_EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;


      let isTextInSTATUS = (item: any) =>
        item.STATUS.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;


      this.displayData = this.savedData.filter(
        item => isTextInINVENTORY_PERIODS_ID(item) || isTextInINVENTORY_PERIODS_CODE(item) || isTextInEN_NAME(item) || isTextInEN_DESCRIPTION(item) || isTextInSUBSIDARIE_EN_NAME(item) || isTextInSTATUS(item)     ,
      );

    } else {
      this.displayData = this.savedData
    }

    this.displayData = [...this.displayData] // refresh
  }

  /** Sorts data */
  public sortData(sort: { key: string; value: string }) {
    this.sortID = sort.key
    this.sortValue = sort.value
    this.search()
  }

  private search(): void {
    if (this.sortID && this.sortValue) {
      this.displayData = this.displayData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortID] > b[this.sortID]
            ? 1
            : -1
          : b[this.sortID] > a[this.sortID]
            ? 1
            : -1,
      )
    } else {
      this.displayData = this.displayData
    }
    this.displayData = [...this.displayData] // refresh
  }

  public searchName(searchText): void {
    if (searchText) {
      this.displayData = this.savedData.filter(item => searchText === item.EN_NAME)
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

}
