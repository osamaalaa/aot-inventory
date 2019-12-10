let statements = {
    insertShortagePolicy: {
        statement: `
        INSERT INTO shortage_policy (
                shortage_policy_id,
                SHORTAGE_POLICY_TYPE,
                AR_NAME,
                EN_NAME,
                SHORTAGE_POLICY_VALUE_TYPE,
                SHORTAGE_POLICY_VALUE,
                MIN_QUANTITY,
                MAX_QUANTITY,
                CREATED_BY,
                creation_date,
                deleted
            )
            VALUES (
                SHORTAGE_POLICY_SEQ.NEXTVAL,
            :SHORTAGE_POLICY_TYPE,
            :AR_NAME,
            :EN_NAME,
            :SHORTAGE_POLICY_VALUE_TYPE,
            :SHORTAGE_POLICY_VALUE,  
            :MIN_QUANTITY,  
            :MAX_QUANTITY,
            :CREATED_BY,
            sysdate,
            0)
            RETURN  SHORTAGE_POLICY_TYPE, AR_NAME , EN_NAME INTO :R_SHORTAGE_POLICY_TYPE ,:R_AR_NAME, :R_EN_NAME`,
        returns: ["R_SHORTAGE_POLICY_TYPE","R_AR_NAME", "R_EN_NAME"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getShortagePolicy:{
        statment:` SELECT
                    shortage_policy_id,
                    shortage_policy_type,
                    shortage_policy_value_type,
                    shortage_policy_value,
                    ar_name,
                    en_name,
                    MIN_QUANTITY,
                    MAX_QUANTITY,
                    created_by,
                    creation_date,
                    deleted,
                    deleted_by,
                    deleted_date
                FROM
                    shortage_policy
                WHERE deleted = 0    
                    `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getShortagePolicyByID:{
        statment:`
                      SELECT
                  shortage_policy_id,
                  shortage_policy_type,
                  shortage_policy_value_type,
                  shortage_policy_value,
                  ar_name,
                  en_name,
                  MIN_QUANTITY,
                  MAX_QUANTITY,
                  created_by,
                  creation_date,
                  deleted,
                  deleted_by,
                  deleted_date
              FROM
                  shortage_policy
            WHERE shortage_policy_id =:SHORTAGE_POLICY_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },

        deleteShortagePolicy: {
          statement: `UPDATE SHORTAGE_POLICY
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY, DELETED_DATE = sysdate
                        WHERE
                            shortage_policy_id = :SHORTAGE_POLICY_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};

module.exports = statements;
