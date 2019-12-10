let statements = {
  insertTmpItem: {
    statement: `
    INSERT INTO rcv_temporary_items 
    ( 
                rcv_temp_items_id, 
                document_id, 
                arrangement_no, 
                items_id, 
                units_id, 
                unit_factor, 
                unit_quantity, 
                default_unit_quantity, 
                base_unit_quantity, 
                item_cost, 
                total_cost, 
                item_price, 
                total_price, 
                notes, 
                created_by, 
                creation_date, 
                deleted 
    ) 
    VALUES 
    ( 
                rcv_temporary_items_seq.nextval, 
                :DOCUMENT_ID, 
                :ARRANGEMENT_NO, 
                :ITEMS_ID, 
                :UNITS_ID, 
                :UNIT_FACTOR, 
                :UNIT_QUANTITY, 
                :UNIT_FACTOR * :UNIT_QUANTITY, 
                :BASE_UNIT_QUANTITY, 
                :ITEM_COST, 
                :TOTAL_COST, 
                :ITEM_PRICE, 
                :TOTAL_PRICE, 
                :NOTES, 
                :CREATED_BY, 
                sysdate, 
                0 
    )RETURN rcv_temp_items_id , document_id , items_id, units_id , arrangement_no , unit_factor , unit_quantity, default_unit_quantity , base_unit_quantity , item_cost ,total_cost ,item_price INTO :R_RCV_TEMP_ITEMS_ID, :R_DOCUMENT_ID, :R_ITEMS_ID, :R_UNITS_ID , :R_ARRANGEMENT_NO,:R_UNIT_FACTOR , :R_UNIT_QUANTITY , :R_DEFAULT_UNIT_QUANTITY , :R_BASE_UNIT_QUANTITY , :R_ITEM_COST , :R_TOTAL_COST ,:R_ITEM_PRICE`,
    returns: ["R_RCV_TEMP_ITEMS_ID", "R_DOCUMENT_ID", "R_ITEMS_ID", "R_UNITS_ID", "R_UNIT_FACTOR", "R_UNIT_QUANTITY", "R_DEFAULT_UNIT_QUANTITY", "R_BASE_UNIT_QUANTITY", "R_ITEM_COST" , "R_ITEM_PRICE" , "R_ARRANGEMENT_NO","R_TOTAL_COST"],
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  getTmpItems: {
    statment: ` SELECT
                rcv_temp_items_id,
                document_id,
                items_id,
                (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                units_id,
                (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,
                notes,
                unit_quantity,
                BASE_UNIT_QUANTITY,
                unit_factor,
                created_by,
                creation_date,
                deleted,
                deleted_by,
                deleted_date
            FROM
                rcv_temporary_items I
              WHERE DELETED = 0`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getTmpItembyID: {
    statment: `
        SELECT
                rcv_temp_items_id,
                document_id,
                items_id,
                (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                units_id,
                (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,
                notes,
                created_by,
                creation_date,
                deleted,
                deleted_by,
                deleted_date
            FROM
                rcv_temporary_items I
            WHERE rcv_temp_items_id=:RCV_TEMP_ITEMS_ID AND deleted = 0`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  deleteTmpItem: {
    statement: `UPDATE RCV_TEMPORARY_ITEMS
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            rcv_temp_items_id = :RCV_TEMP_ITEMS_ID`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
  }
};

module.exports = statements;
