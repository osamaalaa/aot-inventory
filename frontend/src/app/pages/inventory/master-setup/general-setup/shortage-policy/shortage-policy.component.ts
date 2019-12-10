import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { ShortagePolicyModelService } from './shortage-policy.model.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-shortage-policy',
  templateUrl: './shortage-policy.component.html',
  styleUrls: ['./shortage-policy.component.scss'],
  providers: [ShortagePolicyModelService]
})
export class ShortagePolicyComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = '';

  searchValue = '';

  SHORTAGE_POLICY_ID: string | number;


  /** Table loader */
  isDataLoading: boolean = false

  lang: any

  constructor(
    private generalSetupService: GeneralSetupService,
    public shortagePolicyModelService: ShortagePolicyModelService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.fetchStoreId();
    this.fetchData();
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  fetchStoreId(): void {
    this.SHORTAGE_POLICY_ID = this.route.snapshot.params['SHORTAGE_POLICY_ID'];
  }



  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.generalSetupService.getShortagePolicyall().subscribe(
      data => {
        this.shortagePolicyModelService.savedData = data.rows

        this.shortagePolicyModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Store item list : ' + error.error.message)
      },
    )
  }


  /** Search Shortage Policy against search text*/
  searchItems(): void {
    this.shortagePolicyModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.shortagePolicyModelService.sortData(sort)
  }

  /** Deletes Shortage Policy */
  deleteShortagePolicy(SHORTAGE_POLICY_ID: number | string): void {
    this.generalSetupService.deleteShortagePolicy(SHORTAGE_POLICY_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Shortage Policy deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Shortage Policy'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.shortagePolicyModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.shortagePolicyModelService.searchName(this.searchValue)
  }


}

