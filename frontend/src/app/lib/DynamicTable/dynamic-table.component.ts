import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColumnDef } from './interfaces/ColumnDef';
import { DynmaicTableModelService } from './dynamic-table.model.service';
import { DEFAULT_PAGE_SIZE } from './dynamic-table.constants';
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: "dynamic-table",
    templateUrl: "./dynamic-table.component.html",
    styleUrls: ['./dynamic-table.component.scss'],
    providers: [DynmaicTableModelService]
})
export class DynamicTableComponent {

    /** Language support */
    lang: string = 'en';

    /** Table Columns */
    @Input() columnDefs: ColumnDef[] = [];

    /** Api to fetch the table data */
    @Input() apiPath: string;

    @Input() data: any[] = [];

    /** Filter function used to filter data */
    @Input() filterFunction: Function;

    @Input() actionTemRef: TemplateRef<any>;

    @Input() disableAction: boolean;

    @Input() nzShowPagination: boolean;

    @Input() nzShowSizeChanger: boolean;

    @Input() nzSize: 'small' | 'medium' | 'defalut';

    @Input() nzTitle: string | TemplateRef<any>;

    @Input() nzFooter: string | TemplateRef<any>;

    @Input() nzScroll: boolean;

    @Input() nzPageSize: number = DEFAULT_PAGE_SIZE;

    @Input() nzShowCheckbox: boolean;

    /**
     * *Every table has a primary key that is unique. Client using this
     * *table will provide this key so that operations can be performed
     */
    @Input() primaryKeyName: string;

    @Input() nzBordered: boolean;


    mapOfCheckedId: { [key: string]: boolean } = {};


    _searchText: string;
    @Input() set searchText(txt: string) {
        this.model.searchName(txt, this.getCurrentColumnKeys());
        this.refreshCheckboxStatus()
        this._searchText = txt;
    }


    @Output() onRowClick = new EventEmitter();

    @Output() onRowCheckboxClick = new EventEmitter<string[]>();

    get searchText() {
        return this._searchText
    }

    constructor(
        private http: HttpClient,
        public model: DynmaicTableModelService,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.fetchDataList();
        this.onLangugateChange();
        this.fetchCurrentLanguage()
    }

    onLangugateChange() {
        this.translate.onLangChange.subscribe(lang => {
            this.lang = lang.lang
        })
    }

    fetchCurrentLanguage() {

        this.lang = this.translate.currentLang
    }

    /* Client provided api is used to fetch the data to display in the table */
    private fetchDataList() {
        if (this.data.length) {
            this.saveDataInModel(this.data);
        } else {
            this.setTableLoader();
            this.http.get(this.apiPath).subscribe(
                data => {
                    this.saveDataInModel(data['rows']);
                    this.stopTableLoader();
                },
                error => {
                    this.stopTableLoader();
                })
        }
    }

    public refreshTable() {
        this.fetchDataList();
    }

    isAllDisplayDataChecked: boolean;
    isIndeterminate: boolean;
    refreshCheckboxStatus(): void {
        this.isAllDisplayDataChecked =
            this.model
                .displayTableData.length > 0 &&
            this.model
                .displayTableData
                .every(item => this.mapOfCheckedId[item[this.primaryKeyName]]);

        this.isIndeterminate =
            this.model
                .displayTableData
                .some(item => this.mapOfCheckedId[item[this.primaryKeyName]]) &&
            !this.isAllDisplayDataChecked;
    }

    checkAll(value: boolean): void {
        this.model.displayTableData.forEach(item => (this.mapOfCheckedId[item[this.primaryKeyName]] = value));
        this.refreshCheckboxStatus();
        this.emitSelection();
    }




    /**Sorts Table data */
    onSortChange(sort: { key: string; value: string }): void {
        console.log(sort)
        let comparator: Function | null = this.getComparator(sort.key);
        this.model.sortData(sort, comparator)
    }

    private getComparator(ColumnName: string): Function | null {
        for (let col = 0; col < this.columnDefs.length; col++) {
            let colName: ColumnDef = this.columnDefs[col];
            if (colName.name.ar_name == ColumnName || colName.name.en_name == ColumnName) {
                return colName.comparator;
            }
        }
    }

    /** Data Loading */
    isLoading: boolean = false;
    private setTableLoader(): void {
        this.isLoading = true;
    }

    private stopTableLoader(): void {
        this.isLoading = false;
    }

    private saveDataInModel(data: any[]): void {
        this.model.displayTableData = data;
        this.model.savedTableData = data;
    }

    rowClick(e: any): void {
        this.onRowClick.emit(e)
    }

    private getCurrentColumnKeys(): string[] {
        let columnKeys: string[] = [];
        if (this.lang == 'en') {
            this.columnDefs.forEach((col: ColumnDef) => {
                columnKeys.push(col.name.en_name);
            })
        } else {
            this.columnDefs.forEach((col: ColumnDef) => {
                columnKeys.push(col.name.ar_name);
            })
        }
        return columnKeys;
    }

    public rowCheckboxClick() {
        this.refreshCheckboxStatus();
        this.emitSelection();
    }


    emitSelection() {
        let selected: string[] = []
        for (var key in this.mapOfCheckedId) {
            if (this.mapOfCheckedId[key]) {
                selected.push(key)
            }
        }
        this.onRowCheckboxClick.emit(selected);
    }
}
