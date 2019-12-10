let statements ={
    getAllRcvDocumentITems :{
         statement :`SELECT
         RCV_DOCUMENT_ITEMS_ID,
         DOCUMENT_ID,
         ITEMS_ID,
         (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
         (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
         UNITS_ID,
         (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,
         UNIT_FACTOR,
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
         MODIFIED_BY,
         MODIFIED_DATE
    FROM RCV_DOCUMENT_ITEMS I
    WHERE DELETED  = 0 `,
         bindings: [],
         qstring: "",
         requireCommit: false
    },

    getOneRcvDocumentITems :{
      statement :`SELECT
      RCV_DOCUMENT_ITEMS_ID,
      DOCUMENT_ID,
      ITEMS_ID,
      (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
      (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
      UNITS_ID,
      (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,
      UNIT_FACTOR,
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
      MODIFIED_BY,
      MODIFIED_DATE
 FROM RCV_DOCUMENT_ITEMS I
 WHERE RCV_DOCUMENT_ITEMS_ID = :RCV_DOCUMENT_ITEMS_ID AND DELETED = 0`,
      bindings: [],
      qstring: "",
      requireCommit: false
    },

    insertNewRcvDocumentITems :{
      statement :`INSERT INTO RCV_DOCUMENT_ITEMS (
        RCV_DOCUMENT_ITEMS_ID,
        DOCUMENT_ID,
        ITEMS_ID,
        UNITS_ID,
        UNIT_FACTOR,
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
   ) VALUES (
    RCV_DOCUMENT_ITEMS_SEQ.NEXTVAL,
    :DOCUMENT_ID,
    :ITEMS_ID,
    :UNITS_ID,
    :UNIT_FACTOR,
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
      RETURN  RCV_DOCUMENT_ITEMS_ID INTO :R_RCV_DOCUMENT_ITEMS_ID `,
      returns : ["R_RCV_DOCUMENT_ITEMS_ID"],
      bindings: [],
      qstring: "",
      requireCommit: true
    },


    deleteRcvDocumentItems: {
     statement: `UPDATE RCV_DOCUMENT_ITEMS
                   SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                   WHERE
                       rcv_document_items_id = :RCV_DOCUMENT_ITEMS_ID`,
     returns: [],
     bindings: [],
     qstring: "",
     requireCommit: true
   }

}

module.exports = statements ;
