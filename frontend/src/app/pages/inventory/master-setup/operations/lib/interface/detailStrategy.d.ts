import { Component } from "@angular/core";
import { Observable } from "rxjs";

export interface DetailStrategyInterface{
    primaryKey:string;

    formComponent:any;

    addDetail(formData:any,MASTER_ID:string):Observable<any>;

    updateDetail(ITEMS_ID:string,formData:any,MASTER_ID:string):Observable<any>;

    deleteDetail(primaryKey:string):Observable<any>;

    getDetails(ITEMS_ID:string):Observable<any>;

    addDetailApi(body:any):Observable<any>;

    updateDetailApi(DETAILS_ID: string, body: any): Observable<any>;

    getDetailApi(ITEMS_ID: string): Observable<any>;

    deleteDetailApi(DETAILS_ID: string): Observable<any>
}