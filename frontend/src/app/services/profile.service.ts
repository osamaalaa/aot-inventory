import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { of } from 'rxjs'

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(userID: any): Observable<any> {
    return this.http.get(`/userRole/getUserProfile/` + userID)
  }

  getUserImage(userID: any): Observable<any> {
    return this.http.get(`/userRole/getUserPic/` + userID + '/png')
  }

}
