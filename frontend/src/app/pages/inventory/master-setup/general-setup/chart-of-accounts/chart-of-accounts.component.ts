import { Component, OnInit } from '@angular/core';
import { ChartOfAccountsModelService } from './chart-of-accounts.model.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'


@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.scss'],
  providers: [ChartOfAccountsModelService]
})
export class ChartOfAccountsComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = '';

  ITEMS_ID: string | number;


  /** Table loader */
  isDataLoading: boolean = false

  lang: any

  constructor(
    private generalSetupService: GeneralSetupService,
    public chartOfAccountsModelService: ChartOfAccountsModelService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.fetchData()
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


  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.generalSetupService.getChartOfAccounts().subscribe(
      data => {
        this.chartOfAccountsModelService.savedData = data.rows
        this.chartOfAccountsModelService.displayData = data.rows
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
    this.chartOfAccountsModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.chartOfAccountsModelService.sortData(sort)
  }

  /** Deletes chart of account */
  deleteChartOfAccounts(CHART_OF_ACCOUNTS_ID: number | string): void {
    this.generalSetupService.deleteChartOfAccount(CHART_OF_ACCOUNTS_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Chart of Item deleted successfully')
        this.fetchData()
      },
      error => {
        if (error.error && error.error.message == 'Child Nodes Found') {
          this.ui.createMessage('warn', 'This Account Has child accounts.Cannot Delete ')

        } else {
          this.ui.createMessage('error', 'Error while deleting Chart of Item ')
        }
      }
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.chartOfAccountsModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.chartOfAccountsModelService.searchName(this.searchValue)
  }

}
