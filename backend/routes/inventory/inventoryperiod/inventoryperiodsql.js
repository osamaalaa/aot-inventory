let statements = {
    getAllInventoryPeriod: {
        statement: ` SELECT INVENTORY_PERIODS_ID,
       INVENTORY_PERIODS_CODE,
       AR_NAME,
       EN_NAME,
       AR_DESCRIPTION,
       EN_DESCRIPTION,
       SUBSIDIARY_ID,
       (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
       (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
       START_DATE,
       END_DATE,
       STATUS,
       FINANCIAL_PERIODS_ID,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       MODIFIED_BY,
       MODIFIED_DATE
  FROM INVENTORY_PERIODS I
  WHERE DELETED = 0 AND STATUS = 1
  ORDER BY  INVENTORY_PERIODS_ID DESC `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneInventoryPeriod: {
        statement: ` SELECT INVENTORY_PERIODS_ID,
       INVENTORY_PERIODS_CODE,
       AR_NAME,
       EN_NAME,
       AR_DESCRIPTION,
       EN_DESCRIPTION,
       SUBSIDIARY_ID,
       (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
       (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
       START_DATE,
       END_DATE,
       STATUS,
       FINANCIAL_PERIODS_ID,
       CREATED_BY,
       CREATION_DATE,
       DELETED,
       DELETED_BY,
       DELETED_DATE,
       MODIFIED_BY,
       MODIFIED_DATE
  FROM INVENTORY_PERIODS I
  WHERE DELETED = 0 AND STATUS = 1
   AND INVENTORY_PERIODS_ID = :INVENTORY_PERIODS_ID `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    insertInventoryPeriod: {
        statement: `INSERT INTO INVENTORY_PERIODS (
            INVENTORY_PERIODS_ID,
            INVENTORY_PERIODS_CODE,
            AR_NAME,
            EN_NAME,
            AR_DESCRIPTION,
            EN_DESCRIPTION,
            SUBSIDIARY_ID,
            START_DATE,
            END_DATE,
            STATUS,
            FINANCIAL_PERIODS_ID,
            CREATED_BY,
            CREATION_DATE

     )VALUES (
            INVENTORY_PERIODS_SEQ.NEXTVAL,
            :INVENTORY_PERIODS_CODE,
            :AR_NAME,
            :EN_NAME,
            :AR_DESCRIPTION,
            :EN_DESCRIPTION,
            :SUBSIDIARY_ID,
            :START_DATE,
            :END_DATE,
            :STATUS,
            :FINANCIAL_PERIODS_ID,
            :CREATED_BY,
            sysdate
    )
     RETURN INVENTORY_PERIODS_CODE , INVENTORY_PERIODS_ID  , AR_NAME , EN_NAME INTO :R_INVENTORY_PERIODS_CODE , :R_INVENTORY_PERIODS_ID, :R_AR_NAME , :R_EN_NAME `,
        returns: ["R_INVENTORY_PERIODS_CODE" , "R_INVENTORY_PERIODS_ID" , "R_AR_NAME",  "R_EN_NAME"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },

    deleteInventoryPeriod: {
        statement: `UPDATE INVENTORY_PERIODS
                     SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                     WHERE
                         INVENTORY_PERIODS_ID = :INVENTORY_PERIODS_ID`,

        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
    }


};


module.exports = statements;
