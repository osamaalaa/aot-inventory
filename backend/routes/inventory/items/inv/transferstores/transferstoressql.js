let statements = {
    getAllTransferStores : {
        statement :` SELECT
       INV_TRANSFER_STORES_ID,
       INV_TRANSFER_ID,
       STORES_ID,
       (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
       (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
       NOTES,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       MODIFIED_BY,
       MODIFIED_DATE
  FROM INV_TRANSFER_STORES  I
  WHERE DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneTransferStores : {
        statement :` SELECT
        INV_TRANSFER_STORES_ID,
        INV_TRANSFER_ID,
        STORES_ID,
        (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
        (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        MODIFIED_BY,
        MODIFIED_DATE
   FROM INV_TRANSFER_STORES I
      WHERE INV_TRANSFER_STORES_ID = :INV_TRANSFER_STORES_ID AND DELETED = 0  `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertTransferStores : {
        statement :`INSERT INTO INV_TRANSFER_STORES (
            INV_TRANSFER_STORES_ID,
            INV_TRANSFER_ID,
            STORES_ID,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
        INV_TRANSFER_STORES_SEQ.NEXTVAL,
        :INV_TRANSFER_ID,
            :STORES_ID,
            :NOTES,
            :CREATED_BY,
            sysdate
    )
     RETURN INV_TRANSFER_ID into :R_INV_TRANSFER_ID `,
        returns :["R_INV_TRANSFER_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     }


 }


 module.exports = statements ;
