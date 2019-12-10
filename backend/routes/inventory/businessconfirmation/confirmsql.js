let statements = {
    checkEmployee: {
        statement: `SELECT
        count(*) emp
    FROM
        aot_gen.employees
        where employee_id = :EMPLOYEE_ID`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    checkOpenPeriod: {
        statement: `SELECT
      inventory_periods_id,
      inventory_periods_code,
      ar_name,
      en_name,
      ar_description,
      en_description,
      subsidiary_id,
      start_date,
      end_date,
      status,
      financial_periods_id,
      created_by,
      creation_date,
      deleted,
      deleted_by,
      deleted_date,
      modified_by,
      modified_date
  FROM
      inventory_periods
  where inventory_periods_id = :INVENTORY_PERIOD_ID`,
        bindings: [],
        qstring: ""
    },
    getOpenBalance: {
        statement: `SELECT
      inv_open_balance_id,
      document_type_id,
      document_date,
      inventory_periods_id,
      stores_id,
      document_no,
      subsidiary_id,
      journals_id,
      source_type,
      document_status,
      notes,
      created_by,
      creation_date,
      valdiated_by,
      valdiated_date,
      confirmed_by,
      confirmed_date,
      deleted,
      deleted_by,
      deleted_date,
      modified_by,
      modified_date,
      wf_request_id
  FROM
      inv_open_balance
  where inv_open_balance_id = :OPEN_BALANCE_ID`,
        bindings: [],
        qstring: ""
    },
    getOpenBalanceItems: {
        statement: `SELECT
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
      creation_date,
      deleted,
      deleted_by,
      deleted_date,
      modified_by,
      modified_date
  FROM
      inv_open_balance_items
  where inv_open_balance_id = :OPEN_BALANCE_ID`,
        bindings: [],
        qstring: ""
    },
    getOpenBalanceItemsD: {
        statement: `SELECT
      inv_open_balance_items_d_id,
      inv_open_balance_items_id,
      inv_open_balance_id,
      arrangement_no,
      batch_number,
      expiry_date,
      serial_number,
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
      deleted,
      deleted_by,
      deleted_date,
      modified_by,
      modified_date
  FROM
      inv_open_balance_items_d
  where inv_open_balance_id = :OPEN_BALANCE_ID
  and inv_open_balance_items_id = :INV_OPEN_BALANCE_ITEMS_ID`,
        bindings: [],
        qstring: ""
    },

    getRequestInfo: {
        statement: `SELECT
      request_id,
      request_status,
      request_type,
      created_by,
      creation_date,
      modified_by,
      modification_date,
      description,
      deleted,
      deleted_by,
      deleted_date,
      subsidiary_id,
      classification_id
  FROM
      hr.requests
  where request_id = :REQUEST_ID`,
        bindings: [],
        qstring: ""
    },
    insertItemBalance: {
        statement: `INSERT INTO items_balance (
         items_balance_id,
         subsidiary_id,
         items_id,
         stores_id,
         open_balance,
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
         qty_in,
         qty_out,
         reorder_limit,
         max_limit,
         min_limit,
         last_sold,
         last_recieved,
         confirmed,
         stores_locations_id,
         created_by,
         creation_date,
         deleted,
         deleted_by,
         deleted_date,
         modified_by,
         modified_date
     ) VALUES (
      ITEMS_BALANCE_SEQ.NEXTVAL,
         :subsidiary_id,
         :items_id,
         :stores_id,
         :open_balance,
         :item_cost,
         :average_cost,
         :current_balance,
         :qty_on_hand, 
         :qty_reserved,
         :qty_transfer_to,
         :qty_transfer_from,
         :oty_disposed,
         :qty_on_por,
         :qty_on_sor,
         :qty_on_so,
         :qty_on_po,
         :qty_requested,
         :qty_so_consigment,
         :qty_in,
         :qty_out,
         :reorder_limit,
         :max_limit,
         :min_limit,
         :last_sold,
         :last_recieved,
         :confirmed,
         :stores_locations_id,
         :created_by,
         sysdate,
         :deleted,
         null,
         null,
         null,
         null
     )
     RETURN items_balance_id INTO :r_items_balance_id`,
        bindings: [],
        qstring: "",
        returns: ["r_items_balance_id"],
    },
    insertItemBalanceUnits: {
        statement: `INSERT INTO items_balance_units (
        items_balance_units_id,
        items_balance_id,
        items_id,
        stores_id,
        units_id,
        open_balance,
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
        qty_added,
        last_sold,
        last_recieved,
        confirmed,
        created_by,
        creation_date,
        deleted,
        deleted_by,
        deleted_date,
        modified_by,
        modified_date,
        inv_open_balance_items_id
    ) VALUES (
        ITEMS_BALANCE_UNITS_SEQ.NEXTVAL,
        :items_balance_id,
        :items_id,
        :stores_id,
        :units_id,
        :open_balance,
        :item_cost,
        :average_cost,
        :current_balance,
        :qty_on_hand,
        :qty_reserved,
        :qty_transfer_to,
        :qty_transfer_from,
        :oty_disposed,
        :qty_on_por,
        :qty_on_sor,
        :qty_on_so,
        :qty_on_po,
        :qty_requested,
        :qty_so_consigment,
        :qty_added,
        null,
        null,
        1,
        :created_by,
        sysdate,
        :deleted,
        null,
        null,
        null,
        null,
        :inv_open_balance_items_id
    )`,
        bindings: [],
        qstring: ""
    },
    insertItemBalanceUnits: {
        statement: `INSERT INTO items_balance_units (
        items_balance_units_id,
        items_balance_id,
        items_id,
        stores_id,
        units_id,
        open_balance,
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
        qty_added,
        last_sold,
        last_recieved,
        confirmed,
        created_by,
        creation_date,
        deleted,
        deleted_by,
        deleted_date,
        modified_by,
        modified_date,
        inv_open_balance_items_id
    ) VALUES (
        ITEMS_BALANCE_UNITS_SEQ.NEXTVAL,
        :items_balance_id,
        :items_id,
        :stores_id,
        :units_id,
        :open_balance,
        :item_cost,
        :average_cost,
        :current_balance,
        :qty_on_hand,
        :qty_reserved,
        :qty_transfer_to,
        :qty_transfer_from,
        :oty_disposed,
        :qty_on_por,
        :qty_on_sor,
        :qty_on_so,
        :qty_on_po,
        :qty_requested,
        :qty_so_consigment,
        :qty_added,
        null,
        null,
        1,
        :created_by,
        sysdate,
        :deleted,
        null,
        null,
        null,
        null,
        :inv_open_balance_items_id
    )`,
        bindings: [],
        qstring: ""
    },

    insertItemBalanceDetail: {
        statement: `INSERT INTO items_balance_detail (
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
            creation_date,
            deleted,
            deleted_by,
            deleted_date,
            modified_by,
            modified_date,
            inv_open_balance_items_d_id
        ) VALUES (
            ITEMS_BALANCE_DETAIL_SEQ.NEXTVAL,
            :items_balance_id,
            :batch_number,
            :expiry_date,
            :serial_number,
            :open_balance,
            :open_balance_date,
            :item_cost,
            :average_cost,
            :current_balance,
            :qty_on_hand,
            :qty_reserved,
            :qty_transfer_to,
            :qty_transfer_from,
            :oty_disposed,
            :qty_on_por,
            :qty_on_sor,
            :qty_on_so,
            :qty_on_po,
            :qty_requested,
            :qty_so_consigment,
            :qty_po_consigment,
            :qty_in,
            :qty_out,
            :last_sold,
            :last_recieved,
            :confirmed,
            :created_by,
            sysdate,
            :deleted,
            null,
            null,
            null,
            null,
            :inv_open_balance_items_d_id
        )`,
        bindings: [],
        qstring: ""
    },
    getItemBalanceSI: {
        statement: `SELECT
      items_balance_id,
      subsidiary_id,
      items_id,
      stores_id,
      open_balance,
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
      reorder_limit,
      max_limit,
      min_limit,
      last_sold,
      last_recieved,
      confirmed,
      stores_locations_id,
      created_by,
      creation_date,
      deleted,
      deleted_by,
      deleted_date,
      modified_by,
      modified_date
  FROM
      items_balance where stores_id = :STORE_ID and items_id = :ITEM_ID`,
        bindings: [],
        qstring: ""
    },
    checkUnitExists: {
        statement: `SELECT
        items_balance_units_id,
        items_balance_id,
        items_id,
        stores_id,
        units_id,
        open_balance,
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
        qty_added,
        last_sold,
        last_recieved,
        confirmed,
        created_by,
        creation_date,
        deleted,
        deleted_by,
        deleted_date,
        modified_by,
        modified_date,
        inv_open_balance_items_id
    FROM
        items_balance_units
        where stores_id = :STORE_ID and items_id = :ITEM_ID and UNITS_ID = :UNITS_ID`,
        bindings: [],
        qstring: ""
    },
    getrcvDoc: {
        statement: `SELECT
        document_id,
        document_type_id,
        document_date,
        inventory_periods_id,
        stores_id,
        rcv_date,
        document_no,
        base_document_id,
        base_document_type_id,
        subsidiary_id,
        journals_id,
        source_type,
        supplier_id,
        po_number,
        po_date,
        pi_number,
        pi_date,
        delivered_by,
        delivery_date,
        shipment_number,
        shipment_date,
        shipment_policy_no,
        document_status,
        notes,
        created_by,
        creation_date,
        valdiated_by,
        valdiated_date,
        confirmed_by,
        confirmed_date,
        deleted,
        deleted_by,
        deleted_date,
        modified_by,
        modified_date,
        wf_request_id
    FROM
        rcv_document
    where document_id = :DOCUMENT_ID`,
        bindings: [],
        qstring: ""
    },

    getrcvDocItems: {
        statement: `SELECT
        rcv_document_items_id,
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
        deleted,
        deleted_by,
        deleted_date,
        modified_by,
        modified_date
    FROM
        rcv_document_items
    where document_id = :DOCUMENT_ID`,
        bindings: [],
        qstring: ""
    },

    getrcvDocItemsDetails: {
        statement: `SELECT
        rcv_document_items_d_id,
        rcv_document_items_id,
        document_id,
        arrangement_no,
        batch_number,
        expiry_date,
        serial_number,
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
        deleted,
        deleted_by,
        deleted_date,
        modified_by,
        modified_date
    FROM
        rcv_document_items_d
    where document_id = :DOCUMENT_ID
    and rcv_document_items_id = :DOCUMENT_ITEM_ID`,
        bindings: [],
        qstring: ""
    },

    updateBalance: {
        statement: `UPDATE items_balance
        SET
        open_balance = nvl(open_balance, 0) + :OPEN_BALANCE ,
        current_balance = nvl(current_balance, 0) + :CURRENT_BALANCE,
        qty_on_hand = nvl(qty_on_hand, 0) + :QTY_ON_HAND,
        qty_transfer_to = nvl(qty_transfer_to, 0) + :QTY_TRANSFER_TO,
        qty_transfer_from = nvl(qty_transfer_from, 0) + :QTY_TRANSFER_FROM,
                          MODIFIED_BY = :MODIFIED_BY,
                          MODIFIED_DATE = sysdate
        WHERE
            stores_id = :STORE_ID and items_id = :ITEM_ID`,
        bindings: [],
        qstring: ""
    },
    updateBalanceItems: {
        statement: `UPDATE items_balance_units
        SET
        open_balance = nvl(open_balance, 0) + :OPEN_BALANCE ,
        current_balance = nvl(current_balance, 0) + :CURRENT_BALANCE,
        qty_on_hand = nvl(qty_on_hand, 0) + :QTY_ON_HAND,
        qty_transfer_to = nvl(qty_transfer_to, 0) + :QTY_TRANSFER_TO,
        qty_transfer_from = nvl(qty_transfer_from, 0) + :QTY_TRANSFER_FROM,
                          MODIFIED_BY = :modified_by,
                          MODIFIED_DATE = sysdate
        WHERE stores_id = :STORE_ID and items_id = :ITEM_ID`,
        bindings: [],
        qstring: ""
    },
    getInvTransfer: {
        statement: `SELECT
        inv_transfer_id,
        document_type_id,
        document_date,
        inventory_periods_id,
        stores_id,
        transfer_date,
        document_no,
        base_document_id,
        base_document_type_id,
        subsidiary_id,
        journals_id,
        source_type,
        document_status,
        notes,
        created_by,
        creation_date,
        valdiated_by,
        valdiated_date,
        confirmed_by,
        confirmed_date,
        deleted,
        deleted_by,
        deleted_date,
        modified_by,
        modified_date,
        wf_request_id
    FROM
        inv_transfer
    where inv_transfer_id = :INV_TRANSFER_ID`,
        bindings: [],
        qstring: ""
    },
    getInvTransferItems: {
        statement: `SELECT
        inv_transfer_items_id,
        inv_transfer_id,
        inv_transfer_stores_id,
        stores_id,
        arrangement_no,
        items_id,
        units_id,
        unit_factor,
        unit_quantity,
        default_unit_quantity,
        base_unit_quantity,
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
        inv_transfer_items
    where inv_transfer_items_id = :INV_TRANSFER_ITEMS_ID`,
        bindings: [],
        qstring: ""
    },
    getInvTransferItemsD: {
        statement: `SELECT
        inv_transfer_items_d_id,
        inv_transfer_items_id,
        inv_transfer_stores_id,
        inv_transfer_id,
        arrangement_no,
        batch_number,
        expiry_date,
        serial_number,
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
        deleted,
        deleted_by,
        deleted_date,
        modified_by,
        modified_date
    FROM
        inv_transfer_items_d
    where inv_transfer_id = :INV_TRANSFER_ID
    and inv_transfer_items_id = :INV_TRANSFER_ITEMS_ID`,
        bindings: [],
        qstring: ""
    }
};

module.exports = statements;
