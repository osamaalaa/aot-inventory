import { NzDrawerService } from 'ng-zorro-antd';
import { ItemAliasFormComponent } from '../../../items-aliases/item-alias-form/item-alias-form.component';
import { ItemsService } from 'src/app/services/items.service';
import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ItemComponentsFormComponent } from '../../../item-components/item-components-form/item-components-form.component';
import { ItemsUnitsFormComponent } from '../../../items-units/items-units-form/items-units-form.component';
@Injectable()
export class ItemsUnitsService {

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
        const drawerRef = this.drawerService.create<ItemsUnitsFormComponent,
            {
                ITEMS_ID: string | number
                formData: any
            }, string>({
                nzTitle: "Unit",
                nzContent: ItemsUnitsFormComponent,
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
                    return this.itemService.insertItemUnits(data)
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
                    return this.itemService.updateItemUnits(formData.ITEMS_UNITS_ID, data)
                } else {
                    return of(false)
                }
                
            })
        )
    }

}