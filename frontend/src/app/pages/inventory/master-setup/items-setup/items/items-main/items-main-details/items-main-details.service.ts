import { Injectable } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { flatMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class ItemsMainDetailsService{

    isNewEntry:boolean;

    ITEMS_ID:string | number;

    constructor(
        private itemsService:ItemsService
    ){

    }


    public getItemDetails():Observable<any>{
        return this.itemsService.getItemDetails(this.ITEMS_ID)
        .pipe(
            flatMap(data=>{
                this.isNewEntry = data.rows.length == 0;
                return of(data.rows[0])
            })
        )
    }


    private addItemDetails(body):Observable<any>{
        return this.itemsService.insertItemDetails(body).pipe(
            flatMap((_)=>{
                this.isNewEntry = false;
                return of(_)
            })
        )
    }

    private updateItemDetails(body){
        return this.itemsService.updateItemDetails(this.ITEMS_ID, body)
    }

    public saveData(body){
        if(this.isNewEntry){
            return this.addItemDetails(body);
        }else{
            return this.updateItemDetails(body);
        }
    }
}
