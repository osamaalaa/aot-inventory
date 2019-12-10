let statements = {
    getAllitmTempDetails : {
        statement :` SELECT
               ITEMS_TEMPLATE_ID,
               SHIPPABLE_ENABLED_FLAG,
               PURCHASING_ENABLED_FLAG,
               CUSTOMER_ORDER_ENABLED_FLAG,
               INTERNAL_ORDER_ENABLED_FLAG,
               INVOICEABLE_ITEM_FLAG,
               RETURNABLE_FLAG,
               INSPECTION_REQUIRED_FLAG,
               RECEIPT_REQUIRED_FLAG,
               RFQ_REQUIRED_FLAG,
               ALLOW_SUBSTITUTE_RECEIPTS_FLAG,
               ALLOW_UNORDERED_RECEIPTS_FLAG,
               ALLOW_EXPRESS_DELIVERY_FLAG,
               INVOICE_ENABLED_FLAG,
               COSTING_ENABLED_FLAG,
               ORDERABLE_ON_WEB_FLAG,
               COST_OF_SALES_ACCOUNT,
               SALES_ACCOUNT,
               (SELECT AR_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_AR_NAME,
               (SELECT EN_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_EN_NAME,
               EXPENSE_ACCOUNT,
               ENCUMBRANCE_ACCOUNT,
               ACCEPTABLE_RATE_INCREASE,
               ACCEPTABLE_RATE_DECREASE,
               ORDER_COST,
               MINIMUM_ORDER_QUANTITY,
               FIXED_ORDER_QUANTITY,
               FIXED_DAYS_SUPPLY,
               MAXIMUM_ORDER_QUANTITY,
               VENDOR_WARRANTY_FLAG,
               PREVENTIVE_MAINTENANCE_FLAG,
               WARRANTY_VENDOR_ID,
               MAX_WARRANTY_AMOUNT,
               OUTSIDE_OPERATION_FLAG,
               VEHICLE_ITEM_FLAG,
               ELECTRONIC_FLAG,
               ASSET_CATEGORY_ID,
               CREATED_BY,
               CREATION_DATE,
               DELETED
          FROM ITEMS_TEMPLATE_DETAILS I
          WHERE DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneitmTempDetails : {
        statement :` SELECT
        ITEMS_TEMPLATE_ID,
        SHIPPABLE_ENABLED_FLAG,
        PURCHASING_ENABLED_FLAG,
        CUSTOMER_ORDER_ENABLED_FLAG,
        INTERNAL_ORDER_ENABLED_FLAG,
        INVOICEABLE_ITEM_FLAG,
        RETURNABLE_FLAG,
        INSPECTION_REQUIRED_FLAG,
        RECEIPT_REQUIRED_FLAG,
        RFQ_REQUIRED_FLAG,
        ALLOW_SUBSTITUTE_RECEIPTS_FLAG,
        ALLOW_UNORDERED_RECEIPTS_FLAG,
        ALLOW_EXPRESS_DELIVERY_FLAG,
        INVOICE_ENABLED_FLAG,
        COSTING_ENABLED_FLAG,
        ORDERABLE_ON_WEB_FLAG,
        COST_OF_SALES_ACCOUNT,
        SALES_ACCOUNT,
        (SELECT AR_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_AR_NAME,
        (SELECT EN_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_EN_NAME,
        EXPENSE_ACCOUNT,
        ENCUMBRANCE_ACCOUNT,
        ACCEPTABLE_RATE_INCREASE,
        ACCEPTABLE_RATE_DECREASE,
        ORDER_COST,
        MINIMUM_ORDER_QUANTITY,
        FIXED_ORDER_QUANTITY,
        FIXED_DAYS_SUPPLY,
        MAXIMUM_ORDER_QUANTITY,
        VENDOR_WARRANTY_FLAG,
        PREVENTIVE_MAINTENANCE_FLAG,
        WARRANTY_VENDOR_ID,
        MAX_WARRANTY_AMOUNT,
        OUTSIDE_OPERATION_FLAG,
        VEHICLE_ITEM_FLAG,
        ELECTRONIC_FLAG,
        ASSET_CATEGORY_ID,
        CREATED_BY,
        CREATION_DATE,
        DELETED
   FROM ITEMS_TEMPLATE_DETAILS I
   WHERE ITEMS_TEMPLATE_ID = :ITEMS_TEMPLATE_ID  AND DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertitmTempDetails : {
        statement :`INSERT INTO ITEMS_TEMPLATE_DETAILS (
            ITEMS_TEMPLATE_ID,
            SHIPPABLE_ENABLED_FLAG,
            PURCHASING_ENABLED_FLAG,
            CUSTOMER_ORDER_ENABLED_FLAG,
            INTERNAL_ORDER_ENABLED_FLAG,
            INVOICEABLE_ITEM_FLAG,
            RETURNABLE_FLAG,
            INSPECTION_REQUIRED_FLAG,
            RECEIPT_REQUIRED_FLAG,
            RFQ_REQUIRED_FLAG,
            ALLOW_SUBSTITUTE_RECEIPTS_FLAG,
            ALLOW_UNORDERED_RECEIPTS_FLAG,
            ALLOW_EXPRESS_DELIVERY_FLAG,
            INVOICE_ENABLED_FLAG,
            COSTING_ENABLED_FLAG,
            ORDERABLE_ON_WEB_FLAG,
            COST_OF_SALES_ACCOUNT,
            SALES_ACCOUNT,
            EXPENSE_ACCOUNT,
            ENCUMBRANCE_ACCOUNT,
            ACCEPTABLE_RATE_INCREASE,
            ACCEPTABLE_RATE_DECREASE,
            ORDER_COST,
            MINIMUM_ORDER_QUANTITY,
            FIXED_ORDER_QUANTITY,
            FIXED_DAYS_SUPPLY,
            MAXIMUM_ORDER_QUANTITY,
            VENDOR_WARRANTY_FLAG,
            PREVENTIVE_MAINTENANCE_FLAG,
            WARRANTY_VENDOR_ID,
            MAX_WARRANTY_AMOUNT,
            OUTSIDE_OPERATION_FLAG,
            VEHICLE_ITEM_FLAG,
            ELECTRONIC_FLAG,
            ASSET_CATEGORY_ID,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
        :ITEMS_TEMPLATE_ID,
        :SHIPPABLE_ENABLED_FLAG,
            :PURCHASING_ENABLED_FLAG,
            :CUSTOMER_ORDER_ENABLED_FLAG,
            :INTERNAL_ORDER_ENABLED_FLAG,
            :INVOICEABLE_ITEM_FLAG,
            :RETURNABLE_FLAG,
            :INSPECTION_REQUIRED_FLAG,
            :RECEIPT_REQUIRED_FLAG,
            :RFQ_REQUIRED_FLAG,
            :ALLOW_SUBSTITUTE_RECEIPTS_FLAG,
            :ALLOW_UNORDERED_RECEIPTS_FLAG,
            :ALLOW_EXPRESS_DELIVERY_FLAG,
            :INVOICE_ENABLED_FLAG,
            :COSTING_ENABLED_FLAG,
            :ORDERABLE_ON_WEB_FLAG,
            :COST_OF_SALES_ACCOUNT,
            :SALES_ACCOUNT,
            :EXPENSE_ACCOUNT,
            :ENCUMBRANCE_ACCOUNT,
            :ACCEPTABLE_RATE_INCREASE,
            :ACCEPTABLE_RATE_DECREASE,
            :ORDER_COST,
            :MINIMUM_ORDER_QUANTITY,
            :FIXED_ORDER_QUANTITY,
            :FIXED_DAYS_SUPPLY,
            :MAXIMUM_ORDER_QUANTITY,
            :VENDOR_WARRANTY_FLAG,
            :PREVENTIVE_MAINTENANCE_FLAG,
            :WARRANTY_VENDOR_ID,
            :MAX_WARRANTY_AMOUNT,
            :OUTSIDE_OPERATION_FLAG,
            :VEHICLE_ITEM_FLAG,
            :ELECTRONIC_FLAG,
            :ASSET_CATEGORY_ID,
            :CREATED_BY,
             sysdate
    )
     RETURN SHIPPABLE_ENABLED_FLAG into :R_SHIPPABLE_ENABLED_FLAG `,
        returns :["R_SHIPPABLE_ENABLED_FLAG"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
     updateItmTempDetails : {
        statement :`UPDATE ITEMS_TEMPLATE_DETAILS 
           SET SHIPPABLE_ENABLED_FLAG = : SHIPPABLE_ENABLED_FLAG ,
            PURCHASING_ENABLED_FLAG = : PURCHASING_ENABLED_FLAG,
            CUSTOMER_ORDER_ENABLED_FLAG  = :CUSTOMER_ORDER_ENABLED_FLAG ,
            INTERNAL_ORDER_ENABLED_FLAG = :INTERNAL_ORDER_ENABLED_FLAG,
            INVOICEABLE_ITEM_FLAG = :INVOICEABLE_ITEM_FLAG,
            RETURNABLE_FLAG = :RETURNABLE_FLAG,
            INSPECTION_REQUIRED_FLAG = :INSPECTION_REQUIRED_FLAG,
            RECEIPT_REQUIRED_FLAG = :RECEIPT_REQUIRED_FLAG,
            RFQ_REQUIRED_FLAG = :RFQ_REQUIRED_FLAG,
            ALLOW_SUBSTITUTE_RECEIPTS_FLAG = :ALLOW_SUBSTITUTE_RECEIPTS_FLAG,
            ALLOW_UNORDERED_RECEIPTS_FLAG = :ALLOW_UNORDERED_RECEIPTS_FLAG,
            ALLOW_EXPRESS_DELIVERY_FLAG = :ALLOW_EXPRESS_DELIVERY_FLAG,
            INVOICE_ENABLED_FLAG = :INVOICE_ENABLED_FLAG,
            COSTING_ENABLED_FLAG = :COSTING_ENABLED_FLAG,
            ORDERABLE_ON_WEB_FLAG = :ORDERABLE_ON_WEB_FLAG,
            COST_OF_SALES_ACCOUNT = :COST_OF_SALES_ACCOUNT,
            SALES_ACCOUNT = :SALES_ACCOUNT,
            EXPENSE_ACCOUNT = :EXPENSE_ACCOUNT,
            ENCUMBRANCE_ACCOUNT = :ENCUMBRANCE_ACCOUNT,
            ACCEPTABLE_RATE_INCREASE = :ACCEPTABLE_RATE_INCREASE,
            ACCEPTABLE_RATE_DECREASE = :ACCEPTABLE_RATE_DECREASE,
            ORDER_COST = :ORDER_COST,
            MINIMUM_ORDER_QUANTITY = :MINIMUM_ORDER_QUANTITY,
            FIXED_ORDER_QUANTITY = :FIXED_ORDER_QUANTITY,
            FIXED_DAYS_SUPPLY = :FIXED_DAYS_SUPPLY,
            MAXIMUM_ORDER_QUANTITY = :MAXIMUM_ORDER_QUANTITY,
            VENDOR_WARRANTY_FLAG = :VENDOR_WARRANTY_FLAG,
            PREVENTIVE_MAINTENANCE_FLAG = :PREVENTIVE_MAINTENANCE_FLAG,
            WARRANTY_VENDOR_ID = :WARRANTY_VENDOR_ID,
            MAX_WARRANTY_AMOUNT = :MAX_WARRANTY_AMOUNT,
            OUTSIDE_OPERATION_FLAG = :OUTSIDE_OPERATION_FLAG,
            VEHICLE_ITEM_FLAG = :VEHICLE_ITEM_FLAG,
            ELECTRONIC_FLAG = :ELECTRONIC_FLAG,
            ASSET_CATEGORY_ID = :ASSET_CATEGORY_ID,
            CREATED_BY = :CREATED_BY
      WHERE ITEMS_TEMPLATE_ID = :ITEMS_TEMPLATE_ID`,
        returns :[],
        bindings: [],
        qstring: "",
        requireCommit: true
     }
 }


 module.exports = statements ;
