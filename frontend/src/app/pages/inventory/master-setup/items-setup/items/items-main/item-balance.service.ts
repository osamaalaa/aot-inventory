import { Injectable } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { ItemsService } from 'src/app/services/items.service';
import { Observable, of } from 'rxjs';
import { ItemBalanceFormComponent } from '../../items-balance/item-balance-form/item-balance-form.component';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class BalanceService {

    constructor(
        private drawerService: NzDrawerService,
        private itemService: ItemsService
    ) { }


    _ITEMS_ID: string | number;

    set ITEMS_ID(ITEMS_ID: string | number) {
        this._ITEMS_ID = ITEMS_ID;
    }

    get ITEMS_ID() {
        return this._ITEMS_ID;
    }

    private openComp(formData?:any): Observable<any> {
        const drawerRef = this.drawerService.create<ItemBalanceFormComponent,
            {
                ITEMS_ID: string | number
                formData: any
            }, string>({
                nzTitle: "Item Balance",
                nzContent: ItemBalanceFormComponent,
                nzContentParams: {
                    ITEMS_ID: this.ITEMS_ID,
                    formData
                },
                nzWidth: 720
            });

        return drawerRef.afterClose
    }

    add(): Observable<any> {
        return this.openComp().pipe(
            flatMap(data => {
                if (data) {
                    return this.itemService.insertItemBalance(data)
                } else {
                    return of(false)
                }
                
            })
        )
    }

    update(formData: any): Observable<any> {
        return this.openComp(formData).pipe(
            flatMap(data => {
                if (data) {
                    return this.itemService.updateItemBalance(formData.ITEMS_BALANCE_ID, data)
                } else {
                    return of(false)
                }
                
            })
        )
    }

}