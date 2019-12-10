let statements = {
    insertStoresItems: {
        statement: `
        INSERT INTO stores_items (
                          stores_items_id,
                          stores_id,
                          items_id,
                          status,
                          created_by,
                          creation_date
                      ) VALUES (
                          STORES_ITEMS_SEQ.NEXTVAL,
                          :STORES_ID,
                          :ITEMS_ID,
                          :STATUS,
                          :CREATED_BY,
                           sysdate
                      )
         RETURN STORES_ID , ITEMS_ID , STATUS INTO :R_STORES_ID, :R_ITEMS_ID, :R_STATUS`,
        returns: ["R_STORES_ID", "R_ITEMS_ID", "R_STATUS"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getStoresItems:{
        statment:` SELECT
                      stores_items_id,
                      stores_id,
                      (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                      items_id,
                      (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                      (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                      status,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date,
                      modified_by,
                      modified_date
                  FROM
                      stores_items I
                      WHERE DELETED = 0 `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getStoreItemByID:{
        statment:`
        SELECT
                      stores_items_id,
                      stores_id,
                      (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                      items_id,
                      (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                      (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                      status,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date,
                      modified_by,
                      modified_date
                  FROM
                      stores_items I
            WHERE  DELETED = 0 AND stores_items_id =:STORES_ITEMS_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteStoreItem: {
          statement: `UPDATE stores_items
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            stores_items_id = :STORES_ITEMS_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        },
        getStoresItemsByStoreID:{
            statment:` SELECT
                          stores_items_id,
                          stores_id,
                          (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                          (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                          items_id,
                          (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                          (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                          status,
                          created_by,
                          creation_date,
                          deleted,
                          deleted_by,
                          deleted_date,
                          modified_by,
                          modified_date
                      FROM
                          stores_items I
                          WHERE DELETED = 0 AND STATUS !=4 AND STORES_ID = :STORES_ID`,
                bindings: [],
                qstring: "",
                requireCommit: false
            },
            SearchingForStoresItemsByEnName:{
                statment:`
                SELECT 
           
                I.stores_items_id,
                I.stores_id,
                (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                I.items_id,
                --(SELECT DISTINCT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID  ) ITEM_AR_NAME,
                --(SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                I.status,
                I.created_by,
                I.creation_date , 
                I.DELETED ,
                M.AR_NAME ITEM_AR_NAME,
                M.EN_NAME ITEM_EN_NAME
            FROM
                stores_items I ,ITEMS M
                WHERE I.DELETED = 0 AND I.STATUS !=4 AND I.STORES_ID = :STORES_ID AND (M.EN_NAME)  LIKE ((:EN_NAME) ||'%') AND I.ITEMS_ID = M.ITEMS_ID`,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                },
                SearchingForStoresItemsByARName:{
                    statment:`
                    SELECT 
                          I.stores_items_id,
                          I.stores_id,
                          (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                          (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                          I.items_id,
                          --(SELECT DISTINCT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID  ) ITEM_AR_NAME,
                          --(SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                          I.status,
                          I.created_by,
                          I.creation_date , 
                          I.DELETED ,
                          M.AR_NAME ITEM_AR_NAME,
                          M.EN_NAME ITEM_EN_NAME                       
                      FROM
                          stores_items I ,ITEMS M
                          WHERE I.DELETED = 0 AND I.STATUS !=4 AND I.STORES_ID = :STORES_ID AND (M.AR_NAME)  LIKE ((:AR_NAME) ||'%') AND I.ITEMS_ID = M.ITEMS_ID`,
                        bindings: [],
                        qstring: "",
                        requireCommit: false
                    }
};

module.exports = statements;
