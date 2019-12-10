import { Component, OnInit } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { invtransferModelService } from './inv_transfer.model.service'
import { ActivatedRoute } from '@angular/router'
import { OperationsService } from 'src/app/services/operations.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-inv-transfer',
  templateUrl: './inv-transfer.component.html',
  providers: [invtransferModelService],
})
export class InvTransferComponent implements OnInit {
  lang: any

  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''
  // STORES_ID:string| number;
  /** Table loader */
  isDataLoading: boolean = false
  constructor(
    private operationsService: OperationsService,
    public invtransferModelService: invtransferModelService,
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

    this.operationsService.getinvTransfer(null).subscribe(
      data => {
        this.invtransferModelService.savedData = data.rows
        this.invtransferModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Store list : ' + error.error.message)
      },
    )
  }
  searchItems(): void {
    this.invtransferModelService.searchinvtransfer(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.invtransferModelService.sortData(sort)
  }
  /** Deletes inv transfer */
  delteInvTransfer(INV_TRANSFER_ID: number | string): void {
    this.operationsService.deleteInvTransfer(INV_TRANSFER_ID).subscribe(
      data => {
        this.ui.createMessagedelete('success1', 'Inv Store deleted successfully')
        this.fetchData()
      },
      error => {
        this.ui.createMessage('error', 'Error while deleting store ')
      },
    )
  }
  /**Search English name and filter from the table*/
  searchName(): void {
    this.invtransferModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.invtransferModelService.searchName(this.searchValue)
  }
}
