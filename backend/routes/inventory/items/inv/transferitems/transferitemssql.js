let statements = {
    getAlltransferItems : {
        statement :` SELECT
               INV_TRANSFER_ITEMS_ID,
               INV_TRANSFER_ID,
               ARRANGEMENT_NO,
               ITEMS_ID,
               (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
               (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
               UNITS_ID,
               (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,
               UNIT_FACTOR,
               UNIT_QUANTITY,
               DEFAULT_UNIT_QUANTITY,
               BASE_UNIT_QUANTITY,
               ITEM_COST,
               TOTAL_COST,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_TRANSFER_ITEMS I
          WHERE DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOnetransferItems : {
        statement :` SELECT
               INV_TRANSFER_ITEMS_ID,
               INV_TRANSFER_ID,
               ARRANGEMENT_NO,
               ITEMS_ID,
               (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
               (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
               UNITS_ID,
               (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_NAME,
               UNIT_FACTOR,
               UNIT_QUANTITY,
               DEFAULT_UNIT_QUANTITY,
               BASE_UNIT_QUANTITY,
               ITEM_COST,
               TOTAL_COST,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_TRANSFER_ITEMS I
          WHERE DELETED = 0
          AND INV_TRANSFER_ITEMS_ID = :INV_TRANSFER_ITEMS_ID `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     inserttransferItems : {
        statement :`INSERT INTO INV_TRANSFER_ITEMS (
            INV_TRANSFER_ITEMS_ID,
            INV_TRANSFER_ID,
            ARRANGEMENT_NO,
            ITEMS_ID,
            UNITS_ID,
            UNIT_FACTOR,
            UNIT_QUANTITY,
            DEFAULT_UNIT_QUANTITY,
            BASE_UNIT_QUANTITY,
            ITEM_COST,
            TOTAL_COST,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
            INV_TRANSFER_ITEMS_SEQ.NEXTVAL,
            :INV_TRANSFER_ID,
            :ARRANGEMENT_NO,
            :ITEMS_ID,
            :UNITS_ID,
            :UNIT_FACTOR,
            :UNIT_QUANTITY,
            :DEFAULT_UNIT_QUANTITY,
            :BASE_UNIT_QUANTITY,
            :ITEM_COST,
            :TOTAL_COST,
            :NOTES,
            :CREATED_BY,
            sysdate
    )
     RETURN INV_TRANSFER_ID,INV_TRANSFER_ITEMS_ID   into :R_INV_TRANSFER_ID, :R_INV_TRANSFER_ITEMS_ID   `,
        returns :["R_INV_TRANSFER_ID","R_INV_TRANSFER_ITEMS_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
     deleteTransferItems: {
        statement: `UPDATE inv_transfer_items
                      SET deleted = 1 ,   deleted_date = sysdate
                      WHERE
                      inv_transfer_items_id = :INV_TRANSFER_ITEMS_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
      },


 }


 module.exports = statements ;