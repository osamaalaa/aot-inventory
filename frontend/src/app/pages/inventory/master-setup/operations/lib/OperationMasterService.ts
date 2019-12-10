import { ItemStrategyInterface } from './interface/ItemStrategy';
import { DetailStrategyInterface } from './interface/detailStrategy';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class OperationMasterService{

    public itemStrategy:ItemStrategyInterface;
    public detailStrategy:DetailStrategyInterface;

    protected MASTER_ID:string;

    STORES_ID:any;

    protected primaryMasterKey:string;
    protected primaryItemKey:string;
    protected primaryDetailsKey:string;


    setMasterKey(key:string){
        this.primaryMasterKey = key;
    }

    setItemsKey(key:string){
        this.primaryItemKey = key;
    }

    setDetailsKey(key:string){
        this.primaryDetailsKey = key;
    }

    cache:any = {};

    constructor(){}

    setItemStrategy(itemStrategy:ItemStrategyInterface){
        this.itemStrategy = itemStrategy;
    }

    setDetailStrategy(detailStrategy:DetailStrategyInterface){
        this.detailStrategy = detailStrategy;
    }

    setMasterId(MASTER_ID:string){
        this.MASTER_ID = MASTER_ID
    }


    addItem():Observable<any>{
        return this.itemStrategy.addItem(this.MASTER_ID,this.STORES_ID);
    }

    updateItem(formData):Observable<any>{
        return this.itemStrategy.updateItem(formData,this.STORES_ID);
    }

    deleteItem(formData):Observable<any>{
        return this.itemStrategy.deleteItem(formData);
    }

    getItemsApi(){
        return this.itemStrategy.getItems();
    }

    addDetail(ITEMS_ID:any):Observable<any>{
        return this.detailStrategy.addDetail(ITEMS_ID,this.MASTER_ID).pipe(
            flatMap(data=>{
                if(data){
                    this.cache[ITEMS_ID] = this.cache[ITEMS_ID] || []
                    this.cache[ITEMS_ID] = [
                        ...this.cache[ITEMS_ID],
                        data
                    ]
                    return  of(true)
                }else{
                    return  of(false)
                }
            })
        )
    }

    updateDetail(DETAILS_ID:string,formData:any):Observable<any>{
        return this.detailStrategy.updateDetail(DETAILS_ID,formData,this.MASTER_ID).pipe(
            flatMap(data=>{
                if(data){
                    let index = -1;
                    for (var i = 0; i < this.cache[formData[this.primaryItemKey]].length; i++) {
            
                      if (this.cache[formData[this.primaryItemKey]][i][this.primaryDetailsKey] == formData[this.primaryDetailsKey]) {
                        index = i;
                        break;
                      }
                    }
                    this.cache[formData[this.primaryItemKey]] = [
                      ...this.cache[formData[this.primaryItemKey]].slice(0, index),
                      data,
                      ...this.cache[formData[this.primaryItemKey]].slice(index + 1)
                    ]
                    return of()
                }
            })
        )
    }

    deleteDetail(ITEMS_ID:string,DETAILS_ID:string):Observable<any>{
        return this.detailStrategy.deleteDetail(DETAILS_ID).pipe(
            flatMap(data=>{
                let index = -1;
                let list = this.cache[ITEMS_ID]
                for (var i = 0; i < list.length; i++) {
                  if (list[i][this.primaryDetailsKey] == DETAILS_ID) {
                    index = i;
                    break;
                  }
                }
        
                this.cache[ITEMS_ID] = [
                  ...this.cache[ITEMS_ID].slice(0, index),
                  ...this.cache[ITEMS_ID].slice(index + 1)
                ]
                return of()
            })
        )
    }

    getDetails(ITEMS_ID:string):Observable<any>{
        if(this.cache[ITEMS_ID])return of(this.cache[ITEMS_ID])
        
        return this.detailStrategy.getDetails(ITEMS_ID).pipe(
            flatMap(
                data=>{
                    this.cache[ITEMS_ID] = [];
                    this.cache[ITEMS_ID] = data.rows
                    return of()
                }
            )
        )
    }


    setItems(items){
        this.itemStrategy.items = items;
    }

    getItems(){
        return this.itemStrategy ? this.itemStrategy.items : []
    }


}
