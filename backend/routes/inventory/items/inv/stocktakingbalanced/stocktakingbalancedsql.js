let statements = {
    insertStockTakingDBalance: {
        statement: `
        INSERT INTO inv_stocktaking_balance_d (
                                              inv_stocktaking_balance_d_id,
                                              inv_stocktaking_id,
                                              inv_stocktaking_balance_id,
                                              stores_id,
                                              arrangement_no,
                                              pre_balance,
                                              items_id,
                                              batch_number,
                                              expiry_date,
                                              serial_number,
                                              item_cost,
                                              average_cost,
                                              current_balance,
                                              qty_on_hand,
                                              qty_reserved,
                                              qty_transfer_to,
                                              qty_transfer_from,
                                              oty_disposed,
                                              qty_on_por,
                                              qty_on_sor,
                                              qty_on_so,
                                              qty_on_po,
                                              qty_requested,
                                              qty_so_consigment,
                                              qty_po_consigment,
                                              qty_in,
                                              qty_out,
                                              stocktaking_current_balance,
                                              stocktaking_qty_on_hand,
                                              diff_current_balance,
                                              diff_qty_on_hand,
                                              notes,
                                              created_by,
                                              creation_date
                                  ) VALUES (
                                         INV_STOCKTAKING_BALANCE_D_SEQ.NEXTVAL,
                                        :INV_STOCKTAKING_ID,
                                        :INV_STOCKTAKING_BALANCE_ID,
                                        :STORES_ID,
                                        :ARRANGEMENT_NO,
                                        :PRE_BALANCE,
                                        :ITEMS_ID,
                                        :BATCH_NUMBER,
                                        :EXPIRY_DATE,
                                        :SERIAL_NUMBER,
                                        :ITEM_COST,
                                        :AVERAGE_COST,
                                        :CURRENT_BALANCE,
                                        :QTY_ON_HAND,
                                        :QTY_RESERVED,
                                        :QTY_TRANSFER_TO,
                                        :QTY_TRANSFER_FROM,
                                        :OTY_DISPOSED,
                                        :QTY_ON_POR,
                                        :QTY_ON_SOR,
                                        :QTY_ON_SO,
                                        :QTY_ON_PO,
                                        :QTY_REQUESTED,
                                        :QTY_SO_CONSIGMENT,
                                        :QTY_PO_CONSIGMENT,
                                        :QTY_IN,
                                        :QTY_OUT,
                                        :STOCKTAKING_CURRENT_BALANCE,
                                        :STOCKTAKING_QTY_ON_HAND,
                                        :DIFF_CURRENT_BALANCE,
                                        :DIFF_QTY_ON_HAND,
                                        :NOTES,
                                        :CREATED_BY,
                                        sysdate
                                  )
                   RETURN INV_STOCKTAKING_ID  ,INV_STOCKTAKING_BALANCE_ID ,  ARRANGEMENT_NO  INTO :R_INV_STOCKTAKING_ID, :R_INV_STOCKTAKING_BALANCE_ID , :R_ARRANGEMENT_NO `,
        returns: ["R_INV_STOCKTAKING_ID" , "R_INV_STOCKTAKING_BALANCE_ID", "R_ARRANGEMENT_NO"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getStockTakingBalanceD:{
        statment:`SELECT
                          inv_stocktaking_balance_d_id,
                          inv_stocktaking_id,
                          inv_stocktaking_balance_id,
                          stores_id,
                          (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                          (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                          arrangement_no,
                          pre_balance,
                          items_id,
                          (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                          (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                          batch_number,
                          expiry_date,
                          serial_number,
                          item_cost,
                          average_cost,
                          current_balance,
                          qty_on_hand,
                          qty_reserved,
                          qty_transfer_to,
                          qty_transfer_from,
                          oty_disposed,
                          qty_on_por,
                          qty_on_sor,
                          qty_on_so,
                          qty_on_po,
                          qty_requested,
                          qty_so_consigment,
                          qty_po_consigment,
                          qty_in,
                          qty_out,
                          stocktaking_current_balance,
                          stocktaking_qty_on_hand,
                          diff_current_balance,
                          diff_qty_on_hand,
                          notes,
                          created_by,
                          creation_date,
                          deleted,
                          deleted_by,
                          deleted_date,
                          modified_by,
                          modified_date
                      FROM
                          inv_stocktaking_balance_d I
                          WHERE DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getOneStockTakingBalanceDByID:{
        statment:`    SELECT
                          inv_stocktaking_balance_d_id,
                          inv_stocktaking_id,
                          inv_stocktaking_balance_id,
                          stores_id,
                          (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                          (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                          arrangement_no,
                          pre_balance,
                          items_id,
                          (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                          (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                          batch_number,
                          expiry_date,
                          serial_number,
                          item_cost,
                          average_cost,
                          current_balance,
                          qty_on_hand,
                          qty_reserved,
                          qty_transfer_to,
                          qty_transfer_from,
                          oty_disposed,
                          qty_on_por,
                          qty_on_sor,
                          qty_on_so,
                          qty_on_po,
                          qty_requested,
                          qty_so_consigment,
                          qty_po_consigment,
                          qty_in,
                          qty_out,
                          stocktaking_current_balance,
                          stocktaking_qty_on_hand,
                          diff_current_balance,
                          diff_qty_on_hand,
                          notes,
                          created_by,
                          creation_date,
                          deleted,
                          deleted_by,
                          deleted_date,
                          modified_by,
                          modified_date
                      FROM
                          inv_stocktaking_balance_d I
                    WHERE inv_stocktaking_balance_d_id=:INV_STOCKTAKING_BALANCE_D_ID AND DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        }
};

module.exports = statements;