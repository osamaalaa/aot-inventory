import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ItemsService } from 'src/app/services/items.service';
import { forkJoin } from 'rxjs';
import { SupplierStatitics } from './statitics-service';

@Component({
  selector: 'app-item-main-statitics',
  templateUrl: './item-main-statitics.component.html',
  styleUrls: ['./item-main-statitics.component.scss'],
  providers:[SupplierStatitics]
})
export class ItemMainStatiticsComponent implements OnInit {

  constructor(
    public supplierStatitics:SupplierStatitics
  ) { }

  ngOnInit() {
    this.supplierStatitics.getChartData()
  }


}
