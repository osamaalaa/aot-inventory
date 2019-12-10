let statements = {
    getAllstoresDocTypes : {
        statement :`
        SELECT
        STORES_DOCUMENT_TYPES_ID,
        (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE I.DOCUMENT_TYPE_ID = T.DOCUMENT_TYPE_ID ) DOCUMENT_AR_NAME,
        (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE I.DOCUMENT_TYPE_ID = T.DOCUMENT_TYPE_ID )  DOCUMENT_EN_NAME,
        STORES_ID,
        (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME ,
        (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME ,
        DOCUMENT_TYPE_ID,
        STATUS,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        MODIFIED_BY,
        MODIFIED_DATE
        FROM STORES_DOCUMENT_TYPES I
          WHERE DELETED = 0   `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOnestoresDocTypes : {
        statement :` SELECT
        STORES_DOCUMENT_TYPES_ID,
        (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE I.DOCUMENT_TYPE_ID = T.DOCUMENT_TYPE_ID ) DOCUMENT_AR_NAME,
        (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE I.DOCUMENT_TYPE_ID = T.DOCUMENT_TYPE_ID )  DOCUMENT_EN_NAME,
        STORES_ID,
        (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME ,
        (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME ,
        DOCUMENT_TYPE_ID,
        STATUS,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        MODIFIED_BY,
        MODIFIED_DATE
   FROM STORES_DOCUMENT_TYPES I
     WHERE STORES_DOCUMENT_TYPES_ID = :STORES_DOCUMENT_TYPES_ID  `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertstoresDocTypes : {
        statement :`INSERT INTO STORES_DOCUMENT_TYPES (
            STORES_DOCUMENT_TYPES_ID,
            STORES_ID,
            DOCUMENT_TYPE_ID,
            STATUS,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
        STORES_DOCUMENT_TYPES_SEQ.NEXTVAL,
        :STORES_ID,
        :DOCUMENT_TYPE_ID,
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
     deleteStoreDocumentType: {
      statement: `UPDATE STORES_DOCUMENT_TYPES
                    SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                    WHERE
                        STORES_DOCUMENT_TYPES_ID = :STORES_DOCUMENT_TYPES_ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: true
    }


 }


 module.exports = statements ;
