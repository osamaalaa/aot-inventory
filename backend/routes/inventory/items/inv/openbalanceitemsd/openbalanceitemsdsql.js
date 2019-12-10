let statements = {
    getAllOpenBalanceItemsD : {
        statement :` SELECT
               INV_OPEN_BALANCE_ITEMS_D_ID,
               INV_OPEN_BALANCE_ITEMS_ID,
               INV_OPEN_BALANCE_ID,
               ARRANGEMENT_NO,
               BATCH_NUMBER,
               EXPIRY_DATE,
               SERIAL_NUMBER,
               UNIT_QUANTITY,
               DEFAULT_UNIT_QUANTITY,
               BASE_UNIT_QUANTITY,
               ITEM_COST,
               TOTAL_COST,
               ITEM_PRICE,
               TOTAL_PRICE,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_OPEN_BALANCE_ITEMS_D
          WHERE DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneOpenBalanceItemsD : {
        statement :` SELECT
        INV_OPEN_BALANCE_ITEMS_D_ID,
        INV_OPEN_BALANCE_ITEMS_ID,
        INV_OPEN_BALANCE_ID,
        ARRANGEMENT_NO,
        BATCH_NUMBER,
        EXPIRY_DATE,
        SERIAL_NUMBER,
        UNIT_QUANTITY,
        DEFAULT_UNIT_QUANTITY,
        BASE_UNIT_QUANTITY,
        ITEM_COST,
        TOTAL_COST,
        ITEM_PRICE,
        TOTAL_PRICE,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        MODIFIED_BY,
        MODIFIED_DATE
   FROM INV_OPEN_BALANCE_ITEMS_D
   WHERE INV_OPEN_BALANCE_ITEMS_D_ID = :INV_OPEN_BALANCE_ITEMS_D_ID AND DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertOpenBalanceItemsD : {
        statement :`INSERT INTO INV_OPEN_BALANCE_ITEMS_D (
            INV_OPEN_BALANCE_ITEMS_D_ID,
            INV_OPEN_BALANCE_ITEMS_ID,
            INV_OPEN_BALANCE_ID,
            ARRANGEMENT_NO,
            BATCH_NUMBER,
            EXPIRY_DATE,
            SERIAL_NUMBER,
            UNIT_QUANTITY,
            DEFAULT_UNIT_QUANTITY,
            BASE_UNIT_QUANTITY,
            ITEM_COST,
            TOTAL_COST,
            ITEM_PRICE,
            TOTAL_PRICE,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
        INV_OPEN_BALANCE_ITEMS_D_SEQ.NEXTVAL,
        :INV_OPEN_BALANCE_ITEMS_ID,
        :INV_OPEN_BALANCE_ID,
            :ARRANGEMENT_NO,
            :BATCH_NUMBER,
            :EXPIRY_DATE,
            :SERIAL_NUMBER,
            :UNIT_QUANTITY,
            :DEFAULT_UNIT_QUANTITY,
            :BASE_UNIT_QUANTITY,
            :ITEM_COST,
            :TOTAL_COST,
            :ITEM_PRICE,
            :TOTAL_PRICE,
            :NOTES,
            :CREATED_BY,
        sysdate
    )
     RETURN INV_OPEN_BALANCE_ITEMS_ID,INV_OPEN_BALANCE_ITEMS_D_ID into :R_INV_OPEN_BALANCE_ITEMS_ID,:R_INV_OPEN_BALANCE_ITEMS_D_ID `,
        returns :["R_INV_OPEN_BALANCE_ITEMS_ID","R_INV_OPEN_BALANCE_ITEMS_D_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
     deleteOpenBalanceItemsD: {
        statement: `UPDATE inv_open_balance_items_d
                      SET deleted = 1 ,   deleted_date = sysdate
                      WHERE
                      inv_open_balance_items_d_id = :INV_OPEN_BALANCE_ITEMS_D_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
      },


 }


 module.exports = statements ;
