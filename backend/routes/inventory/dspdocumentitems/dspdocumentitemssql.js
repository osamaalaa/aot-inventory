let statements = {
    getDSPdocumentItems: {
      statement: `SELECT 
                                DSP_DOCUMENT_ITEMS_ID,
                                DOCUMENT_ID,
                                ARRANGEMENT_NO, 
                                (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = DSP.ITEMS_ID) ITEM_AR_NAME,
                                (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = DSP.ITEMS_ID) ITEM_EN_NAME,
                                ITEMS_ID,
                                (SELECT L.PRIMARY_NAME  FROM HR.LOOKUP_DETAILS L WHERE L.LOOKUP_ID = 125 AND L.STATUS = 1 and L.LOOKUP_DETAIL_ID = DSP.UNITS_ID) UNIT_AR_NAME,
                                (SELECT L.SECONDARY_NAME  FROM HR.LOOKUP_DETAILS L WHERE L.LOOKUP_ID = 125 AND L.STATUS = 1 and L.LOOKUP_DETAIL_ID = DSP.UNITS_ID) UNIT_EN_NAME,
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
                                DELETED,
                                DELETED_BY, 
                                DELETED_DATE,
                                MODIFIED_BY,
                                MODIFIED_DATE
                      FROM INVENTORY.DSP_DOCUMENT_ITEMS  DSP
                        WHERE DELETED = 0
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
            },

            insertDSPdocumentItems: {
              statement: `INSERT INTO INVENTORY.DSP_DOCUMENT_ITEMS (
                DSP_DOCUMENT_ITEMS_ID,
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
                 DSP_DOCUMENT_ITEMS_SEQ.NEXTVAL,
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
                 0)
                RETURN DSP_DOCUMENT_ITEMS_ID , DOCUMENT_ID  , ARRANGEMENT_NO , ITEMS_ID, UNITS_ID , UNIT_FACTOR , UNIT_QUANTITY , DEFAULT_UNIT_QUANTITY , BASE_UNIT_QUANTITY , ITEM_COST , TOTAL_COST , ITEM_PRICE , TOTAL_PRICE  INTO :R_DSP_DOCUMENT_ITEMS_ID, :R_DOCUMENT_ID , :R_ARRANGEMENT_NO, :R_ITEMS_ID , :R_UNITS_ID , :R_UNIT_FACTOR , :R_UNIT_QUANTITY, :R_DEFAULT_UNIT_QUANTITY, :R_BASE_UNIT_QUANTITY, :R_ITEM_COST, :R_TOTAL_COST  , :R_ITEM_PRICE, :R_TOTAL_PRICE`,
                returns: [ "R_DSP_DOCUMENT_ITEMS_ID" ,"R_DOCUMENT_ID", "R_ARRANGEMENT_NO", "R_ITEMS_ID","R_UNITS_ID", "R_UNIT_FACTOR", "R_UNIT_QUANTITY", "R_DEFAULT_UNIT_QUANTITY", "R_BASE_UNIT_QUANTITY", "R_ITEM_COST" , "R_TOTAL_COST","R_ITEM_PRICE", "R_TOTAL_PRICE"],
                bindings: [],
                qstring: "",
                requireCommit: true
            },
            getOneDSPdocumentItems: {
              statement: `SELECT 
                                DSP_DOCUMENT_ITEMS_ID,
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
                                    DELETED,
                                    DELETED_BY, 
                                    DELETED_DATE,
                                    MODIFIED_BY,
                                    MODIFIED_DATE
                                FROM INVENTORY.DSP_DOCUMENT_ITEMS  
                                WHERE DELETED = 0 AND  DSP_DOCUMENT_ITEMS_ID = :DSP_DOCUMENT_ITEMS_ID
                      `,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: false
                    },
                    deleteDSPdocumentItems: {
                      statement: `UPDATE DSP_DOCUMENT_ITEMS
                                    SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = SYSDATE
                                    WHERE
                                    DSP_DOCUMENT_ITEMS_ID = :DSP_DOCUMENT_ITEMS_ID`,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: true
                    },
                    getoneItemsInDSPById: {
                      statement: `SELECT D.ITEMS_ID,
                      D.UNITS_ID,
                      (select SUM (D.UNIT_QUANTITY) FROM DSP_DOCUMENT_ITEMS D WHERE D.ITEMS_ID = :ITEMS_ID AND DELETED = 0) UNIT_QUANTITY,
                     (select SUM ( un.QTY_ON_HAND) FROM ITEMS_BALANCE_UNITS un where un.ITEMS_ID = :ITEMS_ID ) QTY_ON_HAND,
                       (select SUM ( un.CURRENT_BALANCE) FROM ITEMS_BALANCE_UNITS un where un.ITEMS_ID = :ITEMS_ID ) CURRENT_BALANCE
                 FROM DSP_DOCUMENT_ITEMS D,
                      ITEMS_BALANCE_UNITS un,
                      DSP_DOCUMENT dd,
                      HR.REQUESTS R
                WHERE  
                  un.ITEMS_ID = D.ITEMS_ID
                     AND 
                      D.DELETED = 0
                     AND un.DELETED = 0 
                      AND D.ITEMS_ID = :ITEMS_ID
                      AND D.UNITS_ID = un.UNITS_ID
                      AND dd.DOCUMENT_ID=D.DOCUMENT_ID
                       AND dd.WF_REQUEST_ID = R.REQUEST_ID 
                       AND R.REQUEST_STATUS ! = 8 
                       GROUP BY D.ITEMS_ID ,
                                   D.UNITS_ID
                              `,
                              returns: [],
                              bindings: [],
                              qstring: "",
                              requireCommit: false
                            },
                            getItemsInDSPById: {
                              statement: `SELECT un.ITEMS_ID,
                            (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = un.ITEMS_ID) ITEM_AR_NAME,
                            (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = un.ITEMS_ID) ITEM_EN_NAME,
                            (SELECT ITEM_CODE  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = un.ITEMS_ID) ITEM_CODE,
                            (select NVL(SUM (D.UNIT_QUANTITY),0) FROM DSP_DOCUMENT_ITEMS D where un.ITEMS_ID = D.ITEMS_ID and D.deleted = 0) UNIT_QUANTITY,
                            SUM ( un.QTY_ON_HAND)  QTY_ON_HAND,
                            SUM ( un.CURRENT_BALANCE)  CURRENT_BALANCE
                            FROM
                            ITEMS_BALANCE un
                             where un.deleted = 0 
                             GROUP BY un.ITEMS_ID`,
                                      returns: [],
                                      bindings: [],
                                      qstring: "",
                                      requireCommit: false
                                    }

  
  }
  module.exports = statements;
  