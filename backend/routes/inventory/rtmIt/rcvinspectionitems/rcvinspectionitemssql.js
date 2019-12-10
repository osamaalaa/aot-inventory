let statements = {
    getAllrcvInspectionItems : {
        statement :`
SELECT RCV_INSPECTION_ITEMS_ID,
       DOCUMENT_ID,
       ARRANGEMENT_NO,
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
       DELETED_BY,
       DELETED_DATE,
       MODIFIED_BY,
       MODIFIED_DATE
  FROM RCV_INSPECTION_ITEMS I
  WHERE DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOnercvInspectionItems : {
        statement :` SELECT RCV_INSPECTION_ITEMS_ID,
               DOCUMENT_ID,
               ARRANGEMENT_NO,
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
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM RCV_INSPECTION_ITEMS I
        
     WHERE RCV_INSPECTION_ITEMS_ID = :RCV_INSPECTION_ITEMS_ID AND DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertrcvInspectionItems : {
        statement :`INSERT INTO RCV_INSPECTION_ITEMS (
            RCV_INSPECTION_ITEMS_ID,
            DOCUMENT_ID,
            ARRANGEMENT_NO,
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
     )VALUES (
        RCV_INSPECTION_ITEMS_SEQ.NEXTVAL,
        :DOCUMENT_ID,
            :ARRANGEMENT_NO,
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
     RETURN DOCUMENT_ID,RCV_INSPECTION_ITEMS_ID into :R_DOCUMENT_ID, :R_RCV_INSPECTION_ITEMS_ID `,
        returns :["R_DOCUMENT_ID","R_RCV_INSPECTION_ITEMS_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
          
     deleteRcvInspectionItems : {
        statement: `UPDATE rcv_inspection_items
                      SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                      WHERE
                          rcv_inspection_items_id = :RCV_INSPECTION_ITEMS_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
      }


 }


 module.exports = statements ;
