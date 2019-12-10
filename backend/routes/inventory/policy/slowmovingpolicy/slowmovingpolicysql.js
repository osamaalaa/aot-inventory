let statements = {
    insertSmovingPolicy: {
        statement: `
        INSERT INTO slow_moving_policy (
                      slow_policy_id,
                      slow_moving_policy_type,
                      slow_moving_minimum_value,
                      slow_moving_policy_days,
                      created_by,
                      creation_date,
                      ar_description,
                      en_description,
                      ar_name,
                      en_name,
                      deleted
                  )
            VALUES (
            SLOW_MOVING_POLICY_SEQ.NEXTVAL,
            :SLOW_MOVING_POLICY_TYPE,
            :SLOW_MOVING_MINIMUM_VALUE,
            :SLOW_MOVING_POLICY_DAYS,
            :CREATED_BY,
            sysdate,
            :AR_DESCRIPTION,
            :EN_DESCRIPTION ,     
            :AR_NAME,
            :EN_NAME ,
            0)
         RETURN  SLOW_MOVING_POLICY_TYPE INTO  :R_SLOW_MOVING_POLICY_TYPE `,
         returns: ["R_SLOW_MOVING_POLICY_TYPE"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getSmovingPolicy:{
        statment:` SELECT
                    slow_policy_id,
                    slow_moving_policy_type,
                    slow_moving_minimum_value,
                    slow_moving_policy_days,
                    created_by,
                    creation_date,
                    deleted,
                    deleted_by,
                    deleted_date,
                    ar_description,
                    en_description,
                    ar_name,
                    en_name
                FROM
                    slow_moving_policy
                WHERE deleted = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getSmovingPolicyByID:{
        statment:`
                      SELECT
                  slow_policy_id,
                  slow_moving_policy_type,
                  slow_moving_minimum_value,
                  slow_moving_policy_days,
                  created_by,
                  creation_date,
                  deleted,
                  deleted_by,
                  deleted_date,
                  ar_description,
                  en_description,
                      ar_name,
                    en_name
              FROM
                  slow_moving_policy
            WHERE slow_policy_id=:SLOW_POLICY_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteSmovingPolicy: {
          statement: `UPDATE SLOW_MOVING_POLICY
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            slow_policy_id = :SLOW_POLICY_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};

module.exports = statements;
