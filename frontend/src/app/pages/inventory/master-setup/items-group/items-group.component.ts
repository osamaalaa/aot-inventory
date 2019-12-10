import { Component, OnInit } from '@angular/core';
import { ItemGroupModelService } from './items-group.model.service';
import { providerDef } from '@angular/core/src/view';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items-group',
  templateUrl: './items-group.component.html',
  styleUrls: ['./items-group.component.scss'],
  providers: [ItemGroupModelService]
})
export class ItemsGroupComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = '';

  ITEMS_ID: string | number;


  //ITEMS_ID:string | number;
  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public itemGroupModelService: ItemGroupModelService,
    private ui: UIService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchItemId()
    this.fetchData();
  }

  fetchItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID']
  }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.itemsService.getallitemgroup(this.ITEMS_ID).subscribe(
      data => {
        this.itemGroupModelService.savedData = data.rows
        this.itemGroupModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting template list : ' + error)
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.itemGroupModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemGroupModelService.sortData(sort)
  }

  /** Deletes item template */
  deleteItemgroup(itemgroupid: number | string): void {
    this.itemsService.deleteItemGroup(itemgroupid).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Item Group deleted successfully')
        this.fetchData()

       
      },
      error => {
        if (error.error && error.error.message == 'Child Nodes Found') {
          this.ui.createMessage('error', 'This Item Group Has child Groups .Cannot Delete ')

        } else {
          this.ui.createMessage('error', 'Error while deleting item group ')
        }
      },
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.itemGroupModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.itemGroupModelService.searchName(this.searchValue)
  }

}
