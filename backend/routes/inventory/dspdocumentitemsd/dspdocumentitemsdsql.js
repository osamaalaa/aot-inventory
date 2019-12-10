let statements = {
    getDSPdocumentItemsD: {
      statement: `SELECT 
                  DSP_DOCUMENT_ITEMS_D_ID,
                  DSP_DOCUMENT_ITEMS_ID,
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
                  FROM INVENTORY.DSP_DOCUMENT_ITEMS_D 
                  WHERE DELETED = 0
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
            },

            insertDSPdocumentItemsD: {
              statement: `INSERT INTO INVENTORY.DSP_DOCUMENT_ITEMS_D (
                  DSP_DOCUMENT_ITEMS_D_ID, 
                  DSP_DOCUMENT_ITEMS_ID,
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
                 DSP_DOCUMENT_ITEMS_D_SEQ.NEXTVAL,
                 :DSP_DOCUMENT_ITEMS_ID,
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
                RETURN DSP_DOCUMENT_ITEMS_ID , 
                        DOCUMENT_ID  ,
                        ARRANGEMENT_NO , 
                        BATCH_NUMBER, 
                        EXPIRY_DATE ,
                        SERIAL_NUMBER , 
                        UNIT_QUANTITY ,
                        DEFAULT_UNIT_QUANTITY , 
                        BASE_UNIT_QUANTITY ,
                        ITEM_COST ,
                        TOTAL_COST , 
                        ITEM_PRICE , 
                        TOTAL_PRICE ,
                        NOTES , 
                        CREATED_BY,
                        DSP_DOCUMENT_ITEMS_D_ID
                        INTO :R_DSP_DOCUMENT_ITEMS_ID,
                        :R_DOCUMENT_ID , 
                        :R_ARRANGEMENT_NO,
                        :R_BATCH_NUMBER ,
                        :R_EXPIRY_DATE ,
                        :R_SERIAL_NUMBER , 
                        :R_UNIT_QUANTITY,
                        :R_DEFAULT_UNIT_QUANTITY,
                        :R_BASE_UNIT_QUANTITY,
                        :R_ITEM_COST, 
                        :R_TOTAL_COST  ,
                        :R_ITEM_PRICE,
                        :R_TOTAL_PRICE ,
                        :R_NOTES,
                        :R_CREATED_BY,
                        :R_DSP_DOCUMENT_ITEMS_D_ID`,
                returns: [ "R_DSP_DOCUMENT_ITEMS_ID" ,"R_DOCUMENT_ID", "R_ARRANGEMENT_NO", "R_BATCH_NUMBER","R_EXPIRY_DATE", "R_SERIAL_NUMBER", "R_UNIT_QUANTITY", "R_DEFAULT_UNIT_QUANTITY", "R_BASE_UNIT_QUANTITY", "R_ITEM_COST" , "R_TOTAL_COST","R_ITEM_PRICE", "R_TOTAL_PRICE" , "R_NOTES", "R_CREATED_BY","R_DSP_DOCUMENT_ITEMS_D_ID" ],
                bindings: [],
                qstring: "",
                requireCommit: true
            },
            getOneDSPdocumentItemsD: {
              statement: `SELECT 
              DSP_DOCUMENT_ITEMS_D_ID,
               DSP_DOCUMENT_ITEMS_ID,
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
              FROM INVENTORY.DSP_DOCUMENT_ITEMS_D WHERE DELETED = 0 
                                AND  DOCUMENT_ID = :DOCUMENT_ID
                      `,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: false
                    },
                    deleteDSPdocumentItemsD: {
                      statement: `UPDATE DSP_DOCUMENT_ITEMS_D
                                    SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = SYSDATE
                                    WHERE
                                    DSP_DOCUMENT_ITEMS_D_ID = :DSP_DOCUMENT_ITEMS_D_ID`,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: true
                    },
                    addItemBalancedsp: {
                      statement: `
                      BEGIN
                      INVENTORY.ADD_ITEM_BALANCE(:P_DOC_ID);
                      END ;
                      
                              `,
                              returns: [],
                              bindings: [],
                              qstring: "",
                              requireCommit: true
                            }



  
  }
  module.exports = statements;
  