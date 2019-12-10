import { HttpClient } from '@angular/common/http';
import { ItemStrategyInterface } from '../../interface/ItemStrategy';
import { Observable, of } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ReqDocItemsFormComponent } from '../../../req-document/req-doc-items/req-doc-items-form/req-doc-items-form.component';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ReqDocItemsService implements ItemStrategyInterface {
    primaryKey: string;

    items: any[] = [];

    shouldValidateBalance:boolean;
    isReturnRequest:boolean;

    formComponent;;

    addItem(MASTER_ID:string,STORES_ID): Observable<any> {
        return this.openComp<ReqDocItemsFormComponent, {
            DOCUMENT_ID: string | number,
            STORES_ID:any,
            shouldValidateBalance:boolean,
            isReturnRequest:boolean,
            formData: any
        }>("Add Item", ReqDocItemsFormComponent, {
            DOCUMENT_ID: MASTER_ID,
            STORES_ID,
            shouldValidateBalance:this.shouldValidateBalance,
            isReturnRequest:this.isReturnRequest,
            formData: null
        }).pipe(
            flatMap(data => {
                if (data) {
                    let body = { ...data };
                    delete body.ITEM_AR_NAME;
                    delete body.ITEM_EN_NAME;
                    delete body.REQ_DOCUMENT_ITEMS_ID;
                    delete body.UNITS_NAME;
                    // delete body.UNITS_ID;
                    return this.addItemApi(body).pipe(
                        flatMap(addedData => {
                            data.REQ_DOCUMENT_ITEMS_ID = addedData.rows.R_REQ_DOCUMENT_ITEMS_ID
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

    updateItem(formData: any,STORES_ID): Observable<any> {
        return this.openComp<ReqDocItemsFormComponent, {
            DOCUMENT_ID: string | number,
            STORES_ID:any,
            shouldValidateBalance:boolean,
            isReturnRequest:boolean,
            formData: any
        }>("Update Item", ReqDocItemsFormComponent, {
            DOCUMENT_ID: formData.DOCUMENT_ID,
            STORES_ID,
            shouldValidateBalance:this.shouldValidateBalance,
            isReturnRequest:this.isReturnRequest,
            formData
        }).pipe(
            flatMap(data => {
                if (data) {
                    let body = { ...data };
                    delete body.ITEM_AR_NAME
                    delete body.ITEM_EN_NAME
                    delete body.UNITS_NAME
                    // delete body.UNITS_ID
                    return this.updateItemApi(formData.REQ_DOCUMENT_ITEMS_ID, body).pipe(
                        flatMap(updateData => {
                            let index = -1;
                            for (var i = 0; i < this.items.length; i++) {

                                if (this.items[i].REQ_DOCUMENT_ITEMS_ID == formData.REQ_DOCUMENT_ITEMS_ID) {
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

    deleteItem(REQ_DOCUMENT_ITEMS_ID: string): Observable<any> {
        return this.deleteItemApi(REQ_DOCUMENT_ITEMS_ID)
            .pipe(
                flatMap(data => {
                    let index = -1;
                    for (var i = 0; i < this.items.length; i++) {
                        if (this.items[i].REQ_DOCUMENT_ITEMS_ID == REQ_DOCUMENT_ITEMS_ID) {
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

    currLang;
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
                nzWidth: 720
            });
        return drawerRef.afterClose
    }



    addItemApi(body: any): Observable<any> {
        return this.http.post(`/reqdocitems/insertReqDocumentItems`, body);
    }

    updateItemApi(REQ_DOCUMENT_ITEMS_ID: string, body: any): Observable<any> {
        return this.http.post(`/reqdocitems/UpdateReqDocumentItems/${REQ_DOCUMENT_ITEMS_ID}`, body)
    }


    deleteItemApi(REQ_DOCUMENT_ITEMS_ID: string): Observable<any> {
        return this.http.post(`/reqdocitems/deleteReqDocumentItems`,
        {
            REQ_DOCUMENT_ITEMS_ID: REQ_DOCUMENT_ITEMS_ID,
            DELETED_BY: 1
        });
    }

}