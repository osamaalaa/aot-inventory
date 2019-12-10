import { Component } from "@angular/core";
import { Observable } from "rxjs";

export interface ItemStrategyInterface{
    primaryKey:string;

    items:any[];

    formComponent:any;

    addItem(MASTER_ID:string,STORES_ID?:any):Observable<any>;

    updateItem(formData:any,STORES_ID?:any):Observable<any>;

    deleteItem(ITEMS_ID:string):Observable<any>;

    getItems():Observable<any>;

    addItemApi(body:any):Observable<any>;

    updateItemApi(ID:string,body:any):Observable<any>;

    deleteItemApi(ID:string):Observable<any>;
}