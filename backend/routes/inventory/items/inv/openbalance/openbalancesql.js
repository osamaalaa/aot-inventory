let statements = {
    insertOpenBalance: {
        statement: `
        INSERT INTO inv_open_balance (
                              inv_open_balance_id,
                              document_type_id,
                              document_date,
                              inventory_periods_id,
                              stores_id,
                              document_no,
                              subsidiary_id,
                              journals_id,
                              source_type,
                              document_status,
                              notes,
                              created_by,
                              creation_date,
                              valdiated_by,
                              valdiated_date,
                              confirmed_by,
                              confirmed_date,
                              WF_REQUEST_ID
                          ) VALUES (
                              INV_OPEN_BALANCE_SEQ.NEXTVAL,
                              :DOCUMENT_TYPE_ID,
                              :DOCUMENT_DATE,
                              :INVENTORY_PERIODS_ID,
                              :STORES_ID,
                              :DOCUMENT_NO,
                              :SUBSIDIARY_ID,
                              :JOURNALS_ID,
                              :SOURCE_TYPE,
                              :DOCUMENT_STATUS,
                              :NOTES,
                              :CREATED_BY,
                               sysdate,
                              :VALDIATED_BY,
                              :VALDIATED_DATE,
                              :CONFIRMED_BY,
                              :CONFIRMED_DATE,
                              NULL
                          )
                   RETURN INV_OPEN_BALANCE_ID , DOCUMENT_TYPE_ID  ,INVENTORY_PERIODS_ID ,  STORES_ID , DOCUMENT_NO ,SUBSIDIARY_ID , JOURNALS_ID , SOURCE_TYPE, DOCUMENT_STATUS , NOTES   INTO :R_INV_OPEN_BALANCE_ID ,:R_DOCUMENT_TYPE_ID, :R_INVENTORY_PERIODS_ID , :R_STORES_ID , :R_DOCUMENT_NO, :R_SUBSIDIARY_ID , :R_JOURNALS_ID , :R_SOURCE_TYPE , :R_DOCUMENT_STATUS , :R_NOTES `,
        returns: ["R_INV_OPEN_BALANCE_ID" ,"R_DOCUMENT_TYPE_ID" , "R_INVENTORY_PERIODS_ID", "R_STORES_ID" , "R_DOCUMENT_NO", "R_SUBSIDIARY_ID" , "R_JOURNALS_ID" , "R_SOURCE_TYPE" , "R_DOCUMENT_STATUS" , "R_NOTES" ],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getOpenbalance:{
        statment:`SELECT
                      inv_open_balance_id,
                      document_type_id,
                      (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
                      document_date,
                      inventory_periods_id,
                      (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
                      (SELECT START_DATE FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID) INVENTORY_PERIODS_START_DATE,
                      (SELECT END_DATE FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID) INVENTORY_PERIODS_END_DATE,
                      stores_id,
                      (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                      document_no,
                      subsidiary_id,
                      (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                      (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                      journals_id,
                      source_type,
                      document_status,
                      (select PRIMARY_NAME  FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.DOCUMENT_STATUS ) STATUS_NAME,
                      notes,
                      created_by,
                      creation_date,
                      valdiated_by,
                      valdiated_date,
                      confirmed_by,
                      confirmed_date,
                      deleted,
                      deleted_by,
                      deleted_date,
                      modified_by,
                      modified_date,
                      WF_REQUEST_ID
                  FROM
                      inv_open_balance  I
                      WHERE DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getOneOpenBalanceByID:{
        statment:`SELECT
                      inv_open_balance_id,
                      document_type_id,
                      (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
                      document_date,
                      inventory_periods_id,
                      (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
                      (SELECT START_DATE FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID) INVENTORY_PERIODS_START_DATE,
                      (SELECT END_DATE FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID) INVENTORY_PERIODS_END_DATE,
                      stores_id,
                      (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                      document_no,
                      subsidiary_id,
                      (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                      (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                      journals_id,
                      source_type,
                      document_status,
                      (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.DOCUMENT_STATUS ) STATUS_NAME,
                      notes,
                      created_by,
                      creation_date,
                      valdiated_by,
                      valdiated_date,
                      confirmed_by,
                      confirmed_date,
                      deleted,
                      deleted_by,
                      deleted_date,
                      modified_by,
                      modified_date,
                      WF_REQUEST_ID
                  FROM
                      inv_open_balance  I
                      WHERE DELETED = 0
                      AND inv_open_balance_id=:INV_OPEN_BALANCE_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteOpenBalance: {
            statement: `UPDATE inv_open_balance
                          SET deleted = 1 ,   deleted_date = sysdate
                          WHERE
                          inv_open_balance_id = :INV_OPEN_BALANCE_ID`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: true
          },
        updateWFRequest: {
            statement: `UPDATE inv_open_balance
                          SET WF_REQUEST_ID = :WF_REQUEST_ID ,   MODIFIED_DATE = sysdate
                          WHERE
                          inv_open_balance_id = :INV_OPEN_BALANCE_ID`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: true
          }
};

module.exports = statements;
