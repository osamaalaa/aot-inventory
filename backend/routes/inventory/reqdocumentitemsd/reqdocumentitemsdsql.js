let statements = {
    getReqDocumentItemsD: {
      statement: `SELECT 
              REQ_DOCUMENT_ITEMS_D_ID, 
              REQ_DOCUMENT_ITEMS_ID, 
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
              FROM INVENTORY.REQ_DOCUMENT_ITEMS_D 
              WHERE DELETED = 0
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
            },

            insertReqDocumentItemsD: {
              statement: `INSERT INTO INVENTORY.REQ_DOCUMENT_ITEMS_D (
                            REQ_DOCUMENT_ITEMS_D_ID, 
                            REQ_DOCUMENT_ITEMS_ID, 
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
                            DELETED) 
                        VALUES ( 
                                REQ_DOCUMENT_ITEMS_D_SEQ.NEXTVAL,
                                :REQ_DOCUMENT_ITEMS_ID,
                                    :DOCUMENT_ID, 
                                    :ARRANGEMENT_NO,
                                    :BATCH_NUMBER,
                                    :EXPIRY_DATE, 
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
                                    SYSDATE, 
                                    0
                        )
                RETURN 
              REQ_DOCUMENT_ITEMS_D_ID,
                REQ_DOCUMENT_ITEMS_ID,
                      DOCUMENT_ID ,
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
                      CREATED_BY
                      INTO :R_REQ_DOCUMENT_ITEMS_D_ID, :R_REQ_DOCUMENT_ITEMS_ID , :R_DOCUMENT_ID , :R_ARRANGEMENT_NO, :R_BATCH_NUMBER, :R_EXPIRY_DATE,  :R_SERIAL_NUMBER , :R_UNIT_QUANTITY , :R_DEFAULT_UNIT_QUANTITY , :R_BASE_UNIT_QUANTITY, :R_ITEM_COST, :R_TOTAL_COST , :R_ITEM_PRICE , :R_TOTAL_PRICE , :R_NOTES , :R_CREATED_BY  `,
                returns: ["R_REQ_DOCUMENT_ITEMS_D_ID","R_REQ_DOCUMENT_ITEMS_ID", "R_DOCUMENT_ID" ,"R_ARRANGEMENT_NO", "R_BATCH_NUMBER", "R_EXPIRY_DATE","R_SERIAL_NUMBER", "R_UNIT_QUANTITY", "R_DEFAULT_UNIT_QUANTITY", "R_BASE_UNIT_QUANTITY", "R_ITEM_COST", "R_TOTAL_COST" , "R_ITEM_PRICE", "R_TOTAL_PRICE", "R_NOTES" , "R_CREATED_BY"],
                bindings: [],
                qstring: "",
                requireCommit: true
            },
            getOneReqDocumentItemsD: {
              statement: `  SELECT 
                      REQ_DOCUMENT_ITEMS_D_ID, 
                      REQ_DOCUMENT_ITEMS_ID, 
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
                      FROM INVENTORY.REQ_DOCUMENT_ITEMS_D 
                      WHERE DELETED = 0 AND DOCUMENT_ID = :DOCUMENT_ID
                      `,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: false
                    },
                    deleteReqDocumentItemsD: {
                      statement: `UPDATE REQ_DOCUMENT_ITEMS_D
                                    SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = SYSDATE
                                    WHERE
                                    REQ_DOCUMENT_ITEMS_D_ID = :REQ_DOCUMENT_ITEMS_D_ID`,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: true
                    }
  
  }
  module.exports = statements;
  