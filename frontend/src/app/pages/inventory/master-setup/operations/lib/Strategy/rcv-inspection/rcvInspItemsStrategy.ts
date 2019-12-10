import { HttpClient } from '@angular/common/http';
import { ItemStrategyInterface } from '../../interface/ItemStrategy';
import { Observable, of } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { flatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RcvInspectionItemsFormComponent } from '../../../rcv-inspection/rcv-inspection-items/rcv-inspection-items-form/rcv-inspection-items-form.component';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class RcvInspItemsService implements ItemStrategyInterface {
    primaryKey: string;

    items: any[] = [];

    formComponent;

    addItem(MASTER_ID:string): Observable<any> {
        return this.openComp<RcvInspectionItemsFormComponent, {
            DOCUMENT_ID: string | number,
            formData: any
        }>("Add Item", RcvInspectionItemsFormComponent, {
            DOCUMENT_ID: MASTER_ID,
            formData: null
        }).pipe(
            flatMap(data => {
                if (data) {
                    let body = { ...data };
                    delete body.ITEM_AR_NAME;
                    delete body.ITEM_EN_NAME;
                    delete body.RCV_INSPECTION_ITEMS_ID;
                    delete body.UNITS_NAME;
                    return this.addItemApi(body).pipe(
                        flatMap(addedData => {
                            data.RCV_INSPECTION_ITEMS_ID = addedData.rows.R_RCV_INSPECTION_ITEMS_ID
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
        return this.openComp<RcvInspectionItemsFormComponent, {
            DOCUMENT_ID: string | number,
            formData: any
        }>("Update Item", RcvInspectionItemsFormComponent, {
            DOCUMENT_ID: formData.DOCUMENT_ID,
            formData
        }).pipe(
            flatMap(data => {
                if (data) {
                    let body = { ...data };
                    delete body.ITEM_AR_NAME
                    delete body.ITEM_EN_NAME
                    delete body.UNITS_NAME
                    return this.updateItemApi(formData.RCV_INSPECTION_ITEMS_ID, body).pipe(
                        flatMap(updateData => {
                            let index = -1;
                            for (var i = 0; i < this.items.length; i++) {

                                if (this.items[i].RCV_INSPECTION_ITEMS_ID == formData.RCV_INSPECTION_ITEMS_ID) {
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

    deleteItem(RCV_INSPECTION_ITEMS_ID: string): Observable<any> {
        return this.deleteItemApi(RCV_INSPECTION_ITEMS_ID)
            .pipe(
                flatMap(data => {
                    let index = -1;
                    for (var i = 0; i < this.items.length; i++) {
                        if (this.items[i].RCV_INSPECTION_ITEMS_ID == RCV_INSPECTION_ITEMS_ID) {
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
        return this.http.post(`/rcvInspectionItems/insertrcvInspectionItems`, body);
    }

    updateItemApi(RCV_INSPECTION_ITEMS_ID: string, body: any): Observable<any> {
        return this.http.post(`/rcvInspectionItems/updatercvInspectionItems/${RCV_INSPECTION_ITEMS_ID}`, body)
    }


    deleteItemApi(RCV_INSPECTION_ITEMS_ID: string): Observable<any> {
        return this.http.post('/rcvInspectionItems/deleteRcvInspectionItems', {
            DELETED_BY: 1,
            RCV_INSPECTION_ITEMS_ID
      
          })
    }

}