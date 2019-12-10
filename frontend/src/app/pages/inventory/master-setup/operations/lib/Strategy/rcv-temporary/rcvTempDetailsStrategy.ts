import { Injectable } from '@angular/core';

import { DetailStrategyInterface } from '../../interface/detailStrategy';
import { Observable, of } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { OperationsService } from 'src/app/services/operations.service';
import { HttpClient } from '@angular/common/http';
import { RcvTemporaryItemsDetailsFormComponent } from '../../../rcv-temporary/rcv-temporary-items-details/rcv-temporary-items-details-form/rcv-temporary-items-details-form.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RcvTempDetailService implements DetailStrategyInterface {
    primaryKey: string;

    formComponent;
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


    addDetail(formData: any, DOCUMENT_ID: string): Observable<any> {
        return this.openComp<RcvTemporaryItemsDetailsFormComponent, {
            DOCUMENT_ID: string,
            RCV_TEMP_ITEMS_ID: string,
            formData: any
        }>("Add Detail", RcvTemporaryItemsDetailsFormComponent,
            {
                RCV_TEMP_ITEMS_ID: formData,
                DOCUMENT_ID: DOCUMENT_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.RCV_TEMP_ITEMS_D_ID;
                        return this.addDetailApi(body).pipe(
                            flatMap(updateData => {
                                data.RCV_TEMP_ITEMS_D_ID = updateData.rows.R_RCV_TEMP_ITEMS_D_ID;
                                return of(data)
                            })
                        )
                    } else {
                        return of(false)
                    }
                })
            )
    }


    updateDetail(RCV_TEMP_ITEMS_ID:string, formData: any, MASTER_ID:string): Observable<any> {
        return this.openComp<RcvTemporaryItemsDetailsFormComponent, {
            DOCUMENT_ID: string,
            RCV_TEMP_ITEMS_ID: string,
            formData: any
        }>("Update Item", RcvTemporaryItemsDetailsFormComponent,
            {
                RCV_TEMP_ITEMS_ID: RCV_TEMP_ITEMS_ID,
                DOCUMENT_ID: MASTER_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.RCV_TEMP_ITEMS_D_ID
                        return this.updateDetailApi(formData.RCV_TEMP_ITEMS_D_ID, body).pipe(
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


    deleteDetail(RCV_TEMP_ITEMS_D_ID: string): Observable<any> {
        return this.deleteDetailApi(RCV_TEMP_ITEMS_D_ID)
    }

    getDetails(RCV_TEMP_ITEMS_ID): Observable<any> {
        return this.getDetailApi(RCV_TEMP_ITEMS_ID)

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
        return this.http.post(`/rcvTempoItemsD/insertrcvTmpoItemsD`, body);
    }



    updateDetailApi(RCV_TEMP_ITEMS_D_ID: string, body: any): Observable<any> {
        return this.http.post(`/rcvTempoItemsD/updatercvTmpoItemsD/${RCV_TEMP_ITEMS_D_ID}`, body)
    }



    getDetailApi(RCV_TEMP_ITEMS_ID: string = null): Observable<any> {
        let queryParam = RCV_TEMP_ITEMS_ID ? `?RCV_TEMP_ITEMS_ID=${RCV_TEMP_ITEMS_ID}` : ''
        return this.http.get(`/rcvTempoItemsD/getAllrcvTmpoItemsD${queryParam}`)
    }

    deleteDetailApi(RCV_TEMP_ITEMS_D_ID: string): Observable<any> {
        return this.http.post('/rcvTempoItemsD/deleteRcvTempoItemsD', {
            DELETED_BY: 1,
            RCV_TEMP_ITEMS_D_ID
      
          })
    }


}