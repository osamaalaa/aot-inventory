let statements = {
    getAllInvBalanceRequest : {
        statement :` SELECT
               INV_BALANCE_REQUEST_ID,
               DOCUMENT_TYPE_ID,
               (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
               DOCUMENT_DATE,
               INVENTORY_PERIODS_ID,
               (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
               STORES_ID,
               (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
               REQUEST_DATE,
               DOCUMENT_NO,
               BASE_DOCUMENT_ID,
               BASE_DOCUMENT_TYPE_ID,
               SUBSIDIARY_ID,
               (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
               (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
               JOURNALS_ID,
               SOURCE_TYPE,
               DOCUMENT_STATUS,
               (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.DOCUMENT_STATUS ) STATUS_NAME,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               VALDIATED_BY,
               VALDIATED_DATE,
               CONFIRMED_BY,
               CONFIRMED_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_BALANCE_REQUEST I
          WHERE DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneInvBalanceRequest : {
        statement :` SELECT
               INV_BALANCE_REQUEST_ID,
               DOCUMENT_TYPE_ID,
               (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
               DOCUMENT_DATE,
               INVENTORY_PERIODS_ID,
               (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
               STORES_ID,
               (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
               REQUEST_DATE,
               DOCUMENT_NO,
               BASE_DOCUMENT_ID,
               BASE_DOCUMENT_TYPE_ID,
               SUBSIDIARY_ID,
               (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
               (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
               JOURNALS_ID,
               SOURCE_TYPE,
               DOCUMENT_STATUS,
               (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.DOCUMENT_STATUS ) STATUS_NAME,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               VALDIATED_BY,
               VALDIATED_DATE,
               CONFIRMED_BY,
               CONFIRMED_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_BALANCE_REQUEST I
          WHERE DELETED = 0
   AND INV_BALANCE_REQUEST_ID = :INV_BALANCE_REQUEST_ID `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertInvBalanceRequest : {
        statement :`INSERT INTO INV_BALANCE_REQUEST (
            INV_BALANCE_REQUEST_ID,
            DOCUMENT_TYPE_ID,
            DOCUMENT_DATE,
            INVENTORY_PERIODS_ID,
            STORES_ID,
            REQUEST_DATE,
            DOCUMENT_NO,
            BASE_DOCUMENT_ID,
            BASE_DOCUMENT_TYPE_ID,
            SUBSIDIARY_ID,
            JOURNALS_ID,
            SOURCE_TYPE,
            DOCUMENT_STATUS,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
             INV_BALANCE_REQUEST_SEQ.NEXTVAL,
             :DOCUMENT_TYPE_ID,
             sysdate,
             :INVENTORY_PERIODS_ID,
             :STORES_ID,
             sysdate,
             :DOCUMENT_NO,
             :BASE_DOCUMENT_ID,
             :BASE_DOCUMENT_TYPE_ID,
             :SUBSIDIARY_ID,
             :JOURNALS_ID,
             :SOURCE_TYPE,
             :DOCUMENT_STATUS,
             :NOTES,
             :CREATED_BY,
             sysdate
    )
     RETURN DOCUMENT_TYPE_ID into :R_DOCUMENT_TYPE_ID `,
        returns :["R_DOCUMENT_TYPE_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     }


 }


 module.exports = statements ;
