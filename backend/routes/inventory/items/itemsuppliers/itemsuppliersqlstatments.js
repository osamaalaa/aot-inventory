let statements = {
    insertnewSupplier: {
        statement: `
        INSERT INTO ITEMS_SUPPLIERS (
            ITEMS_SUPPLIERS_ID,
            ITEMS_ID,
            SUPPLIER_ID,
            SUPPLIER_ITEM_CODE,
            ITEM_COST,
            UNITS_ID,
            CREATED_BY,
            CREATION_DATE
            ) VALUES (
                ITEMS_SUPPLIERS_SEQ.NEXTVAL,
                :ITEMS_ID,
                :SUPPLIER_ID,
                :SUPPLIER_ITEM_CODE,
                :ITEM_COST,
                :UNITS_ID,
                :CREATED_BY,
                sysdate
                  )
         RETURN ITEMS_ID INTO : R_ITEMS_ID`,
        returns: ["R_ITEMS_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getAllitemSuppls:{
        statement:` SELECT
                    items_suppliers_id,
                    items_id,
                    (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                    (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                    supplier_id,
                    (SELECT AR_NAME FROM INVENTORY.SUPPLIERS S WHERE S.SUPPLIER_ID = I.supplier_id) SUPPLIER_AR_NAME,
                    (SELECT EN_NAME FROM INVENTORY.SUPPLIERS S WHERE S.SUPPLIER_ID = I.supplier_id) SUPPLIER_EN_NAME,
                    supplier_item_code,
                    item_cost,
                    units_id,
                    (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.units_id ) UNITS_NAME,
                    created_by,
                    creation_date,
                    deleted
                FROM
                    items_suppliers I
                    WHERE deleted = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    selectOneitemsupplier:{
        statment:`
        SELECT
                    items_suppliers_id,
                    items_id,
                    (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                    (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                    supplier_id,
                    (SELECT AR_NAME FROM INVENTORY.SUPPLIERS S WHERE S.SUPPLIER_ID = I.supplier_id) SUPPLIER_AR_NAME,
                    (SELECT EN_NAME FROM INVENTORY.SUPPLIERS S WHERE S.SUPPLIER_ID = I.supplier_id) SUPPLIER_EN_NAME,
                    supplier_item_code,
                    item_cost,
                    units_id,
                    (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.units_id ) UNITS_NAME,
                    created_by,
                    creation_date,
                    deleted
                FROM
                items_suppliers I
                WHERE items_suppliers_id =:ITEMS_SUPPLIERS_ID AND deleted = 0 `,
            
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteitemSupplier: {
          statement: `UPDATE items_suppliers
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = SYSDATE
                        WHERE
                            items_suppliers_id = :ITEMS_SUPPLIERS_ID `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};

module.exports = statements;
