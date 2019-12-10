let statements = {
    getAllstocktakingBalanceU : {
        statement :`
        SELECT INV_STOCKTAKING_BALANCE_U_ID,
               INV_STOCKTAKING_ID,
               INV_STOCKTAKING_BALANCE_ID,
               STORES_ID,
               (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
               ARRANGEMENT_NO,
               PRE_BALANCE,
               ITEMS_ID,
               (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
               (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
               UNITS_ID,
               (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,
               ITEM_COST,
               AVERAGE_COST,
               CURRENT_BALANCE,
               QTY_ON_HAND,
               QTY_RESERVED,
               QTY_TRANSFER_TO,
               QTY_TRANSFER_FROM,
               OTY_DISPOSED,
               QTY_ON_POR,
               QTY_ON_SOR,
               QTY_ON_SO,
               QTY_ON_PO,
               QTY_REQUESTED,
               QTY_SO_CONSIGMENT,
               QTY_PO_CONSIGMENT,
               QTY_IN,
               QTY_OUT,
               STOCKTAKING_CURRENT_BALANCE,
               STOCKTAKING_QTY_ON_HAND,
               DIFF_CURRENT_BALANCE,
               DIFF_QTY_ON_HAND,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_STOCKTAKING_BALANCE_U  I
          WHERE DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOnestocktakingBalanceU : {
        statement :`  SELECT INV_STOCKTAKING_BALANCE_U_ID,
          INV_STOCKTAKING_BALANCE_D_ID,
                 INV_STOCKTAKING_ID,
                 INV_STOCKTAKING_BALANCE_ID,
                 STORES_ID,
                 (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                 (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                 ARRANGEMENT_NO,
                 PRE_BALANCE,
                 ITEMS_ID,
                 (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                 (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                 UNITS_ID,
                 (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,
                 ITEM_COST,
                 AVERAGE_COST,
                 CURRENT_BALANCE,
                 QTY_ON_HAND,
                 QTY_RESERVED,
                 QTY_TRANSFER_TO,
                 QTY_TRANSFER_FROM,
                 OTY_DISPOSED,
                 QTY_ON_POR,
                 QTY_ON_SOR,
                 QTY_ON_SO,
                 QTY_ON_PO,
                 QTY_REQUESTED,
                 QTY_SO_CONSIGMENT,
                 QTY_PO_CONSIGMENT,
                 QTY_IN,
                 QTY_OUT,
                 STOCKTAKING_CURRENT_BALANCE,
                 STOCKTAKING_QTY_ON_HAND,
                 DIFF_CURRENT_BALANCE,
                 DIFF_QTY_ON_HAND,
                 NOTES,
                 CREATED_BY,
                 CREATION_DATE,
                 DELETED,
                 DELETED_BY,
                 DELETED_DATE,
                 MODIFIED_BY,
                 MODIFIED_DATE
            FROM INV_STOCKTAKING_BALANCE_U  I
            WHERE DELETED = 0
            AND INV_STOCKTAKING_BALANCE_U_ID = :INV_STOCKTAKING_BALANCE_U_ID `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertstocktakingBalanceU : {
        statement :`INSERT INTO INV_STOCKTAKING_BALANCE_U (
            INV_STOCKTAKING_BALANCE_U_ID,
            INV_STOCKTAKING_BALANCE_D_ID,
            INV_STOCKTAKING_ID,
            INV_STOCKTAKING_BALANCE_ID,
            STORES_ID,
            ARRANGEMENT_NO,
            PRE_BALANCE,
            ITEMS_ID,
            UNITS_ID,
            ITEM_COST,
            AVERAGE_COST,
            CURRENT_BALANCE,
            QTY_ON_HAND,
            QTY_RESERVED,
            QTY_TRANSFER_TO,
            QTY_TRANSFER_FROM,
            OTY_DISPOSED,
            QTY_ON_POR,
            QTY_ON_SOR,
            QTY_ON_SO,
            QTY_ON_PO,
            QTY_REQUESTED,
            QTY_SO_CONSIGMENT,
            QTY_PO_CONSIGMENT,
            QTY_IN,
            QTY_OUT,
            STOCKTAKING_CURRENT_BALANCE,
            STOCKTAKING_QTY_ON_HAND,
            DIFF_CURRENT_BALANCE,
            DIFF_QTY_ON_HAND,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
            INV_STOCKTAKING_BALANCE_U_SEQ.NEXTVAL,
            :INV_STOCKTAKING_BALANCE_D_ID,
            :INV_STOCKTAKING_ID,
            :INV_STOCKTAKING_BALANCE_ID,
            :STORES_ID,
            :ARRANGEMENT_NO,
            :PRE_BALANCE,
            :ITEMS_ID,
            :UNITS_ID,
            :ITEM_COST,
            :AVERAGE_COST,
            :CURRENT_BALANCE,
            :QTY_ON_HAND,
            :QTY_RESERVED,
            :QTY_TRANSFER_TO,
            :QTY_TRANSFER_FROM,
            :OTY_DISPOSED,
            :QTY_ON_POR,
            :QTY_ON_SOR,
            :QTY_ON_SO,
            :QTY_ON_PO,
            :QTY_REQUESTED,
            :QTY_SO_CONSIGMENT,
            :QTY_PO_CONSIGMENT,
            :QTY_IN,
            :QTY_OUT,
            :STOCKTAKING_CURRENT_BALANCE,
            :STOCKTAKING_QTY_ON_HAND,
            :DIFF_CURRENT_BALANCE,
            :DIFF_QTY_ON_HAND,
            :NOTES,
            :CREATED_BY,
        sysdate
    )
     RETURN INV_STOCKTAKING_ID into :R_INV_STOCKTAKING_ID `,
        returns :["R_INV_STOCKTAKING_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     }


 }


 module.exports = statements ;
