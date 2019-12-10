let statements = {
    getAlltransferItemsD : {
        statement :`
        SELECT INV_TRANSFER_ITEMS_D_ID,
               INV_TRANSFER_ITEMS_ID,
               INV_TRANSFER_ID,
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
          FROM INV_TRANSFER_ITEMS_D
          WHERE DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOnetransferItemsD : {
        statement :` SELECT
        INV_TRANSFER_ITEMS_D_ID,
        INV_TRANSFER_ITEMS_ID,
        INV_TRANSFER_ID,
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
   FROM INV_TRANSFER_ITEMS_D
      WHERE INV_TRANSFER_ITEMS_D_ID = :INV_TRANSFER_ITEMS_D_ID AND DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     inserttransferItemsD : {
        statement :`INSERT INTO INV_TRANSFER_ITEMS_D (
            INV_TRANSFER_ITEMS_D_ID,
            INV_TRANSFER_ITEMS_ID,
            INV_TRANSFER_ID,
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
        INV_TRANSFER_ITEMS_D_SEQ.NEXTVAL,
        :INV_TRANSFER_ITEMS_ID,
        :INV_TRANSFER_ID,
        :ARRANGEMENT_NO,
        :BATCH_NUMBER,
        sysdate,
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
     RETURN INV_TRANSFER_ITEMS_ID, INV_TRANSFER_ITEMS_D_ID into :R_INV_TRANSFER_ITEMS_ID, :R_INV_TRANSFER_ITEMS_D_ID `,
        returns :["R_INV_TRANSFER_ITEMS_ID","R_INV_TRANSFER_ITEMS_D_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
     deleteTransferItemsD: {
        statement: `UPDATE inv_transfer_items_d
                      SET deleted = 1 ,   deleted_date = sysdate
                      WHERE
                      inv_transfer_items_d_id = :INV_TRANSFER_ITEMS_D_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
      },


 }


 module.exports = statements ;
