import { Component, OnInit } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { OperationsService } from 'src/app/services/operations.service'
import { invtransferRModelService } from './inv_transferR.model.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-inv-transferR',
  templateUrl: './inv-transferR.component.html',
  providers: [invtransferRModelService],
})
export class InvTransferRComponent implements OnInit {
  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''
  // STORES_ID:string| number;
  /** Table loader */
  isDataLoading: boolean = false
  constructor(
    private operationsService: OperationsService,
    public invtransferRModelService: invtransferRModelService,
    private ui: UIService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}
  isCustodyTransfer
  ngOnInit() {
    // this.fetchstoreid();
    this.fetchData()
    this.onLangugateChange()
    this.fetchCurrentLanguage();
    this.route
    .data
    .subscribe(v => {
      this.isCustodyTransfer = v.isTransferCustody;
    });
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  // fetchstoreid():void{
  //   this.STORES_ID = this.route.snapshot.params['STORES_ID']
  // }
  fetchData(): void {
    this.isDataLoading = true

    this.operationsService.getinvTransferR(null).subscribe(
      data => {
        this.invtransferRModelService.savedData = data.rows
        this.invtransferRModelService.displayData = data.rows
        this.isDataLoading = false

        console.log(data.rows)
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Store list : ' + error.error.message)
      },
    )
  }
  searchItems(): void {
    this.invtransferRModelService.searchinvtransferR(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.invtransferRModelService.sortData(sort)
  }
  /** Deletes inv transfer */
  // delteInvTransfer(INV_TRANSFER_R_ID: number | string): void {
  //   this.operationsService.deleteInvTransferR(INV_TRANSFER_R_ID).subscribe(
  //     data => {
  //       this.ui.createMessage('success', 'Inv Store deleted successfully')
  //       this.fetchData()
  //     },
  //     error => {
  //       this.ui.createMessage('error', 'Error while deleting store ')
  //     }
  //   )
  // }
  /**Search English name and filter from the table*/
  searchName(): void {
    this.invtransferRModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.invtransferRModelService.searchName(this.searchValue)
  }
}
