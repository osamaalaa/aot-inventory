import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
const MAX_AGE = 120000;
@Injectable()   
export class RequestService{
    cache = {};

    constructor(private http:HttpClient){}

    fetch(url:string, disableCache=false,queryParams):Observable<any>{
        if(!disableCache && this.cache.hasOwnProperty(url)){
            let isExpired:boolean = this.cache[url].expires < Date.now();
            if(isExpired){
                return this.http.get(url).pipe(mergeMap(data=>{
                    this.cache[url].data = data;
                    this.cache[url].expires = Date.now() + MAX_AGE;
                    return of(this.cache[url].data)
                }))
            }else{
                return of(this.cache[url].data)
            }
        }else{
            return this.http.get(url,{params:queryParams}).pipe(mergeMap(data=>{
                this.cache[url] = {}
                this.cache[url].data = data;
                this.cache[url].expires = Date.now() + MAX_AGE;
                return of(this.cache[url].data)
            }))
        }
    }
}