import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { ItemUnitsModelService } from './items-units.model.service';

@Component({
  selector: 'app-items-units',
  templateUrl: './items-units.component.html',
  styleUrls: ['./items-units.component.scss'],
  providers:[ItemUnitsModelService]
})
export class ItemsUnitsComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = '';

  ITEMS_ID:string | number;


  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public itemUnitsModelService: ItemUnitsModelService,
    private ui: UIService,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchItemId();
    this.fetchData()
  }

  fetchItemId():void{
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID']
  }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.itemsService.getItemUnits(this.ITEMS_ID).subscribe(
      data => {
        this.itemUnitsModelService.savedData = data.rows
        this.itemUnitsModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Item Balance units')
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.itemUnitsModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemUnitsModelService.sortData(sort)
  }

  /** Deletes item balance Unit */
  deleteItemBalanceUnit(ITEMS_UNITS_ID: number | string): void {
    this.itemsService.deleteItemUnits(ITEMS_UNITS_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Units deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Units'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemUnitsModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemUnitsModelService.searchName(this.searchValue)
  }


}
