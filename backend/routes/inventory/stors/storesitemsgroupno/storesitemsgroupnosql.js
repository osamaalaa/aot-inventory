let statements = {
    getAllstoresItemsGroupNO : {
        statement :`
        SELECT STORES_ITEMS_GROUP_NO_ID,
               STORES_ID,
               (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
               ITEMS_GROUP_ID,
               (SELECT AR_NAME FROM INVENTORY.ITEMS_GROUP T WHERE T.ITEMS_GROUP_ID = I.ITEMS_GROUP_ID) ITEM_GROUP_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.ITEMS_GROUP T WHERE T.ITEMS_GROUP_ID = I.ITEMS_GROUP_ID) ITEM_GROUP_EN_NAME,
               STATUS,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM STORES_ITEMS_GROUP_NO I
          WHERE  DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOnestoresItemsGroupNO : {
        statement :`
        SELECT STORES_ITEMS_GROUP_NO_ID,
               STORES_ID,
               (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
               ITEMS_GROUP_ID,
               (SELECT AR_NAME FROM INVENTORY.ITEMS_GROUP T WHERE T.ITEMS_GROUP_ID = I.ITEMS_GROUP_ID) ITEM_GROUP_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.ITEMS_GROUP T WHERE T.ITEMS_GROUP_ID = I.ITEMS_GROUP_ID) ITEM_GROUP_EN_NAME,
               STATUS,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM STORES_ITEMS_GROUP_NO I
     WHERE STORES_ITEMS_GROUP_NO_ID = :STORES_ITEMS_GROUP_NO_ID AND DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertstoresItemsGroupNO : {
        statement :`INSERT INTO STORES_ITEMS_GROUP_NO (
            STORES_ITEMS_GROUP_NO_ID,
            STORES_ID,
            ITEMS_GROUP_ID,
            STATUS,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
        STORES_ITEMS_GROUP_NO_ID_SEQ.NEXTVAL,
            :STORES_ID,
            :ITEMS_GROUP_ID,
            :STATUS,
            :CREATED_BY,
        sysdate
    )
    RETURN STORES_ID , ITEMS_GROUP_ID , STATUS INTO :R_STORES_ID, :R_ITEMS_GROUP_ID, :R_STATUS`,
        returns: ["R_STORES_ID", "R_ITEMS_GROUP_ID", "R_STATUS"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
     deleteStoreItemGroupNo: {
        statement: `UPDATE STORES_ITEMS_GROUP_NO
                      SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                      WHERE
                          stores_items_group_no_id = :STORES_ITEMS_GROUP_NO_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
      }

 };


 module.exports = statements ;
