/**
 * @author : Renil Babu
 * @date : 1st July 2019
 * @courtesy : https://github.com/gothinkster/angular-realworld-example-app
 */
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import { Observable  } from 'rxjs';


import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.INVENTORY_API_URL}${path}`, { params })
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.INVENTORY_API_URL}${path}`,
      JSON.stringify(body)
    )
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.INVENTORY_API_URL}${path}`,
      JSON.stringify(body)
    )
  }

  delete(path:string): Observable<any> {
    return this.http.delete(
      `${environment.INVENTORY_API_URL}${path}`
    )
  }
}
