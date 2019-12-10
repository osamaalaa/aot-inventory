import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DynamicTableService{
    constructor(private http:HttpClient){

    }

    fetch(apiPath){
        return this.http.get(apiPath)
    }
}