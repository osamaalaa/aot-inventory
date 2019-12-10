import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CONSTANTS } from './constants.service';
import { HelperUtil } from '../common/Helper.Util';
import { delay } from 'rxjs/operators';

@Injectable()
export class OperationsService {
  constructor(private http: HttpClient) { }
  getallitems(): Observable<any> {
    return this.http.get(`/items/getallitems/`)
  }
  getAllStores(): Observable<any> {
    return this.http.get(`/stores/selectAllstores`);
  }

  getOneInvOpenBalance(INV_OPEN_BALANCE_ID: string | number = null): Observable<any> {
    return this.http.get(`/OpenBalance/getOneOpenBalanceByID/${INV_OPEN_BALANCE_ID}`)
  }

  getOneTransfer(TRANSFER_ID: string | number = null): Observable<any> {
    return this.http.get(`/transfer/getOneTransfer/${TRANSFER_ID}`)
  }
  getOneTransferR(TRANSFER_R_ID: string | number = null): Observable<any> {
    return this.http.get(`/TransferR/getOneInvTransferR/${TRANSFER_R_ID}`)
  }

  getOneRcvInspection(DOCUMENT_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvInspection/getOneRcvInspection/${DOCUMENT_ID}`)
  }
  getOneRcvTemp(DOCUMENT_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvTempo/getRcvTempobyID/${DOCUMENT_ID}`)
  }

  /**Get One Rcv Document */
  getOneRcvDocument(DOCUMENT_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvDocument/getOneRcvDocument/${DOCUMENT_ID}`)
  }

  getAllRcvDocumentITems(DOCUMENT_ID: string | number = null): Observable<any> {
    const queryParam = DOCUMENT_ID ? `?DOCUMENT_ID=${DOCUMENT_ID}` : ''
    return this.http.get(`/rcvDocItems/getAllRcvDocumentITems/${queryParam}`)
  }
  getLookUps(lookupid: any): Observable<any> {
    return this.http.get(`/items/getLookUps/` + lookupid)
  }

  getRcvDocumentItemsDetailsAgainstRcvDocumentsId(RCV_DOCUMENT_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = RCV_DOCUMENT_ITEMS_ID ? `?RCV_DOCUMENT_ITEMS_ID=${RCV_DOCUMENT_ITEMS_ID}` : ''
    return this.http.get(`/rcvDoctItemsD/getAllrcvDoctItemsD${queryParam}`)
  }
  getRcvInspectionItemsDetailsAgainstRcvDocumentsId(RCV_INSPECTION_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = RCV_INSPECTION_ITEMS_ID ? `?RCV_INSPECTION_ITEMS_ID=${RCV_INSPECTION_ITEMS_ID}` : ''
    return this.http.get(`/rcvInspectionItemsD/getAllrcvInspectionItemsD${queryParam}`)
  }

  /**Insert Rcv Document Items*/
  insertNewRcvDocumentITems(body: any): Observable<any> {
    return this.http.post(`/rcvDocItems/insertNewRcvDocumentITems`, body);
  }


  insertrcvDoctItemsD(body: any): Observable<any> {
    return this.http.post(`/rcvDoctItemsD/insertrcvDoctItemsD`, body);
  }

  /**Update Rcv Document Items*/
  updateRcvDocumentItems(RCV_DOCUMENT_ITEMS_ID: string | number, formData: any): Observable<any> {
    return this.http.post(`/rcvDocItems/updateRcvDocumentItems/${RCV_DOCUMENT_ITEMS_ID}`, formData)
  }

  /**Update Rcv Document Items Details*/
  updatercvDoctItemsD(RCV_DOCUMENT_ITEMS_D_ID, formData): Observable<any> {
    return this.http.post(`/rcvDoctItemsD/updatercvDoctItemsD/${RCV_DOCUMENT_ITEMS_D_ID}`, formData)
  }

  deleteRcvDocumentItems(RCV_DOCUMENT_ITEMS_ID): Observable<any> {
    return this.http.post('/rcvDocItems/deleteRcvDocumentItems', {
      DELETED_BY: 1,
      RCV_DOCUMENT_ITEMS_ID

    })
  }
  deleteInspectionItems(RCV_INSPECTION_ITEMS_ID): Observable<any> {
    return this.http.post('/rcvInspectionItems/deleteRcvInspectionItems', {
      DELETED_BY: 1,
      RCV_INSPECTION_ITEMS_ID

    })
  }
  deleteTempItems(RCV_TEMP_ITEMS_ID): Observable<any> {
    return this.http.post('/rcvTempo/rcvTmpoItems/deleteTmpItem', {
      DELETED_BY: 1,
      RCV_TEMP_ITEMS_ID

    })
  }



  /**Delete Rcv Document Items Details*/

  deleteRcvDocumentItemsDetails(RCV_DOCUMENT_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.post('/rcvDoctItemsD/deleteRcvDocumentItemsDetails', {
      DELETED_BY: 1,
      RCV_DOCUMENT_ITEMS_D_ID

    })
  }

  /**Delete Rcv Document Items Details*/

  deleteInspectionItemsDetails(RCV_INSPECTION_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.post('/rcvInspectionItemsD/deleteRcvInspectionItemsD', {
      DELETED_BY: 1,
      RCV_INSPECTION_ITEMS_D_ID

    })
  }

  deleteTempItemsDetails(RCV_TEMP_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.post('/rcvTempoItemsD/deleteRcvTempoItemsD', {
      DELETED_BY: 1,
      RCV_TEMP_ITEMS_D_ID

    })
  }

  /**Get All Rcv Document Items Details*/
  getAllrcvDoctItemsD(): Observable<any> {
    return this.http.get(`/rcvDoctItemsD/getAllrcvDoctItemsD`)
  }


  /**Insert Rcv Inspection Items*/
  insertNewRcvInspectionITems(body: any): Observable<any> {
    return this.http.post(`/rcvInspectionItems/insertrcvInspectionItems`, body);
  }
  /**Insert Rcv Inspection Items*/
  insertNewRcvTempITems(body: any): Observable<any> {
    return this.http.post(`/rcvTempo/rcvTmpoItems/insertTmpItem`, body);
  }

  /**Insert Rcv Document Items Details*/

  insertrcvInspectiontItemsD(body: any): Observable<any> {
    return this.http.post(`/rcvInspectionItemsD/insertrcvInspectionItemsD`, body);
  }
  insertrcvTempItemsD(body: any): Observable<any> {
    return this.http.post(`/rcvTempoItemsD/insertrcvTmpoItemsD`, body);
  }

  /**Add Rcv Document */
  insertRcvDocument(formData: any): Observable<any> {
    return this.http.post(`/rcvDocument/insertRcvDocument`, formData)
  }
  /**Add Rcv Document */
  insertRcvInspection(formData: any): Observable<any> {
    return this.http.post(`/rcvInspection/insertNewRcvInspection`, formData)
  }
  /**Add Rcv Document */
  insertRcvTemp(formData: any): Observable<any> {
    return this.http.post(`/rcvTempo/insertRcvTempo`, formData)
  }

  /**Get Rcv DocumentById */
  getRcvTemporaryAgainstStoreId(STORES_ID: string = null, DOCUMENT_STATUS): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID, DOCUMENT_STATUS })
    return this.http.get(`/rcvTempo/getRcvTempo`, { params })
  }



  /**Update Rcv Document */
  updateRcvDocument(RCV_DOCUMENT_ID, formData): Observable<any> {
    return this.http.post(`/rcvDocument/updateRcvDocument/${RCV_DOCUMENT_ID}`, formData)
  }

  /**Update Rcv Document */
  updateRcvInspection(DOCUMENT_ID, formData): Observable<any> {
    return this.http.post(`/rcvInspection/updateRcvInspectionById/${DOCUMENT_ID}`, formData)
  }

  /**Update Rcv Document */
  updateRcvTemporary(DOCUMENT_ID, formData): Observable<any> {
    return this.http.post(`/rcvTempo/updateRcvTempoById/${DOCUMENT_ID}`, formData)
  }


  /**Update Rcv Document Items*/
  updateRcvInspectionItems(RCV_INSPECTION_ITEMS_ID: string | number, formData: any): Observable<any> {
    return this.http.post(`/rcvInspectionItems/updatercvInspectionItems/${RCV_INSPECTION_ITEMS_ID}`, formData)
  }
  /**Update Rcv Document Items*/
  updateRcvTemporaryItems(RCV_TEMP_ITEMS_ID: string | number, formData: any): Observable<any> {
    return this.http.post(`/rcvTempo/updateRcvTempoById/${RCV_TEMP_ITEMS_ID}`, formData)
  }



  /**Update Rcv Document Items Details*/
  updateRcvInspectionItemsD(RCV_INSPECTION_ITEMS_D_ID, formData): Observable<any> {
    return this.http.post(`/rcvInspectionItemsD/updatercvInspectionItemsD/${RCV_INSPECTION_ITEMS_D_ID}`, formData)
  }
  /**Update Rcv Document Items Details*/
  updatercvTempItemsD(RCV_TEMP_ITEMS_D_ID, formData): Observable<any> {
    return this.http.post(`/rcvTempoItemsD/updatercvTmpoItemsD/${RCV_TEMP_ITEMS_D_ID}`, formData)
  }


  /**Delete Rcv Document */
  deleteRcvDocument(DOCUMENT_ID: string | number): Observable<any> {
    return this.http.post('/rcvDocument/deleteRcvDocument', {
      DELETED_BY: CONSTANTS.DELETED_BY,
      DOCUMENT_ID

    })
  }
  /**Delete Rcv Document */
  deleteRcvInspection(DOCUMENT_ID: string | number): Observable<any> {
    return this.http.post('/rcvInspection/deleteRcvInspection', {
      DELETED_BY: CONSTANTS.DELETED_BY,
      DOCUMENT_ID

    })
  }
  /**Delete Rcv Document */
  deleteRcvTemporary(DOCUMENT_ID: string | number): Observable<any> {
    return this.http.post('/rcvTempo/deleteRcvTempo', {
      DELETED_BY: CONSTANTS.DELETED_BY,
      DOCUMENT_ID

    })
  }

  getallDocumentTypes(): Observable<any> {
    return this.http.get(`/DocTypes/getDocsTypes`)
  }

  getallInventoryPeriod(): Observable<any> {
    return this.http.get(`/InvPeriod/getAllInventoryPeriod`)
  }

  getSupplierall(): Observable<any> {
    return this.http.get('/suppliers/getSuppliers')
  }

  /**Getall Base Document Id's */
  getAllBaseDocumentId(): Observable<any> {
    return this.http.get(`/rcvTempo/getRcvTempo`)
  }


  getBaseDocumentTypes(): Observable<any> {
    return this.http.get(`/DocTypes/getDocsTypes`)
  }

  /**Get Rcv DocumentById */
  getRcvDocumentAgainstStoreId(STORES_ID: string = null, DOCUMENT_STATUS): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID, DOCUMENT_STATUS })
    return this.http.get(`/rcvDocument/getAllRcvDocument`, { params })
  }


  /**Get Rcv DocumentById */
  getRcvInspectionAgainstStoreId(STORES_ID: string = null, DOCUMENT_STATUS): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID, DOCUMENT_STATUS })
    return this.http.get(`/rcvInspection/getAllRcvInspection`, { params })
  }
  getAllRcvInspectionITems(DOCUMENT_ID: string | number = null): Observable<any> {
    const queryParam = DOCUMENT_ID ? `?DOCUMENT_ID=${DOCUMENT_ID}` : ''
    return this.http.get(`/rcvInspectionItems/getAllrcvInspectionItems/${queryParam}`)
  }

  getAllRcvTempITems(DOCUMENT_ID: string | number = null): Observable<any> {
    const queryParam = DOCUMENT_ID ? `?DOCUMENT_ID=${DOCUMENT_ID}` : ''
    return this.http.get(`/rcvTempo/rcvTmpoItems/getTmpItems/${queryParam}`)
  }
  /** Update */
  updateInvTransferItems(INV_TRANSFER_ITEMS_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/transferItems/updatetransferItemsById/${INV_TRANSFER_ITEMS_ID}`, body)
  }

  getOneInvTransferItems(INV_TRANSFER_ITEMS_ID: string | number = null): Observable<any> {
    return this.http.get(`/transferItems/getOnetransferItems/${INV_TRANSFER_ITEMS_ID}`)
  }

  /**Rcv Document API'S */

  /**Get Rcv Documents */
  getRcvDocuments(): Observable<any> {
    return this.http.get(`/rcvDocument/getAllRcvDocument`)
  }


  /**Get One Rcv Document Items */
  getOneRcvItemsDocument(RCV_DOCUMENT_ITEMS_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvDocItems/getOneRcvDocumentITems/${RCV_DOCUMENT_ITEMS_ID}`)
  }


  /**Get One Rcv Document Items Details */
  getOnercvDoctItemsD(RCV_DOCUMENT_ITEMS_D_ID: string | number = null): Observable<any> {
    return this.http.get(`/rcvDoctItemsD/getOnercvDoctItemsD/${RCV_DOCUMENT_ITEMS_D_ID}`)
  }


  getRcvTempItemsDetailsAgainstRcvtempId(RCV_TEMP_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = RCV_TEMP_ITEMS_ID ? `?RCV_TEMP_ITEMS_ID=${RCV_TEMP_ITEMS_ID}` : ''
    return this.http.get(`/rcvTempoItemsD/getAllrcvTmpoItemsD${queryParam}`)
  }

  getInvBalanceItemDetailsAgainstInvOpenBalanceId(INV_OPEN_BALANCE_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = INV_OPEN_BALANCE_ITEMS_ID ? `?INV_OPEN_BALANCE_ITEMS_ID=${INV_OPEN_BALANCE_ITEMS_ID}` : ''
    return this.http.get(`/openBalanceItemsD/getAllOpenBalanceItemsD${queryParam}`)
  }

  deleteInvOpenBalanceItemDetails(INV_OPEN_BALANCE_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.delete(`/openBalanceItemsD/deleteOpenBalanceItemsD/${INV_OPEN_BALANCE_ITEMS_D_ID}`);
  }

  getInvTransferItemDetailsAgainstInvOpenBalanceId(INV_OPEN_BALANCE_ITEMS_ID: string | number = null): Observable<any> {
    let queryParam = INV_OPEN_BALANCE_ITEMS_ID ? `${INV_OPEN_BALANCE_ITEMS_ID}` : ''
    return this.http.get(`/transferItemsD/getOnetransferItemsD/${INV_OPEN_BALANCE_ITEMS_ID}`)
  }
  addInvOpenBalanceItemsDetails(body: any): Observable<any> {
    return this.http.post(`/openBalanceItemsD/insertOpenBalanceItemsD`, body);
  }
  addInvTransferItemsDetails(body: any): Observable<any> {
    return this.http.post(`/transferItemsD/inserttransferItemsD`, body);
  }
  /** Update stores items group no  data */
  updateInvOpenBalanceItemsDetails(INV_OPEN_BALANCE_ITEMS_D_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/openBalanceItemsD/updateOpenBalanceItemsD/${INV_OPEN_BALANCE_ITEMS_D_ID}`, body)
  }

  getOneInvOpenBalanceItemsDetails(INV_OPEN_BALANCE_ITEMS_D_ID: string | number = null): Observable<any> {
    return this.http.get(`/openBalanceItemsD/getOneOpenBalanceItemsD/${INV_OPEN_BALANCE_ITEMS_D_ID}`)
  }
  getInvTransferItemsAgainstInvTransferId(INV_TRANSFER_ID: string | number = null): Observable<any> {
    let queryParam = INV_TRANSFER_ID ? `?INV_TRANSFER_ID=${INV_TRANSFER_ID}` : ''
    return this.http.get(`/transferItems/getAlltransferItems${queryParam}`)
  }
  getTransferRItems(INV_TRANSFER_R_ID: string | number = null): Observable<any> {
    let queryParam = INV_TRANSFER_R_ID ? `?INV_TRANSFER_R_ID=${INV_TRANSFER_R_ID}` : ''
    return this.http.get(`/TransferRItems/getAllTransferRItems${queryParam}`)
  }
  addInvOpenBalance(body: any): Observable<any> {
    return this.http.post(`/OpenBalance/insertOpenBalance`, body);
  }
  addDispence(body: any): Observable<any> {
    return this.http.post(`/dspdocument/insertDSPdocument`, body);
  }
  addInvTransferItems(body: any): Observable<any> {
    return this.http.post(`/transferItems/inserttransferItems`, body);
  }
  addInvOpenBalanceItems(body: any): Observable<any> {
    console.log(body)
    return this.http.post(`/OpenBalanceItems/insertOpenBalanceItem`, body);
  }

  getOneInvOpenBalanceItems(INV_OPEN_BALANCE_ITEMS_ID: string | number = null): Observable<any> {
    return this.http.get(`/OpenBalanceItems/getOneOpenBalanceItemByID/${INV_OPEN_BALANCE_ITEMS_ID}`)
  }

  /** Update stores items group no  data */
  updateInvOpenBalance(INV_OPEN_BALANCE_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/OpenBalance/updateOpenBalance/${INV_OPEN_BALANCE_ID}`, body)
  }

  /** Update stores items group no  data */
  patchInvOpenBalanceWF_RequestID(INV_OPEN_BALANCE_ID: string | number, body: { WF_REQUEST_ID: string | number }): Observable<any> {
    return this.http.post(`/OpenBalance/updateOpenBalance/${INV_OPEN_BALANCE_ID}`, body)
  }
  /** Update stores items group no  data */
  updateDispenceDocument(DOCUMENT_ID: string, formData: any): Observable<any> {
    return this.http.post(`/dspdocument/updateDSPdocument/${DOCUMENT_ID}`, formData)
  }
  /** Update stores items group no  data */
  updateInvOpenBalanceItems(INV_OPEN_BALANCE_ITEMS_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/OpenBalanceItems/updateOpenBalanceItems/${INV_OPEN_BALANCE_ITEMS_ID}`, body)
  }


  deleteInvOpenBalance(INV_OPEN_BALANCE_ID: string | number): Observable<any> {
    return this.http.post(`/OpenBalance/deleteOpenBalance/${INV_OPEN_BALANCE_ID}`, {});
  }
  deleteDispence(DOCUMENT_ID: string | number): Observable<any> {
    return this.http.post(`/dspdocument/deleteDSPdocument`, { DOCUMENT_ID: DOCUMENT_ID, DELETED_BY: CONSTANTS.DELETED_BY });
  }

  deleteInvOpenBalanceItems(INV_OPEN_BALANCE_ITEMS_ID: string | number): Observable<any> {
    return this.http.delete(`/OpenBalanceItems/deleteOpenBalanceItems/${INV_OPEN_BALANCE_ITEMS_ID}`);
  }
  getInvBalanceAgainstStoreId(STORES_ID: string = null, DOCUMENT_STATUS): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID, DOCUMENT_STATUS })
    return this.http.get(`/OpenBalance/getOpenbalance`, { params })
  }
  getDispenceAgainstStoreId(STORES_ID: string = null, DOCUMENT_STATUS): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID, DOCUMENT_STATUS })
    return this.http.get(`/dspdocument/getDSPdocument`, { params })
  }
  getJobOrderDispenceAgainstStoreId(STORES_ID: string = null, DOCUMENT_STATUS, SOURCE_TYPE = CONSTANTS.SOURCE_TYPE.JOB_ORDER): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID, DOCUMENT_STATUS, SOURCE_TYPE })
    return this.http.get(`/dspdocument/getDSPdocument`, { params })
  }
  getReqDocAgainstStoreId(STORES_ID: string = null, DOCUMENT_STATUS): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID, DOCUMENT_STATUS })
    return this.http.get(`/reqdocument/getReqDocument`, { params })
  }
  getJobOrderReqDocAgainstStoreId(STORES_ID: string = null, DOCUMENT_STATUS, SOURCE_TYPE = CONSTANTS.SOURCE_TYPE.JOB_ORDER): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID, DOCUMENT_STATUS, SOURCE_TYPE })
    return this.http.get(`/reqdocument/getReqDocument`, { params })
  }
  getInvBalanceAgainstInvOpenBalanceId(INV_OPEN_BALANCE_ID: string = null): Observable<any> {
    let params = HelperUtil.createHttpParams({ INV_OPEN_BALANCE_ID })
    return this.http.get(`/OpenBalanceItems/getOpenbalanceITems`, { params })
  }
  getDispenceItemsAgainstDocumentId(DOCUMENT_ID: string = null): Observable<any> {
    let params = HelperUtil.createHttpParams({ DOCUMENT_ID })
    return this.http.get(`/dspdocumentitems/getDSPdocumentItems`, { params })
  }
  getInvTransferAgainstInvTransferId(INV_OPEN_BALANCE_ID: string | number = null): Observable<any> {
    return this.http.get(`/TransferRItems/getOneTransferRItems/${INV_OPEN_BALANCE_ID}`)
  }

  getInvStoreList(): Observable<any> {
    return this.http.get(`/TransferStores/getAllTransferStores/`)
  }

  getAllTransferStores(): Observable<any> {
    return this.http.get(`/TransferStores/getAllTransferStores`)
  }
  // get all transfer item details
  getInvTransferItemDetailsAgainstInvTransferId(INV_TRANSFER_ITEMS_ID: string | number = null): Observable<any> {
    const queryParam = INV_TRANSFER_ITEMS_ID ? `?INV_TRANSFER_ITEMS_ID=${INV_TRANSFER_ITEMS_ID}` : ''
    return this.http.get(`/transferItemsD/getAlltransferItemsD${queryParam}`)
  }
  /*insert transfer item details*/
  addInvTransferItemDetails(body: any): Observable<any> {
    return this.http.post(`/transferItemsD/inserttransferItemsD`, body)
  }
  /** Update */
  updateInvTransferItemDetails(INV_TRANSFER_ITEMS_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/transferItemsD/updatetransferItemsDById/${INV_TRANSFER_ITEMS_ID}`, body)
  }
  /** Update stores items group no  data */
  updateInvtransferItemsDetails(INV_TRANSFER_ITEMS_D_ID: string | number, body: any): Observable<any> {
    return this.http.post(`/transferItemsD/updatetransferItemsDById/${INV_TRANSFER_ITEMS_D_ID}`, body)
  }

  /** Update stores items group no  data */
  patchInvTransferWF_RequestID(INV_TRANSFER_ID: string | number, body: { WF_REQUEST_ID: string | number }): Observable<any> {
    return this.http.post(`/OpenBalance/updateOpenBalance/${INV_TRANSFER_ID}`, body)
  }



  deleteInvTransfer(INV_TRANSFER_ID: string | number): Observable<any> {
    return this.http.post(`/transfer/deleteTRANSFER/${INV_TRANSFER_ID}`, {});
  }
  deleteInvTransferR(INV_TRANSFER_R_ID: string | number): Observable<any> {
    return this.http.post(`/TransferR/deleteTransferR`, { INV_TRANSFER_R_ID });
  }
  deleteInvTransferItems(INV_TRANSFER_ITEMS_ID: string | number): Observable<any> {
    return this.http.post(`/transferItems/deleteTransferItems/${INV_TRANSFER_ITEMS_ID}`, {});
  }

  deleteInvTransferItemsDetails(INV_TRANSFER_ITEMS_D_ID: string | number): Observable<any> {
    return this.http.post(`/transferItemsD/deleteTransferItemsD/${INV_TRANSFER_ITEMS_D_ID}`, {});
  }

  addtransfer(body: any): Observable<any> {
    return this.http.post(`/transfer/insertTransfer`, body);
  }
  updatetransfer(TRANSFER_ID: string | number = null, body: any): Observable<any> {
    return this.http.post(`/transfer/UPDATETRANSFER/${TRANSFER_ID}`, body)
  }
  updatetransferR(TRANSFER_R_ID: string | number = null, body: any): Observable<any> {
    return this.http.post(`/TransferR/updateInvTransferR/${TRANSFER_R_ID}`, body)
  }
  getallDocumentTypeList(): Observable<any> {
    return this.http.get(`/DocTypes/getDocsTypes/`)
  }

  getinvTransfer(STORES_ID: string = null): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID })
    return this.http.get(`/transfer/getTransfer`, { params })
  }
  getinvTransferR(STORES_ID: string = null): Observable<any> {
    let params = HelperUtil.createHttpParams({ STORES_ID })
    return this.http.get(`/TransferR/getAlltInvTransferR`, { params })
  }
  getAllInventoryPeriod(): Observable<any> {
    return this.http.get(`/InvPeriod/getAllInventoryPeriod`)
  }


  getOneDispense(DOCUMENT_ID: string = null): Observable<any> {
    return this.http.get(`/dspdocument/getOneDSPdocument/${DOCUMENT_ID}`)
  }



  addReqDoc(body: any): Observable<any> {
    return this.http.post(`/reqdocument/insertReqDocument`, body);
  }

  /** Update stores items group no  data */
  updateReqDocument(DOCUMENT_ID: string, body: any): Observable<any> {
    return this.http.post(`/reqdocument/updateReqDocument/${DOCUMENT_ID}`, body)
  }

  geReqItemsAgainstDocumentId(DOCUMENT_ID: string | number = null): Observable<any> {
    let queryParam = DOCUMENT_ID ? `?DOCUMENT_ID=${DOCUMENT_ID}` : ''
    return this.http.get(`/reqdocitems/getReqDocumentItems${queryParam}`)
  }

  getOneReqDoc(DOCUMENT_ID: string = null): Observable<any> {

    return this.http.get(`/reqdocument/getOneReqDocument/${DOCUMENT_ID}`)
  }

  /** Update stores items group no  data */
  updateDispenceDoc(DOCUMENT_ID: string, body: any): Observable<any> {
    return this.http.post(`/dspdocument/updateDSPdocument/${DOCUMENT_ID}`, body)
  }


  getQuantityOfItem(STORES_ID, ITEMS_ID, UNITS_ID) {
    let params = HelperUtil.createHttpParams({ STORES_ID, ITEMS_ID, UNITS_ID })

    return this.http.get(`/items/itemBalance/itemBalanceUnits/getQtyOnHand`, { params })
  }

  getInvStocking(STORES_ID: string = null, DOCUMENT_STATUS = null): Observable<any> {
    let params = HelperUtil.createHttpParams({STORES_ID,DOCUMENT_STATUS})
    return this.http.get(`/stocktaking/getStockTaking`,{params})
  }

  addInvStocking(formData){
    return this.http.post('/stocktaking/insertStockTaking',formData)
  }
  updateInvStocking(INV_STOCKTAKING_ID,formData){
    return this.http.post(`/stocktaking/updateStockTaking/${INV_STOCKTAKING_ID}`,formData)
  }
  addInvStockingItem(formData){
    return this.http.post('/invStockItems/insertInvStockItems',formData)
  }
  addInvStockingCommiteeMember(formData){
    return this.http.post('/invStockCommit/insertInvStockCommitte',formData)
  }
  addInvRequestCommiteeMember(formData){
    return this.http.post('/req-committee/insertInvRequestCommitte',formData)
  }
  updateInvStockingItem(INV_STOCKTAKING_ITEMS_ID,formData){
    return this.http.post(`/invStockItems/updateInvStockItems/${INV_STOCKTAKING_ITEMS_ID}`,formData)
  }


  updateInvStockingCommitee(INV_STOCKTAKING_COMMITTEE_ID,formData){
    return this.http.post(`/invStockCommit/updateInvStockCommitte/${INV_STOCKTAKING_COMMITTEE_ID}`,formData)
  }
  updateInvRequestCommitee(INV_REQUEST_COMMITTEE_ID,formData){
    return this.http.post(`/req-committee/updateInvRequestCommitte/${INV_REQUEST_COMMITTEE_ID}`,formData)
  }

  getInvStocktakingItems(INV_STOCKTAKING_ID){
    let params = HelperUtil.createHttpParams({INV_STOCKTAKING_ID})
    return this.http.get('/invStockItems/getAllInvStockItems',{params})
  }

  getInvStocktakingCommitee(INV_STOCKTAKING_ID){
    let params = HelperUtil.createHttpParams({INV_STOCKTAKING_ID})
    return this.http.get('/invStockCommit/getAllInvStockCommitte',{params})
  }

  getInvRequestCommitee(DOCUMENT_ID){
    let params = HelperUtil.createHttpParams({DOCUMENT_ID})
    return this.http.get('/req-committee/getAllRequestCommitee',{params})
  }


  getEmployeeList(){
    return this.http.get('/empolyees/getAllEmployees')
  }

  getOneInvStocktaking(INV_STOCKTAKING_ID: string = null): Observable<any> {

    return this.http.get(`/stocktaking/getOneStockTakingByID/${INV_STOCKTAKING_ID}`)
  }


  getInvStocktakingBalanceU(INV_STOCKTAKING_ID){
    let params = HelperUtil.createHttpParams({INV_STOCKTAKING_ID})
    return this.http.get('/stockBalanceU/getAllstocktakingBalanceU',{params})
  }

  updateInvStocktakingBalanceU(INV_STOCKTAKING_BALANCE_U_ID,formData){
    return this.http.post(`/stockBalanceU/updateStockTakingBalanceU/${INV_STOCKTAKING_BALANCE_U_ID}`,formData)
  }


  getTransactions(): Observable<any>{
    return this.http.get('/transactions/getTransactions')

  }


  getTransactionItems(INV_TRANSACTIONS_ID): Observable<any>{
    let params = HelperUtil.createHttpParams({INV_TRANSACTIONS_ID})

    return this.http.get('/transactionsItems/getTransactionItems',{params})

  }


  getStoreBalance(STORES_ID:string):Observable<any>{
    return this.http.get(`/stores/selectStoreBalance/${STORES_ID}`)
  }

  getPurchaseOrderItemsList(PO_TEMP_ID){
    let params = HelperUtil.createHttpParams({PO_TEMP_ID})
    return this.http.get('/po-temp-items',{params})
  }

  getPurchaseOrder(STORES_ID){
    let EMPLOYEE_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID;

    let params = HelperUtil.createHttpParams({STORES_ID,EMPLOYEE_ID})
    return this.http.get('/po-temp',{params})

  }

  purchaseOrderRequest(STORES_ID:string){
    let EMP_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID;
    return this.http.post('/po-temp/purchaseOrderRequestNew',{STORES_ID,EMP_ID})
  }


  purchaseOrderRequestFinish(STORES_ID:string){
    let EMP_ID = JSON.parse(localStorage.getItem('user')).EMPLOYEE_ID;
    return this.http.post('/po-temp/purchaseOrderRequestAction',{STORES_ID,EMP_ID})
  }

  updatePurchaseItem(PO_TEMP_ITEMS_ID:string,formData):Observable<any>{
    return this.http.post(`/po-temp-items/${PO_TEMP_ITEMS_ID}`,formData)
  }



}