import { Injectable } from '@angular/core';

import { DetailStrategyInterface } from '../../interface/detailStrategy';
import { Observable, of } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from 'src/app/services/constants.service';
import { JOReqDocItemsDetailsFormComponent } from '../../../job-order-req-doc/jo-req-doc-items-details/jo-req-doc-items-details-form/jo-req-doc-items-details-form.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class JOReqDocDetailService implements DetailStrategyInterface {
    primaryKey: string;
    currLang
    formComponent = JOReqDocItemsDetailsFormComponent;

    constructor(
        private drawerService: NzDrawerService,
        private http: HttpClient,
        private translate:TranslateService

    ) {
        this.currLang = this.translate.currentLang;

this.translate.onLangChange.subscribe(lang=>{
    this.currLang = lang.lang
})

     }


    addDetail(formData: any, DOCUMENT_ID: string): Observable<any> {
        return this.openComp<JOReqDocItemsDetailsFormComponent, {
            DOCUMENT_ID: string,
            REQ_DOCUMENT_ITEMS_ID: string,
            formData: any
        }>("Add Detail", JOReqDocItemsDetailsFormComponent,
            {
                REQ_DOCUMENT_ITEMS_ID: formData,
                DOCUMENT_ID: DOCUMENT_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.REQ_DOCUMENT_ITEMS_D_ID;
                        return this.addDetailApi(body).pipe(
                            flatMap(updateData => {
                                data.REQ_DOCUMENT_ITEMS_D_ID = updateData.rows.R_REQ_DOCUMENT_ITEMS_D_ID;
                                return of(data)
                            })
                        )
                    } else {
                        return of(false)
                    }
                })
            )
    }


    updateDetail(REQ_DOCUMENT_ITEMS_ID:string, formData: any, MASTER_ID:string): Observable<any> {
        return this.openComp<JOReqDocItemsDetailsFormComponent, {
            DOCUMENT_ID: string,
            REQ_DOCUMENT_ITEMS_ID: string,
            formData: any
        }>("Update Item", JOReqDocItemsDetailsFormComponent,
            {
                REQ_DOCUMENT_ITEMS_ID: REQ_DOCUMENT_ITEMS_ID,
                DOCUMENT_ID: MASTER_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.REQ_DOCUMENT_ITEMS_D_ID
                        return this.updateDetailApi(formData.REQ_DOCUMENT_ITEMS_D_ID, body).pipe(
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


    deleteDetail(REQ_DOCUMENT_ITEMS_D_ID: string): Observable<any> {
        return this.deleteDetailApi(REQ_DOCUMENT_ITEMS_D_ID)
    }
    getDetails(REQ_DOCUMENT_ITEMS_ID): Observable<any> {
        return this.getDetailApi(REQ_DOCUMENT_ITEMS_ID)

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
        return this.http.post(`/reqdocitemsd/insertReqDocumentItemsD`, body);
    }



    updateDetailApi(REQ_DOCUMENT_ITEMS_D_ID: string, body: any): Observable<any> {
        return this.http.post(`/reqdocitemsd/UpdateReqDocumentItemsD/${REQ_DOCUMENT_ITEMS_D_ID}`, body)
    }



    getDetailApi(REQ_DOCUMENT_ITEMS_ID: string = null): Observable<any> {
        let queryParam = REQ_DOCUMENT_ITEMS_ID ? `?REQ_DOCUMENT_ITEMS_ID=${REQ_DOCUMENT_ITEMS_ID}` : ''
        return this.http.get(`/reqdocitemsd/getReqDocumentItemsD${queryParam}`)
    }

    deleteDetailApi(REQ_DOCUMENT_ITEMS_D_ID: string): Observable<any> {
        return this.http.post(`/reqdocitemsd/deleteReqDocumentItemsD`,{
            REQ_DOCUMENT_ITEMS_D_ID:REQ_DOCUMENT_ITEMS_D_ID,
            DELETED_BY:CONSTANTS.DELETED_BY
        });
    }


}