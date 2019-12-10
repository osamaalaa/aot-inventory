import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import { CONSTANTS } from './constants.service';

@Injectable()
export class GeneralSetupService {
  constructor(private http: HttpClient) { }

  addSupplier(body: any): Observable<any> {
    return this.http.post(`/suppliers/insertSupplier`, body);
  }
  updateSupplier(SUPPLIER_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/suppliers/updateSupplier/${SUPPLIER_ID}`, body)
  }

  getSupplierall(): Observable<any> {
    return this.http.get('/suppliers/getSuppliers')
  }
  /** Details of Supplier   id */
  getOneSupplier(SUPPLIER_ID: string | number): Observable<any> {

    return this.http.get(`/suppliers/getSupplierByID/${SUPPLIER_ID}`)
  }

  getsubsDiary(): Observable<any> {
    return this.http.get('/taxScheme/getTaxSchemes')
  }
  getTaxScheme(): Observable<any> {
    return this.http.get('/taxScheme/getTaxSchemes')
  }
  /** Delete Supplier */
  deleteSupplier(SUPPLIER_ID: string | number): Observable<any> {
    return this.http.delete(`/suppliers/deleteSupplier/${SUPPLIER_ID}`)
  }

  addShortagePolicy(body: any): Observable<any> {
    return this.http.post(`/shortagePolicy/insertShortagePolicy`, body);
  }
  updateShortagePolicy(SHORTAGE_POLICY_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/shortagePolicy/updateShortagePolicy/${SHORTAGE_POLICY_ID}`, body)
  }
  /** Details of Shortage Policy   id */
  getOneShortagePolicy(SHORTAGE_POLICY_ID: string | number): Observable<any> {

    return this.http.get(`/shortagePolicy/getShortagePolicyByID/${SHORTAGE_POLICY_ID}`)
  }
  getShortagePolicyall(): Observable<any> {
    return this.http.get('/shortagePolicy/getShortagePolicy')
  }
  /** Delete Shortage Policy */
  deleteShortagePolicy(SHORTAGE_POLICY_ID: string | number): Observable<any> {
    //TODO:REMove delted_by hardcoded
    return this.http.post(`/shortagePolicy/deleteShortagePolicy`, {
      DELETED_BY: CONSTANTS.DELETED_BY,
      SHORTAGE_POLICY_ID

    })
  }

  getChartOfAccounts(): Observable<any> {
    return this.http.get(`/chartOfAccs/getChartOfAccounts`)
  }

  addChartOfAccounts(formData: any): Observable<any> {
    return this.http.post(`/chartOfAccs/insertChartOfAcc`, formData);
  }

  getOneChartOfAccount(CHART_OF_ACCOUNTS_ID: string | number): Observable<any> {
    return this.http.get(`/chartOfAccs/getChartOfAccounts/${CHART_OF_ACCOUNTS_ID}`)
  }


  updateChartOfAccount(CHART_OF_ACCOUNTS_ID: string | number, formData: any): Observable<any> {
    return this.http.post(`/chartOfAccs/updateChartOfAccById/${CHART_OF_ACCOUNTS_ID}`, formData)
  }

  deleteChartOfAccount(CHART_OF_ACCOUNTS_ID: string | number): Observable<any> {
    //TODO:REMove delted_by hardcoded
    return this.http.post(`/chartOfAccs/deleteChartOfAcc`, {
      CHART_OF_ACCOUNTS_ID,
      DELETED_BY: CONSTANTS.DELETED_BY
    })
  }

  addSubsidiaryInv(formData: any): Observable<any> {
    return this.http.post(`/subsDiary/insertSubidiary`, formData)
  }

  updateSubsidiaryInv(SUBSIDIARY_ID: string | number, formData: any): Observable<any> {
    return this.http.post(`/subsDiary/updateSubsDiary/${SUBSIDIARY_ID}`, formData)
  }

  getSubsidiaryInv(): Observable<any> {
    return this.http.get(`/subsDiary/getsubsDiary`)
  }

  getOneSubsidiaryInv(SHORTAGE_POLICY_ID: string | number): Observable<any> {

    return this.http.get(`/subsDiary/getSubsDiaryByID/${SHORTAGE_POLICY_ID}`)
  }


  deleteSubsidiaryInvSetup(SUBSIDIARY_ID: string | number): Observable<any> {
    //TODO:REMove delted_by hardcoded
    return this.http.post(`/subsDiary/deletesubsDiary`, {
      SUBSIDIARY_ID,
      DELETED_BY: CONSTANTS.DELETED_BY
    })
  }

  getalltaxschemes(): Observable<any> {
    return this.http.get(`/taxScheme/getTaxSchemes/`)
  }

  getalltaxschemesdetails(TAX_SCHEME_ID: string | number): Observable<any> {
    return this.http.get(`/taxScheme/TaxSchemeDetail/gettaxSchemeDetailByTaxSchemaID/${TAX_SCHEME_ID}`)
  }

  deletetaxscheme(TAX_SCHEME_ID: string | number): Observable<any> {

    return this.http.post(`/taxScheme/deletetaxScheme/`, {TAX_SCHEME_ID: TAX_SCHEME_ID} )
  }

  insertTaxScheme(formData: any): Observable<any> {
    return this.http.post(`/taxScheme/inserttaxScheme`, formData)
  }
  insertTaxSchemeDetails(formData: any): Observable<any> {
    return this.http.post(`/taxScheme/TaxSchemeDetail/inserttaxSchemeDetail`, formData)
  }

  gettaxschemeById(TAX_SCHEME_ID: string | number): Observable<any> {
    return this.http.get(`/taxScheme/gettaxSchemeByID/${TAX_SCHEME_ID}`)
  }

  updateTaxScheme(formData: any, TAX_SCHEME_ID: string | number): Observable<any> {
    return this.http.post(`/taxScheme/updateTaxScheme/${TAX_SCHEME_ID}`, formData)
  }

  updateTaxSchemeDetails(formData: any, TAX_SCHEME_ID: string | number): Observable<any> {
    return this.http.post(`/taxScheme/TaxSchemeDetail/updateTaxSchemeDetail/${TAX_SCHEME_ID}`, formData)
  }  
  
  
  deletetaxschemedetails (TAX_SCHEME_DETAIL_ID: string | number): Observable<any> {

    return this.http.post(`/taxScheme/TaxSchemeDetail/deletetaxSchemeDetail/`, {TAX_SCHEME_DETAIL_ID: TAX_SCHEME_DETAIL_ID} )
  }








/** Slow Moving Policy API's */

  getSmovingPolicy(): Observable<any> {
    return this.http.get(`/shortagePolicy/slowMovingPolicy/getSmovingPolicy/`)
  }

  getSmovingPolicyByID(ID: any): Observable<any> {
    return this.http.get(`/shortagePolicy/slowMovingPolicy/getSmovingPolicyByID/` + ID)
  }

  InsetSmovingPolicyDetails(formData: any): Observable<any> {
    return this.http.post(`/shortagePolicy/slowMovingPolicy/insertSmovingPolicy`, formData)
  }



  getSlowmovingpolicy(SLOW_POLICY_ID: string | number): Observable<any> {
    //  alert("ITEMS_SLOW_POLICY_ID..."+SLOW_POLICY_ID);
    return this.http.get(`/shortagePolicy/slowMovingPolicy/getSmovingPolicyByID/${SLOW_POLICY_ID}`)
  }


  updateSlowmovingpolicy(SLOW_POLICY_ID, formData: any): Observable<any> {
    /**
     * TODO : Api path is wrong. Need to implement a new api
     */
    return this.http.post(`/shortagePolicy/updateMovingPolicy/${SLOW_POLICY_ID}`, formData)
  }


  deleteSmovingPolicy(SLOW_POLICY_ID: string | number): Observable<any> {
    //TODO:REMove delted_by hardcoded
    return this.http.post(`/shortagePolicy/slowMovingPolicy/deleteSmovingPolicy`, {
      DELETED_BY: CONSTANTS.DELETED_BY,
      SLOW_POLICY_ID

    })
  }

  /**Slow moving policy list */
  getSlowMovingPolicyList(): Observable<any> {
    return this.http.get(`/shortagePolicy/slowMovingPolicy/getSmovingPolicy`)
  }



  /** Inventory Periods API's */

  getAllInventoryPeriod(): Observable<any> {
    return this.http.get(`/InvPeriod/getAllInventoryPeriod/`)
  }

  getOneInventoryPeriod(INVENTORY_PERIODS_ID: string | number): Observable<any> {

    return this.http.get(`/InvPeriod/getOneInventoryPeriod/${INVENTORY_PERIODS_ID}`)
  }

  insertInventoryPeriod(formData: any): Observable<any> {
    return this.http.post(`/InvPeriod/insertInventoryPeriod`, formData)
  }

  updateInventoryPeriod(INVENTORY_PERIODS_ID, formData: any): Observable<any> {

    return this.http.post(`/InvPeriod/updateInventoryPeriod/${INVENTORY_PERIODS_ID}`, formData)

  }

  deleteInventoryPeriod(INVENTORY_PERIODS_ID: string | number): Observable<any> {
    //TODO:REMove delted_by hardcoded
    return this.http.post(`/InvPeriod/deleteInventoryPeriod`, {
      DELETED_BY: CONSTANTS.DELETED_BY,
      INVENTORY_PERIODS_ID
    })
  }

}
