

           /**
 * @author : Srikanth
 * @date : 17/06/2019
 *
 * * Model service for Supplier.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class SupplierModelService extends TableBase {


    constructor() {
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInSUPPLIER_ID = (item: any) =>

            item.SUPPLIER_ID? item.SUPPLIER_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInSUPPLIER_CODE = (item: any) =>
            item.SUPPLIER_CODE ? item.SUPPLIER_CODE.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInEN_NAME = (item: any) =>
            item.EN_NAME?  item.EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1: false;
    

            let isTextInSUBSIDARIE_EN_NAME = (item: any) =>
            item.SUBSIDARIE_EN_NAME? item.SUBSIDARIE_EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1: false;
                    

            let isTextInINTERCOMPANY = (item: any) =>
            item.INTERCOMPANY?  item.INTERCOMPANY.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1: false;

            let isTextInINTERCOMPANY_ID = (item: any) =>
            item.INTERCOMPANY_ID?     item.INTERCOMPANY_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1: false;

            let isTextInVAT_REGISTRATION_NO = (item: any) =>
            item.VAT_REGISTRATION_NO? item.VAT_REGISTRATION_NO.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1: false;

            let isTextInTAX_SCHEME_ID = (item: any) =>
            item.TAX_SCHEME_ID? item.TAX_SCHEME_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1: false;


            let isTextInLOCAL_SUPPLIER = (item: any) =>
            item.LOCAL_SUPPLIER? item.LOCAL_SUPPLIER.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1: false;

            this.displayData = this.savedData.filter(
                item =>
                    isTextInSUPPLIER_ID(item) ||
                    isTextInSUPPLIER_CODE(item) ||
                    isTextInEN_NAME(item) ||
                    isTextInSUBSIDARIE_EN_NAME(item) ||
                    isTextInINTERCOMPANY(item) ||
                    isTextInINTERCOMPANY_ID(item) ||
                    isTextInVAT_REGISTRATION_NO(item) ||
                    isTextInTAX_SCHEME_ID(item) ||
                    isTextInLOCAL_SUPPLIER(item)
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }


}
