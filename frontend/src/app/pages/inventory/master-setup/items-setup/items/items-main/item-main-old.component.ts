import { Component, OnInit, Injectable } from '@angular/core'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import { UploadXHRArgs, UploadFile, NzDrawerService } from 'ng-zorro-antd';
import { HttpRequest, HttpResponse, HttpClient, HttpEvent, HttpEventType, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer, of } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';
import { ItemsService } from 'src/app/services/items.service';
import { StatisticsService } from '../../../../../../services/statistics.service';
import { ColumnDef } from 'src/app/lib/DynamicTable/interfaces/ColumnDef';
import { DynamicTableComponent } from 'src/app/lib/DynamicTable/dynamic-table.component';
import { BalanceService } from './item-balance.service';
import { ItemMainService } from './items-main.service';

declare var require: any
const data: any = require('./data.json')


@Component({
  selector: 'app-items-main',
  templateUrl: './items-main-old.component.html',
  styleUrls: ['./items-main.component.scss'],
  providers: [BalanceService,ItemMainService]
})
export class ItemsMainOldComponent implements OnInit {

  columnDefBalance: ColumnDef[] = columns;

  taskTableData = data.taskTableData
  loading = false;
  databaseData = data.databaseTable
  displayDatabaseData = [...this.databaseData]
  sortNameDatabase = null
  sortValueDatabase = null
  name = data.name
  nickname = data.nickname
  photo = data.photo
  get background() {
    return this.fileList.length ? (this.fileList[0].url || this.fileList[0].thumbUrl) : data.background
  }
  post = data.post
  postsCount = data.postsCount
  followersCount = data.followersCount
  lastActivity = data.lastActivity
  status = 'Enabled'
  skills = data.skills
  coursesEnd = data.coursesEnd
  adress = data.adress
  profSkills = data.profSkills
  lastCompanies = data.lastCompanies
  personal = data.personal
  posts = data.posts

  formLayout = 'vertical'

  allChecked = false
  indeterminate = false
  rangeMarks = {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    60: '60',
    70: '70',
    80: '80',
    90: '90',
    100: '100',
  }

  rangeSlider = data.rangeSlider
  weekChartData = data.weekChartData
  weekChartOptions = {
    fullWidth: true,
    showArea: false,
    chartPadding: {
      right: 30,
      left: 0,
    },
    plugins: [
      ChartistTooltip({
        appendToBody: true,
      }),
    ],
  }
  monthChartData = data.monthChartData
  monthChartOptions = {
    seriesBarDistance: 10,
    plugins: [
      ChartistTooltip({
        appendToBody: true,
      }),
    ],
  }

  calendarData = data.calendarData

  date = new Date(2012, 11, 21)
  mode = 'month';

  ITEMS_ID: string | number;

  itemPicture;

  itemData: any

  itemBalance: any = 0
  top5Suppliers: any[] = []
  transWeek: any = 0
  transMonth: any = 0
  transYear: any = 0
  lastTransDate: any = 'Never Used'
  yearlyst: any[] = []
  balanceApiPath;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private route: ActivatedRoute,
    private ui: UIService,
    private itemService: ItemsService,
    private statistics: StatisticsService,
    private balanceService: BalanceService
  ) {
    this.getItemId();
    this.getItemData();
    this.getAllImagesForItem();
    // this.getTableConfigs();
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

  getAllImagesForItem() {
    this.fileList = this.route.snapshot.data['itemImages'].rows
      .filter(img => !/img\/unknown\.png/.test(img))
      .map(img => {
        return {
          uid: img.ITEMS_IMAGES_ID,
          name: img.FILE_NAME,
          url: img.FILE_PATH,
          status: 'done'
        }
      });



  }


  /** Get item item id from route param */
  getItemId(): void {
    this.ITEMS_ID = this.route.snapshot.params['ITEMS_ID'];
  }


  /** Get Edit data from resolver */
  getItemData(): void {
    this.itemData = this.route.snapshot.data['itemData'].rows[0];
  }


  sort(sort: { key: string; value: string }): void {
    this.sortNameDatabase = sort.key
    this.sortNameDatabase = sort.value
    this.search()
  }

  search(): void {
    if (this.sortNameDatabase && this.sortNameDatabase) {
      this.displayDatabaseData = this.databaseData.sort((a, b) =>
        this.sortNameDatabase === 'ascend'
          ? a[this.sortNameDatabase] > b[this.sortNameDatabase]
            ? 1
            : -1
          : b[this.sortNameDatabase] > a[this.sortNameDatabase]
            ? 1
            : -1,
      )
    } else {
      this.displayDatabaseData = this.databaseData
    }
  }

  currentPageDataChange(
    $event: Array<{ name: string; username: number; checked: boolean; disabled: boolean }>,
  ): void {
    this.taskTableData = $event
  }

  refreshStatus(): void {
    const allChecked = this.taskTableData
      .filter(value => !value.disabled)
      .every(value => value.checked === true)
    const allUnChecked = this.taskTableData
      .filter(value => !value.disabled)
      .every(value => !value.checked)
    this.allChecked = allChecked
    this.indeterminate = !allChecked && !allUnChecked
  }

  checkAll(value: boolean): void {
    this.taskTableData.forEach(data => {
      if (!data.disabled) {
        data.checked = value
      }
    })
    this.refreshStatus()
  }

  ngOnInit() {
    this.loadStatisticsData()
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394
    }
    return null
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isImageFile = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'].indexOf(file.type) != -1;
      if (!isImageFile) {
        this.ui.createMessage('error', 'You can only upload Image file!');
        observer.complete();
        return;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.ui.createMessage('error', 'Image must smaller than 10MB!');
        observer.complete();
        return;
      }
      // check height
      /**
       * TODO:Image dimension is not specified
       */
      this.checkImageDimension(file).then(dimensionRes => {
        // if (!dimensionRes) {
        //   this.ui.createMessage('error','Image only 300x300 above');
        //   observer.complete();
        //   return;
        // }
        // observer.next(isImageFile && isLt10M && dimensionRes);
        observer.next(isImageFile && isLt10M);
        observer.complete();
      });
    });
  };

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  previewImage;
  previewVisible = false;
  fileList = []
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };


  uploadImage = (item: UploadXHRArgs) => {
    /**
     * TODO: Implement environment variable
     */
    var url = `http://localhost:9004/itemImage/insertnewImage/${this.ITEMS_ID}/${this.ITEMS_ID}`

    const formData = new FormData();
    formData.append('myfile', item.file as any);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    var http = new HttpClient(this.handler)
    const req = new HttpRequest('POST', url, formData, {
      headers: headers
    });
    return http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          if (event.body['rows'].R_FILE_PATH) {
            this.itemPicture = event.body['rows'].R_FILE_PATH
          }
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        item.onError!(err, item.file!);
      }
    );
  };

  onImageRemoved = (file: UploadFile) => {
    this.ui.createMessage('success', "Removed: But not from database")
  }

  loadStatisticsData() {
    this.statistics.getItemLastTranactionDate(this.ITEMS_ID).subscribe(tdate => {
      this.lastTransDate = tdate.rows[0].Last_Transaction
      if (this.lastTransDate === null || this.lastTransDate === undefined) {
        this.lastTransDate = 'Never Used'
      }
    }
      , error => { this.ui.createMessage('error', 'error while getting last transaction date ' + error.message) })

    this.statistics.getTotalBalance(this.ITEMS_ID).subscribe(balance => { this.itemBalance = balance.rows[0].Total_Balance }
      , error => { this.ui.createMessage('error', 'error while getting item balance ' + error.message) })

    this.statistics.getTopFiveSuppliers(this.ITEMS_ID).subscribe(suppliers => { this.top5Suppliers = suppliers.rows }
      , error => { this.ui.createMessage('error', 'error while getting top 5 suppliers ' + error.message) })

    this.statistics.getTotalNoOfTransactionInLastWeek(this.ITEMS_ID).subscribe(week => { this.transWeek = week.rows[0].Transactions_in_last_week }
      , error => { this.ui.createMessage('error', 'error while getting last week no of transactions ' + error.message) })

    this.statistics.getTotalNoOfTransactionInLastMonth(this.ITEMS_ID).subscribe(month => { this.transMonth = month.rows[0].Transactions_in_last_month }
      , error => { this.ui.createMessage('error', 'error while getting last month no of transactions ' + error.message) })

    this.statistics.getTotalNoOfTransactionInLastYear(this.ITEMS_ID).subscribe(year => { this.transYear = year.rows[0].Transactions_in_last_Year }
      , error => { this.ui.createMessage('error', 'error while getting last year no of transactions ' + error.message) })

    this.statistics.getMonthlyTransactionsOfCurrentYear(this.ITEMS_ID).subscribe(myear => { this.yearlyst = myear.rows }
      , error => { this.ui.createMessage('error', 'error while getting last year no of transactions per month' + error.message) })
  }

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
