let statements = {
    insertOpenBalanceItem: {
        statement: `
        INSERT INTO inv_open_balance_items (
                              inv_open_balance_items_id,
                              inv_open_balance_id,
                              arrangement_no,
                              items_id,
                              units_id,
                              unit_factor,
                              unit_quantity,
                              default_unit_quantity,
                              item_cost,
                              total_cost,
                              notes,
                              created_by,
                              creation_date
                          ) VALUES (
                              INV_OPEN_BALANCE_ITEMS_SEQ.NEXTVAL,
                              :INV_OPEN_BALANCE_ID,
                              :ARRANGEMENT_NO,
                              :ITEMS_ID,
                              :UNITS_ID,
                              :UNIT_FACTOR,
                              :UNIT_QUANTITY,
                              :UNIT_FACTOR * :UNIT_QUANTITY,
                              :ITEM_COST,
                              :TOTAL_COST,
                              :NOTES,
                              :CREATED_BY,
                              sysdate
                          )
                   RETURN INV_OPEN_BALANCE_ID  ,ARRANGEMENT_NO ,  ITEMS_ID, INV_OPEN_BALANCE_ITEMS_ID  INTO :R_INV_OPEN_BALANCE_ID, :R_ARRANGEMENT_NO , :R_ITEMS_ID, :R_INV_OPEN_BALANCE_ITEMS_ID`,
        returns: ["R_INV_OPEN_BALANCE_ID" , "R_ARRANGEMENT_NO", "R_ITEMS_ID","R_INV_OPEN_BALANCE_ITEMS_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getOpenbalanceITems:{
        statment:`SELECT
                      inv_open_balance_items_id,
                      inv_open_balance_id,
                      arrangement_no,
                      items_id,
                      (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                      (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                      units_id,
                      (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,
                      unit_factor,
                      unit_quantity,
                      default_unit_quantity,
                      item_cost,
                      total_cost,
                      notes,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date,
                      modified_by,
                      modified_date
                  FROM
                      inv_open_balance_items I
                      WHERE DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getOneOpenBalanceItemByUnitsId:{
        statment:`SELECT
INV_OPEN_BALANCE_ITEMS_ID, INV_OPEN_BALANCE_ID, ARRANGEMENT_NO,
   ITEMS_ID, UNITS_ID, UNIT_FACTOR,
   UNIT_QUANTITY, DEFAULT_UNIT_QUANTITY, ITEM_COST,
   TOTAL_COST, NOTES
FROM INVENTORY.INV_OPEN_BALANCE_ITEMS
WHERE DELETED = 0 AND UNITS_ID = :UNITS_ID `,
                bindings: [],
                qstring: "",
                requireCommit: false
            },

            deleteOpenBalanceItems: {
                statement: `UPDATE inv_open_balance_items
                              SET deleted = 1 ,   deleted_date = sysdate
                              WHERE
                              inv_open_balance_items_id = :INV_OPEN_BALANCE_ITEMS_ID`,
                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: true
              },

};

module.exports = statements;
