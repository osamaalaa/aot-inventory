import { Component, OnInit, Injectable } from '@angular/core'
import { UploadXHRArgs, UploadFile, NzDrawerService } from 'ng-zorro-antd';
import { HttpRequest, HttpResponse, HttpClient, HttpEvent, HttpEventType, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer, of } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';
import { StatisticsService } from '../../../../../../services/statistics.service';
import { ColumnDef } from 'src/app/lib/DynamicTable/interfaces/ColumnDef';
import { DynamicTableComponent } from 'src/app/lib/DynamicTable/dynamic-table.component';
import { BalanceService } from './item-balance.service';
import { ItemMainService } from './items-main.service';

declare var require: any
const data: any = require('./data.json')


@Component({
  selector: 'app-items-main',
  templateUrl: './items-main-new.component.html',
  styleUrls: ['./items-main.component.scss'],
  providers: [BalanceService,ItemMainService]
})
export class ItemsMainComponent implements OnInit {

  columnDefBalance: ColumnDef[] = columns;


  calendarData = data.calendarData

  ITEMS_ID: string | number;

  balanceApiPath;

  constructor(
    private route: ActivatedRoute,
    private ui: UIService,
    private balanceService: BalanceService
  ) {
    this.getItemId();
 
    
    let queryParam = this.ITEMS_ID ? `?ITEMS_ID=${this.ITEMS_ID}` : ''
    this.balanceApiPath = `/items/itemBalance/getAllItemBalance${queryParam}`
    this.balanceService.ITEMS_ID = this.ITEMS_ID;
  }



  addItemBalance(dynamicTableRef: DynamicTableComponent) {
    this.balanceService.add().subscribe(data => {
      if (data) {
        dynamicTableRef.refreshTable();
      }
    },error=>{
      this.ui.createMessage("error",error && error.error ? error.error.message: '')
   })
  }

  updateItemBalance(dynamicTableRef:DynamicTableComponent, formData:any){
    this.balanceService.update(formData).subscribe(data => {
      if (data) {
        dynamicTableRef.refreshTable();
      }
    },error=>{
       this.ui.createMessage("error",error && error.error ? error.error.message: '')
    })
  }




  /** Get item item id from route param */
  getItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }
  ngOnInit() {}


  

}



const columns: ColumnDef[] = [
  {
    label: {
      en_name: "Store Name",
      ar_name: "اسم"
    },
    name: {
      en_name: "STORE_EN_NAME",
      ar_name: "STORE_AR_NAME"
    },
    sortable: true
  },
  {
    label: {
      en_name: "Current Balance",
      ar_name: "الرصيد الحالي"
    },
    name: {
      en_name: "CURRENT_BALANCE",
      ar_name: "CURRENT_BALANCE"
    }
  },
  {
    label: {
      en_name: "Qty On Hand",
      ar_name: "الكمية على اليد"
    },
    name: {
      en_name: "QTY_ON_HAND",
      ar_name: "QTY_ON_HAND"
    }
  }
];



// loadStatisticsData() {
//   this.statistics.getItemLastTranactionDate(this.ITEMS_ID).subscribe(tdate => {
//     this.lastTransDate = tdate.rows[0].Last_Transaction
//     if (this.lastTransDate === null || this.lastTransDate === undefined) {
//       this.lastTransDate = 'Never Used'
//     }
//   }
//     , error => { this.ui.createMessage('error', 'error while getting last transaction date ' + error.message) })

//   this.statistics.getTotalBalance(this.ITEMS_ID).subscribe(balance => { this.itemBalance = balance.rows[0].Total_Balance }
//     , error => { this.ui.createMessage('error', 'error while getting item balance ' + error.message) })

//   this.statistics.getTopFiveSuppliers(this.ITEMS_ID).subscribe(suppliers => { this.top5Suppliers = suppliers.rows }
//     , error => { this.ui.createMessage('error', 'error while getting top 5 suppliers ' + error.message) })

//   this.statistics.getTotalNoOfTransactionInLastWeek(this.ITEMS_ID).subscribe(week => { this.transWeek = week.rows[0].Transactions_in_last_week }
//     , error => { this.ui.createMessage('error', 'error while getting last week no of transactions ' + error.message) })

//   this.statistics.getTotalNoOfTransactionInLastMonth(this.ITEMS_ID).subscribe(month => { this.transMonth = month.rows[0].Transactions_in_last_month }
//     , error => { this.ui.createMessage('error', 'error while getting last month no of transactions ' + error.message) })

//   this.statistics.getTotalNoOfTransactionInLastYear(this.ITEMS_ID).subscribe(year => { this.transYear = year.rows[0].Transactions_in_last_Year }
//     , error => { this.ui.createMessage('error', 'error while getting last year no of transactions ' + error.message) })

//   this.statistics.getMonthlyTransactionsOfCurrentYear(this.ITEMS_ID).subscribe(myear => { this.yearlyst = myear.rows }
//     , error => { this.ui.createMessage('error', 'error while getting last year no of transactions per month' + error.message) })
// }