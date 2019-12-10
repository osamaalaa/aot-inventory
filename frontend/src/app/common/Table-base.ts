/**
 * @author: Renil Babu
 * @date : 28th June 2019
 * 
 * 
 * * Base class for Handling Table data.
 * * Used as a parent class for Model Service of Table
 * 
 * *Common Functionalities are part of this class
 * 
 * *Any method can be overridden by implmenting the same function in the Child Table class
 * 
 */
export class TableBase {
     /** Variable holder for display data. Filter/sort/search results stored in displayData */
  displayData = []

  /** All table data is stored in Saved data. Not changed*/
  savedData = []

  /** Sort key  */
  sortID: string | null = null

  /** Ascending/descending */
  sortValue: string | null = null

  constructor() {}

  /** Sorts data */
  public sortData(sort: { key: string; value: string }) {
    this.sortID = sort.key
    this.sortValue = sort.value
    this.search()
  }

  /**
   * !NOT USED
   * TODO: Remove if not used
   *
   */
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

  /**
   * *Only used to search name field in table
   * !NOT USED
   * TODO: Remove if not used
   */
  public searchName(searchText): void {
    if (searchText) {
      this.displayData = this.savedData.filter(item => searchText === item.EN_NAME)
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }
}
