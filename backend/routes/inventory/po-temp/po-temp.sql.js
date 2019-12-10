let statements = {

    selectAllPoTemp:{
        statment:`
        select
        PO_DATE,
        STORES_ID,
        PO_TEMP_ID,
        SEPRATE_ITEMS,
        NOTES,
(SELECT AR_NAME  FROM stores PS WHERE PS.stores_id = I.STORES_ID) STORE_AR_NAME,
(SELECT EN_NAME  FROM stores PS WHERE PS.stores_id = I.STORES_ID) STORE_EN_NAME

        from PO_TEMP I `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },

        getOnePoTemp:{
        statment:`
        select * from PO_TEMP where PO_TEMP_ID = :PO_TEMP_ID `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        purchaseOrderReqNew:{
        statment:`
         BEGIN
         INVENTORY.PURCHASE_ORDER_REQ(:STORES_ID,:EMP_ID,'NEW');
      END;`,
            bindings: [],
            qstring: "",
            requireCommit: true
        },
        purchaseOrderReqAction:{
             statment:`
         BEGIN
         INVENTORY.PURCHASE_ORDER_REQ(:STORES_ID,:EMP_ID,'ACTION');
      END;`,

            bindings: [],
            qstring: "",
            requireCommit: true
        },
};

module.exports = statements;
