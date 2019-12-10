import { Injectable } from '@angular/core';

import { DetailStrategyInterface } from '../../interface/detailStrategy';
import { Observable, of } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { OperationsService } from 'src/app/services/operations.service';
import { HttpClient } from '@angular/common/http';
import { RcvDocumentItemsDetailsFormComponent } from '../../../rcv-document/rcv-document-items-details/rcv-document-items-details-form/rcv-document-items-details-form.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RcvDocDetailService implements DetailStrategyInterface {
    primaryKey: string;

    formComponent = RcvDocumentItemsDetailsFormComponent;
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
        return this.openComp<RcvDocumentItemsDetailsFormComponent, {
            DOCUMENT_ID: string,
            RCV_DOCUMENT_ITEMS_ID: string,
            formData: any
        }>("Add Detail", RcvDocumentItemsDetailsFormComponent,
            {
                RCV_DOCUMENT_ITEMS_ID: formData,
                DOCUMENT_ID: DOCUMENT_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.RCV_DOCUMENT_ITEMS_D_ID;
                        return this.addDetailApi(body).pipe(
                            flatMap(updateData => {
                                data.RCV_DOCUMENT_ITEMS_D_ID = updateData.rows.R_RCV_DOCUMENT_ITEMS_D_ID;
                                return of(data)
                            })
                        )
                    } else {
                        return of(false)
                    }
                })
            )
    }


    updateDetail(RCV_DOCUMENT_ITEMS_ID:string, formData: any, MASTER_ID:string): Observable<any> {
        return this.openComp<RcvDocumentItemsDetailsFormComponent, {
            DOCUMENT_ID: string,
            RCV_DOCUMENT_ITEMS_ID: string,
            formData: any
        }>("Update Item", RcvDocumentItemsDetailsFormComponent,
            {
                RCV_DOCUMENT_ITEMS_ID: RCV_DOCUMENT_ITEMS_ID,
                DOCUMENT_ID: MASTER_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.RCV_DOCUMENT_ITEMS_D_ID
                        return this.updateDetailApi(formData.RCV_DOCUMENT_ITEMS_D_ID, body).pipe(
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


    deleteDetail(RCV_DOCUMENT_ITEMS_D_ID: string): Observable<any> {
        return this.deleteDetailApi(RCV_DOCUMENT_ITEMS_D_ID)
    }

    getDetails(RCV_DOCUMENT_ITEMS_ID): Observable<any> {
        return this.getDetailApi(RCV_DOCUMENT_ITEMS_ID)

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
        return this.http.post(`/rcvDoctItemsD/insertrcvDoctItemsD`, body);
    }



    updateDetailApi(RCV_DOCUMENT_ITEMS_D_ID: string, body: any): Observable<any> {
        return this.http.post(`/rcvDoctItemsD/updatercvDoctItemsD/${RCV_DOCUMENT_ITEMS_D_ID}`, body)
    }



    getDetailApi(RCV_DOCUMENT_ITEMS_ID: string = null): Observable<any> {
        let queryParam = RCV_DOCUMENT_ITEMS_ID ? `?RCV_DOCUMENT_ITEMS_ID=${RCV_DOCUMENT_ITEMS_ID}` : ''
        return this.http.get(`/rcvDoctItemsD/getAllrcvDoctItemsD${queryParam}`)
    }

    deleteDetailApi(RCV_DOCUMENT_ITEMS_D_ID: string): Observable<any> {
        return this.http.post('/rcvDoctItemsD/deleteRcvDocumentItemsDetails', {
            DELETED_BY: 1,
            RCV_DOCUMENT_ITEMS_D_ID
        })
    }


}