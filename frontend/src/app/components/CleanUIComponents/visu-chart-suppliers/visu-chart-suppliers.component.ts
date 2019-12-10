import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ItemsService } from 'src/app/services/items.service';
import { UIService } from 'src/app/services/ui.service';
import { StatisticsService } from 'src/app/services/statistics.service'

@Component({
  selector: 'app-visu-chart-suppliers',
  templateUrl: './visu-chart-suppliers.component.html',
  styleUrls: ['./visu-chart-suppliers.component.scss']
})

export class VisuChartSuppliersComponent implements OnInit {

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
    this.fetchGetItemSuppliers();
    
  } 

  setChartItemSuppliersSettings(){
    // transactions
    this.chart = new Chart('canvasSuppliers', {

      type: 'doughnut',
      data: {
        // labels == > items_id 
        // data ==> Number OF units  
          labels: this.suppliers_Ids,  
          datasets: [{
              data: this.suppliers_Item_Costs,
              backgroundColor: this.colors_Suppliers,
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
				legend: {
          position: 'top',
          display: false,
          
        },
        rotation:-1*Math.PI ,
        circumference:1*Math.PI ,
        
        animation: {
					animateScale: true,
					animateRotate: true
        },
        title: {
          display: true,
          position: 'bottom',
          padding: -20,
          text: this.suppliers_all_Costs.toString() 
      }     
    }
    })



  }


  fetchGetItemSuppliers(): void {
    this.isDataLoading = true
    this.statisticsService.getItemSuppliers().subscribe(
      data => {
         this.suppliers_Ids = data.suppliers.map(item=>item.ITEMS_SUPPLIERS_ID);
         this.suppliers_Item_Costs = data.suppliers.map(item=>item.ITEM_COST);
         this.suppliers_all_Costs = data.allcosts.map(allcosts=>allcosts.COSTS_OF_ITEM);
        this.colors_Suppliers=this.suppliers_Item_Costs.map(transaction=>this.getRandomColor())
        this.setChartItemSuppliersSettings();
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Item suppliers ' + error.error.message)
      },
    )
  }

  getRandomColor(){

    const color = 'rgba('+ Math.floor(Math.random() * 254) + ',' + Math.floor(Math.random() * 254) +
    ',' + Math.floor(Math.random()*254) + ',0.4)'
    return color;
      
  }

}
