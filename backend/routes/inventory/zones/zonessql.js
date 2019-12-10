let statements = {
    insertZone: {
        statement: `
                      INSERT INTO zones (
                      zone_id,
                      zone_name_ar,
                      zone_name_en,
                      zone_status,
                      creation_date,
                      created_by,
                      subsidiary_id
                      )  VALUES (
                    :ZONE_ID,
                    :ZONE_NAME_AR,
                    :ZONE_NAME_EN,
                    :ZONE_STATUS,
                    sysdate,
                    :CREATED_BY,
                    :SUBSIDIARY_ID
                )
         RETURN ZONE_ID , ZONE_NAME_AR , ZONE_NAME_EN INTO :R_ZONE_ID, :R_ZONE_NAME_AR, :R_ZONE_NAME_EN`,
        returns: ["R_ZONE_ID", "R_ZONE_NAME_AR", "R_ZONE_NAME_EN"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    getZones:{
        statment:` SELECT
                        zone_id,
                        zone_name_ar,
                        zone_name_en,
                        zone_status,
                        creation_date,
                        created_by,
                        deleted,
                        deleted_by,
                        deleted_date,
                        subsidiary_id
                    FROM
                        zones`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },

    getZoneByID:{
        statment:`
        SELECT
                        zone_id,
                        zone_name_ar,
                        zone_name_en,
                        zone_status,
                        creation_date,
                        created_by,
                        deleted,
                        deleted_by,
                        deleted_date,
                        subsidiary_id
                        FROM
                        zones
            WHERE zone_id =:ZONE_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteZone: {
          statement: `UPDATE ZONES
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            zone_id = :ZONE_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};
module.exports = statements;
