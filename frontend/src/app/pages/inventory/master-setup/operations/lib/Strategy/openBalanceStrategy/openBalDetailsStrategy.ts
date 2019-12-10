import { Injectable } from '@angular/core';

import { DetailStrategyInterface } from '../../interface/detailStrategy';
import { Observable, of } from 'rxjs';
import { OpenBalItemsDetailsFormComponent } from '../../../open-balance/open-bal-items-details/open-bal-items-details-form/open-bal-items-details-form.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { OperationsService } from 'src/app/services/operations.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class OpenBalDetailService implements DetailStrategyInterface {
    primaryKey: string;

    formComponent = OpenBalItemsDetailsFormComponent;
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


    addDetail(formData: any, INV_OPEN_BALANCE_ID: string): Observable<any> {
        return this.openComp<OpenBalItemsDetailsFormComponent, {
            INV_OPEN_BALANCE_ID: string,
            INV_OPEN_BALANCE_ITEMS_ID: string,
            formData: any
        }>("Add Detail", OpenBalItemsDetailsFormComponent,
            {
                INV_OPEN_BALANCE_ITEMS_ID: formData,
                INV_OPEN_BALANCE_ID: INV_OPEN_BALANCE_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.INV_OPEN_BALANCE_ITEMS_D_ID;
                        return this.addDetailApi(body).pipe(
                            flatMap(updateData => {
                                data.INV_OPEN_BALANCE_ITEMS_D_ID = updateData.rows.R_INV_OPEN_BALANCE_ITEMS_D_ID;
                                return of(data)
                            })
                        )
                    } else {
                        return of(false)
                    }
                })
            )
    }


    updateDetail(INV_OPEN_BALANCE_ITEMS_ID:string, formData: any, MASTER_ID:string): Observable<any> {
        return this.openComp<OpenBalItemsDetailsFormComponent, {
            INV_OPEN_BALANCE_ID: string,
            INV_OPEN_BALANCE_ITEMS_ID: string,
            formData: any
        }>("Update Item", OpenBalItemsDetailsFormComponent,
            {
                INV_OPEN_BALANCE_ITEMS_ID: INV_OPEN_BALANCE_ITEMS_ID,
                INV_OPEN_BALANCE_ID: MASTER_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.INV_OPEN_BALANCE_ITEMS_D_ID
                        return this.updateDetailApi(formData.INV_OPEN_BALANCE_ITEMS_D_ID, body).pipe(
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


    deleteDetail(INV_OPEN_BALANCE_ITEMS_D_ID: string): Observable<any> {
        return this.deleteDetailApi(INV_OPEN_BALANCE_ITEMS_D_ID)
    }
    getDetails(INV_OPEN_BALANCE_ITEMS_ID): Observable<any> {
        return this.getDetailApi(INV_OPEN_BALANCE_ITEMS_ID)

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
        return this.http.post(`/openBalanceItemsD/insertOpenBalanceItemsD`, body);
    }



    updateDetailApi(INV_OPEN_BALANCE_ITEMS_D_ID: string, body: any): Observable<any> {
        return this.http.post(`/openBalanceItemsD/updateOpenBalanceItemsD/${INV_OPEN_BALANCE_ITEMS_D_ID}`, body)
    }



    getDetailApi(INV_OPEN_BALANCE_ITEMS_ID: string = null): Observable<any> {
        let queryParam = INV_OPEN_BALANCE_ITEMS_ID ? `?INV_OPEN_BALANCE_ITEMS_ID=${INV_OPEN_BALANCE_ITEMS_ID}` : ''
        return this.http.get(`/openBalanceItemsD/getAllOpenBalanceItemsD${queryParam}`)
    }

    deleteDetailApi(INV_OPEN_BALANCE_ITEMS_D_ID: string): Observable<any> {
        return this.http.delete(`/openBalanceItemsD/deleteOpenBalanceItemsD/${INV_OPEN_BALANCE_ITEMS_D_ID}`);
    }


}