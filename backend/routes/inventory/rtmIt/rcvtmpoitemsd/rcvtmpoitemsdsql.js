let statements = {
    getAllrcvTmpoItemsD : {
        statement :`
        SELECT RCV_TEMP_ITEMS_D_ID,
       RCV_TEMP_ITEMS_ID,
       DOCUMENT_ID,
       ARRANGEMENT_NO,
       BATCH_NUMBER,
       EXPIRY_DATE,
       SERIAL_NUMBER,
       UNIT_QUANTITY,
       DEFAULT_UNIT_QUANTITY,
       BASE_UNIT_QUANTITY,
       ITEM_COST,
       TOTAL_COST,
       ITEM_PRICE,
       TOTAL_PRICE,
       NOTES,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       MODIFIED_BY,
       MODIFIED_DATE
  FROM RCV_TEMPORARY_ITEMS_D
  WHERE DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOnercvTmpoItemsD : {
        statement :` SELECT
        RCV_TEMP_ITEMS_D_ID,
        RCV_TEMP_ITEMS_ID,
        DOCUMENT_ID,
        ARRANGEMENT_NO,
        BATCH_NUMBER,
        EXPIRY_DATE,
        SERIAL_NUMBER,
        UNIT_QUANTITY,
        DEFAULT_UNIT_QUANTITY,
        BASE_UNIT_QUANTITY,
        ITEM_COST,
        TOTAL_COST,
        ITEM_PRICE,
        TOTAL_PRICE,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        MODIFIED_BY,
        MODIFIED_DATE
   FROM RCV_TEMPORARY_ITEMS_D
     WHERE RCV_TEMP_ITEMS_D_ID = :RCV_TEMP_ITEMS_D_ID AND DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertrcvTmpoItemsD : {
        statement :`INSERT INTO RCV_TEMPORARY_ITEMS_D (
            RCV_TEMP_ITEMS_D_ID,
            RCV_TEMP_ITEMS_ID,
            DOCUMENT_ID,
            ARRANGEMENT_NO,
            BATCH_NUMBER,
            EXPIRY_DATE,
            SERIAL_NUMBER,
            UNIT_QUANTITY,
            DEFAULT_UNIT_QUANTITY,
            BASE_UNIT_QUANTITY,
            ITEM_COST,
            TOTAL_COST,
            ITEM_PRICE,
            TOTAL_PRICE,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
             RCV_TEMPORARY_ITEMS_D_SEQ.NEXTVAL,
            :RCV_TEMP_ITEMS_ID,
            :DOCUMENT_ID,
            :ARRANGEMENT_NO,
            :BATCH_NUMBER,
            sysdate,
            :SERIAL_NUMBER,
            :UNIT_QUANTITY,
            :DEFAULT_UNIT_QUANTITY,
            :BASE_UNIT_QUANTITY,
            :ITEM_COST,
            :TOTAL_COST,
            :ITEM_PRICE,
            :TOTAL_PRICE,
            :NOTES,
            :CREATED_BY,
            sysdate
    )
     RETURN DOCUMENT_ID,RCV_TEMP_ITEMS_D_ID into :R_DOCUMENT_ID ,:R_RCV_TEMP_ITEMS_D_ID`,
        returns :["R_DOCUMENT_ID","R_RCV_TEMP_ITEMS_D_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
     deleteRcvTempoiTEMSD: {
        statement: `UPDATE RCV_TEMPORARY_ITEMS_D
                      SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                      WHERE
                          RCV_TEMP_ITEMS_D_ID = :RCV_TEMP_ITEMS_D_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
      }


 }


 module.exports = statements ;
