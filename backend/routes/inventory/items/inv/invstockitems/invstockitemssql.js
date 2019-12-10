let statements = {
    getAllInvStockItems : {
        statement :`  SELECT
               INV_STOCKTAKING_ITEMS_ID,
               INV_STOCKTAKING_ID,
               ARRANGEMENT_NO,
               ITEMS_ID,
               (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
               (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_STOCKTAKING_ITEMS I
          WHERE DELETED = 0   `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneInvStockItems : {
        statement :` SELECT
        INV_STOCKTAKING_ITEMS_ID,
        INV_STOCKTAKING_ID,
        ARRANGEMENT_NO,
        ITEMS_ID,
        (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
        (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        MODIFIED_BY,
        MODIFIED_DATE
   FROM INV_STOCKTAKING_ITEMS
   WHERE INV_STOCKTAKING_ITEMS_ID = :INV_STOCKTAKING_ITEMS_ID AND DELETED = 0  `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertInvStockItems : {
        statement :`INSERT INTO INV_STOCKTAKING_ITEMS (
            INV_STOCKTAKING_ITEMS_ID,
            INV_STOCKTAKING_ID,
            ARRANGEMENT_NO,
            ITEMS_ID,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
            INV_STOCKTAKING_ITEMS_SEQ.NEXTVAL,
            :INV_STOCKTAKING_ID,
            :ARRANGEMENT_NO,
            :ITEMS_ID,
            :NOTES,
            :CREATED_BY,
            sysdate
    )
     RETURN INV_STOCKTAKING_ITEMS_ID, ARRANGEMENT_NO INTO :R_INV_STOCKTAKING_ITEMS_ID, :R_ARRANGEMENT_NO `,
        returns :["R_ARRANGEMENT_NO","R_INV_STOCKTAKING_ITEMS_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     }
 }


 module.exports = statements ;
