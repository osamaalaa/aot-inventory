import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { TaxSchemeDetailsModelService } from '../tax-scheme-details.model.service';
import { ActivatedRoute } from '@angular/router';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-tax-scheme-details',
  templateUrl: './tax-scheme-details.component.html',
  styleUrls: ['./tax-scheme-details.component.scss'],
  providers: [TaxSchemeDetailsModelService]
})
export class TaxSchemeDetailsComponent implements OnInit {

  TAX_SCHEME_ID: number
  mapOfExpandData: { [key: string]: boolean } = {};

  searchText = '';

  searchValue = '';

  lang: any

  /** Table loader */
  isDataLoading: boolean = false;

  constructor(
    private taxSchemeService: GeneralSetupService,
    public taxSchemeDetailsModelService: TaxSchemeDetailsModelService,
    private ui: UIService,
    private router: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.onLangugateChange()
  }

  onLangugateChange(){
    this.translate.onLangChange.subscribe(lang=>{
      this.lang = lang.lang
    })
  }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.TAX_SCHEME_ID = this.router.paramMap['TAX_SCHEME_ID']
    this.taxSchemeService.getalltaxschemesdetails(this.TAX_SCHEME_ID).subscribe(
      data => {
        this.taxSchemeDetailsModelService.templateData = data.rows
        this.taxSchemeDetailsModelService.displayTemplateData = data.rows
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
    this.taxSchemeDetailsModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.taxSchemeDetailsModelService.sortData(sort)
  }

  /** Deletes item template */
  deleteTaxScheme(DETAILS_TAX_SCHEME:number | string):void{
      this.taxSchemeService.deletetaxschemedetails(DETAILS_TAX_SCHEME).subscribe(
        data=> {
          this.ui.createMessage('success', 'Tax scheme deleted successfully');
          this.fetchData();
        },
        error =>this.ui.createMessage('error', 'Error while deleting tax scheme')
      );
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.taxSchemeDetailsModelService.searchName(this.searchValue);
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.taxSchemeDetailsModelService.searchName(this.searchValue);
  }


}
