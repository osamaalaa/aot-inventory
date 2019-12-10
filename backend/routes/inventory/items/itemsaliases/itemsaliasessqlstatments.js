let statements = {

        insertNewItemAliase: {
                statement: `
        INSERT INTO ITEMS_ALIASES (
                ITEMS_ALIASES_ID,
                ITEMS_ID,
                ALIASES_TYPE_ID,
                SUBSIDIARY_ID,
                ITEM_CODE,
                DEFAULT_ALIASES,
                CREATED_BY,
            CREATION_DATE,
            DELETED
  ) VALUES (
        ITEMS_ALIASES_SEQ.NEXTVAL,
        :ITEMS_ID,
        :ALIASES_TYPE_ID,
        :SUBSIDIARY_ID,
        :ITEM_CODE,
        :DEFAULT_ALIASES,
        :CREATED_BY,
        sysdate,
        0
          )
         RETURN ITEMS_ID INTO :R_ITEMS_ID`,
        returns: ["R_ITEMS_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
      getallitemaliases:{
              statment:`  SELECT
                      ITEMS_ALIASES_ID,
                      (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.ALIASES_TYPE_ID ) NAME,
                      ITEMS_ID,
                      (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                      (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                      SUBSIDIARY_ID,
                      (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                      (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                      ITEM_CODE,
                      DEFAULT_ALIASES,
                      CREATED_BY,
                      CREATION_DATE,
                      DELETED,
                      ALIASES_TYPE_ID,
                      (SELECT PRIMARY_NAME  FROM HR.LOOKUP_DETAILS L  WHERE L.LOOKUP_DETAIL_ID = I.ALIASES_TYPE_ID) ALIAS_TYPE_PRIMARY_NAME,
                      (SELECT SECONDARY_NAME  FROM HR.LOOKUP_DETAILS L  WHERE L.LOOKUP_DETAIL_ID = I.ALIASES_TYPE_ID) ALIAS_TYPE_SECONDARY_NAME
                  FROM ITEMS_ALIASES I
          WHERE DELETED = 0`,
                  bindings: [],
                  qstring: "",
                  requireCommit: false
            },
            getAliasForSpecificItem:{
              statment:`  SELECT
                      ITEMS_ALIASES_ID,
                      (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.ALIASES_TYPE_ID ) NAME,
                      ITEMS_ID,
                      (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
                      (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
                      SUBSIDIARY_ID,
                      (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                      (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                      ITEM_CODE,
                      DEFAULT_ALIASES,
                      CREATED_BY,
                      CREATION_DATE,
                      DELETED,
                      ALIASES_TYPE_ID
                  FROM ITEMS_ALIASES I
          WHERE DELETED = 0 and ITEMS_ID = :ITEMS_ID`,
                  bindings: [],
                  qstring: "",
                  requireCommit: false
            },
    getoneitemaliase:{
        statment:`
        SELECT
              ITEMS_ALIASES_ID,
              (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.ALIASES_TYPE_ID ) ALIASE_NAME,
              ITEMS_ID,
              (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
              (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
              SUBSIDIARY_ID,
              (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
              (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
              ITEM_CODE,
              DEFAULT_ALIASES,
              CREATED_BY,
              CREATION_DATE,
              DELETED,
              ALIASES_TYPE_ID
          FROM ITEMS_ALIASES I
    WHERE ITEMS_ALIASES_ID = :ITEMS_ALIASES_ID AND DELETED = 0 `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },
        deleteItemAlias: {
                statement: `UPDATE ITEMS_ALIASES
                              SET DELETED = 1 , deleted_date = SYSDATE
                              WHERE
                                ITEMS_ALIASES_ID = :ITEMS_ALIASES_ID`,
                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: true
        },

        updateItemAliase: {
                statement: `
        UPDATE ITEMS_ALIASES 
                SET ITEMS_ID = : ITEMS_ID,
                ALIASES_TYPE_ID = : ALIASES_TYPE_ID,
                SUBSIDIARY_ID = : SUBSIDIARY_ID,
                ITEM_CODE = : ITEM_CODE,
                DEFAULT_ALIASES = :DEFAULT_ALIASES,
                MODIFIED_BY = :MODIFIED_BY,
                MODIFIED_DATE = sysdate
        WHERE ITEMS_ALIASES_ID = :ITEMS_ALIASES_ID
        RETURN ITEMS_ID INTO :R_ITEMS_ID`,
                returns: [],
                bindings: [],
                qstring: "",
                requireCommit: true
        },



};


module.exports = statements;
