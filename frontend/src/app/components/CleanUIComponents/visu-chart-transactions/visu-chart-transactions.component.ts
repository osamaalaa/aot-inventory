import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { UIService } from 'src/app/services/ui.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-visu-chart-transactions',
  templateUrl: './visu-chart-transactions.component.html',
  styleUrls: ['./visu-chart-transactions.component.scss']
})
export class VisuChartTransactionsComponent implements OnInit {
  constructor(   private ui: UIService, private statisticsService: StatisticsService  ) {
    
  }
  
  isDataLoading: boolean = false
  
    transactions_Ids = []
    transactions_Dates = []
    // constructor() { }
    chart ;
    private randomColor: Function;
    colors_Transactions = []
  
  
    ngOnInit() {
      this.fetchGetlastFiveTransactions();
      
    } 
  
  
  
    setChartTransactionsSettings(){
      // transactions
      this.chart = new Chart('canvasTransactions', {
  
        type: 'pie',
        data: {
          // labels == > items_id 
          // data ==> Number OF units  
            labels: this.transactions_Dates,  
            datasets: [{
                data: this.transactions_Ids,
                backgroundColor: this.colors_Transactions,
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
            text: 'Last 5 transactions'
        }
        }
      })
  
  
  
    }

  
  
    fetchGetlastFiveTransactions(): void {
      this.isDataLoading = true
      this.statisticsService.getlastFiveTransactions().subscribe(
        data => {
           this.transactions_Ids = data.rows.map(transaction=>transaction.INV_TRANSACTIONS_ID);
           this.transactions_Dates = data.rows.map(transaction=>transaction.TRANSACTION_DATE);
          this.colors_Transactions=this.transactions_Dates.map(transaction=>this.getRandomColor())
          this.setChartTransactionsSettings();
          this.isDataLoading = false
        },
        error => {
          this.isDataLoading = false
          this.ui.createMessage('error', 'Error while getting last top transactions  ' + error.error.message)
        },
      )
    }
  
  
  
    getRandomColor(){
  
      const color = 'rgba('+ Math.floor(Math.random() * 254) + ',' + Math.floor(Math.random() * 254) +
      ',' + Math.floor(Math.random()*254) + ',0.4)'
      return color;
        
    }
  
  }
  