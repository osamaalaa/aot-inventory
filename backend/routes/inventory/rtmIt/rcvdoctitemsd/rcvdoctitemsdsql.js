let statements = {
    getAllrcvDoctItemsD : {
        statement :`  SELECT
               RCV_DOCUMENT_ITEMS_D_ID,
               RCV_DOCUMENT_ITEMS_ID,
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
               DELETED
          FROM RCV_DOCUMENT_ITEMS_D
          WHERE DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOnercvDoctItemsD : {
        statement :` SELECT
        RCV_DOCUMENT_ITEMS_D_ID,
        RCV_DOCUMENT_ITEMS_ID,
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
        DELETED
   FROM RCV_DOCUMENT_ITEMS_D
   WHERE RCV_DOCUMENT_ITEMS_D_ID = :RCV_DOCUMENT_ITEMS_D_ID AND DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertrcvDoctItemsD : {
        statement :`INSERT INTO RCV_DOCUMENT_ITEMS_D (
            RCV_DOCUMENT_ITEMS_D_ID,
            RCV_DOCUMENT_ITEMS_ID,
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
             RCV_DOCUMENT_ITEMS_D_SEQ.NEXTVAL,
            :RCV_DOCUMENT_ITEMS_ID,
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
     RETURN RCV_DOCUMENT_ITEMS_D_ID into :R_RCV_DOCUMENT_ITEMS_D_ID `,
        returns :["R_RCV_DOCUMENT_ITEMS_D_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },

     deleteRcvDocumentItemsDetails : {
        statement: `UPDATE RCV_DOCUMENT_ITEMS_D
                      SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                      WHERE
                      rcv_document_items_d_id = :RCV_DOCUMENT_ITEMS_D_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
      }
     


 }


 module.exports = statements ;
