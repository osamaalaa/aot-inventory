let statements = {
    insertTransfer:
    {
        statement: `
          INSERT INTO inv_transfer (
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
                                      TRANSFER_STORE_ID,
                                      WF_REQUEST_ID
                                  ) VALUES (
                                    INV_TRANSFER_SEQ.NEXTVAL,
                                    :DOCUMENT_TYPE_ID,
                                    :DOCUMENT_DATE,
                                    :INVENTORY_PERIODS_ID,
                                    :STORES_ID,
                                    :TRANSFER_DATE,
                                    :DOCUMENT_NO,
                                    :BASE_DOCUMENT_ID,
                                    :BASE_DOCUMENT_TYPE_ID,
                                    :SUBSIDIARY_ID,
                                    :JOURNALS_ID,
                                    :SOURCE_TYPE,
                                    :DOCUMENT_STATUS,
                                    :NOTES,
                                    :CREATED_BY,
                                    sysdate,
                                    :VALDIATED_BY,
                                    :VALDIATED_DATE,
                                    :CONFIRMED_BY,
                                    :CONFIRMED_DATE,
                                    :TRANSFER_STORE_ID,
                                    null
                                  )

                   RETURN INV_TRANSFER_ID, DOCUMENT_TYPE_ID  ,INVENTORY_PERIODS_ID ,  STORES_ID ,WF_REQUEST_ID  INTO :R_INV_TRANSFER_ID, :R_DOCUMENT_TYPE_ID, :R_INVENTORY_PERIODS_ID , :R_STORES_ID , :R_WF_REQUEST_ID`,
        returns: ["R_DOCUMENT_TYPE_ID" , "R_INVENTORY_PERIODS_ID", "R_STORES_ID" , "R_WF_REQUEST_ID","R_INV_TRANSFER_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getTransfer:{
        statment:`SELECT
                          inv_transfer_id,
                          document_type_id,
                        (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
                          document_date,
                          inventory_periods_id,
                          (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
                          (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
                          stores_id,
                          (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                          (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                          transfer_date,
                          document_no,
                          base_document_id,
                          base_document_type_id,
                          subsidiary_id,
                          (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                          (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                          journals_id,
                          source_type,
                          document_status,
                          (select PRIMARY_NAME  FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.DOCUMENT_STATUS ) STATUS_NAME,
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
                          TRANSFER_STORE_ID,
                          WF_REQUEST_ID
                      FROM
                          inv_transfer I
                          WHERE DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getOneTransfer:{
        statment:`SELECT
                          inv_transfer_id,
                          document_type_id,
                          document_date,
                          inventory_periods_id,
                          (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
                          (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
                          stores_id,
                          (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
                          (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
                          transfer_date,
                          document_no,
                          base_document_id,
                          base_document_type_id,
                          subsidiary_id,
                          (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                          (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                          journals_id,
                          source_type,
                          document_status,
                          (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.DOCUMENT_STATUS ) STATUS_NAME,
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
                          WF_REQUEST_ID,
                          TRANSFER_STORE_ID,
                          (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.TRANSFER_STORE_ID) TRANSFER_AR_NAME,
                          (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.TRANSFER_STORE_ID) TRANSFER_EN_NAME

                      FROM
                          inv_transfer I
                          WHERE DELETED = 0
                AND inv_transfer_id=:INV_TRANSFER_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteTRANSFER: {
            statement: `UPDATE inv_transfer
                          SET deleted = 1 ,   deleted_date = sysdate
                          WHERE
                          inv_transfer_id = :INV_TRANSFER_ID`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: true
          },
        UPDATETRANSFER:{
            statement: `UPDATE inv_transfer

  DOCUMENT_TYPE_ID       =:DOCUMENT_TYPE_ID,
  DOCUMENT_DATE          =:DOCUMENT_DATE,
  INVENTORY_PERIODS_ID   =:INVENTORY_PERIODS_ID,
  STORES_ID              =:STORES_ID,
  TRANSFER_DATE          =:TRANSFER_DATE,
  DOCUMENT_NO            =:DOCUMENT_NO,
  BASE_DOCUMENT_ID       =:BASE_DOCUMENT_ID,
  BASE_DOCUMENT_TYPE_ID  =:BASE_DOCUMENT_TYPE_ID,
  SUBSIDIARY_ID          =:SUBSIDIARY_ID,
  JOURNALS_ID            =:JOURNALS_ID,
  SOURCE_TYPE            =:SOURCE_TYPE,
  DOCUMENT_STATUS        =:DOCUMENT_STATUS,
  NOTES                  =:NOTES,
  VALDIATED_BY           =:VALDIATED_BY,
  VALDIATED_DATE         =:VALDIATED_DATE,
  CONFIRMED_BY           =:CONFIRMED_BY,
  CONFIRMED_DATE         =:sysdate,
  MODIFIED_BY            =:MODIFIED_BY,
  MODIFIED_DATE          =:sysdate,
  WF_REQUEST_ID          =:WF_REQUEST_ID
            WHERE
            inv_transfer_id = :INV_TRANSFER_ID`,
returns: [],
bindings: [],
qstring: "",
requireCommit: true
        }
};



module.exports = statements;
