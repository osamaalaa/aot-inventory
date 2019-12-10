let statements = {
    insertnewStoreHouses: {
        statement: `
        INSERT INTO storehouses (
                      store_id,
                      store_no,
                      name_ar,
                      name_en,
                      store_type,
                      creation_date,
                      created_by
                  ) VALUES (
                      STOREHOUSES_SEQ.NEXTVAL,
                      :STORE_NO,
                      :NAME_AR,
                      :NAME_EN,
                      :STORE_TYPE,
                      sysdate,
                      :CREATED_BY
                  )
                  RETURN STORE_NO , NAME_AR , NAME_EN INTO :R_STORE_NO, :R_NAME_AR, :R_NAME_EN`,
        returns: ["R_STORE_NO", "R_NAME_AR", "R_NAME_EN"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    selectAllstoreHouses:{
        statment:` SELECT
                        store_id,
                        store_no,
                        name_ar,
                        name_en,
                        store_type,
                        creation_date,
                        created_by,
                        deleted,
                        deleted_by,
                        deleted_date
                        FROM
                        storehouses`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    selectOnestoreHouses:{
        statment:`
        SELECT
                store_id,
                store_no,
                name_ar,
                name_en,
                store_type,
                creation_date,
                created_by,
                deleted,
                deleted_by,
                deleted_date
                FROM
                storehouses
            WHERE store_id =:STORE_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteStoreHouses: {
          statement: `UPDATE STOREHOUSES
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            store_id = :STORE_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};

module.exports = statements;
