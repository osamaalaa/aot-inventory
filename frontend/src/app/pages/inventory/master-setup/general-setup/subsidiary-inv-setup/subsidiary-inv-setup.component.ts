import { Component, OnInit } from '@angular/core';
import { SubsidiaryInvModelService } from './subsidiary-inv-setup.model.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subsidiary-inv-setup',
  templateUrl: './subsidiary-inv-setup.component.html',
  styleUrls: ['./subsidiary-inv-setup.component.scss'],
  providers: [SubsidiaryInvModelService]
})
export class SubsidiaryInvSetupComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = '';

  ITEMS_ID: string | number;


  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private generalSetupService: GeneralSetupService,
    public subsidiaryInvModelService: SubsidiaryInvModelService,
    private ui: UIService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchData()
  }


  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    
    this.isDataLoading = true
    this.generalSetupService.getSubsidiaryInv().subscribe(
      data => {
        this.subsidiaryInvModelService.savedData = data.rows
        this.subsidiaryInvModelService.displayData = data.rows
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
    this.subsidiaryInvModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.subsidiaryInvModelService.sortData(sort)
  }

  /** Deletes Subsidiary Inv setup */
  deleteSubsidiaryInvSetup(SUBSIDIARY_ID: number | string): void {
    this.generalSetupService.deleteSubsidiaryInvSetup(SUBSIDIARY_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Subsidiary Inv deleted successfully')
        this.fetchData()
      },
      error => {
        this.ui.createMessage('error', 'Error while deleting Subsidiary Inv setup ')
      }
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.subsidiaryInvModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.subsidiaryInvModelService.searchName(this.searchValue)
  }


}
