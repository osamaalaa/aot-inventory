import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { StatisticsService } from 'src/app/services/statistics.service'

@Component({
  selector: 'app-visu-chart',
  templateUrl: './visu-chart.component.html',
  styleUrls: ['./visu-chart.component.scss']
})

export class VisuChartComponent implements OnInit {

constructor(private itemsService: ItemsService,    private ui: UIService, private statisticsService: StatisticsService  ) {
    
}

isDataLoading: boolean = false

  items_Ids = []
  items_Number_Of_Units = []
  store_Ids = []
  stores_No = []
  transactions_Ids = []
  transactions_Dates = []
  suppliers_Ids = []
  suppliers_Item_Costs = []
  suppliers_all_Costs = 0
  // constructor() { }
  chart ;
  private randomColor: Function;
  colors = []
  colors_Stores = []
  colors_Transactions = []
  colors_Suppliers = []


  ngOnInit() {
    this.fetchItemsData();
    
  } 

  setChartItemsSettings(){
    // items stats
    this.chart = new Chart('canvas', {

      type: 'doughnut',
      data: {
        // labels == > items_id 
        // data ==> Number OF units  
          labels: this.items_Ids,  
          datasets: [{
              // label: '# of Votes',
              data: this.items_Number_Of_Units,
              //  backgroundColor : getRandomColor 
              backgroundColor: this.colors,
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
				legend: {
          position: 'top',
          display: false
        },
        animation: {
					animateScale: true,
					animateRotate: true
				},
        title: {
          display: true,
          text: 'Items statistics'
      }
      }
    })

  }



  // setChartTransactionsSettings(){
  //   // transactions
  //   this.chart = new Chart('canvasTransactions', {

  //     type: 'pie',
  //     data: {
  //       // labels == > items_id 
  //       // data ==> Number OF units  
  //         labels: this.transactions_Dates,  
  //         datasets: [{
  //             data: this.transactions_Ids,
  //             backgroundColor: this.colors_Transactions,
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //       responsive: true,
	// 			legend: {
  //         position: 'top',
  //         display: false
  //       },
  //       animation: {
	// 				animateScale: true,
	// 				animateRotate: true
	// 			},
  //       title: {
  //         display: true,
  //         text: 'Last 5 transactions'
  //     }
  //     }
  //   })



  // }


  fetchItemsData(): void {
    this.isDataLoading = true
    this.itemsService.getallitems().subscribe(
      data => {
         this.items_Ids = data.rows.map(items=>items.ITEMS_ID);
         this.items_Number_Of_Units = data.rows.map(items=>items.NUMBER_OF_UNITS);
        this.colors=this.items_Number_Of_Units.map(item=>this.getRandomColor())
        this.setChartItemsSettings();
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting items  ' + error.error.message)
      },
    )
  }


  // fetchGetlastFiveTransactions(): void {
  //   this.isDataLoading = true
  //   this.statisticsService.getlastFiveTransactions().subscribe(
  //     data => {
  //        this.transactions_Ids = data.rows.map(transaction=>transaction.INV_TRANSACTIONS_ID);
  //        this.transactions_Dates = data.rows.map(transaction=>transaction.TRANSACTION_DATE);
  //       this.colors_Transactions=this.transactions_Dates.map(transaction=>this.getRandomColor())
  //       this.setChartTransactionsSettings();
  //       this.isDataLoading = false
  //     },
  //     error => {
  //       this.isDataLoading = false
  //       this.ui.createMessage('error', 'Error while getting last top transactions  ' + error.error.message)
  //     },
  //   )
  // }



  getRandomColor(){

    const color = 'rgba('+ Math.floor(Math.random() * 254) + ',' + Math.floor(Math.random() * 254) +
    ',' + Math.floor(Math.random()*254) + ',0.4)'
    return color;
      
  }

}
