import { Injectable } from "@angular/core";

@Injectable()
export class DynmaicTableModelService {
  /** Variable holder for display data. Filter/sort/search results stored in displayTableData */
  displayTableData = []

  /** All table data is stored in Saved data. Not changed*/
  savedTableData = []

  /** Sort key  */
  sortID: string | null = null

  /** Ascending/descending */
  sortValue: string | null = null

  constructor() { }

  /** Sorts data */
  public sortData(sort: { key: string; value: string }, comparator: Function | null) {
    this.sortID = sort.key
    this.sortValue = sort.value
    this.sort(comparator)
  }

  /**
   * !NOT USED
   * TODO: Remove if not used
   *
   */
  private sort(comparator?: Function): void {
    if (this.sortID && this.sortValue) {
      if (comparator) {
        this.displayTableData = this.displayTableData.sort((a,b)=>{
            return  this.sortValue === 'ascend' 
            ? comparator(a[this.sortID],b[this.sortID])
            : comparator(b[this.sortID],a[this.sortID]);
        })
      } else {
        this.displayTableData = this.displayTableData.sort((a, b) =>
          this.sortValue === 'ascend'
            ? a[this.sortID] > b[this.sortID]
              ? 1
              : -1
            : b[this.sortID] > a[this.sortID]
              ? 1
              : -1,
        )
      }

    } else {
      this.displayTableData = this.displayTableData
    }
    this.displayTableData = [...this.displayTableData] // refresh
  }

  /**
   * *Only used to search over entire fields
   */
  public searchName(searchText:string | null,keyList?:string[]): void {
    if (searchText) {
      this.displayTableData = this.savedTableData.filter(item => {
        let isFound:boolean = false;

        let keys = keyList.length ? keyList : Object.keys(item);
        for(var i = 0 ; i < keys.length; i ++){
          let key = keys[i]
          let data = item[key] ? item[key].toString() : item[key];
          if(data && data.indexOf(searchText) > -1){
            isFound = true;
            break;
          }
        }
        return isFound;
      })
    } else {
      this.displayTableData = this.savedTableData
    }
    this.displayTableData = [...this.displayTableData] // refresh
  }
}