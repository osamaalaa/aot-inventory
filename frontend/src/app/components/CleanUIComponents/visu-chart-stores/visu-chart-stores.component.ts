import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { StatisticsService } from 'src/app/services/statistics.service'

@Component({
  selector: 'app-visu-chart-stores',
  templateUrl: './visu-chart-stores.component.html',
  styleUrls: ['./visu-chart-stores.component.scss']
})

export class VisuChartStoresComponent implements OnInit {

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
  colors = []
  colors_Stores = []
  colors_Transactions = []
  colors_Suppliers = []


  ngOnInit() {
    this.fetchTopStoresData();
    
  } 


  setChartStoresSettings(){
    // items stats
    this.chart = new Chart('canvasStores', {

      type: 'pie',
      data: {
        // labels == > items_id 
        // data ==> Number OF units  
          labels: this.store_Ids,  
          datasets: [{
              // label: '# of Votes',
              data: this.stores_No,
              //  backgroundColor : getRandomColor 
              backgroundColor: this.colors_Stores,
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
          text: 'Top 5 Stores'
      }
      }
    })

    // top 5 stores


  }


  fetchTopStoresData(): void {
    this.isDataLoading = true
    this.statisticsService.getTopFiveStoreHouses().subscribe(
      data => {
         this.store_Ids = data.rows.map(items=>items.STORE_ID);
         this.stores_No = data.rows.map(items=>items.STORE_NO);
        this.colors_Stores=this.stores_No.map(item=>this.getRandomColor())
        this.setChartStoresSettings();
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting top stores  ' + error.error.message)
      },
    )
  }


  getRandomColor(){

    const color = 'rgba('+ Math.floor(Math.random() * 254) + ',' + Math.floor(Math.random() * 254) +
    ',' + Math.floor(Math.random()*254) + ',0.4)'
    return color;
      
  }

}
