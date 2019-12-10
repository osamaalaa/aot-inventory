let statements = {
    getddlLogs:{
        statment:` SELECT
                        ddl_id,
                        operation,
                        obj_owner,
                        object_name,
                        sql_text,
                        attempt_by,
                        attempt_dt,
                        os_user,
                        machine_name,
                        machine_ip
                    FROM
                        ddl_log`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },

    getddlByID:{
        statment:`
        SELECT
                       ddl_id,
                       operation,
                       obj_owner,
                       object_name,
                       sql_text,
                       attempt_by,
                       attempt_dt,
                       os_user,
                       machine_name,
                       machine_ip
                   FROM
                       ddl_log
            WHERE ddl_id = :DDL_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        }
};
module.exports = statements;
