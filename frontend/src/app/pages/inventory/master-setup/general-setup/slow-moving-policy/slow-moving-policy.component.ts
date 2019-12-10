import { Component, OnInit } from '@angular/core';
import { SlowMovingPolicyService } from './slow-moving-policy.model.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-slow-moving-policy',
  templateUrl: './slow-moving-policy.component.html',
  styleUrls: ['./slow-moving-policy.component.scss'],
  providers: [SlowMovingPolicyService]
})


export class SlowMovingPolicyComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = '';

  SLOW_POLICY_ID: string | number;


  //ITEMS_ID:string | number;
  /** Table loader */
  isDataLoading: boolean = false

  lang: any
  constructor(
    private generalSetupService: GeneralSetupService,
    public slowMovingPolicyService: SlowMovingPolicyService,

    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.fetchItemId()
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

  fetchItemId(): void {
    this.SLOW_POLICY_ID = this.route.snapshot.params['SLOW_POLICY_ID']
  }

  fetchData(): void {
    this.isDataLoading = true
    this.generalSetupService.getSmovingPolicy().subscribe(
      data => {
        this.slowMovingPolicyService.savedData = data.rows
        this.slowMovingPolicyService.displayData = data.rows
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
    this.slowMovingPolicyService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.slowMovingPolicyService.sortData(sort)
  }

  /** Deletes slow moving policy */
  deleteSmovingPolicy(SLOW_POLICY_ID: number | string): void {
    this.generalSetupService.deleteSmovingPolicy(SLOW_POLICY_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Item Group deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting slow moving policy '),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.slowMovingPolicyService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.slowMovingPolicyService.searchName(this.searchValue)
  }

}
