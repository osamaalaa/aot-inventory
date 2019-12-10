/**
 * Application constants will be here
 */
export const CONSTANTS = {
  SUBSIDIARY_ID: 1,//TODO: Remove this field once subsidiary_id is implemented in all forms. 
  CREATED_BY: 1,//TODO: Remove this field once created_by is implemented in all forms. 
  DELETED_BY: 1,//TODO: Remove this field once deleted_by is implemented in all forms. 
  LOOKUPS: {
    itemKind: 189,
    itemClass: 190,
    itemNature: 191,
    bNature: 192,
    aliasType: 193,
    costmethod: 194,
    unitList: 125,
    units: 125,
    sourceType: 177,
    documentStatus: 176,
    issuePolicy: 209,
    costmethodStore: 202,
    pickingRule: 208,
    accType: 1,
    accNature: 1
  },
  status: {
    enabled: "1",
    disabled: "2"
  },
  INPUT_MAX: 99999999999999999999.99999,
  DOCUMENT_STATUS: {
    NEW: 1,
    VALIDATED: 2,
    CONFIRMED: 3,
    CANCELLED: 4,
    PENDING: 5,
  },
  WORKFLOW: {
    ACTIONS: {
      NEW: 1,
      APPROVE: 2,
      REJECT: 3,
      ASK: 4,
      CLOSE: 5,
      PENDING: 6,
      READ: 7,
      OBJECTION: 8,
      REJECT_CLOSE: 9
    },
    REQUEST_TYPE: {
      INV_OPEN_BALANCE: 72,
      INV_STOCKTAKING: 85,
      INV_TRANSFER: 76,
      INV_TRANSFER_R: 84,
      RCV_DOCUMENT: 73,
      RCV_INSPECTION: 80,
      RCV_TEMPORARY: 81,
      JO_REQ_DOCUMENT: 77,
      REQ_DOCUMENT: 86,
      DISPENCE: 78,
      CUSTODY_TRANSFER: 87,
      CUSTODY_TRANSFER_R: 88,
      ITEM_RETURN_REQUEST: 89,
      EMPLOYEE_CUSTODY_REQUEST: 90,
      ITEM_LOSE_REQUEST: 91,
      ITEM_REQUEST: 92,
      ITEM_RECEIVE_REQUEST: 93,
    },
    DOC_TYPE: {
      BALANCE_REQUEST: 9,
      FINAL_RECEIVING: 3,
      ISSUE_ORDER: 4,
      TRANSFER_REQUEST: 6,
      TRANSFER_RECEIVE: 7,
      STOCK_TAKING: 8,
      TMP_RECEIVING: 1,
      INSPECTION: 2,
      OPEN_BALANCE: 5
    }
  },
  DOCUMENT_TYPE_OPEN_BALANCE_ID: 5, //api : /DocTypes/getDocsTypes,
  DOCUMENT_TYPE_DISPENCE_ID: 10, //api : /DocTypes/getDocsTypes,
  SOURCE_TYPE: {
    JOB_ORDER: 24046,
    SUPPLIER: 11248,
    INTERNAL: 11247
  },
  DOCUMENT_TYPE: {
    TEMPORARY_RECEIVING: 1,
    INSPECTION: 2,
    FINAL_RECEIVING: 3,
    ISSUE_ORDER: 4,
    OPEN_BALANCE: 5,
    TRANSFER_REQUEST: 6,
    TRANSFER_RECEIVE: 7,
    STOCKTAKING: 8,
    BALANCE_REQUEST: 9,
    DISPENSE: 10,
    REQUEST: 11,
    CUSTODY_TRANSFER_REQUEST: 12,
    CUSTODY_RECEIVE_REQUEST: 13,
    RETURN_ITEMS_REQUEST: 14,
    ADD_TO_EMPLOYEE_CUSTODY: 15,
    ITEMS_LOSE_REQUEST: 16,
    PURCHASE_ORDER_REQUEST: 17,
    RETURN_REQUEST:18,
    REQUEST_ITEM:19
  },
  STORE_TYPE: {
    STORE: 1,
    RECEIVING_AREA: 2,
    INSPECTION_AREA: 3,
    CUSTODY: 4,
    RETURN_STORAGE: 5
  }
}

