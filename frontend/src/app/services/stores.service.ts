import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import { CONSTANTS } from './constants.service';

@Injectable()
export class StoresService {
  constructor(private http: HttpClient) { }

  getAllStores(): Observable<any> {
    return this.http.get(`/stores/selectAllstores`);
  }




  getallgroups(): Observable<any> {
    return this.http.get(`/items/itemsgroups/getallgroups/`)
  }

  deleteStore(STORES_ID: string | number): Observable<any> {
    /**
     * TODO: Remove hardcoded deleted by
     */
    return this.http.post(`/stores/deleteStores`, { STORES_ID: STORES_ID, DELETED_BY: CONSTANTS.DELETED_BY });
  }


  getChartsOfAccounts(): Observable<any> {
    return this.http.get(`/chartOfAccs/getChartOfAccounts`);
  }

  addStore(body: any): Observable<any> {
    return this.http.post(`/stores/insertnewStores`, body);
  }

  updateStore(STORES_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/stores/updateStoresById/${STORES_ID}`, body)
  }

  getOneStore(STORES_ID: string | number): Observable<any> {
    return this.http.get(`/stores/selectOnestores/${STORES_ID}`)
  }

  getStoreItems(STORES_ID: string | number = null): Observable<any> {
    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    return this.http.get(`/stores/storesItems/getStoresItems${queryParam}`)
  }

  deleteStoreItem(STORES_ITEMS_ID: string | number): Observable<any> {
    /**
     * TODO: Remove hardcoded deleted by
     */
    return this.http.post(`/stores/storesItems/deleteStoreItem`, { STORES_ITEMS_ID: STORES_ITEMS_ID, DELETED_BY: CONSTANTS.DELETED_BY });
  }

  addStoreItem(body: any): Observable<any> {
    return this.http.post(`/stores/storesItems/insertStoresItems`, body);
  }

  getallitems(): Observable<any> {
    return this.http.get(`/items/getallitems/`)
  }

  getOneStoreItem(STORES_ITEMS_ID: string | number): Observable<any> {
    return this.http.get(`/stores/storesItems/getStoreItemByID/${STORES_ITEMS_ID}`)
  }

  updateStoreItem(STORES_ITEMS_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/stores/storesItems/updateStoreItem/${STORES_ITEMS_ID}`, body)
  }

  getStoreItemsNo(STORES_ID: string | number = null): Observable<any> {
    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    return this.http.get(`/storesItemsNO/getAllStoresItemsNO${queryParam}`)
  }

  deleteStoreItemNo(STORES_ITEMS_NO_ID: string | number): Observable<any> {
    /**
     * TODO: Remove hardcoded deleted by
     */
    return this.http.post(`/storesItemsNo/deleteStoreItemNo`, { STORES_ITEMS_NO_ID: STORES_ITEMS_NO_ID, DELETED_BY: CONSTANTS.DELETED_BY });
  }

  addStoreItemNo(body: any): Observable<any> {
    return this.http.post(`/storesItemsNO/insertStoresItemsNO`, body);
  }

  getOneStoreItemNo(STORES_ITEMS_NO_ID: string | number): Observable<any> {
    return this.http.get(`/storesItemsNO/getOneStoresItemsNO/${STORES_ITEMS_NO_ID}`)
  }

  updateStoreItemNo(STORES_ITEMS_NO_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/storesItemsNO/updateStoresItemsNO/${STORES_ITEMS_NO_ID}`, body)
  }

  getStoreDocumentTypes(STORES_ID: string | number = null): Observable<any> {
    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    return this.http.get(`/stores/storesDocTypes/getAllstoresDocTypes${queryParam}`)
  }

  deleteStoreDocumentType(STORES_DOCUMENT_TYPES_ID: string | number): Observable<any> {
    /**
     * TODO: Remove hardcoded deleted by
     */
    return this.http.post(`/stores/storesDocTypes/deleteStoresDocById`, { STORES_DOCUMENT_TYPES_ID: STORES_DOCUMENT_TYPES_ID, DELETED_BY: CONSTANTS.DELETED_BY });
  }

  getallDocumentTypeList(): Observable<any> {
    return this.http.get(`/DocTypes/getDocsTypes/`)
  }
  getAllInventoryPeriod():Observable<any>{
    return this.http.get(`/InvPeriod/getAllInventoryPeriod`)
  }
  addStoreDocumentType(body: any): Observable<any> {
    return this.http.post(`/stores/storesDocTypes/insertstoresDocTypes`, body);
  }

  getOneStoreDocumentTypes(STORES_DOCUMENT_TYPES_ID: string | number = null): Observable<any> {
    return this.http.get(`/stores/storesDocTypes/getOnestoresDocTypes/${STORES_DOCUMENT_TYPES_ID}`)
  }

  updateStoreDocumentType(STORES_DOCUMENT_TYPES_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/stores/storesDocTypes/updateStoresDocById/${STORES_DOCUMENT_TYPES_ID}`, body)
  }

  /** Insert stores items group data */
  insertstoresitemgroupdata(value: any): Observable<any> {
    return this.http.post('/stores/storesItemsGroup/insertStoresItemsGroups', value)
  }
  /**Get Stores Items Group Data  by Id*/
  getStoresItemsGroupData(STORES_ITEMS_GROUP_ID: string | number): Observable<any> {
    return this.http.get(`/stores/storesItemsGroup/getStoreItemGroupByID/${STORES_ITEMS_GROUP_ID}`)
  }
  /** Update stores items group   data */
  updateStoresItemsGroupData(STORES_ITEMS_GROUP_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/stores/storesItemsGroup/updateStoreItemsGroup/${STORES_ITEMS_GROUP_ID}`, body)
  }

  /** Delete  stores items group  data */
  deleteStoresItemGroupComponents(STORES_ITEMS_GROUP_ID: string | number): Observable<any> {

    return this.http.post(`/stores/deleteStorese`, { Stores_Item_Id: STORES_ITEMS_GROUP_ID, DELETED_BY: CONSTANTS.DELETED_BY });
  }
  ///
  /**Get Stores Items Group No Data  */
  storesitemgroupnoComponentss(STORES_ID: string | number = null, sort = null): Observable<any> {
    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    return this.http.get(`/storesItemsGroupNO/getAllstoresItemsGroupNO${queryParam}`)
  }

  /** Insert stores items group No data */
  insertstoresitemgroupnodata(value: any): Observable<any> {
    return this.http.post('/storesItemsGroupNO/insertstoresItemsGroupNO', value)
  }
  /**Get Stores Items Group No Data  by Id*/
  getStoresItemsGroupNoData(STORES_ITEMS_GROUP_NO_ID: string | number): Observable<any> {
    return this.http.get(`/storesItemsGroupNO/getOnestoresItemsGroupNO/${STORES_ITEMS_GROUP_NO_ID}`)
  }
  /** Update stores items group no  data */
  updateStoresItemsGroupNoData(STORES_ITEMS_GROUP_NO_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/storesItemsGroupNO/updateStoresItemsGroupNO/${STORES_ITEMS_GROUP_NO_ID}`, body)
  }

  /** Delete  stores items group no data */
  deleteStoresItemGroupNoComponents(STORES_ITEMS_GROUP_NO_ID: string | number): Observable<any> {

    return this.http.post(`/storesItemsGroupNO/deleteStoreseItemsGroupNo`, { Stores_Items_Group_No_Id: STORES_ITEMS_GROUP_NO_ID, DELETED_BY: CONSTANTS.DELETED_BY });
  }

  /**Get Stores Items Group Data  */
  storesitemgroupComponentss(STORES_ID: string | number = null, sort = null): Observable<any> {
    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    return this.http.get(`/stores/storesItemsGroup/getStoresItemsGroup${queryParam}`)
  }


  getStoreLocations(STORES_ID: string | number = null): Observable<any> {
    let queryParam = STORES_ID ? `?STORES_ID=${STORES_ID}` : ''
    return this.http.get(`/stores/storesLocation/selectAllstoresLocation${queryParam}`)
  }

  deleteStoreLocation(STORES_LOCATIONS_ID: string | number): Observable<any> {
    /**
     * TODO: Remove hardcoded deleted by
     */
    return this.http.post(`/stores/storesLocation/deletestoresLocation`, { STORES_LOCATIONS_ID: STORES_LOCATIONS_ID, DELETED_BY: CONSTANTS.DELETED_BY });
  }
   

  getOneStoreLocations(STORES_LOCATIONS_ID: string | number = null): Observable<any> {
    return this.http.get(`/stores/storesLocation/selectOnestoresLocation/${STORES_LOCATIONS_ID}`)
  }

  addStoreLocation(body: any): Observable<any> {
    return this.http.post(`/stores/storesLocation/insertnewstoresLocation`, body);
  }

  updateStoreLocation(STORES_LOCATIONS_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/stores/updatestoresLocation/${STORES_LOCATIONS_ID}`, body)
  }




  getLookUps(lookupid: any): Observable<any> {
    return this.http.get(`/items/getLookUps/` + lookupid)
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(`/empolyees/getAllEmployees/`)
  }

  
  





  getRequestListByRequestType(requestType): Observable<any>{
    return this.http.get(`/requests/getOneRequestByType/${requestType}`)
  }

  

  getTransactionItems(): Observable<any> {
      return this.http.get(`/transactionsItems/getTransactionItems`)
  }

  fetchApprovalList():Observable<any>{
    let employeeid = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID;
    return this.http.get(`/requests/getRequest/${employeeid}/0`)
  }





}
