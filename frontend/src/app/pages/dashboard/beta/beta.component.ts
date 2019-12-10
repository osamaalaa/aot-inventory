import { Component, OnInit } from '@angular/core'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import { StatisticsService } from '../../../services/statistics.service';
import { UIService } from '../../../services/ui.service';

declare var require: any
const data: any = require('./data.json')


@Component({
  selector: 'app-dashboard-alpha',
  templateUrl: './beta.component.html',
})
export class DashboardBetaComponent implements OnInit {
  taskTableData = data.taskTableData

  databaseData = data.databaseTable
  displayDatabaseData = [...this.databaseData]
  sortNameDatabase = null
  sortValueDatabase = null
  userDate: any = JSON.parse(localStorage.getItem('user'))
  allChecked = false
  indeterminate = false
  transDay: any = 0
  transMonth: any = 0
  transWeek: any = 0
  ldate: any = 'never create'
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
  mode = 'month'

  constructor(private statistics: StatisticsService,
    private ui: UIService) {

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

  ngOnInit() { }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394
    }
    return null
  }

  getStatisticsDate() {
    this.statistics.getTransactionsNoInLastDay(this.userDate.USER_ID).subscribe(trans => { this.transDay = trans.rows[0].Transactions_Number }
      , error => { this.ui.createMessage('error', 'error while getting No of Transactions Per Day ' + error.message) })

    this.statistics.getTransactionsNoInLastWeek(this.userDate.USER_ID).subscribe(trans => { this.transWeek = trans.rows[0].Transactions_Number }
      , error => { this.ui.createMessage('error', 'error while getting No of Transactions Per Week ' + error.message) })

    this.statistics.getTransactionsNoInLastMonth(this.userDate.USER_ID).subscribe(trans => { this.transMonth = trans.rows[0].Transactions_Number }
      , error => { this.ui.createMessage('error', 'error while getting No of Transactions Per Month ' + error.message) })

    this.statistics.getTransactionsNoInLastMonth(this.userDate.USER_ID).subscribe(trans => {
      this.ldate = trans.rows[0].Last_Transaction_date

      if (this.ldate === null || this.ldate === undefined) {
        this.ldate = 'never create'
      }
    }
      , error => {
        this.ui.createMessage('error', 'error while getting last transaction date ' + error.message)
      })
  }

}
