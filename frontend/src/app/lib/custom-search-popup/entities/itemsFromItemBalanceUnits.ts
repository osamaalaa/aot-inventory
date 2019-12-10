import { IEntity } from './interface/Entity';
import { TableHeader } from './interface/Table-header';
import { Label, FieldConfig } from '../lib/DynmaicFormBuilder/interface/FieldConfig';
import { Validators } from '@angular/forms';
import { HelperUtil } from 'src/app/common/Helper.Util';


export class ItemFromBalanceUnitsEntity implements IEntity {

    title: Label = {
        en_name: "Select Item",
        ar_name: "اختر البند"
    }
    headers: TableHeader[] = [
        {
            label: {
                en_name: "Item Id",
                ar_name: "معرف العنصر"
            },
            name: {
                en_name: "ITEMS_ID",
                ar_name: "ITEMS_ID"
            }
        },
        {
            label: {
                en_name: "Name",
                ar_name: "اسم"
            },
            name: {
                en_name: "EN_NAME",
                ar_name: "AR_NAME"
            }
        },
        {
            label: {
                en_name: "Group Name",
                ar_name: "أسم المجموعة"
            },
            name: {
                en_name: "GROUP_EN_NAME",
                ar_name: "GROUP_AR_NAME"
            }
        },
        {
            label: {
                en_name: "Kind Name",
                ar_name: "اسم النوع"
            },
            name: {
                en_name: "KIND_NAME",
                ar_name: "KIND_NAME"
            }
        },
        {
            label: {
                en_name: "Class Name",
                ar_name: "اسم الصف"
            },
            name: {
                en_name: "CLASS_NAME",
                ar_name: "CLASS_NAME"
            }
        },

    ];


    apiPath: string = "/items/itemBalanceUnits/getItems/";

    formConfig: FieldConfig[] = [

        {
            type: "input",
            label: {
                en_name: "Item Name",
                ar_name: "اسم"
            },
            inputType: "text",
            name: "EN_NAME",
            validations: []
        },
        {
            type: "input",
            label: {
                en_name: "Group Name",
                ar_name: "أسم المجموعة"
            },
            inputType: "text",
            name: "GROUP_EN_NAME",
            validations: []
        },
        {
            type: "input",
            label: {
                en_name: "Kind Name",
                ar_name: "اسم النوع"
            },
            inputType: "text",
            name: "KIND_NAME",
            validations: [
            ]
        },
        {
            type: "button",
            label: {
                en_name: "Search",
                ar_name: "بحث"
            },
        }
    ];;

    primaryKeyName: string = 'ITEMS_ID'

    queryParams:any;

    constructor(queryParams?) {
        this.queryParams = HelperUtil.createHttpParams(queryParams);
    }

    filterFn(list: any[], filter: Object) {
        let filterObject = {...filter}
        let isFilterEmpty: boolean = isObjectNull(filterObject);
        if (isFilterEmpty) return list;

        removeNullKeys(filterObject);
        

        if(!filterObject)return list;
        
        let result: any[] = [];
        result = list.filter(function (item) {
            for (var key in filterObject) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });
        return result;
    }

    
}

function removeNullKeys(obj){
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            if(!obj[key])delete obj[key]
        }
    }
}

function isObjectNull(obj: Object | null) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
}