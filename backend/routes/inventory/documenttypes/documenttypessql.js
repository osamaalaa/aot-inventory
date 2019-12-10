let statements = {
    getDocsTypes:{
        statment:` SELECT
                      document_type_id,
                      transaction_type_id,
                      (SELECT AR_NAME FROM INVENTORY.TRANSACTION_TYPES T WHERE T.transaction_type_id = I.transaction_type_id) TRANSACTION_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.TRANSACTION_TYPES T WHERE T.transaction_type_id = I.transaction_type_id) TRANSACTION_EN_NAME,
                      document_type_code,
                      ar_name,
                      en_name,
                      ar_description,
                      en_description,
                      number_of_copies,
                      user_defined_flag,
                      status,
                      created_by,
                      creation_date,
                      deleted
                  FROM
                      document_types I
                  WHERE DELETED = 0 AND STATUS = 1  `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },

    getDocsByID:{
        statment:`
        SELECT
                      document_type_id,
                      transaction_type_id,
                      (SELECT AR_NAME FROM INVENTORY.TRANSACTION_TYPES T WHERE T.transaction_type_id = I.transaction_type_id) TRANSACTION_AR_NAME,
                      (SELECT EN_NAME FROM INVENTORY.TRANSACTION_TYPES T WHERE T.transaction_type_id = I.transaction_type_id) TRANSACTION_EN_NAME,
                      document_type_code,
                      ar_name,
                      en_name,
                      ar_description,
                      en_description,
                      number_of_copies,
                      user_defined_flag,
                      status,
                      created_by,
                      creation_date,
                      deleted
                  FROM
                      document_types I
                  WHERE DELETED = 0 AND STATUS = 1
            AND document_type_id = :DOCUMENT_TYPE_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        }
};
module.exports = statements;
