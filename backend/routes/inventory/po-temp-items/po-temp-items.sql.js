let statements = {

    selectAllPoTempItems:{
        statment:` 
        select 
            PO_TEMP_ITEMS_ID,
            PO_TEMP_ID,
            ITEMS_ID,
            UNITS_ID,
            (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
            (SELECT ITEM_CODE  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_CODE,
            (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
            (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,

            UNIT_FACTOR,
            CURRENT_BALANCE,
            PO_QUANTITY,
            DEFAULT_UNIT_QUANTITY,
            SELECTED
         from PO_TEMP_ITEMS I`,
            bindings: [],
            qstring: "",
            requireCommit: false
        }
};

module.exports = statements;
