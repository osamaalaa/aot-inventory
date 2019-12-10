import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { GeneralSetupService } from 'src/app/services/general-setup.service';
import { SupplierModelService } from './supplier.model.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  providers: [SupplierModelService]
})
export class SupplierComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = '';

  searchValue = '';

  SUPPLIER_ID: string | number;

  lang: any


  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private generalSetupService: GeneralSetupService,
    public supplierModelService: SupplierModelService,
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
    this.SUPPLIER_ID = this.route.snapshot.params['SUPPLIER_ID'];
  }



  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.generalSetupService.getSupplierall().subscribe(
      data => {
        this.supplierModelService.savedData = data.rows

        this.supplierModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Store item list : ' + error.error.message)
      },
    )
  }


  /** Search Supplier against search text*/
  searchItems(): void {
    this.supplierModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.supplierModelService.sortData(sort)
  }

  /** Deletes Supplier */
  deleteSupplier(SUPPLIER_ID: number | string): void {
    this.generalSetupService.deleteSupplier(SUPPLIER_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Supplier deleted successfully')
        this.fetchData()
      },
      error => this.ui.createMessage('error', 'Error while deleting Supplier'),
    )
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.supplierModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.supplierModelService.searchName(this.searchValue)
  }


}

