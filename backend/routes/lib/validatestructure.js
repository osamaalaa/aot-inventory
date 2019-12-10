const Joi = require('@hapi/joi');
let squel = require("squel");
let businessSQL = require('../inventory/businessconfirmation/confirmsql');
let periodStatus = require('../inventory/businessconfirmation/periodstatus');
let express = require('express');
let router = express.Router();
let businessPool = require('@lib/businessPool');
let bodyconverter = require('@conv/bodyConverter');
let result;

const tokenstructure = Joi.object().keys({
  USERNAME: Joi.required(),
  PASSWORD: Joi.required()
});


const zonesStructure = Joi.object().keys({
  ZONE_ID: Joi.required(),
  ZONE_NAME_AR: Joi.required(),
  ZONE_NAME_EN: Joi.required(),
  ZONE_STATUS: Joi.required(),
  CREATED_BY: Joi.optional(),
  SUBSIDIARY_ID: Joi.required()
});

const vatSchemeStructure = Joi.object().keys({
  AR_DESCRIPTION: Joi.required(),
  EN_DESCRIPTION: Joi.required(),
  VAT_SPECIAL_PERCNTAGE: Joi.required(),
  VAT_TAXABLE: Joi.required(),
  VAT_PERCNTAGE: Joi.required(),
  CREATED_BY: Joi.optional()
});

const transactionTypesStructure = Joi.object().keys({
    TRANSACTION_TYPE_CODE: Joi.required(),
    AR_NAME: Joi.required(),
    EN_NAME: Joi.required(),
    AR_DESCRIPTION: Joi.required(),
    EN_DESCRIPTION: Joi.required(),
    USER_DEFINED_FLAG: Joi.required(),
    STATUS: Joi.required(),
    TRANSACTION_NATURE: Joi.required(),
    CREATED_BY: Joi.required()

  }

);


const storesStructure = Joi.object().keys({
    STORES_CODE: Joi.required(),
    AR_NAME: Joi.required(),
    EN_NAME: Joi.required(),
    PARENT_STORES_ID: Joi.optional(),
    STORE_TYPE: Joi.required(),
    ISSUE_POLICY: Joi.required(),
    PROFIT_MARGIN: Joi.required(),
    SUBSIDIARY_ID: Joi.required(),
    COST_METHOD: Joi.required(),
    PICKING_RULE_ID: Joi.required(),
    MATERIAL_ACCOUNT: Joi.required(),
    MATERIAL_OVERHEAD_ACCOUNT: Joi.required(),
    MATL_OVHD_ABSORPTION_ACCT: Joi.required(),
    RESOURCE_ACCOUNT: Joi.required(),
    PURCHASE_PRICE_VAR_ACCOUNT: Joi.required(),
    AP_ACCRUAL_ACCOUNT: Joi.required(),
    OVERHEAD_ACCOUNT: Joi.required(),
    OUTSIDE_PROCESSING_ACCOUNT: Joi.required(),
    INTRANSIT_INV_ACCOUNT: Joi.required(),
    INTERORG_RECEIVABLES_ACCOUNT: Joi.required(),
    INTERORG_PRICE_VAR_ACCOUNT: Joi.required(),
    INTERORG_PAYABLES_ACCOUNT: Joi.required(),
    COST_OF_SALES_ACCOUNT: Joi.required(),
    ENCUMBRANCE_ACCOUNT: Joi.required(),
    PROJECT_COST_ACCOUNT: Joi.required(),
    INTERORG_TRANSFER_CR_ACCOUNT: Joi.required(),
    INVOICE_PRICE_VAR_ACCOUNT: Joi.required(),
    AVERAGE_COST_VAR_ACCOUNT: Joi.required(),
    SALES_ACCOUNT: Joi.required(),
    CREATED_BY: Joi.required()
  }

);

const itemsStructure = Joi.object().keys({

    AR_NAME: Joi.required(),
    EN_NAME: Joi.required(),
    AR_DESCRIPTION: Joi.required(),
    EN_DESCRIPTION: Joi.required(),
    ITEMS_GROUP_ID: Joi.required(),
    ITEM_KIND: Joi.required(),
    ITEM_CLASS: Joi.required(),
    ITEM_NATURE: Joi.required(),
    BALANCE_NATURE: Joi.required(),
    NUMBER_OF_UNITS: Joi.required(),
    SUBSIDIARY_ID: Joi.required(),
    PROFIT_MARGIN: Joi.required(),
    QTY_ON_ORDER: Joi.required(),
    FOR_SALE: Joi.required(),
    STATUS: Joi.required(),
    IMAGES_ID: Joi.required(),
    TAX_SCHEME_ID: Joi.required(),
    SHORTAGE_POLICY_ID: Joi.required(),
    SLOW_POLICY_ID: Joi.required(),
    CREATED_BY: Joi.required(),
    ALIASES_TYPE_ID: Joi.required(),
    ITEM_CODE: Joi.required(),
    ITEMS_TEMPLATE_ID: Joi.optional()

  }

);

const itemsAliasesStructure = Joi.object().keys({
  ITEMS_ID: Joi.required(),
  ALIASES_TYPE_ID: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  ITEM_CODE: Joi.required(),
  DEFAULT_ALIASES: Joi.required(),
  CREATED_BY: Joi.required()
});

const storesHousesStructure = Joi.object().keys({
  STORE_NO: Joi.required(),
  NAME_AR: Joi.required(),
  NAME_EN: Joi.optional(),
  STORE_TYPE: Joi.optional(),
  CREATED_BY: Joi.optional()
});

const subsDiaryStructure = Joi.object().keys({
  SUBSIDIARY_ID: Joi.required(),
  COST_METHOD: Joi.optional(),
  PICKING_RULE_ID: Joi.optional(),
  MATERIAL_ACCOUNT: Joi.optional(),
  MATERIAL_OVERHEAD_ACCOUNT: Joi.optional(),
  MATL_OVHD_ABSORPTION_ACCT: Joi.optional(),
  RESOURCE_ACCOUNT: Joi.optional(),
  PURCHASE_PRICE_VAR_ACCOUNT: Joi.optional(),
  AP_ACCRUAL_ACCOUNT: Joi.optional(),
  OVERHEAD_ACCOUNT: Joi.optional(),
  OUTSIDE_PROCESSING_ACCOUNT: Joi.optional(),
  INTRANSIT_INV_ACCOUNT: Joi.optional(),
  COST_OF_SALES_ACCOUNT: Joi.optional(),
  INTERORG_RECEIVABLES_ACCOUNT: Joi.optional(),
  INTERORG_PRICE_VAR_ACCOUNT: Joi.optional(),
  INTERORG_PAYABLES_ACCOUNT: Joi.optional(),
  ENCUMBRANCE_ACCOUNT: Joi.optional(),
  PROJECT_COST_ACCOUNT: Joi.optional(),
  INTERORG_TRANSFER_CR_ACCOUNT: Joi.optional(),
  INVOICE_PRICE_VAR_ACCOUNT: Joi.optional(),
  AVERAGE_COST_VAR_ACCOUNT: Joi.optional(),
  SALES_ACCOUNT: Joi.optional(),
  EXPENSE_ACCOUNT: Joi.optional(),
  BORRPAY_MATL_VAR_ACCOUNT: Joi.optional(),
  BORRPAY_MOH_VAR_ACCOUNT: Joi.optional(),
  BORRPAY_RES_VAR_ACCOUNT: Joi.optional(),
  BORRPAY_OSP_VAR_ACCOUNT: Joi.optional(),
  BORRPAY_OVH_VAR_ACCOUNT: Joi.optional(),
  DEFERRED_COGS_ACCOUNT: Joi.optional(),
  COSTING_CURRENCY_ID: Joi.required(),
  CREATED_BY: Joi.required()
});

const itemBalanceStructure = Joi.object().keys({
  SUBSIDIARY_ID: Joi.required(),
  ITEMS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  OPEN_BALANCE: Joi.required(),
  ITEM_COST: Joi.required(),
  AVERAGE_COST: Joi.required(),
  CURRENT_BALANCE: Joi.required(),
  QTY_ON_HAND: Joi.required(),
  QTY_RESERVED: Joi.required(),
  QTY_TRANSFER_TO: Joi.required(),
  QTY_TRANSFER_FROM: Joi.required(),
  OTY_DISPOSED: Joi.required(),
  QTY_ON_POR: Joi.required(),
  QTY_ON_SOR: Joi.required(),
  QTY_ON_SO: Joi.required(),
  QTY_ON_PO: Joi.required(),
  QTY_REQUESTED: Joi.required(),
  QTY_SO_CONSIGMENT: Joi.required(),
  QTY_PO_CONSIGMENT: Joi.required(),
  QTY_IN: Joi.required(),
  QTY_OUT: Joi.required(),
  REORDER_LIMIT: Joi.required(),
  MAX_LIMIT: Joi.number().integer().min(Joi.ref('MIN_LIMIT')).required(),
  MIN_LIMIT: Joi.number().integer().max(Joi.ref('MAX_LIMIT')).required(),
  CONFIRMED: Joi.required(),
  STORES_LOCATIONS_ID: Joi.required()

});

const itemModuleStructure = Joi.object().keys({

  AR_NAME: Joi.required(),
  EN_NAME: Joi.required(),
  AR_DESCRIPTION: Joi.required(),
  EN_DESCRIPTION: Joi.required(),
  ITEMS_GROUP_ID: Joi.required(),
  ITEM_KIND: Joi.required(),
  ITEM_CLASS: Joi.required(),
  ITEM_NATURE: Joi.required(),
  BALANCE_NATURE: Joi.required(),
  NUMBER_OF_UNITS: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  PROFIT_MARGIN: Joi.required(),
  QTY_ON_ORDER: Joi.required(),
  FOR_SALE: Joi.required(),
  STATUS: Joi.required(),
  IMAGES_ID: Joi.required(),
  TAX_SCHEME_ID: Joi.required(),
  SHORTAGE_POLICY_ID: Joi.required(),
  SLOW_POLICY_ID: Joi.required()
});

const storesLocation = Joi.object().keys({
  STORES_LOCATIONS_CODE: Joi.required(),
  STORES_ID: Joi.required(),
  AR_NAME: Joi.required(),
  EN_NAME: Joi.required(),
  LOCATION_LAN: Joi.required(),
  LOCATION_ROW: Joi.required(),
  LOCATION_COLUMN: Joi.required(),
  CREATED_BY: Joi.required()
});

const itemComponentsSt = Joi.object().keys({
  ITEMS_ID: Joi.required(),
  COMPONENTS_ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  QUANTITY: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  ITEM_PRICE: Joi.required(),
  COST_PERCENTAGE: Joi.required(),
  CREATED_BY: Joi.required()
});

const itemDetailsStructure = Joi.object().keys({
  ITEMS_ID: Joi.required(),
  SHIPPABLE_ENABLED_FLAG: Joi.optional(),
  PURCHASING_ENABLED_FLAG: Joi.optional(),
  CUSTOMER_ORDER_ENABLED_FLAG: Joi.optional(),
  INTERNAL_ORDER_ENABLED_FLAG: Joi.optional(),
  INVOICEABLE_ITEM_FLAG: Joi.optional(),
  RETURNABLE_FLAG: Joi.optional(),
  INSPECTION_REQUIRED_FLAG: Joi.optional(),
  RECEIPT_REQUIRED_FLAG: Joi.optional(),
  RFQ_REQUIRED_FLAG: Joi.optional(),
  ALLOW_SUBSTITUTE_RECEIPTS_FLAG: Joi.optional(),
  ALLOW_UNORDERED_RECEIPTS_FLAG: Joi.optional(),
  ALLOW_EXPRESS_DELIVERY_FLAG: Joi.optional(),
  INVOICE_ENABLED_FLAG: Joi.optional(),
  COSTING_ENABLED_FLAG: Joi.optional(),
  ORDERABLE_ON_WEB_FLAG: Joi.optional(),
  COST_OF_SALES_ACCOUNT: Joi.optional(),
  SALES_ACCOUNT: Joi.optional(),
  EXPENSE_ACCOUNT: Joi.optional(),
  ENCUMBRANCE_ACCOUNT: Joi.optional(),
  ACCEPTABLE_RATE_INCREASE: Joi.optional(),
  ACCEPTABLE_RATE_DECREASE: Joi.optional(),
  ORDER_COST: Joi.optional(),
  MINIMUM_ORDER_QUANTITY: Joi.optional(),
  FIXED_ORDER_QUANTITY: Joi.optional(),
  FIXED_DAYS_SUPPLY: Joi.optional(),
  MAXIMUM_ORDER_QUANTITY: Joi.optional(),
  VENDOR_WARRANTY_FLAG: Joi.optional(),
  PREVENTIVE_MAINTENANCE_FLAG: Joi.optional(),
  WARRANTY_VENDOR_ID: Joi.optional(),
  MAX_WARRANTY_AMOUNT: Joi.optional(),
  OUTSIDE_OPERATION_FLAG: Joi.optional(),
  VEHICLE_ITEM_FLAG: Joi.optional(),
  ELECTRONIC_FLAG: Joi.optional(),
  ASSET_CATEGORY_ID: Joi.optional()
});

const itemsGroupStructure = Joi.object().keys({
  ITEMS_GROUP_CODE: Joi.required(),
  AR_NAME: Joi.required(),
  EN_NAME: Joi.required(),
  PARENT_ITEMS_GROUP_ID: Joi.optional(),
  SUBSIDIARY_ID: Joi.required(),
  ITEM_CLASS: Joi.required(),
  COST_METHOD: Joi.required(),
  PROFIT_MARGIN: Joi.optional(),
  TREE_LEVEL: Joi.optional(),
  BRAND_ID: Joi.optional(),
  STATUS: Joi.required(),
  TAX_SCHEME_ID: Joi.optional(),
  SHORTAGE_POLICY_ID: Joi.optional(),
  SLOW_POLICY_ID: Joi.optional(),
  CREATED_BY: Joi.optional()

});

const itemsUnitsStructure = Joi.object().keys({
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  UNIT_FACTOR: Joi.required(),
  DEFAULT_UNIT: Joi.required(),
  CREATED_BY: Joi.required()
});

const rcvtmpItemsStructure = Joi.object().keys({
  DOCUMENT_ID: Joi.required(),
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  UNIT_FACTOR: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  ITEM_PRICE: Joi.required(),
  TOTAL_PRICE: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});

const shortagePolicyStructure = Joi.object().keys({
  SHORTAGE_POLICY_TYPE: Joi.required(),
  SHORTAGE_POLICY_VALUE_TYPE: Joi.required(),
  SHORTAGE_POLICY_VALUE: Joi.required(),
  AR_NAME: Joi.required(),
  EN_NAME: Joi.required(),
  MIN_QUANTITY: Joi.required(),
  MAX_QUANTITY: Joi.required(),
  CREATED_BY: Joi.optional()
});

const slowMovingPolicyStructure = Joi.object().keys({
  SLOW_MOVING_POLICY_TYPE: Joi.required(),
  SLOW_MOVING_MINIMUM_VALUE: Joi.required(),
  SLOW_MOVING_POLICY_DAYS: Joi.required(),
  CREATED_BY: Joi.optional(),
  AR_DESCRIPTION: Joi.required(),
  EN_DESCRIPTION: Joi.required(),
  AR_NAME: Joi.required(),
  EN_NAME: Joi.required()
});

const chartOfAccStructure = Joi.object().keys({
  SUBSIDIARY_ID: Joi.required(),
  ACCOUNT_CODE: Joi.required(),
  AR_NAME: Joi.required(),
  EN_NAME: Joi.required(),
  AR_DESCRIPTION: Joi.optional(),
  EN_DESCRIPTION: Joi.optional(),
  SUB_JOURNALS_COMPULSION: Joi.required(),
  SUB_JOURNALS_ID: Joi.optional(),
  COST_CENTER_COMPULSION: Joi.required(),
  COST_CENTER_PATTERNS_ID: Joi.optional(),
  ACCOUNT_TYPE: Joi.required(),
  ACCOUNT_NATURE: Joi.required(),
  GENERAL_CHART_OF_ACCOUNT_ID: Joi.optional(),
  PARENT_ACCOUNTS_ID: Joi.optional(),
  TREE_LEVEL: Joi.required(),
  TREE_PARENT_CODE: Joi.required(),
  FULL_ACCOUNT_CODE: Joi.required(),
  STATUS: Joi.required(),
  CREATED_BY: Joi.optional()
});

const suppliersStructure = Joi.object().keys({
  SUPPLIER_CODE: Joi.required(),
  AR_NAME: Joi.required(),
  EN_NAME: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  INTERCOMPANY: Joi.required(),
  INTERCOMPANY_ID: Joi.optional(),
  VAT_REGISTRATION_NO: Joi.required(),
  TAX_SCHEME_ID: Joi.required(),
  LOCAL_SUPPLIER: Joi.required(),
  STATUS: Joi.required(),
  CREATED_BY: Joi.optional()
});

const taxSchemeStructure = Joi.object().keys({
  AR_DESCRIPTION: Joi.required(),
  EN_DESCRIPTION: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  CREATED_BY: Joi.optional()
});

const rcvTempoStructure = Joi.object().keys({
  DOCUMENT_TYPE_ID: Joi.required(),
  INVENTORY_PERIODS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  DOCUMENT_NO: Joi.required(),
  BASE_DOCUMENT_ID: Joi.optional(),
  BASE_DOCUMENT_TYPE_ID: Joi.optional(),
  SUBSIDIARY_ID: Joi.required(),
  JOURNALS_ID: Joi.required(),
  SOURCE_TYPE: Joi.required(),
  SUPPLIER_ID: Joi.required(),
  PO_NUMBER: Joi.required(),
  PI_NUMBER: Joi.required(),
  DELIVERED_BY: Joi.required(),
  SHIPMENT_NUMBER: Joi.required(),
  SHIPMENT_POLICY_NO: Joi.required(),
  DOCUMENT_STATUS: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional(),
  VALDIATED_BY: Joi.required(),
  CONFIRMED_BY: Joi.required(),
  MODIFIED_BY: Joi.required()
});


const itemSupplierStructure = Joi.object().keys({
  ITEMS_ID: Joi.required(),
  SUPPLIER_ID: Joi.required(),
  SUPPLIER_ITEM_CODE: Joi.required(),
  ITEM_COST: Joi.required(),
  UNITS_ID: Joi.required(),
  CREATED_BY: Joi.optional()

});


const itemsSubsStructure = Joi.object().keys({
    ITEMS_ID: Joi.required(),
    SUBSTITUTIONS_ITEMS_ID: Joi.required(),
    UNITS_ID: Joi.required(),
    QUANTITY: Joi.required(),
    CREATED_BY: Joi.optional()
  }

);

const taxSchemeDetailStructure = Joi.object().keys(

  {
    TAX_SCHEME_ID: Joi.required(),
    AR_DESCRIPTION: Joi.required(),
    EN_DESCRIPTION: Joi.required(),
    TAX_TYPE_ID: Joi.required(),
    TAX_TAXABLE: Joi.required(),
    AUTO_CALC: Joi.required(),
    MANDATORY_TAX: Joi.required(),
    USER_CHANGEABLE: Joi.required(),
    TAX_VALUE_TYPE: Joi.required(),
    TAX_VALUE_TYPE_VALUE: Joi.required(),
    CHART_OF_ACCOUNTS_ID: Joi.optional(),
    CREATED_BY: Joi.optional(),
  }
);


const storeItemsStructure = Joi.object().keys(

  {
    STORES_ID: Joi.required(),
    ITEMS_ID: Joi.required(),
    STATUS: Joi.required(),
    CREATED_BY: Joi.optional()
  }
);

const storesItemsGroupStructure = Joi.object().keys(

  {
    STORES_ID: Joi.required(),
    ITEMS_GROUP_ID: Joi.required(),
    STATUS: Joi.required(),
    CREATED_BY: Joi.optional()
  }
);

const itemsBalanceDetailStructures = Joi.object().keys(

  {
    ITEMS_BALANCE_ID: Joi.required(),
    BATCH_NUMBER: Joi.required(),
    SERIAL_NUMBER: Joi.required(),
    OPEN_BALANCE: Joi.required(),
    ITEM_COST: Joi.required(),
    AVERAGE_COST: Joi.required(),
    CURRENT_BALANCE: Joi.required(),
    QTY_ON_HAND: Joi.required(),
    QTY_RESERVED: Joi.required(),
    QTY_TRANSFER_TO: Joi.required(),
    QTY_TRANSFER_FROM: Joi.required(),
    OTY_DISPOSED: Joi.required(),
    QTY_ON_POR: Joi.required(),
    QTY_ON_SOR: Joi.required(),
    QTY_ON_SO: Joi.required(),
    QTY_ON_PO: Joi.required(),
    QTY_REQUESTED: Joi.required(),
    QTY_SO_CONSIGMENT: Joi.required(),
    QTY_PO_CONSIGMENT: Joi.required(),
    QTY_IN: Joi.required(),
    QTY_OUT: Joi.required(),
    CONFIRMED: Joi.required(),
    CREATED_BY: Joi.optional()
  }
);


const itemsBalanceUnitsStructure = Joi.object().keys(

  {
    ITEMS_BALANCE_ID: Joi.required(),
    ITEMS_ID: Joi.required(),
    STORES_ID: Joi.required(),
    UNITS_ID: Joi.required(),
    OPEN_BALANCE: Joi.required(),
    ITEM_COST: Joi.required(),
    AVERAGE_COST: Joi.required(),
    CURRENT_BALANCE: Joi.required(),
    QTY_ON_HAND: Joi.required(),
    QTY_RESERVED: Joi.required(),
    QTY_TRANSFER_TO: Joi.required(),
    QTY_TRANSFER_FROM: Joi.required(),
    OTY_DISPOSED: Joi.required(),
    QTY_ON_POR: Joi.required(),
    QTY_ON_SOR: Joi.required(),
    QTY_ON_SO: Joi.required(),
    QTY_ON_PO: Joi.required(),
    QTY_REQUESTED: Joi.required(),
    QTY_SO_CONSIGMENT: Joi.required(),
    QTY_PO_CONSIGMENT: Joi.required(),
    QTY_ADDED: Joi.required(),
    LAST_SOLD: Joi.required(),
    LAST_RECIEVED: Joi.required(),
    CONFIRMED: Joi.required(),
    CREATED_BY: Joi.optional(),
    INV_OPEN_BALANCE_ITEMS_ID: Joi.required()
  }
);



const openBalanceStructure = Joi.object().keys({
  DOCUMENT_TYPE_ID: Joi.required(),
  DOCUMENT_DATE: Joi.required(),
  INVENTORY_PERIODS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  DOCUMENT_NO: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  JOURNALS_ID: Joi.required(),
  SOURCE_TYPE: Joi.required(),
  DOCUMENT_STATUS: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional(),
  VALDIATED_BY: Joi.optional(),
  VALDIATED_DATE: Joi.optional(),
  CONFIRMED_BY: Joi.optional(),
  CONFIRMED_DATE: Joi.optional(),
  WF_REQUEST_ID: Joi.optional()
});


const openBalanceItemsStructure = Joi.object().keys({
  INV_OPEN_BALANCE_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  UNIT_FACTOR: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});


const transactionsStructure = Joi.object().keys({
  INVENTORY_PERIODS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  DOCUMENT_ID: Joi.required(),
  DOCUMENT_TYPE_ID: Joi.required(),
  TRANSACTION_DATE: Joi.required(),
  REAL_TRANSACTION: Joi.required(),
  REAL_TRANSACTION_DATE: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  CREATED_BY: Joi.optional()
});


const transactionsItemsStructure = Joi.object().keys({
  INV_TRANSACTIONS_ID: Joi.required(),
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  UNIT_FACTOR: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  CURRENT_BALANCE: Joi.required(),
  QTY_ON_HAND: Joi.required(),
  QTY_RESERVED: Joi.required(),
  QTY_TRANSFER_TO: Joi.required(),
  QTY_TRANSFER_FROM: Joi.required(),
  OTY_DISPOSED: Joi.required(),
  QTY_ON_POR: Joi.required(),
  QTY_ON_SOR: Joi.required(),
  QTY_ON_SO: Joi.required(),
  QTY_ON_PO: Joi.required(),
  QTY_REQUESTED: Joi.required(),
  QTY_SO_CONSIGMENT: Joi.required(),
  QTY_PO_CONSIGMENT: Joi.required(),
  CREATED_BY: Joi.optional()

});



const transferStructure = Joi.object().keys({
  DOCUMENT_TYPE_ID: Joi.required(),
  DOCUMENT_DATE: Joi.required(),
  INVENTORY_PERIODS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  TRANSFER_DATE: Joi.required(),
  DOCUMENT_NO: Joi.required(),
  BASE_DOCUMENT_ID: Joi.optional(),
  BASE_DOCUMENT_TYPE_ID: Joi.optional(),
  SUBSIDIARY_ID: Joi.required(),
  JOURNALS_ID: Joi.required(),
  SOURCE_TYPE: Joi.optional(),
  DOCUMENT_STATUS: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional(),
  VALDIATED_BY: Joi.optional(),
  VALDIATED_DATE: Joi.optional(),
  CONFIRMED_BY: Joi.optional(),
  CONFIRMED_DATE: Joi.optional(),
  TRANSFER_STORE_ID: Joi.optional()

});



const rcvDocumentStructure = Joi.object().keys({
  DOCUMENT_TYPE_ID: Joi.required(),
  INVENTORY_PERIODS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  DOCUMENT_NO: Joi.required(),
  BASE_DOCUMENT_ID: Joi.optional(),
  BASE_DOCUMENT_TYPE_ID: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  JOURNALS_ID: Joi.required(),
  SOURCE_TYPE: Joi.required(),
  SUPPLIER_ID: Joi.required(),
  PO_NUMBER: Joi.required(),
  PI_NUMBER: Joi.required(),
  DELIVERED_BY: Joi.required(),
  SHIPMENT_NUMBER: Joi.required(),
  SHIPMENT_POLICY_NO: Joi.required(),
  DOCUMENT_STATUS: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});

const rcvDocumentCommitteStructure = Joi.object().keys({
  DOCUMENT_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  EMPLOYEE_ID: Joi.required(),
  EMPLOYEE_POSITION: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});

const rcvDocumentItemsStructure = Joi.object().keys({
  DOCUMENT_ID: Joi.required(),
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  UNIT_FACTOR: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  ITEM_PRICE: Joi.required(),
  TOTAL_PRICE: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});

const rcvInspetionStructure = Joi.object().keys({
  DOCUMENT_TYPE_ID: Joi.required(),
  INVENTORY_PERIODS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  DOCUMENT_NO: Joi.required(),
  BASE_DOCUMENT_ID: Joi.optional(),
  BASE_DOCUMENT_TYPE_ID: Joi.optional(),
  SUBSIDIARY_ID: Joi.required(),
  JOURNALS_ID: Joi.required(),
  SOURCE_TYPE: Joi.required(),
  SUPPLIER_ID: Joi.required(),
  PO_NUMBER: Joi.required(),
  PI_NUMBER: Joi.required(),
  DELIVERED_BY: Joi.required(),
  SHIPMENT_NUMBER: Joi.required(),
  SHIPMENT_POLICY_NO: Joi.required(),
  DOCUMENT_STATUS: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});

const stockTakingStructure = Joi.object().keys({
  DOCUMENT_TYPE_ID: Joi.required(),
  STOCKTAKING_TYPE_ID: Joi.required(),
  DOCUMENT_DATE: Joi.required(),
  INVENTORY_PERIODS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  START_DATE: Joi.required(),
  END_DATE: Joi.required(),
  DOCUMENT_NO: Joi.required(),
  BASE_DOCUMENT_ID: Joi.optional(),
  BASE_DOCUMENT_TYPE_ID: Joi.optional(),
  SUBSIDIARY_ID: Joi.required(),
  JOURNALS_ID: Joi.optional(),
  DOCUMENT_STATUS: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional(),
  VALDIATED_BY: Joi.optional(),
  VALDIATED_DATE: Joi.optional(),
  CONFIRMED_BY: Joi.optional(),
  CONFIRMED_DATE: Joi.optional()

});


const stockTakingBalanceStructure = Joi.object().keys({
  INV_STOCKTAKING_ID: Joi.required(),
  STORES_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  PRE_BALANCE: Joi.required(),
  ITEMS_ID: Joi.required(),
  ITEM_COST: Joi.required(),
  AVERAGE_COST: Joi.required(),
  CURRENT_BALANCE: Joi.required(),
  QTY_ON_HAND: Joi.required(),
  QTY_RESERVED: Joi.required(),
  QTY_TRANSFER_TO: Joi.required(),
  QTY_TRANSFER_FROM: Joi.required(),
  OTY_DISPOSED: Joi.required(),
  QTY_ON_POR: Joi.required(),
  QTY_ON_SOR: Joi.required(),
  QTY_ON_SO: Joi.required(),
  QTY_ON_PO: Joi.required(),
  QTY_REQUESTED: Joi.required(),
  QTY_SO_CONSIGMENT: Joi.required(),
  QTY_PO_CONSIGMENT: Joi.required(),
  QTY_IN: Joi.required(),
  QTY_OUT: Joi.required(),
  STOCKTAKING_CURRENT_BALANCE: Joi.required(),
  STOCKTAKING_QTY_ON_HAND: Joi.required(),
  DIFF_CURRENT_BALANCE: Joi.required(),
  DIFF_QTY_ON_HAND: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});



const stockTakingBalanceDStructure = Joi.object().keys({
    INV_STOCKTAKING_ID: Joi.required(),
    INV_STOCKTAKING_BALANCE_ID: Joi.required(),
    STORES_ID: Joi.required(),
    ARRANGEMENT_NO: Joi.required(),
    PRE_BALANCE: Joi.required(),
    ITEMS_ID: Joi.required(),
    BATCH_NUMBER: Joi.required(),
    EXPIRY_DATE: Joi.required(),
    SERIAL_NUMBER: Joi.required(),
    ITEM_COST: Joi.required(),
    AVERAGE_COST: Joi.required(),
    CURRENT_BALANCE: Joi.required(),
    QTY_ON_HAND: Joi.required(),
    SERIAL_NUMBER: Joi.required(),
    QTY_RESERVED: Joi.required(),
    QTY_TRANSFER_TO: Joi.required(),
    QTY_TRANSFER_FROM: Joi.required(),
    OTY_DISPOSED: Joi.required(),
    QTY_ON_POR: Joi.required(),
    QTY_ON_SOR: Joi.required(),
    QTY_ON_SO: Joi.required(),
    QTY_ON_PO: Joi.required(),
    QTY_REQUESTED: Joi.required(),
    QTY_SO_CONSIGMENT: Joi.required(),
    QTY_PO_CONSIGMENT: Joi.required(),
    QTY_IN: Joi.required(),
    QTY_OUT: Joi.required(),
    STOCKTAKING_CURRENT_BALANCE: Joi.required(),
    STOCKTAKING_QTY_ON_HAND: Joi.required(),
    DIFF_CURRENT_BALANCE: Joi.required(),
    DIFF_QTY_ON_HAND: Joi.required(),
    NOTES: Joi.optional(),
    CREATED_BY: Joi.optional()
  }

);

const invStockCommitteStructure = Joi.object().keys({
  INV_STOCKTAKING_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  EMPLOYEE_ID: Joi.required(),
  EMPLOYEE_POSITION: Joi.optional(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});


const invRequestCommitteStructure = Joi.object().keys({
  DOCUMENT_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  EMPLOYEE_ID: Joi.required(),
  EMPLOYEE_POSITION: Joi.optional(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});

const invStockItemsStructure = Joi.object().keys({
  INV_STOCKTAKING_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  ITEMS_ID: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});
const invStockStoresStructure = Joi.object().keys({
  INV_STOCKTAKING_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  STORES_ID: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
});

const invPeriodsStructure = Joi.object().keys({
  INVENTORY_PERIODS_CODE: Joi.required(),
  AR_NAME: Joi.required(),
  START_DATE: Joi.optional(),
  END_DATE: Joi.optional(),
  EN_NAME: Joi.required(),
  AR_DESCRIPTION: Joi.required(),
  EN_DESCRIPTION: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  STATUS: Joi.required(),
  FINANCIAL_PERIODS_ID: Joi.required(),
  CREATED_BY: Joi.optional()
});

const invBalanceRequestStructure = Joi.object().keys({
  DOCUMENT_TYPE_ID: Joi.required(),
  INVENTORY_PERIODS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  DOCUMENT_NO: Joi.required(),
  BASE_DOCUMENT_ID: Joi.required(),
  BASE_DOCUMENT_TYPE_ID: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  JOURNALS_ID: Joi.required(),
  SOURCE_TYPE: Joi.required(),
  DOCUMENT_STATUS: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const invBalanceRequestItemsStructure = Joi.object().keys({
  INV_BALANCE_REQUEST_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  PRE_DEFINED_ITEM: Joi.required(),
  AR_NAME: Joi.required(),
  EN_NAME: Joi.required(),
  AR_DESCRIPTION: Joi.required(),
  EN_DESCRIPTION: Joi.required(),
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  UNIT_FACTOR: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  CURRENT_BALANCE: Joi.required(),
  QTY_ON_HAND: Joi.required(),
  QTY_RESERVED: Joi.required(),
  QTY_TRANSFER_TO: Joi.required(),
  QTY_TRANSFER_FROM: Joi.required(),
  OTY_DISPOSED: Joi.required(),
  QTY_ON_POR: Joi.required(),
  QTY_ON_SOR: Joi.required(),
  QTY_ON_SO: Joi.required(),
  QTY_ON_PO: Joi.required(),
  QTY_REQUESTED: Joi.required(),
  QTY_SO_CONSIGMENT: Joi.required(),
  QTY_PO_CONSIGMENT: Joi.required(),
  REORDER_LIMIT: Joi.required(),
  MAX_LIMIT: Joi.required(),
  MIN_LIMIT: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const invOpenBalanceItemsDStructure = Joi.object().keys({
  INV_OPEN_BALANCE_ITEMS_ID: Joi.required(),
  INV_OPEN_BALANCE_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  BATCH_NUMBER: Joi.required(),
  SERIAL_NUMBER: Joi.required(),
  EXPIRY_DATE: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  ITEM_PRICE: Joi.required(),
  TOTAL_PRICE: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const stockBalanceUStructure = Joi.object().keys({
  INV_STOCKTAKING_BALANCE_D_ID: Joi.required(),
  INV_STOCKTAKING_ID: Joi.required(),
  INV_STOCKTAKING_BALANCE_ID: Joi.required(),
  STORES_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  PRE_BALANCE: Joi.required(),
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  ITEM_COST: Joi.required(),
  AVERAGE_COST: Joi.required(),
  CURRENT_BALANCE: Joi.required(),
  QTY_ON_HAND: Joi.required(),
  QTY_RESERVED: Joi.required(),
  QTY_TRANSFER_TO: Joi.required(),
  QTY_TRANSFER_FROM: Joi.required(),
  OTY_DISPOSED: Joi.required(),
  QTY_ON_POR: Joi.required(),
  QTY_ON_SOR: Joi.required(),
  QTY_ON_SO: Joi.required(),
  QTY_ON_PO: Joi.required(),
  QTY_REQUESTED: Joi.required(),
  QTY_SO_CONSIGMENT: Joi.required(),
  QTY_PO_CONSIGMENT: Joi.required(),
  QTY_IN: Joi.required(),
  QTY_OUT: Joi.required(),
  STOCKTAKING_CURRENT_BALANCE: Joi.required(),
  STOCKTAKING_QTY_ON_HAND: Joi.required(),
  DIFF_CURRENT_BALANCE: Joi.required(),
  DIFF_QTY_ON_HAND: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const transactionItemsDStructure = Joi.object().keys({
  INV_TRANSACTIONS_ITEMS_ID: Joi.required(),
  INV_TRANSACTIONS_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  BATCH_NUMBER: Joi.required(),
  SERIAL_NUMBER: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  CALC_TYPE: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  CURRENT_BALANCE: Joi.required(),
  QTY_ON_HAND: Joi.required(),
  QTY_RESERVED: Joi.required(),
  QTY_TRANSFER_TO: Joi.required(),
  QTY_TRANSFER_FROM: Joi.required(),
  OTY_DISPOSED: Joi.required(),
  QTY_ON_POR: Joi.required(),
  QTY_ON_SOR: Joi.required(),
  QTY_ON_SO: Joi.required(),
  QTY_ON_PO: Joi.required(),
  QTY_REQUESTED: Joi.required(),
  QTY_SO_CONSIGMENT: Joi.required(),
  QTY_PO_CONSIGMENT: Joi.required(),
  CREATED_BY: Joi.optional()
})

const transferItemsStructure = Joi.object().keys({
  INV_TRANSFER_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  UNIT_FACTOR: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const transferItemsDStructure = Joi.object().keys({
  INV_TRANSFER_ITEMS_ID: Joi.required(),
  INV_TRANSFER_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  BATCH_NUMBER: Joi.required(),
  SERIAL_NUMBER: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  ITEM_PRICE: Joi.required(),
  TOTAL_PRICE: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const transferRStructure = Joi.object().keys({
  INV_TRANSFER_STORES_ID: Joi.required(),
  INV_TRANSFER_ID: Joi.required(),
  DOCUMENT_TYPE_ID: Joi.required(),
  INVENTORY_PERIODS_ID: Joi.required(),
  STORES_ID: Joi.required(),
  DOCUMENT_NO: Joi.required(),
  BASE_DOCUMENT_ID: Joi.required(),
  BASE_DOCUMENT_TYPE_ID: Joi.required(),
  SUBSIDIARY_ID: Joi.required(),
  JOURNALS_ID: Joi.required(),
  SOURCE_TYPE: Joi.required(),
  DOCUMENT_STATUS: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})


const transferRItemsStructure = Joi.object().keys({
  INV_TRANSFER_R_ID: Joi.required(),
  INV_TRANSFER_ITEMS_ID: Joi.required(),
  INV_TRANSFER_ID: Joi.required(),
  INV_TRANSFER_STORES_ID: Joi.required(),
  STORES_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  UNIT_FACTOR: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const transferStoresStructure = Joi.object().keys({
  INV_TRANSFER_ID: Joi.required(),
  STORES_ID: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const confirmStructure = Joi.object().keys({
  EMPLOYEE_ID: Joi.required(),
  DOC_TYPE_ID: Joi.required(),
  ID: Joi.required()
})


const itmTempDetailsStructure = Joi.object().keys({
  ITEMS_TEMPLATE_ID: Joi.required(),
  SHIPPABLE_ENABLED_FLAG: Joi.required(),
  PURCHASING_ENABLED_FLAG: Joi.required(),
  CUSTOMER_ORDER_ENABLED_FLAG: Joi.required(),
  INTERNAL_ORDER_ENABLED_FLAG: Joi.required(),
  INVOICEABLE_ITEM_FLAG: Joi.required(),
  RETURNABLE_FLAG: Joi.required(),
  INSPECTION_REQUIRED_FLAG: Joi.required(),
  RECEIPT_REQUIRED_FLAG: Joi.required(),
  RFQ_REQUIRED_FLAG: Joi.required(),
  ALLOW_SUBSTITUTE_RECEIPTS_FLAG: Joi.required(),
  ALLOW_UNORDERED_RECEIPTS_FLAG: Joi.required(),
  ALLOW_EXPRESS_DELIVERY_FLAG: Joi.required(),
  INVOICE_ENABLED_FLAG: Joi.required(),
  COSTING_ENABLED_FLAG: Joi.required(),
  ORDERABLE_ON_WEB_FLAG: Joi.required(),
  COST_OF_SALES_ACCOUNT: Joi.required(),
  SALES_ACCOUNT: Joi.required(),
  EXPENSE_ACCOUNT: Joi.required(),
  ENCUMBRANCE_ACCOUNT: Joi.required(),
  ACCEPTABLE_RATE_INCREASE: Joi.required(),
  ACCEPTABLE_RATE_DECREASE: Joi.required(),
  ORDER_COST: Joi.required(),
  MINIMUM_ORDER_QUANTITY: Joi.required(),
  FIXED_ORDER_QUANTITY: Joi.required(),
  FIXED_DAYS_SUPPLY: Joi.required(),
  MAXIMUM_ORDER_QUANTITY: Joi.required(),
  VENDOR_WARRANTY_FLAG: Joi.required(),
  PREVENTIVE_MAINTENANCE_FLAG: Joi.required(),
  WARRANTY_VENDOR_ID: Joi.required(),
  MAX_WARRANTY_AMOUNT: Joi.required(),
  OUTSIDE_OPERATION_FLAG: Joi.required(),
  VEHICLE_ITEM_FLAG: Joi.required(),
  ELECTRONIC_FLAG: Joi.required(),
  ASSET_CATEGORY_ID: Joi.required(),
  CREATED_BY: Joi.optional()
})
const rcvDocItemsDStructure = Joi.object().keys({
  RCV_DOCUMENT_ITEMS_ID: Joi.required(),
  DOCUMENT_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  BATCH_NUMBER: Joi.required(),
  SERIAL_NUMBER: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  ITEM_PRICE: Joi.required(),
  TOTAL_PRICE: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const rcvInspectionCommittee = Joi.object().keys({
  DOCUMENT_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  EMPLOYEE_ID: Joi.required(),
  EMPLOYEE_POSITION: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})


const rcvInspectionItemsStructure = Joi.object().keys({
  DOCUMENT_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  ITEMS_ID: Joi.required(),
  UNITS_ID: Joi.required(),
  UNIT_FACTOR: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  ITEM_PRICE: Joi.required(),
  TOTAL_PRICE: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})



const rcvInspectionItemsDStructure = Joi.object().keys({
  RCV_INSPECTION_ITEMS_ID: Joi.required(),
  DOCUMENT_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  BATCH_NUMBER: Joi.required(),
  SERIAL_NUMBER: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  ITEM_PRICE: Joi.required(),
  TOTAL_PRICE: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const rcvTempoCommitteStructure = Joi.object().keys({
  DOCUMENT_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  EMPLOYEE_ID: Joi.required(),
  EMPLOYEE_POSITION: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const rcvTempoItemsDStructure = Joi.object().keys({
  RCV_TEMP_ITEMS_ID: Joi.required(),
  DOCUMENT_ID: Joi.required(),
  ARRANGEMENT_NO: Joi.required(),
  BATCH_NUMBER: Joi.required(),
  SERIAL_NUMBER: Joi.required(),
  UNIT_QUANTITY: Joi.required(),
  DEFAULT_UNIT_QUANTITY: Joi.required(),
  BASE_UNIT_QUANTITY: Joi.required(),
  ITEM_COST: Joi.required(),
  TOTAL_COST: Joi.required(),
  ITEM_PRICE: Joi.required(),
  TOTAL_PRICE: Joi.required(),
  NOTES: Joi.optional(),
  CREATED_BY: Joi.optional()
})

const storesDocTypesstructure = Joi.object().keys({
  STORES_ID: Joi.required(),
  DOCUMENT_TYPE_ID: Joi.required(),
  STATUS: Joi.required(),
  CREATED_BY: Joi.optional()
})

const storesItemsGroupNOStructure = Joi.object().keys({
  //STORES_ITEMS_GROUP_NO_ID: Joi.required(),
  STORES_ID: Joi.required(),
  ITEMS_GROUP_ID: Joi.required(),
  STATUS: Joi.required(),
  CREATED_BY: Joi.optional()
})

const storesItemsNOStructure = Joi.object().keys({
  // STORES_ITEMS_NO_ID: Joi.required(),
  STORES_ID: Joi.required(),
  ITEMS_ID: Joi.required(),
  STATUS: Joi.required(),
  CREATED_BY: Joi.optional()
})




const imageUploadStructure = Joi.object().keys({
  IMAGES_ID: Joi.required(),
  SERIAL_NO: Joi.required()
});

const loginStructure = Joi.object().keys({
  USER_NAME: Joi.required(),
  USER_PASSWORD: Joi.required()
});

const roleStructure = Joi.object().keys({
  USER_NAME: Joi.required()
});

const requestStructure = Joi.object().keys({
  REQUEST_STATUS: Joi.optional(),
  REQUEST_TYPE: Joi.required(),
  DESCRIPTION: Joi.optional(),
  SUBSIDIARY_ID: Joi.optional(),
  CLASSIFICATION_ID: Joi.optional()

});

const transactionStructure = Joi.object().keys({
  INVENTORY_PERIODS_ID: Joi.optional(),
  STORES_ID: Joi.required(),
  DOCUMENT_ID: Joi.required(),
  DOCUMENT_TYPE_ID: Joi.required(),
  SUBSIDIARY_ID: Joi.required()


});


const itemPriceStructure = Joi.object().keys({
  ITEMS_UNITS_ID: Joi.required(),
  CURRENCY_ID: Joi.required(),
  ITEM_PRICE: Joi.required(),
  CREATED_BY: Joi.optional()
});


function validateitemPriceStructure(req, res, next) {
  result = Joi.validate(req.body, itemPriceStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}


function validateTransactions(req, res, next) {
  result = Joi.validate(req.body, transactionStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}




function validaterequestStructure(req, res, next) {
  result = Joi.validate(req.body, requestStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}



function validateroleStructure(req, res, next) {
  result = Joi.validate(req.body, roleStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}


function validateloginStructure(req, res, next) {
  result = Joi.validate(req.body, loginStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}





function validateinvStockCommitteStructure(req, res, next) {
  result = Joi.validate(req.body, invStockCommitteStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}
function validateinvRequestCommitteStructure(req, res, next) {
  result = Joi.validate(req.body, invRequestCommitteStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validateinvStockItemsStructure(req, res, next) {
  result = Joi.validate(req.body, invStockItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}


function validateinvStockStoresStructure(req, res, next) {
  result = Joi.validate(req.body, invStockStoresStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validateinvPeriodsStructure(req, res, next) {
  result = Joi.validate(req.body, invPeriodsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatestockTakingBalanceDStructure(req, res, next) {
  result = Joi.validate(req.body, stockTakingBalanceDStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validatestockTakingBalanceStructure(req, res, next) {
  result = Joi.validate(req.body, stockTakingBalanceStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatestockTakingStructure(req, res, next) {
  result = Joi.validate(req.body, stockTakingStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validateRcvDocumentStructure(req, res, next) {
  result = Joi.validate(req.body, rcvDocumentStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validateRcvDocumentCommitteStructure(req, res, next) {
  result = Joi.validate(req.body, rcvDocumentCommitteStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validatercvDocumentItemsStructure(req, res, next) {
  result = Joi.validate(req.body, rcvDocumentItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatercvInspetionStructure(req, res, next) {
  result = Joi.validate(req.body, rcvInspetionStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}



function validatetransferStructure(req, res, next) {
  result = Joi.validate(req.body, transferStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}





function validatetransactionsItemsStructure(req, res, next) {
  result = Joi.validate(req.body, transactionsItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatetransactionsStructure(req, res, next) {
  result = Joi.validate(req.body, transactionsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}




function validateopenBalanceItemsStructure(req, res, next) {
  result = Joi.validate(req.body, openBalanceItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}



function validateopenBalanceStructure(req, res, next) {
  result = Joi.validate(req.body, openBalanceStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validateitemsBalanceUnitsStructure(req, res, next) {
  result = Joi.validate(req.body, itemsBalanceUnitsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}



function validateitemsBalanceDetailStructure(req, res, next) {
  result = Joi.validate(req.body, itemsBalanceDetailStructures);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}



function validatestoresItemsGroupStructure(req, res, next) {
  result = Joi.validate(req.body, storesItemsGroupStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validatestoreItemsStructure(req, res, next) {
  result = Joi.validate(req.body, storeItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatetaxSchemeDetailStructure(req, res, next) {
  result = Joi.validate(req.body, taxSchemeDetailStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}



function validatetaxSchemeStructure(req, res, next) {
  result = Joi.validate(req.body, taxSchemeStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validateitemComponentsStructure(req, res, next) {

  result = Joi.validate(req.body, itemComponentsSt);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validateitemModuleStructure(req, res, next) {
  result = Joi.validate(req.body, itemModuleStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}



function validateitemBalanceStructure(req, res, next) {
  result = Joi.validate(req.body, itemBalanceStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": result.error.details.map(err => err.message).join(' ')
    });
  }

}




function validateitemSupplierStructure(req, res, next) {
  result = Joi.validate(req.body, itemSupplierStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatercvTempoStructure(req, res, next) {
  result = Joi.validate(req.body, rcvTempoStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatesuppliersStructure(req, res, next) {
  result = Joi.validate(req.body, suppliersStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatechartOfAccStructure(req, res, next) {
  result = Joi.validate(req.body, chartOfAccStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}




function validateslowMovingPolicyStructure(req, res, next) {
  result = Joi.validate(req.body, slowMovingPolicyStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validateshortagePolicyStructure(req, res, next) {
  result = Joi.validate(req.body, shortagePolicyStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validatercvtmpItemsStructure(req, res, next) {
  result = Joi.validate(req.body, rcvtmpItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validateitemsUnitsStructure(req, res, next) {
  result = Joi.validate(req.body, itemsUnitsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validateitemsGroupStructure(req, res, next) {
  result = Joi.validate(req.body, itemsGroupStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validateitemDetailsStructure(req, res, next) {
  result = Joi.validate(req.body, itemDetailsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validatesubsDiaryStructure(req, res, next) {
  result = Joi.validate(req.body, subsDiaryStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validatestoresHousesStructure(req, res, next) {
  result = Joi.validate(req.body, storesHousesStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}


function validatestoresLocationStructure(req, res, next) {
  result = Joi.validate(req.body, storesLocation);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validateitemsAliasesStructure(req, res, next) {
  result = Joi.validate(req.body, itemsAliasesStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validateitemsStructure(req, res, next) {
  result = Joi.validate(req.body, itemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatestoresStructure(req, res, next) {
  result = Joi.validate(req.body, storesStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validateitemsSubsStructure(req, res, next) {
  result = Joi.validate(req.body, itemsSubsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatetransactionTypesStructure(req, res, next) {
  result = Joi.validate(req.body, transactionTypesStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatevatSchemeStructure(req, res, next) {
  result = Joi.validate(req.body, vatSchemeStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatezonesStructure(req, res, next) {
  result = Joi.validate(req.body, zonesStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": " invalid payload request Structure, please verify service catalog !"
    });
  }

}

function validatetokenstructure(req, res, next) {
  result = Joi.validate(req.body, tokenstructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validateinvBalanceRequestStructure(req, res, next) {
  result = Joi.validate(req.body, invBalanceRequestStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validateinvBalanceRequestItemsStructure(req, res, next) {
  result = Joi.validate(req.body, invBalanceRequestItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validateinvOpenBalanceItemsDStructure(req, res, next) {
  result = Joi.validate(req.body, invOpenBalanceItemsDStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatestockBalanceUStructure(req, res, next) {
  result = Joi.validate(req.body, stockBalanceUStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatetransactionItemsDStructure(req, res, next) {
  result = Joi.validate(req.body, transactionItemsDStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatetransferItemsStructure(req, res, next) {
  result = Joi.validate(req.body, transferItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatetransferItemsDStructure(req, res, next) {
  result = Joi.validate(req.body, transferItemsDStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatetransferRStructure(req, res, next) {
  result = Joi.validate(req.body, transferRStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}


function validatetransferRItemsStructure(req, res, next) {
  result = Joi.validate(req.body, transferRItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}


function validatetransferStoresStructure(req, res, next) {
  result = Joi.validate(req.body, transferStoresStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validateitmTempDetailsStructure(req, res, next) {
  result = Joi.validate(req.body, itmTempDetailsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatercvDocItemsDStructure(req, res, next) {
  result = Joi.validate(req.body, rcvDocItemsDStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatercvInspectionItemsStructure(req, res, next) {
  result = Joi.validate(req.body, rcvInspectionItemsStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatercvInspectionCommittee(req, res, next) {
  result = Joi.validate(req.body, rcvInspectionCommittee);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatercvInspectionItemsDStructure(req, res, next) {
  result = Joi.validate(req.body, rcvInspectionItemsDStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatercvTempoCommitteStructure(req, res, next) {
  result = Joi.validate(req.body, rcvTempoCommitteStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatercvTempoItemsDStructure(req, res, next) {
  result = Joi.validate(req.body, rcvTempoItemsDStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatestoresDocTypesstructure(req, res, next) {
  result = Joi.validate(req.body, storesDocTypesstructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}



function validatestoresItemsGroupNOStructure(req, res, next) {
  result = Joi.validate(req.body, storesItemsGroupNOStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatesstoresItemsNOStructure(req, res, next) {
  result = Joi.validate(req.body, storesItemsNOStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validateParamsforImageUpload(req, res, next) {
  if (Object.keys(req.params).length <= 0) {
    res.status(400).json({
      "error": "you did not provide any parameters, please verify service catalog !"
    });
  } else {
    result = Joi.validate(req.params, imageUploadStructure);
    if (result.error == null) {
      next();
    } else {
      res.status(400).json({
        "error": "invalid Parameters List Structure, please verify service catalog !"
      });
    }
  }
}

function validateImageType(req, res, next) {
  if (req.file !== undefined) {
    if (req.file.mimetype.startsWith('image', 0)) {
      next();
    } else {
      res.status(400).json({
        "error": "in-correct image file, please provide image file !"
      });
    }
  } else {
    res.status(400).json({
      "error": "Please provide Image File, File does not exists !"
    });
  }
}

async function validateEmployee(req, res, next) {
  let emp = await businessPool(req, res, businessSQL.checkEmployee.statement, {
    EMPLOYEE_ID: req.body.EMPLOYEE_ID
  });
  if (emp.rows[0].EMP <= 0) {
    res.status(400).json({
      status: 400,
      error: "Employee does not exists, please contact system administrator .. !"
    });
  } else {
    next();
  }
}

async function validateOpenBalanceRequest(req, res, next) {
  let emp = await businessPool(req, res, businessSQL.getOpenBalance.statement, {
    OPEN_BALANCE_ID: req.body.ID
  });
  if (emp.rows.length <= 0) {
    res.status(400).json({
      status: 400,
      error: "Provided Open Balance Request is not found !"
    });
  } else {
    next();
  }
}

async function validatePeriod(req, res, next) {
  let vac = await businessPool(req, res, businessSQL.checkOpenPeriod.statement, {
    INVENTORY_PERIOD_ID: req.body.INVENTORY_PERIOD_ID
  });
  if (vac.rows[0].STATUS !== periodStatus.opened) {
    res.status(400).json({
      status: 400,
      error: "please provide Inventory Open Period !"
    });
  } else {
    next();
  }
}

function validateConfirmationStructure(req, res, next) {
  result = Joi.validate(req.body, confirmStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      error: "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function composeupdatestatement(tableName, setValues, where, returns) {
  let result = squel
    .update()
    .table(tableName)
    .setFields(setValues)
    .where(where)
    .toString();

  return result;
}

module.exports = {
  validatetokenstructure: validatetokenstructure,
  validatezonesStructure: validatezonesStructure,
  validatevatSchemeStructure: validatevatSchemeStructure,
  validatetransactionTypesStructure: validatetransactionTypesStructure,
  validateitemsSubsStructure: validateitemsSubsStructure,
  validatestoresStructure: validatestoresStructure,
  validateitemsStructure: validateitemsStructure,
  validateitemsAliasesStructure: validateitemsAliasesStructure,
  validatestoresLocationStructure: validatestoresLocationStructure,
  validatestoresHousesStructure: validatestoresHousesStructure,
  validatesubsDiaryStructure: validatesubsDiaryStructure,
  validateitemDetailsStructure: validateitemDetailsStructure,
  validateitemsGroupStructure: validateitemsGroupStructure,
  validateitemsUnitsStructure: validateitemsUnitsStructure,
  validatercvtmpItemsStructure: validatercvtmpItemsStructure,
  validateshortagePolicyStructure: validateshortagePolicyStructure,
  validateslowMovingPolicyStructure: validateslowMovingPolicyStructure,
  validatechartOfAccStructure: validatechartOfAccStructure,
  validatesuppliersStructure: validatesuppliersStructure,
  validatercvTempoStructure: validatercvTempoStructure,
  validateitemSupplierStructure: validateitemSupplierStructure,
  validateitemBalanceStructure: validateitemBalanceStructure,
  validateitemModuleStructure: validateitemModuleStructure,
  validateitemComponentsStructure: validateitemComponentsStructure,
  validatetaxSchemeStructure: validatetaxSchemeStructure,
  validatetaxSchemeDetailStructure: validatetaxSchemeDetailStructure,
  validatestoreItemsStructure: validatestoreItemsStructure,
  validatestoresItemsGroupStructure: validatestoresItemsGroupStructure,
  validateitemsBalanceDetailStructure: validateitemsBalanceDetailStructure,
  validateitemsBalanceUnitsStructure: validateitemsBalanceUnitsStructure,
  validateopenBalanceStructure: validateopenBalanceStructure,
  validateopenBalanceItemsStructure: validateopenBalanceItemsStructure,
  validatetransactionsStructure: validatetransactionsStructure,
  validatetransactionsItemsStructure: validatetransactionsItemsStructure,
  validatetransferStructure: validatetransferStructure,
  validateRcvDocumentStructure: validateRcvDocumentStructure,
  validateRcvDocumentCommitteStructure: validateRcvDocumentCommitteStructure,
  validatercvDocumentItemsStructure: validatercvDocumentItemsStructure,
  validatercvInspetionStructure: validatercvInspetionStructure,
  validatestockTakingStructure: validatestockTakingStructure,
  validatestockTakingBalanceStructure: validatestockTakingBalanceStructure,
  validatestockTakingBalanceDStructure: validatestockTakingBalanceDStructure,
  validateinvStockCommitteStructure: validateinvStockCommitteStructure,
  validateinvRequestCommitteStructure: validateinvRequestCommitteStructure,
  validateinvStockItemsStructure: validateinvStockItemsStructure,
  validateinvStockStoresStructure: validateinvStockStoresStructure,
  validateinvPeriodsStructure: validateinvPeriodsStructure,
  validateinvBalanceRequestStructure: validateinvBalanceRequestStructure,
  validateinvBalanceRequestItemsStructure: validateinvBalanceRequestItemsStructure,
  validateinvOpenBalanceItemsDStructure: validateinvOpenBalanceItemsDStructure,
  validatestockBalanceUStructure: validatestockBalanceUStructure,
  validatetransactionItemsDStructure: validatetransactionItemsDStructure,
  validatetransferItemsStructure: validatetransferItemsStructure,
  validatetransferItemsDStructure: validatetransferItemsDStructure,
  validatetransferRStructure: validatetransferRStructure,
  validatetransferRItemsStructure: validatetransferRItemsStructure,
  validatetransferStoresStructure: validatetransferStoresStructure,
  validateitmTempDetailsStructure: validateitmTempDetailsStructure,
  validatercvDocItemsDStructure: validatercvDocItemsDStructure,
  validatercvInspectionCommittee: validatercvInspectionCommittee,
  validatercvInspectionItemsStructure: validatercvInspectionItemsStructure,
  validatercvInspectionItemsDStructure: validatercvInspectionItemsDStructure,
  validatercvTempoCommitteStructure: validatercvTempoCommitteStructure,
  validatercvTempoItemsDStructure: validatercvTempoItemsDStructure,
  validatestoresDocTypesstructure: validatestoresDocTypesstructure,
  validatestoresItemsGroupNOStructure: validatestoresItemsGroupNOStructure,
  validatesstoresItemsNOStructure: validatesstoresItemsNOStructure,
  validateParamsforImageUpload: validateParamsforImageUpload,
  validateImageType: validateImageType,
  validateloginStructure: validateloginStructure,
  composeupdatestatement: composeupdatestatement,
  validaterequestStructure: validaterequestStructure,
  validateTransactions: validateTransactions,
  validateEmployee: validateEmployee,
  validatePeriod: validatePeriod,
  validateConfirmationStructure: validateConfirmationStructure,
  validateOpenBalanceRequest: validateOpenBalanceRequest,
  validateitemPriceStructure: validateitemPriceStructure
};
