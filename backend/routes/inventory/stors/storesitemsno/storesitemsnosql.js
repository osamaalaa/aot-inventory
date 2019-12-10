let statements = {
    getAllStoresItemsNO : {
        statement :`
        SELECT STORES_ITEMS_NO_ID,
       STORES_ID,
       (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
       (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
       ITEMS_ID,
       (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
       (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
       STATUS,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       MODIFIED_BY,
       MODIFIED_DATE
  FROM STORES_ITEMS_NO I
  WHERE DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneStoresItemsNO : {
        statement :`
        SELECT STORES_ITEMS_NO_ID,
       STORES_ID,
       (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
       (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
       ITEMS_ID,
       (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
       (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
       STATUS,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       MODIFIED_BY,
       MODIFIED_DATE
  FROM STORES_ITEMS_NO I
  WHERE DELETED = 0 AND STORES_ITEMS_NO_ID = :STORES_ITEMS_NO_ID `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertStoresItemsNO : {
        statement :`INSERT INTO STORES_ITEMS_NO (
            STORES_ITEMS_NO_ID,
            STORES_ID,
            ITEMS_ID,
            STATUS,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
        STORES_ITEMS_NO_SEQ.NEXTVAL,
            :STORES_ID,
            :ITEMS_ID,
            :STATUS,
            :CREATED_BY,
        sysdate
    )
     RETURN STORES_ID into :R_STORES_ID `,
        returns :["R_STORES_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
     deleteStoreItemNo: {
        statement: `UPDATE STORES_ITEMS_NO
                      SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                      WHERE
                          STORES_ITEMS_NO_ID = :STORES_ITEMS_NO_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
      }


 }


 module.exports = statements ;
