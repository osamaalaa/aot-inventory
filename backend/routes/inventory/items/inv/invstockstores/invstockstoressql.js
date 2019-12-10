let statements = {
    getAllInvStockStores : {
        statement :`
        SELECT INV_STOCKTAKING_STORES_ID,
               INV_STOCKTAKING_ID,
               ARRANGEMENT_NO,
               STORES_ID,
               (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME ,
               (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME ,
               START_DATE,
               END_DATE,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_STOCKTAKING_STORES I
          WHERE DELETED = 0    `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneInvStockStores : {
        statement :` SELECT
        INV_STOCKTAKING_STORES_ID,
        INV_STOCKTAKING_ID,
        ARRANGEMENT_NO,
        STORES_ID,
        (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME ,
        (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME ,
        START_DATE,
        END_DATE,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        MODIFIED_BY,
        MODIFIED_DATE
   FROM INV_STOCKTAKING_STORES
   WHERE INV_STOCKTAKING_STORES_ID = :INV_STOCKTAKING_STORES_ID
   AND DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertInvStockStores : {
        statement :`INSERT INTO INV_STOCKTAKING_STORES (
            INV_STOCKTAKING_STORES_ID,
            INV_STOCKTAKING_ID,
            ARRANGEMENT_NO,
            STORES_ID,
            START_DATE,
            END_DATE,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
        INV_STOCKTAKING_STORES_SEQ.NEXTVAL,
        :INV_STOCKTAKING_ID,
        :ARRANGEMENT_NO,
        :STORES_ID,
        sysdate,
        sysdate,
        :NOTES,
        :CREATED_BY,
            sysdate
    )
     RETURN INV_STOCKTAKING_ID INTO :R_INV_STOCKTAKING_ID `,
        returns :["R_INV_STOCKTAKING_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     }


 }


 module.exports = statements ;
