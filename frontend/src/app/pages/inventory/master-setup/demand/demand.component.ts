import { Component, OnInit } from '@angular/core'
import { DemandModelService } from './demand.model.service'
import { ItemsService } from 'src/app/services/items.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss'],
  providers: [DemandModelService],
})
export class DemandComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {}

  searchText = ''

  searchValue = ''

  lang: any

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private itemsService: ItemsService,
    public demandModelService: DemandModelService,
    private ui: UIService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.fetchData()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  onLangugateChange(){
    this.translate.onLangChange.subscribe(lang=>{
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {

    this.lang = this.translate.currentLang
  }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    this.itemsService.getDemandData().subscribe(
      data => {
        this.demandModelService.savedData = data.rows
        this.demandModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Item Balance units')
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.demandModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.demandModelService.sortData(sort)
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.demandModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.demandModelService.searchName(this.searchValue)
  }
}
