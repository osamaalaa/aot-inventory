let statements = {
    getDSPdocument: {
      statement: `SELECT 
                        DOCUMENT_ID,
                        DOCUMENT_TYPE_ID, 
                        DOCUMENT_DATE, 
                        (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = DSP.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
                        (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = DSP.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
                        INVENTORY_PERIODS_ID, 
                        STORES_ID,
                        DSP_DATE, 
                        DOCUMENT_NO,
                        BASE_DOCUMENT_ID, 
                        BASE_DOCUMENT_TYPE_ID, 
                        SUBSIDIARY_ID,
                        JOURNALS_ID,
                        DELIVERED_BY, 
                        DELIVERED_TO,
                        DELIVERY_DATE,
                        DOCUMENT_STATUS, 
                        NOTES, 
                        CREATED_BY, 
                        CREATION_DATE, 
                        VALDIATED_BY,
                        VALDIATED_DATE,
                        CONFIRMED_BY, 
                        CONFIRMED_DATE,
                        WF_REQUEST_ID
                        FROM INVENTORY.DSP_DOCUMENT DSP
                        WHERE DELETED = 0
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
            },

            insertDSPdocument: {
              statement: `INSERT INTO INVENTORY.DSP_DOCUMENT (
                DOCUMENT_ID,
                 DOCUMENT_TYPE_ID,
                  DOCUMENT_DATE, 
                INVENTORY_PERIODS_ID,
                 STORES_ID,
                  DSP_DATE, 
                DOCUMENT_NO,
                 BASE_DOCUMENT_ID,
                  BASE_DOCUMENT_TYPE_ID, 
                SUBSIDIARY_ID,
                 JOURNALS_ID,
                  DELIVERED_BY, 
                DELIVERED_TO, 
                DELIVERY_DATE,
                 DOCUMENT_STATUS, 
                NOTES, 
                CREATED_BY, 
                CREATION_DATE, 
                 DELETED, 
                WF_REQUEST_ID) 
             VALUES (  DSP_DOCUMENT_SEQ.NEXTVAL,
                 :DOCUMENT_TYPE_ID,
                  :DOCUMENT_DATE, 
                :INVENTORY_PERIODS_ID,
                 :STORES_ID,
                  :DSP_DATE, 
                :DOCUMENT_NO,
                 :BASE_DOCUMENT_ID,
                  :BASE_DOCUMENT_TYPE_ID, 
                :SUBSIDIARY_ID,
                 :JOURNALS_ID,
                  :DELIVERED_BY, 
                :DELIVERED_TO, 
                :DELIVERY_DATE,
                 :DOCUMENT_STATUS, 
                :NOTES, 
                :CREATED_BY, 
                SYSDATE, 
                 0,  
                 :WF_REQUEST_ID )
                RETURN DOCUMENT_ID  , DOCUMENT_TYPE_ID , DOCUMENT_DATE, INVENTORY_PERIODS_ID , STORES_ID , DSP_DATE , DOCUMENT_NO , BASE_DOCUMENT_ID , BASE_DOCUMENT_TYPE_ID , SUBSIDIARY_ID , WF_REQUEST_ID INTO :R_DOCUMENT_ID , :R_DOCUMENT_TYPE_ID, :R_DOCUMENT_DATE , :R_INVENTORY_PERIODS_ID , :R_STORES_ID , :R_DSP_DATE, :R_DOCUMENT_NO, :R_BASE_DOCUMENT_ID, :R_BASE_DOCUMENT_TYPE_ID, :R_SUBSIDIARY_ID  , :R_WF_REQUEST_ID `,
                returns: ["R_DOCUMENT_ID", "R_DOCUMENT_TYPE_ID", "R_DOCUMENT_DATE","R_INVENTORY_PERIODS_ID", "R_STORES_ID", "R_DSP_DATE", "R_DOCUMENT_NO", "R_BASE_DOCUMENT_ID", "R_BASE_DOCUMENT_TYPE_ID" , "R_SUBSIDIARY_ID","R_WF_REQUEST_ID"],
                bindings: [],
                qstring: "",
                requireCommit: true
            },
            getOneDSPdocument: {
              statement: `SELECT 
                                DOCUMENT_ID,
                                DOCUMENT_TYPE_ID, 
                                DOCUMENT_DATE, 
                                    INVENTORY_PERIODS_ID, 
                                    STORES_ID,
                                    DSP_DATE, 
                                    DOCUMENT_NO,
                                    BASE_DOCUMENT_ID, 
                                    BASE_DOCUMENT_TYPE_ID, 
                                    SUBSIDIARY_ID,
                                    JOURNALS_ID,
                                    DELIVERED_BY, 
                                    DELIVERED_TO,
                                    DELIVERY_DATE,
                                    DOCUMENT_STATUS, 
                                    NOTES, 
                                    CREATED_BY, 
                                    CREATION_DATE, 
                                    VALDIATED_BY,
                                    VALDIATED_DATE,
                                    CONFIRMED_BY, 
                                    CONFIRMED_DATE,
                                    WF_REQUEST_ID
                                FROM INVENTORY.DSP_DOCUMENT
                                WHERE DELETED = 0 AND  DOCUMENT_ID = :DOCUMENT_ID
                      `,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: false
                    },
                    deleteDSPdocument: {
                      statement: `UPDATE DSP_DOCUMENT
                                    SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = SYSDATE
                                    WHERE
                                    DOCUMENT_ID = :DOCUMENT_ID`,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: true
                    }
  
  }
  module.exports = statements;
  