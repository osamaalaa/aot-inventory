
import { Component, OnInit } from '@angular/core';
import { InventoryPeriodsService } from './inventory-periods.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-inventory-periods',
  templateUrl: './inventory-periods.component.html',
  styleUrls: ['./inventory-periods.component.scss'],
  providers: [InventoryPeriodsService]
})

export class InventoryPeriodsComponent implements OnInit {

  lang: string;

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = '';

  INVENTORY_PERIODS_ID: string | number;

  /** Table loader */
  isDataLoading: boolean = false



  constructor(
    private generalSetupService: GeneralSetupService,
    public inventoryPeriodsService: InventoryPeriodsService,

    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.fetchInventoryperiodsId()
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

  fetchInventoryperiodsId(): void {
    this.INVENTORY_PERIODS_ID = this.route.snapshot.params['INVENTORY_PERIODS_ID']
  }

  fetchData(): void {
    this.isDataLoading = true

    this.generalSetupService.getAllInventoryPeriod().subscribe(
      data => {
        this.inventoryPeriodsService.savedData = data.rows
        this.inventoryPeriodsService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting inventory periods list : ' + error)
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.inventoryPeriodsService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.inventoryPeriodsService.sortData(sort)
  }

  /** Deletes slow moving policy */
  deleteInventoryPeriod(INVENTORY_PERIODS_ID: number | string): void {

    this.generalSetupService.deleteInventoryPeriod(INVENTORY_PERIODS_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Inventory Periods deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting inventory periods '),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.inventoryPeriodsService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.inventoryPeriodsService.searchName(this.searchValue)
  }
}
