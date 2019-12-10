let statements = {
    getAlltInvTransferR : {
        statement :`
        SELECT INV_TRANSFER_R_ID,
               INV_TRANSFER_STORES_ID,
               INV_TRANSFER_ID,
               DOCUMENT_TYPE_ID,
               
 (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
               DOCUMENT_DATE,
               INVENTORY_PERIODS_ID,
               STORES_ID,
               (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
               TRANSFER_DATE,
               DOCUMENT_NO,
               BASE_DOCUMENT_ID,
               BASE_DOCUMENT_TYPE_ID,
               SUBSIDIARY_ID,
               (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
               (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
               JOURNALS_ID,
               SOURCE_TYPE,
               DOCUMENT_STATUS,
               (select PRIMARY_NAME  FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.DOCUMENT_STATUS ) STATUS_NAME,
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
          FROM INV_TRANSFER_R I
          WHERE DELETED = 0  `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneInvTransferR : {
        statement :`SELECT INV_TRANSFER_R_ID,
               INV_TRANSFER_STORES_ID,
               INV_TRANSFER_ID,
               DOCUMENT_TYPE_ID,
               DOCUMENT_DATE,
               INVENTORY_PERIODS_ID,
               STORES_ID,
               (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
               (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
               TRANSFER_DATE,
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
               WF_REQUEST_ID,
               MODIFIED_DATE
          FROM INV_TRANSFER_R I
          WHERE DELETED = 0
          AND INV_TRANSFER_R_ID = :INV_TRANSFER_R_ID `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertInvTransferR : {
        statement :`INSERT INTO INV_TRANSFER_R (
            INV_TRANSFER_R_ID,
            INV_TRANSFER_STORES_ID,
            INV_TRANSFER_ID,
            DOCUMENT_TYPE_ID,
            DOCUMENT_DATE,
            INVENTORY_PERIODS_ID,
            STORES_ID,
            TRANSFER_DATE,
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
             INV_TRANSFER_R_SEQ.NEXTVAL,
            :INV_TRANSFER_STORES_ID,
            :INV_TRANSFER_ID,
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
     RETURN INV_TRANSFER_STORES_ID into :R_INV_TRANSFER_STORES_ID `,
        returns :["R_INV_TRANSFER_STORES_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
     deleteTransferR: {
      statement: `UPDATE inv_transfer_r
                    SET deleted = 1 ,   deleted_date = sysdate
                    WHERE
                    inv_transfer_r_id = :INV_TRANSFER_R_ID`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: true
    },


 }


 module.exports = statements ;
