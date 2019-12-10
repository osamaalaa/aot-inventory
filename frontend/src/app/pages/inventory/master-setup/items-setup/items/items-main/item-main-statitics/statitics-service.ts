import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Injectable } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

export abstract class ChartService {

    public abstract chartOptions: ChartOptions;

    public abstract chartLabels: Label[];

    public abstract chartType: ChartType;

    public abstract chartPlugins: any[];

    public abstract chartData: ChartDataSets[];

    public abstract getChartData(): void;

    public abstract isLoading: boolean;

}

@Injectable()
export class SupplierStatitics extends ChartService {
    public chartOptions: ChartOptions = {
        responsive: true,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Supplier Code'
                }
            }], yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Cost'
                }
            }]
        },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        },
        title: {
            display: true,
            text: 'Supplier Statitics'
        }
    };
    public chartLabels: Label[];
    public chartType: ChartType = "bar";
    public chartPlugins: any[];
    public chartData: ChartDataSets[] = [];
    public isLoading: boolean;

    constructor(
        private itemsService: ItemsService
    ) {
        super();
    }



    public getChartData(): void {
        this.isLoading = true;
        this.itemsService.getSupplierStatitics().pipe(
            flatMap(data => {
                this.isLoading = false;
                this.chartData = [{
                    data: data['suppliers'].map(item => item.ITEM_COST),
                    label: data['suppliers'].map(item => item.SUPPLIER_ITEM_CODE)
                }, {
                    data: data['suppliers'].map(item => data['allcosts'][0].COSTS_OF_ITEM),
                    label: "Total Cost"
                }]
                this.chartLabels = data['suppliers'].map(item => item.SUPPLIER_ITEM_CODE)
                return of(data);
            })
        ).subscribe();
    }


}