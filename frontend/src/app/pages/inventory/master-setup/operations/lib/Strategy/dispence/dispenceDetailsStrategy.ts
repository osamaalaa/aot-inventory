import { Injectable } from '@angular/core';

import { DetailStrategyInterface } from '../../interface/detailStrategy';
import { Observable, of } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DipsDocItemsDetailsFormComponent } from '../../../dispence/disp-doc-items-details/disp-doc-items-details-form/disp-doc-items-details-form.component';
import { CONSTANTS } from 'src/app/services/constants.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class DispenceDetailService implements DetailStrategyInterface {
    primaryKey: string;

    currLang:string;
    formComponent = DipsDocItemsDetailsFormComponent;

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
        return this.openComp<DipsDocItemsDetailsFormComponent, {
            DOCUMENT_ID: string,
            DSP_DOCUMENT_ITEMS_ID: string,
            formData: any
        }>("Add Detail", DipsDocItemsDetailsFormComponent,
            {
                DSP_DOCUMENT_ITEMS_ID: formData,
                DOCUMENT_ID: DOCUMENT_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.DSP_DOCUMENT_ITEMS_D_ID;
                        return this.addDetailApi(body).pipe(
                            flatMap(updateData => {
                                data.DSP_DOCUMENT_ITEMS_D_ID = updateData.rows.R_DSP_DOCUMENT_ITEMS_D_ID;
                                return of(data)
                            })
                        )
                    } else {
                        return of(false)
                    }
                })
            )
    }


    updateDetail(DSP_DOCUMENT_ITEMS_ID:string, formData: any, MASTER_ID:string): Observable<any> {
        return this.openComp<DipsDocItemsDetailsFormComponent, {
            DOCUMENT_ID: string,
            DSP_DOCUMENT_ITEMS_ID: string,
            formData: any
        }>("Update Item", DipsDocItemsDetailsFormComponent,
            {
                DSP_DOCUMENT_ITEMS_ID: DSP_DOCUMENT_ITEMS_ID,
                DOCUMENT_ID: MASTER_ID,
                formData
            }).pipe(
                flatMap(data => {
                    if (data) {
                        let body = { ...data };
                        delete body.DSP_DOCUMENT_ITEMS_D_ID
                        return this.updateDetailApi(formData.DSP_DOCUMENT_ITEMS_D_ID, body).pipe(
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


    deleteDetail(DSP_DOCUMENT_ITEMS_D_ID: string): Observable<any> {
        return this.deleteDetailApi(DSP_DOCUMENT_ITEMS_D_ID)
    }
    getDetails(DSP_DOCUMENT_ITEMS_ID): Observable<any> {
        return this.getDetailApi(DSP_DOCUMENT_ITEMS_ID)

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
        return this.http.post(`/dspdocitemsd/insertDSPdocumentItemsD`, body);
    }



    updateDetailApi(DSP_DOCUMENT_ITEMS_D_ID: string, body: any): Observable<any> {
        return this.http.post(`/dspdocitemsd/updateDSPdocumentItemsD/${DSP_DOCUMENT_ITEMS_D_ID}`, body)
    }



    getDetailApi(DSP_DOCUMENT_ITEMS_ID: string = null): Observable<any> {
        let queryParam = DSP_DOCUMENT_ITEMS_ID ? `?DSP_DOCUMENT_ITEMS_ID=${DSP_DOCUMENT_ITEMS_ID}` : ''
        return this.http.get(`/dspdocitemsd/getDSPdocumentItemsD${queryParam}`)
    }

    deleteDetailApi(DSP_DOCUMENT_ITEMS_D_ID: string): Observable<any> {
        return this.http.post(`/dspdocitemsd/deleteDSPdocumentItemsD`,{
            DSP_DOCUMENT_ITEMS_D_ID,
            DELETED_BY:CONSTANTS.DELETED_BY
        });
    }


}