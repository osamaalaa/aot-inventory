let statements = {
    getReqDocument: {
      statement: `SELECT 
                            DOCUMENT_ID, 
                            DOCUMENT_TYPE_ID,
                            (SELECT AR_NAME  FROM INVENTORY.DOCUMENT_TYPES S WHERE S.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
                            (SELECT EN_NAME  FROM INVENTORY.DOCUMENT_TYPES S WHERE S.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
                            DOCUMENT_DATE, 
                            INVENTORY_PERIODS_ID,
                            (SELECT AR_NAME  FROM INVENTORY.INVENTORY_PERIODS P  WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID) INVENTORY_PERIODS_AR_NAME,
                            (SELECT EN_NAME  FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID) INVENTORY_PERIODS_EN_NAME,
                            STORES_ID,
                            (SELECT AR_NAME  FROM INVENTORY.STORES T  WHERE T.STORES_ID = I.STORES_ID) STORES_AR_NAME,
                            (SELECT EN_NAME  FROM INVENTORY.STORES T WHERE T.STORES_ID = I.STORES_ID) STORES_EN_NAME, 
                            REQ_DATE, 
                            DOCUMENT_NO,
                            BASE_DOCUMENT_ID,
                            BASE_DOCUMENT_TYPE_ID, 
                            SUBSIDIARY_ID, 
                            JOURNALS_ID,
                            SOURCE_TYPE, 
                            DEPARTMENT_ID,
                            EMPLOYEE_ID,
                            SUPPLIER_ID, 
                            DOCUMENT_STATUS,
                            (SELECT nvl(D.PRIMARY_NAME, D.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS D Where LOOKUP_ID = 176  and D.LOOKUP_DETAIL_ID = I.DOCUMENT_STATUS) STATUS_NAME,
                            NOTES,
                            CREATED_BY, 
                            CREATION_DATE,
                            VALDIATED_BY,
                            VALDIATED_DATE, 
                            CONFIRMED_BY,
                            CONFIRMED_DATE, 
                            MODIFIED_BY, 
                            MODIFIED_DATE,
                            WF_REQUEST_ID
                        FROM INVENTORY.REQ_DOCUMENT I
                            WHERE DELETED = 0 AND SOURCE_TYPE != 4
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
            },

            insertReqDocument: {
              statement: `INSERT INTO INVENTORY.REQ_DOCUMENT (
                  DOCUMENT_ID,
                  DOCUMENT_TYPE_ID,
                  DOCUMENT_DATE, 
                  INVENTORY_PERIODS_ID,
                  STORES_ID,
                  REQ_DATE, 
                  DOCUMENT_NO,
                  BASE_DOCUMENT_ID,
                  BASE_DOCUMENT_TYPE_ID, 
                  SUBSIDIARY_ID, 
                  JOURNALS_ID,
                  SOURCE_TYPE, 
                  DEPARTMENT_ID,
                  EMPLOYEE_ID,
                  SUPPLIER_ID, 
                  DOCUMENT_STATUS,
                  NOTES,
                  CREATED_BY, 
                  CREATION_DATE,
                  DELETED, 
                  WF_REQUEST_ID) 
             VALUES ( 
                 REQ_DOCUMENT_SEQ.NEXTVAL,
                 :DOCUMENT_TYPE_ID,
                 :DOCUMENT_DATE, 
                 :INVENTORY_PERIODS_ID,
                 :STORES_ID,
                 :REQ_DATE, 
                 :DOCUMENT_NO,
                 :BASE_DOCUMENT_ID,
                 :BASE_DOCUMENT_TYPE_ID, 
                 :SUBSIDIARY_ID, 
                 :JOURNALS_ID,
                 :SOURCE_TYPE, 
                 :DEPARTMENT_ID,
                 :EMPLOYEE_ID,
                 :SUPPLIER_ID, 
                 :DOCUMENT_STATUS,
                 :NOTES,
                 :CREATED_BY, 
                  SYSDATE,
                  0, 
                 :WF_REQUEST_ID
              )
                RETURN  DOCUMENT_ID  , DOCUMENT_TYPE_ID , DOCUMENT_DATE, INVENTORY_PERIODS_ID , STORES_ID , REQ_DATE , DOCUMENT_NO , BASE_DOCUMENT_ID , BASE_DOCUMENT_TYPE_ID , SUBSIDIARY_ID , JOURNALS_ID , SOURCE_TYPE 
                 INTO
                  :R_DOCUMENT_ID, :R_DOCUMENT_TYPE_ID , :R_DOCUMENT_DATE , :R_INVENTORY_PERIODS_ID , :R_STORES_ID , :R_REQ_DATE , :R_DOCUMENT_NO , :R_BASE_DOCUMENT_ID , :R_BASE_DOCUMENT_TYPE_ID , :R_SUBSIDIARY_ID , :R_JOURNALS_ID , :R_SOURCE_TYPE `,

                returns: [ "R_DOCUMENT_ID" ,"R_DOCUMENT_TYPE_ID", "R_DOCUMENT_DATE", "R_INVENTORY_PERIODS_ID","R_STORES_ID", "R_REQ_DATE", "R_DOCUMENT_NO", "R_BASE_DOCUMENT_ID", "R_BASE_DOCUMENT_TYPE_ID", "R_SUBSIDIARY_ID" , "R_JOURNALS_ID","R_SOURCE_TYPE"],
                bindings: [],
                qstring: "",
                requireCommit: true
            },
            getOneReqDocument: {
              statement: `SELECT 
                                DOCUMENT_ID, 
                                DOCUMENT_TYPE_ID,
                                (SELECT AR_NAME  FROM INVENTORY.DOCUMENT_TYPES S WHERE S.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
                                (SELECT EN_NAME  FROM INVENTORY.DOCUMENT_TYPES S WHERE S.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
                                DOCUMENT_DATE, 
                                INVENTORY_PERIODS_ID,
                                (SELECT AR_NAME  FROM INVENTORY.INVENTORY_PERIODS P  WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID) INVENTORY_PERIODS_AR_NAME,
                                (SELECT EN_NAME  FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID) INVENTORY_PERIODS_EN_NAME,
                                STORES_ID,
                                (SELECT AR_NAME  FROM INVENTORY.STORES T  WHERE T.STORES_ID = I.STORES_ID) STORES_AR_NAME,
                                (SELECT EN_NAME  FROM INVENTORY.STORES T WHERE T.STORES_ID = I.STORES_ID) STORES_EN_NAME, 
                                REQ_DATE, 
                                DOCUMENT_NO,
                                BASE_DOCUMENT_ID,
                                BASE_DOCUMENT_TYPE_ID, 
                                SUBSIDIARY_ID, 
                                JOURNALS_ID,
                                SOURCE_TYPE, 
                                DEPARTMENT_ID,
                                EMPLOYEE_ID,
                                SUPPLIER_ID, 
                                DOCUMENT_STATUS,
                                (SELECT nvl(D.PRIMARY_NAME, D.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS D Where LOOKUP_ID = 176  and D.LOOKUP_DETAIL_ID = I.DOCUMENT_STATUS) DOCUMENT_NAME,
                                NOTES,
                                CREATED_BY, 
                                CREATION_DATE,
                                VALDIATED_BY,
                                VALDIATED_DATE, 
                                CONFIRMED_BY,
                                CONFIRMED_DATE, 
                                MODIFIED_BY, 
                                MODIFIED_DATE,
                                WF_REQUEST_ID
                            FROM INVENTORY.REQ_DOCUMENT I
                                 WHERE DELETED = 0 AND SOURCE_TYPE != 4 AND DOCUMENT_ID = :DOCUMENT_ID
                      `,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: false
                    },
                    deleteReqDocument: {
                      statement: `UPDATE REQ_DOCUMENT
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
  