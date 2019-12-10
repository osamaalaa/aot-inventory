let statements = {
    getTransactions:{
        statment:`SELECT
                        inv_transactions_id,
                        inventory_periods_id,
                        (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
                        (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
                        stores_id,
                        (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                        (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                        document_id,
                        (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
                        (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
                        document_type_id,
                        transaction_date,
                        real_transaction,
                        real_transaction_date,
                        subsidiary_id,
                        (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                        (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                        created_by,
                        creation_date,
                        deleted,
                        deleted_by,
                        deleted_date,
                        modified_by,
                        modified_date
                    FROM
                        inv_transactions I
                        WHERE DELETED = 0 order by inv_transactions_id desc`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getTransactionByID:{
        statment:`SELECT
                        inv_transactions_id,
                        inventory_periods_id,
                        (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
                        (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
                        stores_id,
                        (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                        (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                        document_id,
                        (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
                        (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
                        document_type_id,
                        transaction_date,
                        real_transaction,
                        real_transaction_date,
                        subsidiary_id,
                        (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                        (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                        created_by,
                        creation_date,
                        deleted,
                        deleted_by,
                        deleted_date,
                        modified_by,
                        modified_date
                    FROM
                        inv_transactions I
                        WHERE DELETED = 0
                        AND inv_transactions_id=:INV_TRANSACTIONS_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
          insertTransactions: {
                statement: `
                INSERT INTO INVENTORY.INV_TRANSACTIONS (
                                                   INV_TRANSACTIONS_ID,
                                                    INVENTORY_PERIODS_ID,
                                                    STORES_ID,
                                                   DOCUMENT_ID,
                                                   DOCUMENT_TYPE_ID,
                                                    TRANSACTION_DATE,
                                                   REAL_TRANSACTION,
                                                    REAL_TRANSACTION_DATE,
                                                     SUBSIDIARY_ID,
                                                   CREATED_BY,
                                                   CREATION_DATE,
                                                   DELETED)
                                                VALUES (
                                                   INV_TRANSACTIONS_SEQ.NEXTVAL,
                                                    :INVENTORY_PERIODS_ID,
                                                    :STORES_ID,
                                                   :DOCUMENT_ID,
                                                   :DOCUMENT_TYPE_ID,
                                                   sysdate,
                                                   1,
                                                  sysdate,
                                                   :SUBSIDIARY_ID,
                                                   1,
                                                   sysdate,
                                                   0
                                                    )
                           RETURN INV_TRANSACTIONS_ID  ,INVENTORY_PERIODS_ID ,  STORES_ID , DOCUMENT_ID , DOCUMENT_TYPE_ID  , TRANSACTION_DATE , REAL_TRANSACTION, SUBSIDIARY_ID INTO  :R_INV_TRANSACTIONS_ID , :R_INVENTORY_PERIODS_ID, :R_STORES_ID , :R_DOCUMENT_ID , :R_DOCUMENT_TYPE_ID, :R_TRANSACTION_DATE , :R_REAL_TRANSACTION,:R_SUBSIDIARY_ID`,
                returns: ["R_INV_TRANSACTIONS_ID" , "R_INVENTORY_PERIODS_ID", "R_STORES_ID" , "R_DOCUMENT_ID", "R_DOCUMENT_TYPE_ID" , "R_REAL_TRANSACTION", "R_TRANSACTION_DATE","R_SUBSIDIARY_ID" ],
                bindings: [],
                qstring: "",
                requireCommit: true
            }



};

module.exports = statements;
