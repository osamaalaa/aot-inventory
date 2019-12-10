/**
 * Static helper class with static function
 * 
 * *usage: HelperUtil.<function-name>(args)
 */

import { HttpParams } from '@angular/common/http';
export class HelperUtil {

    /**
   * Converts flat array to tree heirarchy
   * @courtesy : https://stackoverflow.com/a/22367819/7312043
   * @param list : flat array with parent and child ids
   * @param idAttr : id name
   * @param parentAttr : parent id name
   * @param childrenAttr : child key name
   */
    public static treeify(list: any[], idAttr: string, parentAttr: string, childrenAttr: string) {
        if (!idAttr) idAttr = 'id'
        if (!parentAttr) parentAttr = 'parent'
        if (!childrenAttr) childrenAttr = 'children'

        try {
            var treeList = []
            var lookup = {}
            list.forEach(function (obj) {
                lookup[obj[idAttr]] = obj
                obj[childrenAttr] = []
                obj['key'] = obj[idAttr]
                obj['title'] = obj['AR_NAME'] ? obj['AR_NAME'] : obj['EN_NAME']
            })
            list.forEach(function (obj) {
                if (obj[parentAttr] != null) {
                    lookup[obj[parentAttr]][childrenAttr].push(obj)
                } else {
                    treeList.push(obj)
                }
            })
            return treeList
        } catch (e) {
            console.error(e);
            console.error("THE TREE IS BROKEN. MAKE SURE THE TREE HAS HEIRARCHY.")
        }
    }

    /**
     * To tranform Javascript date to string date(25-January-2019)
     * @param date Javascript date
     */
    public static formatDate(date) {
        if (!date) return date
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];


        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + '-' + monthNames[monthIndex] + '-' + year;
    }



    public static createHttpParams(params: any): HttpParams {
        if(!params)return null;
        let httpParams: HttpParams = new HttpParams();
        Object.keys(params).forEach(param => {
            if (params[param]) {
                httpParams = httpParams.set(param, params[param]);
            }
        });

        return httpParams;
    }

}