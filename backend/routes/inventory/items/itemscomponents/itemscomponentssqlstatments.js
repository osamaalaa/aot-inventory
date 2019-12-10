let statements = {
    insertnewitemcomponents: {
        statement: `
        INSERT INTO ITEMS_COMPONENTS (ITEMS_COMPONENTS_ID,
            ITEMS_ID,
            COMPONENTS_ITEMS_ID,
            UNITS_ID,
            QUANTITY,
            ARRANGEMENT_NO,
            ITEM_PRICE,
            COST_PERCENTAGE,
            CREATED_BY,
           
            CREATION_DATE)
          VALUES (
                      ITEMS_COMPONENTS_SEQ.nextval,
                      :ITEMS_ID,
                      :COMPONENTS_ITEMS_ID,
                      :UNITS_ID,
                      :QUANTITY,
                      :ARRANGEMENT_NO,
                      :ITEM_PRICE,
                      :COST_PERCENTAGE,
                     
                      :CREATED_BY,
                      sysdate
          )
         RETURN ITEMS_ID, ITEMS_COMPONENTS_ID, UNITS_ID,QUANTITY,ARRANGEMENT_NO,ITEM_PRICE INTO :R_ITEMS_ID,:R_ITEMS_COMPONENTS_ID, :R_UNITS_ID,:R_QUANTITY,:R_ARRANGEMENT_NO,:R_ITEM_PRICE`,
        returns: ["R_ITEMS_ID", "R_ITEMS_COMPONENTS_ID", "R_UNITS_ID","R_QUANTITY","R_ARRANGEMENT_NO","R_ITEM_PRICE"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
getallitemacomponents:{
    statment:` SELECT ITEMS_COMPONENTS_ID,
                 ITEMS_ID,
                 (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                 (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                 COMPONENTS_ITEMS_ID,
                 (SELECT AR_NAME  FROM INVENTORY.ITEMS IT WHERE IT.ITEMS_ID = I.COMPONENTS_ITEMS_ID) COMPONENT_ITEM_AR_NAME,
                 (SELECT EN_NAME  FROM INVENTORY.ITEMS IT WHERE IT.ITEMS_ID = I.COMPONENTS_ITEMS_ID) COMPONENT_ITEM_EN_NAME,

                 UNITS_ID,
                 (SELECT L.SECONDARY_NAME  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_EN_NAME,
                 (SELECT L.PRIMARY_NAME  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_AR_NAME,
                
                 QUANTITY,
                 ARRANGEMENT_NO,
                 ITEM_PRICE,
                 
                 COST_PERCENTAGE,
                 CREATED_BY,
                 CREATION_DATE,
                 DELETED
              FROM ITEMS_COMPONENTS I
            WHERE DELETED = 0 `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    selectOneItemsComponents:{
        statment:`
        SELECT ITEMS_COMPONENTS_ID,
       ITEMS_ID,
       (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
       (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
       COMPONENTS_ITEMS_ID,
       (SELECT AR_NAME  FROM INVENTORY.ITEMS IT WHERE IT.ITEMS_ID = I.ITEMS_ID) COMPONENT_ITEM_AR_NAME,
       (SELECT EN_NAME  FROM INVENTORY.ITEMS IT WHERE IT.ITEMS_ID = I.ITEMS_ID) COMPONENT_ITEM_EN_NAME,
       UNITS_ID,
       (SELECT L.SECONDARY_NAME  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_EN_NAME,
       (SELECT L.PRIMARY_NAME  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_AR_NAME,
       QUANTITY,
       ARRANGEMENT_NO,
       ITEM_PRICE,
       COST_PERCENTAGE,
       CREATED_BY,
       CREATION_DATE,
       DELETED
  FROM ITEMS_COMPONENTS I
    WHERE ITEMS_COMPONENTS_ID=:ITEMS_COMPONENTS_ID AND DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        selectAllItemsComponentsByItem:{
            statment:` SELECT ITEMS_COMPONENTS_ID,
           ITEMS_ID,
           (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
           (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
           COMPONENTS_ITEMS_ID,
           (SELECT AR_NAME  FROM INVENTORY.ITEMS IT WHERE IT.ITEMS_ID = I.ITEMS_ID) COMPONENT_ITEM_AR_NAME,
           (SELECT EN_NAME  FROM INVENTORY.ITEMS IT WHERE IT.ITEMS_ID = I.ITEMS_ID) COMPONENT_ITEM_EN_NAME,
           UNITS_ID,
           (SELECT L.SECONDARY_NAME  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_EN_NAME,
           (SELECT L.PRIMARY_NAME  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.UNITS_ID) UNITS_AR_NAME,
           QUANTITY,
           ARRANGEMENT_NO,
           ITEM_PRICE,
           COST_PERCENTAGE,
           CREATED_BY,
           CREATION_DATE,
           DELETED
      FROM ITEMS_COMPONENTS I
        where ITEMS_ID=:ITEMS_ID AND DELETED = 0`,
                bindings: [],
                qstring: "",
                requireCommit: false
            },
            deleteItemComponentse: {
                statement: `UPDATE ITEMS_COMPONENTS
                              SET DELETED = 1 , deleted_date = SYSDATE
                              WHERE
                              ITEMS_COMPONENTS_ID = :ITEMS_COMPONENTS_ID`,
                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: true
        },
        updateComponentse: {
                statement: `
        UPDATE ITEMS_COMPONENTS 
                SET ITEMS_ID = : ITEMS_ID,
                COMPONENTS_ITEMS_ID = : COMPONENTS_ITEMS_ID,
                UNITS_ID = : UNITS_ID,
                QUANTITY = : QUANTITY,
                ARRANGEMENT_NO=:ARRANGEMENT_NO,
                ITEM_PRICE = :ITEM_PRICE,
                COST_PERCENTAGE = :COST_PERCENTAGE,
                CREATED_BY = :CREATED_BY,
                MODIFIED_DATE = sysdate
        WHERE ITEMS_COMPONENTS_ID = :ITEMS_COMPONENTS_ID`,
                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: true
        },
};

module.exports = statements;
