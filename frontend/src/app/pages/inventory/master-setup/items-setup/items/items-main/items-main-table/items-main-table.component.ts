import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AliasClass } from './item-alias.service'
import { DynamicTableComponent } from 'src/app/lib/DynamicTable/dynamic-table.component';
import { ComponentService } from './item-components.service';
import { ItemsUnitsService } from './item-units.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
    selector: "item-main-table",
    template: `
    <div nz-row [nzGutter]="8">
    <div nz-col [nzSpan]="6" *ngFor="let config of tableConfig | keyvalue">
      <dynamic-table #dynamicTable nzPageSize="10" [nzShowPagination]="true" [nzFooter]="footer" [nzTitle]="config.value.label" [nzSize]="'small'" 
        [disableAction]="true" (onRowClick)="onRowClick(dynamicTable,config.value.id,$event)" [columnDefs]="config.value.columns" [apiPath]="config.value.apiPath">
      </dynamic-table>
      <ng-template #footer>
        <button nz-button (click)="onTableButtonClick(dynamicTable,config.value.id)" nzType="primary" [nzSize]="'small'" nzShape="circle">
          <i nz-icon nzType="plus" nzTheme="outline"></i>
        </button>
      </ng-template>
    </div>
  </div>
    `,
    providers: [
        AliasClass,
        ComponentService,
        ItemsUnitsService
    ]
})
export class ItemMainTableComponent implements OnInit {
    tableConfig: any;
    ITEMS_ID: string | number;

    constructor(
        private route: ActivatedRoute,
        private aliasClass: AliasClass,
        private componentService: ComponentService,
        private itemsUnitsService: ItemsUnitsService,
        private ui: UIService
    ) {
        this.getItemId();
    }


    ngOnInit() {
        this.getTableConfigs();
        this.aliasClass.ITEMS_ID = this.ITEMS_ID;
        this.componentService.ITEMS_ID = this.ITEMS_ID;
        this.itemsUnitsService.ITEMS_ID = this.ITEMS_ID;
    }

    onTableButtonClick(dynamicTableRef: DynamicTableComponent, type: string) {
        switch (type) {
            case "alias": this.aliasClass.add().subscribe(data => {
                if (data) {
                    dynamicTableRef.refreshTable()
                }
            }, error => {
                this.ui.createMessage("error", error && error.error ? error.error.message : '')
            })
                break;
            case "component": this.componentService.add().subscribe(data => {
                if (data) {
                    dynamicTableRef.refreshTable()
                }
            }, error => {
                this.ui.createMessage("error", error && error.error ? error.error.message : '')
            })
                break;
            case "unit": this.itemsUnitsService.add().subscribe(data => {
                if (data) {
                    dynamicTableRef.refreshTable()
                }
            }, error => {
                this.ui.createMessage("error", error && error.error ? error.error.message : '')
            })
                break;

        }
    }
    onRowClick(dynamicTableRef: DynamicTableComponent, type: string, formData: any) {
        switch (type) {
            case "alias": this.aliasClass.update(formData).subscribe(data => {
                if (data) {
                    dynamicTableRef.refreshTable()
                }
            }, error => {
                this.ui.createMessage("error", error && error.error ? error.error.message : '')
            })
                break;
            case "component": this.componentService.update(formData).subscribe(data => {
                if (data) {
                    dynamicTableRef.refreshTable()
                }
            }, error => {
                this.ui.createMessage("error", error && error.error ? error.error.message : '')
            })
                break;
            case "unit": this.itemsUnitsService.update(formData).subscribe(data => {
                if (data) {
                    dynamicTableRef.refreshTable()
                }
            }, error => {
                this.ui.createMessage("error", error && error.error ? error.error.message : '')
            })
                break;


        }
    }


    /** Get item item id from route param */
    getItemId(): void {
        this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
    }

    getTableConfigs() {
        let queryParam = `?ITEMS_ID=${this.ITEMS_ID}`
        // return this.http.get(`/items/itemBalance/getAllItemsBalanceUnits${queryParam}`)

        this.tableConfig = {
            "units": {
                id: "unit",
                label: "Units",
                apiPath: `/items/itemsUnits/getallitemUnits${queryParam}`,
                columns: [
                    {
                        label: {
                            en_name: "Unit",
                            ar_name: "اسم الوحدات"
                        },
                        name: {
                            en_name: "UNITS_NAME",
                            ar_name: "UNITS_NAME"
                        },
                        sortable: true
                    },
                    {
                        label: {
                            en_name: "Unit Factor",
                            ar_name: "عامل الوحدة"
                        },
                        name: {
                            en_name: "UNIT_FACTOR",
                            ar_name: "UNIT_FACTOR"
                        },
                        sortable: true
                    }
                ]
            },
            "prices": {
                id: "price",
                label: "Price",
                apiPath: `/items/itemBalance/getAllItemsBalanceUnits${queryParam}`,
                columns: [
                    {
                        label: {
                            en_name: "Units",
                            ar_name: "اسم الوحدات"
                        },
                        name: {
                            en_name: "UNITS_NAME",
                            ar_name: "UNITS_NAME"
                        },
                        sortable: true
                    },
                    {
                        label: {
                            en_name: "Factor",
                            ar_name: "عامل الوحدة"
                        },
                        name: {
                            en_name: "UNIT_FACTOR",
                            ar_name: "UNIT_FACTOR"
                        },
                        sortable: true
                    },
                    {
                        label: {
                            en_name: "Factor",
                            ar_name: "عامل الوحدة"
                        },
                        name: {
                            en_name: "UNIT_FACTOR",
                            ar_name: "UNIT_FACTOR"
                        },
                        sortable: true
                    }
                ]
            },
            "components": {
                id: "component",
                label: "Components",
                apiPath: `/items/itemscomponents/getallitemacomponents${queryParam}`,
                columns: [
                    {
                        label: {
                            en_name: "Quantity",
                            ar_name: "Quantity"
                        },
                        name: {
                            en_name: "QUANTITY",
                            ar_name: "QUANTITY"
                        },
                        sortable: true
                    }
                ]
            },
            "alias": {
                id: "alias",
                label: "Alias",
                apiPath: `/items/itemsaliases/getallitemaliases${queryParam}`,
                columns: [
                    {
                        label: {
                            en_name: "Code",
                            ar_name: "رمز الصنف"
                        },
                        name: {
                            en_name: "ITEM_CODE",
                            ar_name: "ITEM_CODE"
                        },
                        sortable: true
                    }
                ]
            }
        }
    }
}

