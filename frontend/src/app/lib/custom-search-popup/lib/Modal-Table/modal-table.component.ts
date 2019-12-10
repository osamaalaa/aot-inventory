import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TableHeader } from '../../entities/interface/Table-header';
import { RequestService } from '../../request.service'
import { SearchModalService } from '../../search-modal/search-modal.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'
@Component({
    selector:'modal-table',
    templateUrl:'./modal-table.component.html',
    styles:[`
        .background-selected{
            background-color: #f2f4f8 ;
        }
    `]
})
export class ModalTableComponent {

    /** Language support */
    lang:string = 'en';

    /** Table Headers */
    @Input() headers:TableHeader[]= [];

    /** Api to fetch the table data */
    @Input() apiPath:string;


    /** Api to fetch the table data */
    @Input() queryParams:any;

    /** Filter function used to filter data */
    @Input() filterFunction:Function;

    /**
     * *Every table has a primary key that is unique. Client using this
     * *table will provide this key so that operations can be performed
     */
    @Input() primaryKeyName:string;

    /** User can select multiple rows */
    @Input() multiselect:boolean = false;

    /** Selected row data is emitted when user selects/unselects a row */
    @Output() onSelectedRowsData = new EventEmitter();

    /** Selected row ids(primaryKey) is emitted when user selects/unselects a row */
    @Output() onSelectedRowsIds = new EventEmitter();

    /** Only used for display purposes. Used maily to store filtered list from Original List*/
    displayTableData:any = [];

    /** Original List. */
    savedTableData:any = [];

    /** Selected rows ids(primaryKey) is stored in this variable */
    selectedRowsIds:any[] = [];

    /**Selected rows data is stored in this variable */
    selectedRowsData:Object[] = [];

    /** Subscription to listen to change in filter */
    subscription$:Subscription;



    constructor(
        private requestService:RequestService,
        private searchModalService:SearchModalService,
        private translate: TranslateService
    ){}

    ngOnInit(){
       this.fetchDataList();
       this.listenForFilterChange();
       this.onLangugateChange();
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


    /**
     * * When user submits the form , the formdata/filter is subscribed.
     * * Based on this filter the data for table is filtered by
     * * using the filterfuntion provided by the client
     */
    listenForFilterChange(){
        this.subscription$ = this.searchModalService.filterChanged$.subscribe(filter=>{
            this.displayTableData = this.filterFunction(this.savedTableData,filter);
        })

    }

    /**
     * * Client provided api is used to fetch the data to display in the table
     */
    private fetchDataList(){
        this.requestService.fetch(this.apiPath,true,this.queryParams).subscribe(data=>{
            this.displayTableData = data['rows'];
            this.savedTableData = data['rows'];
        })
    }

    public refreshTable(){
        this.fetchDataList()
    }



    /**
     * * Called when row is clicked in the table . If this data is already present
     * * then it is removed. If not then it is added
     * @param data : Table row data
     */
    whenSelected(data:Object){
        let selectedId = data[this.primaryKeyName];
        let isAlreadySelected:boolean = this.selectedRowsIds.indexOf(selectedId) > -1;
        if(this.multiselect){
            if(isAlreadySelected){
                let index = this.selectedRowsIds.indexOf(selectedId);
                this.selectedRowsIds.splice(index,1);
                this.selectedRowsData = this.selectedRowsData.filter(item=>item[this.primaryKeyName]!=selectedId)
            }else{
                this.selectedRowsData.push(data);
                this.selectedRowsIds.push(selectedId);
            }
        }else{
            if(isAlreadySelected){
                this.selectedRowsData = [];
                this.selectedRowsIds = [];
            }else{
                this.selectedRowsData = [data]
                this.selectedRowsIds = [selectedId]
            }
        }

        this.onSelectedRowsData.emit(this.selectedRowsData);
        this.onSelectedRowsIds.emit(this.selectedRowsIds);
    }
}
