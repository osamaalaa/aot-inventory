let statements = {
  getTransactions:{
      statement:`     SELECT
                        transaction_type_id,
                        transaction_type_code,
                        ar_name,
                        en_name,
                        ar_description,
                        en_description,
                        user_defined_flag,
                        status,
                        transaction_nature,
                        created_by,
                        creation_date,
                        deleted,
                        deleted_by,
                        deleted_date
                    FROM
                        transaction_types`,
          bindings: [],
          qstring: "",
          requireCommit: false
      },
    insertTransaction: {
        statement: `
        INSERT INTO transaction_types (
                    transaction_type_id,
                    transaction_type_code,
                    ar_name,
                    en_name,
                    ar_description,
                    en_description,
                    user_defined_flag,
                    status,
                    transaction_nature,
                    created_by,
                    creation_date
                      ) VALUES (
                        TRANSACTION_TYPES_SEQ.NEXTVAL,
                     :TRANSACTION_TYPE_CODE,
                    :AR_NAME,
                    :EN_NAME,
                    :AR_DESCRIPTION,
                    :EN_DESCRIPTION,
                    :USER_DEFINED_FLAG,
                    :STATUS,
                    :TRANSACTION_NATURE,
                    :CREATED_BY,
                    sysdate
                )
         RETURN TRANSACTION_TYPE_CODE , AR_NAME , EN_NAME INTO :R_TRANSACTION_TYPE_CODE, :R_AR_NAME, :R_EN_NAME`,
        returns: ["R_TRANSACTION_TYPE_CODE", "R_AR_NAME", "R_EN_NAME"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getTransactionsByID:{
      statement :`
                          SELECT
                  transaction_type_id,
                  transaction_type_code,
                  ar_name,
                  en_name,
                  ar_description,
                  en_description,
                  user_defined_flag,
                  status,
                  transaction_nature,
                  created_by,
                  creation_date,
                  deleted,
                  deleted_by,
                  deleted_date
                  FROM
                  transaction_types
            WHERE transaction_type_id = :TRANSACTION_TYPE_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteTransactions: {
          statement: `UPDATE TRANSACTION_TYPES
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            transaction_type_id = :TRANSACTION_TYPE_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};
module.exports = statements;
