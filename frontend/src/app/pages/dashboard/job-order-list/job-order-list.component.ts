import { Component, OnInit } from '@angular/core';
import { JobOrderModelService } from './job-order.model.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-order-list',
  templateUrl: './job-order-list.component.html',
  styleUrls: ['./job-order-list.component.scss'],
  providers:[JobOrderModelService]
})
export class JobOrderListComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = '';


  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    public jobOrderModelService: JobOrderModelService,
    private http:HttpClient
  ) {}

  ngOnInit() {
    this.fetchData()
  }


  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.http.get('/joborder/getAllJobOrders').subscribe(
      data => {
        this.jobOrderModelService.savedData = data['rows']
        this.jobOrderModelService.displayData = data['rows']
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.jobOrderModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.jobOrderModelService.sortData(sort)
  }


  /**Search English name and filter from the table*/
  searchName(): void {
    this.jobOrderModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.jobOrderModelService.searchName(this.searchValue)
  }


}
