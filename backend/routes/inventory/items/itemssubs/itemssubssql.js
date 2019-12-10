 let statements = {
    insertItemSubs: {
        statement: `
        INSERT INTO items_substitutions (
              items_substitutions_id,
              items_id,
              substitutions_items_id,
              units_id,
              quantity,
              created_by,
              creation_date
          )
            VALUES (
             ITEMS_SUBSTITUTIONS_SEQ.NEXTVAL,
            :ITEMS_ID,
            :SUBSTITUTIONS_ITEMS_ID,
            :UNITS_ID,
            :QUANTITY,
            :CREATED_BY,
            sysdate
            )
         RETURN ITEMS_ID , SUBSTITUTIONS_ITEMS_ID , UNITS_ID, QUANTITY INTO :R_ITEMS_ID, :R_SUBSTITUTIONS_ITEMS_ID, :R_UNITS_ID,:R_QUANTITY`,
        returns: ["R_ITEMS_ID", "R_SUBSTITUTIONS_ITEMS_ID", "R_UNITS_ID","R_QUANTITY"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getItemsSubs:{
        statment:` SELECT
                items_substitutions_id,
                items_id,
                (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                substitutions_items_id,
                (SELECT AR_NAME  FROM INVENTORY.ITEMS SI WHERE SI.ITEMS_ID = I.substitutions_items_id) SUBSTITUTION_ITEM_AR_NAME,
                (SELECT EN_NAME  FROM INVENTORY.ITEMS SI WHERE SI.ITEMS_ID = I.substitutions_items_id) SUBSTITUTION_ITEM_EN_NAME,
                units_id,
                (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.units_id ) UNITS_NAME,
                quantity,
                created_by,
                creation_date,
                deleted
            FROM
                items_substitutions I
            WHERE deleted = 0 `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getItemsSubsByID:{
        statment:`
        SELECT
               items_substitutions_id,
               items_id,
               (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
               (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
               substitutions_items_id,
               units_id,
               (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.units_id ) UNITS_NAME,
               quantity,
               created_by,
               creation_date,
               deleted
           FROM
               items_substitutions I
            WHERE items_substitutions_id = :ITEMS_SUBSTITUTIONS_ID AND deleted = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteItemSubs: {
          statement: `UPDATE ITEMS_SUBSTITUTIONS
                        SET DELETED = 1 , DELETED_DATE = sysdate
                        WHERE
                            items_substitutions_id = :ITEMS_SUBSTITUTIONS_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};

module.exports = statements;
