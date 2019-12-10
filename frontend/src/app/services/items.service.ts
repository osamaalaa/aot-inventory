import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { of } from 'rxjs'
import { url } from 'inspector';
import { CONSTANTS } from 'src/app/services/constants.service';
import { HelperUtil } from '../common/Helper.Util'

@Injectable()
export class ItemsService {
  constructor(private http: HttpClient) { }

  getallitems(): Observable<any> {
    return this.http.get(`/items/getallitems/`)
  }

  getoneitem(item: any): Observable<any> {
    return this.http.get(`/items/getoneitem/` + item)
  }

  getallitemsDetails(): Observable<any> {
    return this.http.get(`/items/itemsDetails/getallitemsDetails/`)
  }

  getallgroups(): Observable<any> {
    return this.http.get(`/items/itemsgroups/getallgroups/`)
  }

  getLookUps(lookupid: any): Observable<any> {
    return this.http.get(`/items/getLookUps/` + lookupid)
  }

  insertnewitem(item: any): Observable<any> {
    return this.http.post(`/items/insertnewitem/`, item)
  }

  getShortagePolicy(): Observable<any> {
    return this.http.get(`/shortagePolicy/getShortagePolicy/`)
  }

  getSmovingPolicy(): Observable<any> {
    return this.http.get(`/shortagePolicy/slowMovingPolicy/getSmovingPolicy/`)
  }

  getTaxSchemes(): Observable<any> {
    return this.http.get(`/taxScheme/getTaxSchemes/`)
  }

  getsubsDiary(): Observable<any> {
    return this.http.get(`/subsDiary/getsubsDiary/`)
  }

  getOnesubsDiary(subID: any): Observable<any> {
    return this.http.get(`/subsDiary/getSubsDiaryByID/` + subID)
  }

  getShortagePolicyByID(ID: any): Observable<any> {
    return this.http.get(`/shortagePolicy/getShortagePolicyByID/` + ID)
  }

  getSmovingPolicyByID(ID: any): Observable<any> {
    return this.http.get(`/shortagePolicy/slowMovingPolicy/getSmovingPolicyByID/` + ID)
  }

  gettaxSchemeByID(ID: any): Observable<any> {
    return this.http.get(`/taxScheme/gettaxSchemeByID/` + ID)
  }

  /** Get Item Templates */
  getItemTemplates(): Observable<any> {
    return this.http.get('/items/itemModule/getallitemTemplate')
  }

  /** Insert new item template */
  insertItemTemplate(value: any): Observable<any> {
    return this.http.post('/items/itemModule/insertnewitemModule', value)
  }

  /** Get item template detail against id */
  getItemTemplateDetail(ITEMS_TEMPLATE_ID: string | number): Observable<any> {
    return this.http.get(`/items/itemModule/getOneItemModule/${ITEMS_TEMPLATE_ID}`)
  }

  /** Update item template */
  updateItemTemplate(ITEMS_TEMPLATE_ID, value: any): Observable<any> {
    /**
     * TODO: Implement with real api and delete the of import
     */
    // return of([])
    return this.http.put(`/items/itemModule/${ITEMS_TEMPLATE_ID}`, value)
  }

  /** Delete Item Template */
  deleteItemTemplate(ITEMS_TEMPLATE_ID: string | number): Observable<any> {
    return this.http.delete(`/items/itemModule/${ITEMS_TEMPLATE_ID}`)
  }

  /** Details of item template against item template id */
  getItemTemplateDetails(ITEMS_TEMPLATE_ID: string | number): Observable<any> {
    return this.http.get(`/itmTempDetails/getOneitmTempDetails/${ITEMS_TEMPLATE_ID}`)
  }

  /** Get charts of account */
  getChartsOfAccounts(): Observable<any> {
    return this.http.get(`/chartOfAccs/getChartOfAccounts`)
  }

  /**Insert new item template details */
  insertItemTemplateDetails(formData: any): Observable<any> {
    return this.http.post(`/itmTempDetails/insertitmTempDetails`, formData)
  }

  InsetSmovingPolicyDetails(formData: any): Observable<any> {
    return this.http.post(`/shortagePolicy/slowMovingPolicy/insertSmovingPolicy`, formData)
  }

  /** Update item template details */
  updateItemTemplateDetails(formData: any): Observable<any> {
    /**
     * TODO: Implement api for update template details
     */
    // return of([]);
    return this.http.put(`/itmTempDetails/updateitmTempDetails`, formData)
  }

  /** Details of item template against item template id details  */
  getItemBalanceDetails(ITEMS_BALANCE_ID: string | number): Observable<any> {
    return this.http.get(`/items/itemBalance/getOneItemBalancesByID/${ITEMS_BALANCE_ID}`)
  }


  getSlowmovingpolicy(SLOW_POLICY_ID: string | number): Observable<any> {
    //  alert("ITEMS_SLOW_POLICY_ID..."+SLOW_POLICY_ID);
    return this.http.get(`/shortagePolicy/slowMovingPolicy/getSmovingPolicyByID/${SLOW_POLICY_ID}`)
  }


  /** Get OpenBalanceItems D */
  getofOpenBalanceItemsD(): Observable<any> {
    return this.http.get(`/openBalanceItemsD/getAllOpenBalanceItemsD`)
  }
  /**Insert new item Balance details */
  insertItemBalanceDetails(formData: any): Observable<any> {
    return this.http.post(`/items/itemBalance/insertItemBalanceDetail`, formData)
  }


  /*
    deleteSmovingPolicy(SLOW_POLICY_ID: string | number): Observable<any> {
      return this.http.delete(`/slowMovingPolicy/deleteSmovingPolicy/${SLOW_POLICY_ID}`)
    }*/


  deleteSmovingPolicy(SLOW_POLICY_ID: string | number): Observable<any> {
    //TODO:REMove delted_by hardcoded
    return this.http.post(`/shortagePolicy/slowMovingPolicy/deleteSmovingPolicy`, {
      DELETED_BY: CONSTANTS.DELETED_BY,
      SLOW_POLICY_ID

    })
  }


  /** Update item Balance details */

  updateItemBalanceDetails(ITEMS_BALANCE_ID, value: any): Observable<any> {
    /**
     * TODO : Api path is wrong. Need to implement a new api
     */
    return this.http.post(`/items/itemBalance/updateItemBalanceDetail/${ITEMS_BALANCE_ID}`, value)
  }

  /** Get tax details */
  getTaxList(): Observable<any> {
    return this.http.get(`/taxScheme/getTaxSchemes`)
  }

  /**Slow moving policy list */
  getSlowMovingPolicyList(): Observable<any> {
    return this.http.get(`/shortagePolicy/slowMovingPolicy/getSmovingPolicy`)
  }

  /**Slow moving policy list */
  getShortagePolicyList(): Observable<any> {
    return this.http.get(`/shortagePolicy/getShortagePolicy`)
  }
  insertnewitemImage(imageid: any, serialno: any, mfile: any): Observable<any> {
    return this.http.post(
      `/itemImage/insertnewImage/` + imageid + `/` + serialno + `?myfile`,
      mfile,
    )
  }

  /**Get item aliases */
  getItemAliases(ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemsaliases/getallitemaliases${queryParam}`)
  }

  /**Get item groups */
  getItemGroups(): Observable<any> {
    return this.http.get(`/items/itemsgroups/getallgroup`)
  }

  /** Get item template alias against id */
  getItemAliasDetail(ITEMS_ALIAS_ID: string | number): Observable<any> {
    return this.http.get(`/items/itemsaliases/getoneitemaliase/${ITEMS_ALIAS_ID}`)

  }

  /** Insert new item alias */
  insertItemAlias(value: any): Observable<any> {
    return this.http.post('/items/itemsaliases/insertNewItemAliase', value)
  }

  /** Update item template */
  updateItemAlias(ITEMS_ALIASES_ID, value: any): Observable<any> {
    /**
     * TODO : Api path is wrong. Need to implement a new api
     */
    return this.http.put(`/items/itemsaliases/${ITEMS_ALIASES_ID}`, value)
  }
  /** Delete Item Alias */
  deleteItemAlias(ITEMS_ALIASES_ID: string | number): Observable<any> {
    return this.http.delete(`/items/itemsaliases/${ITEMS_ALIASES_ID}`)
  }

  /**Get Item Components */
  getItemComponentss(ITEMS_ID: string | number = null, sort = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemscomponents/getallitemacomponents${queryParam}`)
  }
  getItemUnits(ITEMS_ID: string | number = null, sort = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemsUnits/getallitemUnits${queryParam}`)
  }
  getOneItemUnit(UNITS_ID: string  = null, sort = null): Observable<any> {
    return this.http.get(`/items/itemsUnits/getoneitemUnits/${UNITS_ID}`)
  }

  deleteItemUnits(UNITS_ID: string | number): Observable<any> {
    return this.http.post(`/items/itemsUnits/deleteItemUnits`,
    { "DELETED_BY" : 1, "ITEMS_UNITS_ID" : UNITS_ID})
  }

  /** Get Item Components against id */
  getItemComponentsDetail(ITEMS_COMPONENTS_ID: string | number): Observable<any> {
    return this.http.get(`/items/itemscomponents/getoneitemcomponents/${ITEMS_COMPONENTS_ID}`)
  }

  /** Insert new Item Components */
  insertItemComponents(value: any): Observable<any> {
    return this.http.post('/items/itemscomponents/insertnewitemcomponents', value)
  }

  insertItemUnits(value: any): Observable<any> {
    return this.http.post('/items/itemsUnits/insertnewitemUnits', value)
  }

  /** Update item Components  template */
  updateItemComponents(ITEMS_COMPONENTS_ID, value: any): Observable<any> {
    /**
     * TODO : Api path is wrong. Need to implement a new api
     */

    return this.http.put(`/items/itemscomponents/${ITEMS_COMPONENTS_ID}`, value)
  }

  updateItemUnits(ITEMS_UNITS_ID, value: any): Observable<any> {
    return this.http.post(`/items/itemsUnits/updateitemUnits/${ITEMS_UNITS_ID}`, value)
  }

  /** Delete item Components */
  deleteItemComponent(ITEMS_COMPONENTS_ID: string | number): Observable<any> {
    return this.http.delete(`/items/itemscomponents/${ITEMS_COMPONENTS_ID}`)
  }



  /** Get Item Balance */
  getItemBalances(ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemBalance/getAllItemBalance${queryParam}`)
  }

  /** Get Item Balance */
  getItemBalanceUnits(ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemBalance/getAllItemsBalanceUnits${queryParam}`)
  }

  /** Delete Item Balance */
  deleteItemBalance(ITEMS_BALANCE_ID: string | number): Observable<any> {
    return this.http.delete(`/items/itemBalance/${ITEMS_BALANCE_ID}`)
  }

  /** Insert new item balance */
  insertItemBalance(value: any): Observable<any> {
    return this.http.post('/items/itemBalance/insertNewItemBalance', value)
  }

  /**Get all location list */
  getAllStoreLocations(): Observable<any> {
    return this.http.get(`/stores/storesLocation/selectAllstoresLocation`)
  }

  /**Get all store list */
  getAllStore(): Observable<any> {
    return this.http.get(`/stores/selectAllstores`)
  }

  /**Get Item balance against ITEMS_BALANCE_ID */
  getItemBalance(ITEMS_BALANCE_ID: string | number): Observable<any> {
    return this.http.get(`/items/itemBalance/getOneItemBalance/${ITEMS_BALANCE_ID}`)
  }

  getAllItemBalance():Observable<any>{
    return this.http.get(`/items/itemBalance/getAllItemBalance`)
  }

  /** update item balance balance */
  updateItemBalance(ITEMS_BALANCE_ID: string | number, value: any): Observable<any> {
    return this.http.put(`/items/itemBalance/${ITEMS_BALANCE_ID}`, value)
  }

  /** Delete Item Balance */
  deleteItemBalanceUnit(ITEMS_BALANCE_UNITS_ID: string | number): Observable<any> {
    return this.http.delete(`/items/itemBalanceUnits/${ITEMS_BALANCE_UNITS_ID}`)
  }
  /** Delete Item Balance */

  /** Get Open item Balance list */
  getOpenItemBalanceList(): Observable<any> {
    return this.http.get(`/OpenBalanceItems/getOpenbalanceITems`)
  }

  /** Insert new item balance unit */
  insertItemBalanceUnit(value: any): Observable<any> {
    return this.http.post('/items/itemBalance/insertItemBalanceUnits', value)
  }


  /**Get Item balance against ITEMS_BALANCE_UNITS_ID */
  getItemBalanceUnit(ITEMS_BALANCE_UNITS_ID: string | number): Observable<any> {
    return this.http.get(`/items/itemBalance/getOneItemBalanceUnitsByID/${ITEMS_BALANCE_UNITS_ID}`)
  }

  /** update item balance balance */
  updateItemBalanceUnit(ITEMS_BALANCE_UNITS_ID: string | number, value: any): Observable<any> {
    return this.http.put(`/items/itemBalance/itemBalanceUnits/${ITEMS_BALANCE_UNITS_ID}`, value)
  }

  /** Get Item Images */
  getItemImages(ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/itemImage${queryParam}`)
  }
  /** Get Item Images */
  deleteImage(ITEMS_IMAGE_ID: string | number = null): Observable<any> {
    return this.http.delete(`/itemImage/${ITEMS_IMAGE_ID}`)
  }

  /** Delete Item  */
  deleteItem(ITEMS_ID: string | number): Observable<any> {
    return this.http.delete(`/items/${ITEMS_ID}`)
  }


  /** update item  */
  updateItem(ITEMS_ID: string | number, value: any): Observable<any> {
    return this.http.put(`/items/updateItem/${ITEMS_ID}`, value)
  }

  /**Get item Substitution */
  getItemSubstitution(ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemsSubs/getItemsSubs${queryParam}`)
  }

  /** Delete Item Alias */
  deleteItemSubstitution(ITEMS_SUBSTITUTIONS_ID: string | number): Observable<any> {
    return this.http.delete(`/items/itemsSubs/${ITEMS_SUBSTITUTIONS_ID}`)
  }

  /** Insert new item balance unit */
  insertItemSubstitution(value: any): Observable<any> {
    return this.http.post('/items/itemsSubs/insertItemSubs', value)
  }

  getOneItemSubstitution(ITEMS_SUBSTITUTIONS_ID: string | number): Observable<any> {
    return this.http.get(`/items/itemsSubs/getItemsSubsByID/${ITEMS_SUBSTITUTIONS_ID}`)
  }

  /** update item substituton balance */
  updateItemSubstitution(ITEMS_SUBSTITUTIONS_ID: string | number, value: any): Observable<any> {
    return this.http.post(`/items/itemsSubs/updateItemSubs/${ITEMS_SUBSTITUTIONS_ID}`, value)
  }
  ////
  /** Get Item Balance */
  getItemBalancesDetails(ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemBalance/getAllItemsBalanceDetail${queryParam}`)
  }

  /** Details of item  against item  id */
  getItemDetails(ITEMS_ID: string | number): Observable<any> {
    return this.http.get(`/items/itemsDetails/getoneitemDetails/${ITEMS_ID}`)
  }

  /**Insert new item details */
  insertItemDetails(formData: any): Observable<any> {
    return this.http.post(`/items/itemsDetails/insertnewitemDetails`, formData)
  }

  /** Update item  details */
  updateItemDetails(ITEMS_ID: string | number, formData: any): Observable<any> {
    /**
     * TODO: Implement api for update template details
     */
    // return of([]);
    return this.http.post(`/items/itemsDetails/updateItemDetails/${ITEMS_ID}`, formData)
  }

  getallitemgroup(ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemsgroups/getallgroups${queryParam}`)
  }
  updateItemGroup(items_group_id: string | number = null, formData): Observable<any> {
    return this.http.post(`/items/itemsgroups/updateItemGroup/${items_group_id}`, formData)
  }

  /**get item group */
  getItemGroup(ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemsgroups/getallgroups${queryParam}`)
  }
  getoneitemgroup(item: any): Observable<any> {
    return this.http.get(`/items/itemsgroups/getoneitemsgroup/` + item)
  }
  postEventDefs(def: any): Observable<any> {
    return this.http.post(`/items/itemsgroups/insertNewGroup`, def)
  }

  /** Delete Item Group */
  deleteItemGroup(ITEMS_GROUP_ID: string | number): Observable<any> {
    return this.http.delete(`/items/itemsgroups/deleteItemGroup/${ITEMS_GROUP_ID}`)
  }

  getallitemsupplier(ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = ITEMS_ID ? `?ITEMS_ID=${ITEMS_ID}` : ''
    return this.http.get(`/items/itemSuppliers/getAllitemSuppls${queryParam}`)
  }
  insertnewitemsup(def: any): Observable<any> {
    return this.http.post(`/items/itemSuppliers/insertnewSupplier`, def)
  }
  getoneitemsup(item: any): Observable<any> {
    return this.http.get(`/items/itemSuppliers/selectOneitemsupplier/` + item)
  }
  updateItemSupplier(ITEMS_SUPPLIERS_ID, value: any): Observable<any> {
    return this.http.post(`/items/itemSuppliers/updateitemsSuppliers/${ITEMS_SUPPLIERS_ID}`, value)
  }
  /** Delete Item Supplier */

  deleteItemSupplier(ITEMS_SUPPLIERS_ID: string | number): Observable<any> {
    return this.http.post(`/items/itemSuppliers/deleteitemSupplier`, {
      ITEMS_SUPPLIERS_ID,
      DELETED_BY: CONSTANTS.DELETED_BY
    })
  }

  getsuppliers(): Observable<any> {
    return this.http.get(`/suppliers/getSuppliers/`)
  }

  getSupplierStatitics() {
    return this.http.get(`/statistics/getitemSuppliers/`)
  }

  /** Get Item Balance */
  getDemandData(): Observable<any> {
    return this.http.get(`/dspdocumentitems/getItemsInDSPById`)
  }


  checkItemCode(ITEM_CODE:string):Observable<any>{
    let params = HelperUtil.createHttpParams({ITEM_CODE})
    return this.http.get('/items/item-code-check',{params})
  }
}
