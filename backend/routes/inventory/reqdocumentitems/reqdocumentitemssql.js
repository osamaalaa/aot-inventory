let statements = {
    getReqDocumentItems: {
      statement: `SELECT 
              REQ_DOCUMENT_ITEMS_ID,
              DOCUMENT_ID,
              ARRANGEMENT_NO, 
              ITEMS_ID,
              (SELECT AR_NAME  FROM INVENTORY.ITEMS T WHERE T.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
              (SELECT EN_NAME  FROM INVENTORY.ITEMS  T WHERE T.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
              UNITS_ID, 
              (SELECT L.PRIMARY_NAME  FROM HR.LOOKUP_DETAILS L WHERE L.LOOKUP_ID = 125 AND L.STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID ) UNIT_AR_NAME,
              (SELECT L.SECONDARY_NAME  FROM HR.LOOKUP_DETAILS L WHERE L.LOOKUP_ID = 125 AND L.STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID ) UNIT_EN_NAME,
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
              FROM INVENTORY.REQ_DOCUMENT_ITEMS I
              WHERE DELETED = 0 
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
            },

            insertReqDocumentItems: {
              statement: `INSERT INTO INVENTORY.REQ_DOCUMENT_ITEMS (
                  REQ_DOCUMENT_ITEMS_ID, 
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
                  CREATION_DATE,
                  DELETED) 
             VALUES (
                 REQ_DOCUMENT_ITEMS_SEQ.NEXTVAL,
                 :DOCUMENT_ID,
                 :ARRANGEMENT_NO,
                 :ITEMS_ID,
                 :UNITS_ID,
                 :UNIT_FACTOR,
                 :UNIT_QUANTITY,
                 :UNIT_FACTOR * :UNIT_QUANTITY,
                 :BASE_UNIT_QUANTITY,
                 :ITEM_COST,
                 :TOTAL_COST,
                 :ITEM_PRICE,
                 :TOTAL_PRICE,
                 :NOTES,
                 :CREATED_BY,
                 SYSDATE,
                 0
               )
                RETURN REQ_DOCUMENT_ITEMS_ID,
                      DOCUMENT_ID ,
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
                      CREATED_BY
                      INTO :R_REQ_DOCUMENT_ITEMS_ID , :R_DOCUMENT_ID , :R_ARRANGEMENT_NO, :R_ITEMS_ID, :R_UNITS_ID ,  :R_UNIT_FACTOR , :R_UNIT_QUANTITY , :R_DEFAULT_UNIT_QUANTITY , :R_BASE_UNIT_QUANTITY, :R_ITEM_COST, :R_TOTAL_COST , :R_ITEM_PRICE , :R_TOTAL_PRICE , :R_NOTES , :R_CREATED_BY  `,
                returns: ["R_REQ_DOCUMENT_ITEMS_ID", "R_DOCUMENT_ID" ,"R_ARRANGEMENT_NO", "R_ITEMS_ID", "R_UNITS_ID","R_UNIT_FACTOR", "R_UNIT_QUANTITY", "R_DEFAULT_UNIT_QUANTITY", "R_BASE_UNIT_QUANTITY", "R_ITEM_COST", "R_TOTAL_COST" , "R_ITEM_PRICE", "R_TOTAL_PRICE", "R_NOTES" , "R_CREATED_BY"],
                bindings: [],
                qstring: "",
                requireCommit: true
            },
            getOneReqDocumentItems: {
              statement: `  SELECT 
                      REQ_DOCUMENT_ITEMS_ID,
                      DOCUMENT_ID, 
                      ARRANGEMENT_NO, 
                      ITEMS_ID,
                      (SELECT AR_NAME  FROM INVENTORY.ITEMS T WHERE T.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                      (SELECT EN_NAME  FROM INVENTORY.ITEMS  T WHERE T.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                      UNITS_ID, 
                      (SELECT L.PRIMARY_NAME  FROM HR.LOOKUP_DETAILS L WHERE L.LOOKUP_ID = 125 AND L.STATUS = 1 ) UNIT_AR_NAME,
                      (SELECT L.SECONDARY_NAME  FROM HR.LOOKUP_DETAILS L WHERE L.LOOKUP_ID = 125 AND L.STATUS = 1 ) UNIT_EN_NAME,
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
                      FROM INVENTORY.REQ_DOCUMENT_ITEMS I
                      WHERE DELETED = 0 AND DOCUMENT_ID = :DOCUMENT_ID
                      `,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: false
                    },
                    deleteReqDocumentItems: {
                      statement: `UPDATE REQ_DOCUMENT_ITEMS
                                    SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = SYSDATE
                                    WHERE
                                    REQ_DOCUMENT_ITEMS_ID = :REQ_DOCUMENT_ITEMS_ID`,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: true
                    }
  
  }
  module.exports = statements;
  