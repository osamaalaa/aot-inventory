let statements = {
    insertnewstoresLocation: {
        statement: `
        INSERT INTO stores_locations (
                    stores_locations_id,
                    stores_locations_code,
                    stores_id,
                    ar_name,
                    en_name,
                    location_lan,
                    location_row,
                    location_column,
                    created_by,
                    creation_date
                ) VALUES (
                    STORES_LOCATIONS_SEQ.NEXTVAL,
                    :STORES_LOCATIONS_CODE,
                    :STORES_ID,
                    :AR_NAME,
                    :EN_NAME,
                    :LOCATION_LAN,
                    :LOCATION_ROW,
                    :LOCATION_COLUMN,
                    :CREATED_BY,
                    sysdate
                )
         RETURN STORES_LOCATIONS_CODE , STORES_ID , AR_NAME INTO :R_STORES_LOCATIONS_CODE, :R_STORES_ID, :R_AR_NAME`,
        returns: ["R_STORES_LOCATIONS_CODE", "R_STORES_ID", "R_AR_NAME"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    selectAllstoresLocation:{
        statment:` SELECT
                    stores_locations_id,
                    stores_locations_code,
                    stores_id,
                    (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                    (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                    ar_name,
                    en_name,
                    location_lan,
                    location_row,
                    location_column,
                    created_by,
                    creation_date,
                    deleted,
                    deleted_by,
                    deleted_date
                FROM
                    stores_locations I
                    WHERE DELETED = 0 `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    selectOnestoresLocation:{
        statment:`
              SELECT
                stores_locations_id,
                stores_locations_code,
                stores_id,
                (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                ar_name,
                en_name,
                location_lan,
                location_row,
                location_column,
                created_by,
                creation_date,
                deleted,
                deleted_by,
                deleted_date
                FROM
                  stores_locations I
            WHERE stores_locations_id =:stores_locations_id AND DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deletestoresLocation: {
          statement: `DELETE from STORES_LOCATIONS
                        WHERE
                            STORES_LOCATIONS_ID = :STORES_LOCATIONS_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};

module.exports = statements;
