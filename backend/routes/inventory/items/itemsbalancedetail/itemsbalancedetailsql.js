let statements = {
    insertItemBalanceDetail: {
        statement: `
        INSERT INTO items_balance_detail (
                              items_balance_detail_id,
                              items_balance_id,
                              batch_number,
                              expiry_date,
                              serial_number,
                              open_balance,
                              open_balance_date,
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
                              last_sold,
                              last_recieved,
                              confirmed,
                              created_by,
                              creation_date
                          ) VALUES (
                              ITEMS_BALANCE_DETAIL_SEQ.NEXTVAL,
                              :ITEMS_BALANCE_ID,
                              :BATCH_NUMBER,
                              sysdate,
                              :SERIAL_NUMBER,
                              :OPEN_BALANCE,
                              sysdate,
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
                              sysdate,
                              sysdate,
                              :CONFIRMED,
                              :CREATED_BY,
                              sysdate
                                      )
                   RETURN ITEMS_BALANCE_ID , BATCH_NUMBER ,EXPIRY_DATE ,  SERIAL_NUMBER  INTO :R_ITEMS_BALANCE_ID, :R_BATCH_NUMBER , :R_EXPIRY_DATE , :R_SERIAL_NUMBER `,
        returns: ["R_ITEMS_BALANCE_ID", "R_BATCH_NUMBER", "R_EXPIRY_DATE", "R_SERIAL_NUMBER"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getAllItemsBalanceDetail: {
        statment: `SELECT
                      items_balance_detail_id,
                      items_balance_id,
                      batch_number,
                      expiry_date,
                      serial_number,
                      open_balance,
                      open_balance_date,
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
                      last_sold,
                      last_recieved,
                      confirmed
                  FROM
                      items_balance_detail
                 WHERE deleted = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getOneItemBalanceDetailByID: {
        statment: `SELECT
                      items_balance_detail_id,
                      items_balance_id,
                      batch_number,
                      expiry_date,
                      serial_number,
                      open_balance,
                      open_balance_date,
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
                      last_sold,
                      last_recieved,
                      confirmed
                  FROM
                      items_balance_detail D
                  WHERE items_balance_detail_id=:ITEMS_BALANCE_DETAIL_ID AND deleted = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getOneItemBalancesByID: {
        statment: `SELECT
                         
                          items_balance_id,
                          batch_number,
                          expiry_date,
                          serial_number,
                          open_balance,
                          open_balance_date,
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
                          last_sold,
                          last_recieved,
                          confirmed
                      FROM
                          items_balance_detail D
                      WHERE items_balance_id=:ITEMS_BALANCE_ID AND deleted = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
   

    deleteItemsBalanceDetail: {
        statement: `UPDATE items_balance_detail
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            items_balance_detail_id = :ITEMS_BALANCE_DETAIL_ID`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
    }


};

module.exports = statements;
