let statements = {
    getAllRcvDocument : {
        statement :` SELECT
        DOCUMENT_ID,
        DOCUMENT_TYPE_ID,
        (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
        (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
        DOCUMENT_DATE,
        INVENTORY_PERIODS_ID,
        (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
        (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
        STORES_ID,
        (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
        (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
        RCV_DATE,
        DOCUMENT_NO,
        BASE_DOCUMENT_ID,
        BASE_DOCUMENT_TYPE_ID,
        SUBSIDIARY_ID,
        (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
        (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
        JOURNALS_ID,
        SOURCE_TYPE,
        (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where  STATUS = 1 and L.LOOKUP_DETAIL_ID = I.SOURCE_TYPE) SOURCE_NAME,
        SUPPLIER_ID,
        (SELECT AR_NAME  FROM INVENTORY.SUPPLIERS SP WHERE SP.SUPPLIER_ID = I.SUPPLIER_ID) SUPPLIER_AR_NAME,
        (SELECT EN_NAME  FROM INVENTORY.SUPPLIERS SP WHERE SP.SUPPLIER_ID = I.SUPPLIER_ID) SUPPLIER_EN_NAME,
        PO_NUMBER,
        PO_DATE,
        PI_NUMBER,
        PI_DATE,
        DELIVERED_BY,
        DELIVERY_DATE,
        SHIPMENT_NUMBER,
        SHIPMENT_DATE,
        SHIPMENT_POLICY_NO,
        DOCUMENT_STATUS,
        (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.DOCUMENT_STATUS ) STATUS_NAME,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        VALDIATED_BY,
        VALDIATED_DATE,
        CONFIRMED_BY,
        CONFIRMED_DATE,
        WF_REQUEST_ID,
        DELETED
   FROM RCV_DOCUMENT I
   WHERE DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
 
    getOneRcvDocument : {
        statement :`  SELECT
        DOCUMENT_ID,
        DOCUMENT_TYPE_ID,
        (SELECT AR_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_AR_NAME,
        (SELECT EN_NAME FROM INVENTORY.DOCUMENT_TYPES T WHERE T.DOCUMENT_TYPE_ID = I.DOCUMENT_TYPE_ID) DOCUMENT_EN_NAME,
        DOCUMENT_DATE,
        INVENTORY_PERIODS_ID,
        (SELECT AR_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_AR_NAME,
        (SELECT EN_NAME FROM INVENTORY.INVENTORY_PERIODS P WHERE P.INVENTORY_PERIODS_ID = I.INVENTORY_PERIODS_ID ) INVENTORY_PERIODS_EN_NAME,
        STORES_ID,
        (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
        (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
        RCV_DATE,
        DOCUMENT_NO,
        BASE_DOCUMENT_ID,
        BASE_DOCUMENT_TYPE_ID,
        SUBSIDIARY_ID,
        (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
        (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
        JOURNALS_ID,
        SOURCE_TYPE,
        (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where  STATUS = 1 and L.LOOKUP_DETAIL_ID = I.SOURCE_TYPE) SOURCE_NAME,
        SUPPLIER_ID,
        PO_NUMBER,
        PO_DATE,
        PI_NUMBER,
        PI_DATE,
        DELIVERED_BY,
        DELIVERY_DATE,
        SHIPMENT_NUMBER,
        SHIPMENT_DATE,
        SHIPMENT_POLICY_NO,
        DOCUMENT_STATUS,
        (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.DOCUMENT_STATUS ) STATUS_NAME,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        VALDIATED_BY,
        VALDIATED_DATE,
        CONFIRMED_BY,
        CONFIRMED_DATE,
        WF_REQUEST_ID,
        DELETED
   FROM RCV_DOCUMENT I
   WHERE DOCUMENT_ID = :DOCUMENT_ID
   AND DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
 
     insertRcvDocument : {
        statement :`INSERT INTO RCV_DOCUMENT (
         DOCUMENT_ID,
         DOCUMENT_TYPE_ID,
         DOCUMENT_DATE,
         INVENTORY_PERIODS_ID,
         STORES_ID,
         RCV_DATE,
         DOCUMENT_NO,
         BASE_DOCUMENT_ID,
         BASE_DOCUMENT_TYPE_ID,
         SUBSIDIARY_ID,
         JOURNALS_ID,
         SOURCE_TYPE,
         SUPPLIER_ID,
         PO_NUMBER,
         PO_DATE,
         PI_NUMBER,
         PI_DATE,
         DELIVERED_BY,
         DELIVERY_DATE,
         SHIPMENT_NUMBER,
         SHIPMENT_DATE,
         SHIPMENT_POLICY_NO,
         DOCUMENT_STATUS,
         NOTES,
         CREATED_BY,
         CREATION_DATE
 ) VALUES (
     RCV_DOCUMENT_SEQ.NEXTVAL,
     :DOCUMENT_TYPE_ID,
      sysdate,
     :INVENTORY_PERIODS_ID,
     :STORES_ID,
      sysdate,
     :DOCUMENT_NO,
     :BASE_DOCUMENT_ID,
     :BASE_DOCUMENT_TYPE_ID,
     :SUBSIDIARY_ID,
     :JOURNALS_ID,
     :SOURCE_TYPE,
     :SUPPLIER_ID,
     :PO_NUMBER,
     sysdate,
     :PI_NUMBER,
     sysdate,
     :DELIVERED_BY,
     sysdate,
     :SHIPMENT_NUMBER,
     sysdate,
     :SHIPMENT_POLICY_NO,
     :DOCUMENT_STATUS,
     :NOTES,
     :CREATED_BY,
     SYSDATE
    )
     RETURN DOCUMENT_ID into :R_DOCUMENT_ID `,
        returns :["R_DOCUMENT_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     },
 
     deleteRcvDocument : {
         statement: `UPDATE RCV_DOCUMENT
                       SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                       WHERE
                           document_id = :DOCUMENT_ID`,
         returns: [],
         bindings: [],
         qstring: "",
         requireCommit: true
       }
 
 }
 
 module.exports = statements ;
 
 
 