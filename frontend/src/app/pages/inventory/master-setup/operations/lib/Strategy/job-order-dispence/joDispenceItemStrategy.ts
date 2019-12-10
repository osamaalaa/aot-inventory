import { HttpClient } from '@angular/common/http';
import { ItemStrategyInterface } from '../../interface/ItemStrategy';
import { Observable, of } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { JODipsDocItemsFormComponent } from '../../../job-order-dispence/jo-disp-doc-items/jo-disp-doc-items-form/jo-disp-doc-items-form.component';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class JODispeneItemsService implements ItemStrategyInterface {
    primaryKey: string;

    items: any[] = [];

    formComponent;;

    addItem(MASTER_ID:string): Observable<any> {
        return this.openComp<JODipsDocItemsFormComponent, {
            DOCUMENT_ID: string | number,
            formData: any
        }>("Add Item", JODipsDocItemsFormComponent, {
            DOCUMENT_ID: MASTER_ID,
            formData: null
        }).pipe(
            flatMap(data => {
                if (data) {
                    let body = { ...data };
                    delete body.ITEM_AR_NAME;
                    delete body.ITEM_EN_NAME;
                    delete body.DSP_DOCUMENT_ITEMS_ID;
                    delete body.UNIT_AR_NAME;
                    delete body.UNIT_EN_NAME;
                    return this.addItemApi(body).pipe(
                        flatMap(addedData => {
                            data.DSP_DOCUMENT_ITEMS_ID = addedData.rows.R_DSP_DOCUMENT_ITEMS_ID
                            this.items = [...this.items, data]
                            return of(data)
                        })
                    )
                } else {
                    return of(false)
                }
            })
        )
    }

    updateItem(formData: any): Observable<any> {
        return this.openComp<JODipsDocItemsFormComponent, {
            DOCUMENT_ID: string | number,
            formData: any
        }>("Update Item", JODipsDocItemsFormComponent, {
            DOCUMENT_ID: formData.DOCUMENT_ID,
            formData
        }).pipe(
            flatMap(data => {
                if (data) {
                    let body = { ...data };
                    delete body.ITEM_AR_NAME
                    delete body.ITEM_EN_NAME
                    delete body.UNIT_AR_NAME;
                    delete body.UNIT_EN_NAME;
                    return this.updateItemApi(formData.DSP_DOCUMENT_ITEMS_ID, body).pipe(
                        flatMap(updateData => {
                            let index = -1;
                            for (var i = 0; i < this.items.length; i++) {

                                if (this.items[i].DSP_DOCUMENT_ITEMS_ID == formData.DSP_DOCUMENT_ITEMS_ID) {
                                    index = i;
                                    break;
                                }
                            }
                            this.items = [
                                ...this.items.slice(0, index),
                                data,
                                ...this.items.slice(index + 1)
                            ]
                            return of(updateData)
                        })
                    )
                } else {
                    return of(false)
                }
            })
        )
    }

    deleteItem(DSP_DOCUMENT_ITEMS_ID: string): Observable<any> {
        return this.deleteItemApi(DSP_DOCUMENT_ITEMS_ID)
            .pipe(
                flatMap(data => {
                    let index = -1;
                    for (var i = 0; i < this.items.length; i++) {
                        if (this.items[i].DSP_DOCUMENT_ITEMS_ID == DSP_DOCUMENT_ITEMS_ID) {
                            index = i;
                            break;
                        }
                    }

                    this.items = [
                        ...this.items.slice(0, index),
                        ...this.items.slice(index + 1)
                    ]
                    return of();
                })
            )
    }
    getItems(): Observable<any> {
        throw new Error("Method not implemented.");
    }

    currLang
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


    public openComp<Component, ParamInterface>(title: string, Comp, Params: ParamInterface, formData?: any): Observable<any> {
        const drawerRef = this.drawerService.create<Component,
    
            ParamInterface, string>({
                nzTitle: this.currLang == 'en' ? 'Item Details' :'بيانات الصنف',
                nzContent: Comp,
                nzContentParams: Params,
                nzWidth: 720,
                nzPlacement: this.currLang == 'ar' ? 'left' :'right'

            });
        return drawerRef.afterClose
    }



    addItemApi(body: any): Observable<any> {
        return this.http.post(`/dspdocumentitems/insertDSPdocumentItems`, body);
    }

    updateItemApi(DSP_DOCUMENT_ITEMS_ID: string, body: any): Observable<any> {
        return this.http.post(`/dspdocumentitems/updateDSPdocumentItems/${DSP_DOCUMENT_ITEMS_ID}`, body)
    }


    deleteItemApi(DSP_DOCUMENT_ITEMS_ID: string): Observable<any> {
        return this.http.post(`/dspdocumentitems/deleteDSPdocumentItems`,
        {
            DSP_DOCUMENT_ITEMS_ID: DSP_DOCUMENT_ITEMS_ID,
            DELETED_BY: 1
        });
    }

}