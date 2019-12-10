let statements = {
  getallitemUnits: {
        statement: `SELECT
        items_units_id,
        items_id,
        (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
        (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
        units_id,
        (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.units_id ) UNITS_NAME,
        unit_factor,
        default_unit,
        created_by,
        creation_date,
        deleted
    FROM
        items_units I
        WHERE deleted = 0`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getoneitemUnits:{
      statment:`
      SELECT
      items_units_id,
      items_id,
      (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
      (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
      units_id,
      (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.units_id ) UNITS_NAME,
      unit_factor,
      default_unit,
      created_by,
      creation_date,
      deleted
  FROM
      items_units I
      WHERE items_units_id=:ITEMS_UNITS_ID AND deleted = 0 `,
          bindings: [],
          qstring: "",
          requireCommit: false
      },
      insertnewitemUnits: {
          statement: `
          INSERT INTO items_units (
          items_units_id,
          items_id,
          units_id,
          unit_factor,
          default_unit,
          created_by,
          creation_date
        )
          VALUES (
          ITEMS_UNITS_SEQ.NEXTVAL,
          :ITEMS_ID,
          :UNITS_ID,
          :UNIT_FACTOR,
          :DEFAULT_UNIT,
          :CREATED_BY,
          sysdate
      )
           RETURN ITEMS_ID, UNITS_ID, UNIT_FACTOR  INTO :R_ITEMS_ID, :R_UNITS_ID, :R_UNIT_FACTOR`,
          returns: ["R_ITEMS_ID", "R_UNITS_ID", "R_UNIT_FACTOR"],
          bindings: [],
          qstring: "",
          requireCommit: true
      },
      deleteItemUnits: {
        statement: `UPDATE ITEMS_UNITS
                      SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                      WHERE
                          ITEMS_UNITS_ID = :ITEMS_UNITS_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
      }
};






















module.exports = statements;
