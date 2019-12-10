import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { TaxSchemeModelService } from './tax-scheme.model.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-tax-schemes',
  templateUrl: './tax-schemes.component.html',
  styleUrls: ['./tax-schemes.component.scss'],
  providers: [TaxSchemeModelService]
})
export class TaxSchemesComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {};

  searchText = '';

  searchValue = '';

  lang: any

  /** Table loader */
  isDataLoading: boolean = false;

  constructor(
    private taxSchemeService: GeneralSetupService,
    public taxSchemeModelService: TaxSchemeModelService,
    private ui: UIService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
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

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true

    this.taxSchemeService.getalltaxschemes().subscribe(
      data => {
        this.taxSchemeModelService.savedData = data.rows
        this.taxSchemeModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting  tax Schemes list')
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.taxSchemeModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.taxSchemeModelService.sortData(sort)
  }

  /** Deletes item template */
  deleteTaxScheme(ITEM_TAX_SCHEME: number | string): void {
    this.taxSchemeService.deletetaxscheme(ITEM_TAX_SCHEME).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Tax scheme deleted successfully');
        this.fetchData();
      },
      error => this.ui.createMessage('error', 'Error while deleting tax scheme')
    );
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.taxSchemeModelService.searchName(this.searchValue);
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.taxSchemeModelService.searchName(this.searchValue);
  }


}
