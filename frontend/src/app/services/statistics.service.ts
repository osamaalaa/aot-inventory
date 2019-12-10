import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { of } from 'rxjs'

@Injectable()
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getItemLastTranactionDate(ITEMS_ID: any): Observable<any> {
    return this.http.get(`/statistics/getItemLastTranactionDate/` + ITEMS_ID)
  }

  getlastFiveTransactions(): Observable<any> {
    return this.http.get(`/statistics/getlastFiveTransactions/` )
  }

  getItemSuppliers(): Observable<any> {
    return this.http.get(`/statistics/getitemSuppliers/` )
  }

  getTotalBalance(ITEMS_ID: any): Observable<any> {
    return this.http.get(`/statistics/getTotalBalance/` + ITEMS_ID)
  }

  getTopFiveSuppliers(ITEMS_ID: any): Observable<any> {
    return this.http.get(`/statistics/getTopFiveSuppliers/` + ITEMS_ID)
  }

  getTotalNoOfTransactionInLastWeek(ITEMS_ID: any): Observable<any> {
    return this.http.get(`/statistics/getTotalNoOfTransactionInLastWeek/` + ITEMS_ID)
  }

  getTotalNoOfTransactionInLastMonth(ITEMS_ID: any): Observable<any> {
    return this.http.get(`/statistics/getTotalNoOfTransactionInLastMonth/` + ITEMS_ID)
  }

  getTotalNoOfTransactionInLastYear(ITEMS_ID: any): Observable<any> {
    return this.http.get(`/statistics/getTotalNoOfTransactionInLastYear/` + ITEMS_ID)
  }

  getMonthlyTransactionsOfCurrentYear(ITEMS_ID: any): Observable<any> {
    return this.http.get(`/statistics/getMonthlyTransactionsOfCurrentYear/` + ITEMS_ID)
  }

  getTransactionsNoInLastDay(CREATED_BY: any): Observable<any> {
    return this.http.get(`/statistics/getTransactionsNoInLastDay/` + CREATED_BY)
  }

  getTransactionsNoInLastWeek(CREATED_BY: any): Observable<any> {
    return this.http.get(`/statistics/getTransactionsNoInLastWeek/` + CREATED_BY)
  }

  getTransactionsNoInLastMonth(CREATED_BY: any): Observable<any> {
    return this.http.get(`/statistics/getTransactionsNoInLastMonth/` + CREATED_BY)
  }

  getLastTransactionDateByUser(CREATED_BY: any): Observable<any> {
    return this.http.get(`/statistics/getLastTransactionDateByUser/` + CREATED_BY)
  }

  getTopFiveItemsTransLastDay(): Observable<any> {
    return this.http.get(`/getTopFiveItemsTransLastDay/`)
  }

  getTopFiveItemsTransLastWeek(): Observable<any> {
    return this.http.get(`/statistics/getTopFiveItemsTransLastWeek/`)
  }

  getTopFiveItemsTransLastMonth(): Observable<any> {
    return this.http.get(`/statistics/getTopFiveItemsTransLastMonth/`)
  }

  getTopFiveUsersTransLastDay(): Observable<any> {
    return this.http.get(`/statistics/getTopFiveUsersTransLastDay/`)
  }

  getTopFiveUsersTransLastWeek(): Observable<any> {
    return this.http.get(`/statistics/getTopFiveUsersTransLastWeek/`)
  }

  getTopFiveUsersTransLastMonth(): Observable<any> {
    return this.http.get(`/statistics/getTopFiveUsersTransLastMonth/`)
  }

  getTopFiveStoreHouses(): Observable<any> {
    return this.http.get(`/statistics/getTopFiveStoreHouses/`)
  }
}

