let statements = {
    insertStoresItemsGroups: {
        statement: `
        INSERT INTO stores_items_group (
                                stores_items_group_id,
                                stores_id,
                                items_group_id,
                                status,
                                created_by,
                                creation_date
                            ) VALUES (
                                STORES_ITEMS_GROUP_SEQ.NEXTVAL,
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
    getStoresItemsGroup:{
        statment:` SELECT
                      stores_items_group_id,
                      stores_id,
                      (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                      items_group_id,
                      (SELECT AR_NAME FROM INVENTORY.ITEMS_GROUP T WHERE T.ITEMS_GROUP_ID = I.ITEMS_GROUP_ID) ITEM_GROUP_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.ITEMS_GROUP T WHERE T.ITEMS_GROUP_ID = I.ITEMS_GROUP_ID) ITEM_GROUP_EN_NAME,
                      status,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date,
                      modified_by,
                      modified_date
                  FROM
                      stores_items_group I
                  WHERE DELETED = 0  `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getStoreItemGroupByID:{
        statment:`
        SELECT
                      stores_items_group_id,
                      stores_id,
                      (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                      items_group_id,
                      (SELECT AR_NAME FROM INVENTORY.ITEMS_GROUP T WHERE T.ITEMS_GROUP_ID = I.ITEMS_GROUP_ID) ITEM_GROUP_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.ITEMS_GROUP T WHERE T.ITEMS_GROUP_ID = I.ITEMS_GROUP_ID) ITEM_GROUP_EN_NAME,
                      status,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date,
                      modified_by,
                      modified_date
                  FROM
                      stores_items_group I
                  WHERE DELETED = 0 
            AND stores_items_group_id =:STORES_ITEMS_GROUP_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteStoreItemGroup: {
          statement: `UPDATE stores_items_group
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            stores_items_group_id = :STORES_ITEMS_GROUP_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};

module.exports = statements;
