import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  addTransaction(formData:any): Observable<any> {
    return this.http.post(`/transItemsD/inserttransactionsItemsD`,formData)
  }

  updateItemBalance(formData): Observable<any> {
    return this.http.post('/items/itemBalance/insertNewItemBalance',formData)
  }

  approveOpenBalance(formdata):Observable<any>{
    return this.http.post(`/confirm/confirmBusinessRequest`,formdata)
  }

}
