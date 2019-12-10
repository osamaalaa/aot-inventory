import { Injectable } from '@angular/core';

import { DetailStrategyInterface } from '../../interface/detailStrategy';
import { Observable, of } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { OperationsService } from 'src/app/services/operations.service';
import { HttpClient } from '@angular/common/http';
import { InvTransferItemDetailsFormComponent } from '../../../transfers/transfer/inv-transfer-items-details/inv-transfer-item-details-form/inv-transfer-item-details-form.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class InvTransferDetailService implements DetailStrategyInterface {
    primaryKey: string;

    formComponent = InvTransferItemDetailsFormComponent;
    currLang
    constructor(
        private drawerService: NzDrawerService,
        private operationsService: OperationsService,
        private http: HttpClient,
        private translate:TranslateService

    ) {

        this.currLang = this.translate.currentLang;

this.translate.onLangChange.subscribe(lang=>{
    this.currLang = lang.lang
})

     }


    addDetail(formData: any, INV_TRANSFER_ID: string): Observable<any> {
        return this.openComp<InvTransferItemDetailsFormComponent, {
            INV_TRANSFER_ID: string,
            INV_TRANSFER_ITEMS_ID: string,
            formData: any
        }>("Add Detail", InvTransferItemDetailsFormComponent,
            {
                INV_TRANSFER_ITEMS_ID: formData,
                INV_TRANSFER_ID: INV_TRANSFER_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.INV_TRANSFER_ITEMS_D_ID;
                        return this.addDetailApi(body).pipe(
                            flatMap(updateData => {
                                data.INV_TRANSFER_ITEMS_D_ID = updateData.rows.R_INV_TRANSFER_ITEMS_D_ID;
                                return of(data)
                            })
                        )
                    } else {
                        return of(false)
                    }
                })
            )
    }


    updateDetail(INV_TRANSFER_ITEMS_ID:string, formData: any, MASTER_ID:string): Observable<any> {
        return this.openComp<InvTransferItemDetailsFormComponent, {
            INV_TRANSFER_ID: string,
            INV_TRANSFER_ITEMS_ID: string,
            formData: any
        }>("Update Item", InvTransferItemDetailsFormComponent,
            {
                INV_TRANSFER_ITEMS_ID: INV_TRANSFER_ITEMS_ID,
                INV_TRANSFER_ID: MASTER_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.INV_TRANSFER_ITEMS_D_ID
                        return this.updateDetailApi(formData.INV_TRANSFER_ITEMS_D_ID, body).pipe(
                            flatMap(updateData => {
                                return of(data)
                            })
                        )
                    } else {
                        return of(false)
                    }
                })
            )
    }


    deleteDetail(INV_TRANSFER_ITEMS_D_ID: string): Observable<any> {
        return this.deleteDetailApi(INV_TRANSFER_ITEMS_D_ID)
    }
    getDetails(INV_TRANSFER_ITEMS_ID): Observable<any> {
        return this.getDetailApi(INV_TRANSFER_ITEMS_ID)

    }

    public openComp<Component, ParamInterface>(title: string, Comp, Params: ParamInterface, formData?: any): Observable<any> {
        const drawerRef = this.drawerService.create<Component,
            ParamInterface, string>({
                nzTitle: title,
                nzContent: Comp,
                nzContentParams: Params,
                nzWidth: 720,
                nzPlacement: this.currLang == 'ar' ? 'left' :'right'

            });
        return drawerRef.afterClose
    }


    addDetailApi(body): Observable<any> {
        return this.http.post(`/transferItemsD/inserttransferItemsD`, body);
    }



    updateDetailApi(INV_TRANSFER_ITEMS_D_ID: string, body: any): Observable<any> {
        return this.http.post(`/transferItemsD/updatetransferItemsDById/${INV_TRANSFER_ITEMS_D_ID}`, body)
    }



    getDetailApi(INV_TRANSFER_ITEMS_ID: string = null): Observable<any> {
        let queryParam = INV_TRANSFER_ITEMS_ID ? `?INV_TRANSFER_ITEMS_ID=${INV_TRANSFER_ITEMS_ID}` : ''
        return this.http.get(`/transferItemsD/getAlltransferItemsD${queryParam}`)
    }

    deleteDetailApi(INV_TRANSFER_ITEMS_D_ID: string): Observable<any> {
        return this.http.post(`/transferItemsD/deleteTransferItemsD/${INV_TRANSFER_ITEMS_D_ID}`,{});
    }


}