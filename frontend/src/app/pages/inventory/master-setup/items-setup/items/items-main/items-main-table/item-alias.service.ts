import { NzDrawerService } from 'ng-zorro-antd';
import { ItemAliasFormComponent } from '../../../items-aliases/item-alias-form/item-alias-form.component';
import { ItemsService } from 'src/app/services/items.service';
import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
@Injectable()
export class AliasClass {

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

    private openComp(formData?: any): Observable<any> {
        const drawerRef = this.drawerService.create<ItemAliasFormComponent,
            {
                ITEMS_ID: string | number
                formData: any
            }, string>({
                nzTitle: "Alias",
                nzContent: ItemAliasFormComponent,
                nzContentParams: {
                    ITEMS_ID: this.ITEMS_ID,
                    formData
                },
                nzWidth: 500
            });

        return drawerRef.afterClose
    }

    add(): Observable<any> {
        return this.openComp().pipe(
            flatMap(data => {
                if (data) {
                    return this.itemService.insertItemAlias(data)
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
                    return this.itemService.updateItemAlias(formData.ITEMS_ALIASES_ID, data)
                } else {
                    return of(false)
                }
            })
        )
    }

}