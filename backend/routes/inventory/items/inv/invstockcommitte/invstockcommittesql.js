let statements = {
    getAllInvStockCommitte : {
        statement :` SELECT
               INV_STOCKTAKING_COMMITTEE_ID,
               INV_STOCKTAKING_ID,
               ARRANGEMENT_NO,
               EMPLOYEE_ID,
               (SELECT  A.FIRST_NAME ||  ' '  ||  A.SECOND_NAME || ' ' || A.LAST_NAME  FROM AOT_GEN.EMPLOYEES A WHERE A.EMPLOYEE_ID = I.EMPLOYEE_ID) EMPLOYEE_NAME,
               EMPLOYEE_POSITION,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_STOCKTAKING_COMMITTEE I
          WHERE DELETED = 0    `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneInvStockCommitte : {
        statement :` SELECT
               INV_STOCKTAKING_COMMITTEE_ID,
               INV_STOCKTAKING_ID,
               ARRANGEMENT_NO,
               EMPLOYEE_ID,
               (SELECT nvl(A.FIRST_NAME, A.LAST_NAME) FROM AOT_GEN.EMPLOYEES A WHERE A.EMPLOYEE_ID = I.EMPLOYEE_ID) EMPLOYEE_NAME,
               EMPLOYEE_POSITION,
               NOTES,
               CREATED_BY,
               CREATION_DATE,
               DELETED,
               DELETED_BY,
               DELETED_DATE,
               MODIFIED_BY,
               MODIFIED_DATE
          FROM INV_STOCKTAKING_COMMITTEE I
          WHERE DELETED = 0
          AND INV_STOCKTAKING_COMMITTEE_ID = :INV_STOCKTAKING_COMMITTEE_ID `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertInvStockCommitte : {
        statement :`INSERT INTO INV_STOCKTAKING_COMMITTEE (
            INV_STOCKTAKING_COMMITTEE_ID,
            INV_STOCKTAKING_ID,
            ARRANGEMENT_NO,
            EMPLOYEE_ID,
            EMPLOYEE_POSITION,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
        INV_STOCKTAKING_COMMITTEE_SEQ.NEXTVAL,
        :INV_STOCKTAKING_ID,
        :ARRANGEMENT_NO,
        :EMPLOYEE_ID,
        :EMPLOYEE_POSITION,
        :NOTES,
        :CREATED_BY,
        sysdate
    )
     RETURN INV_STOCKTAKING_ID into :R_INV_STOCKTAKING_ID `,
        returns :["R_INV_STOCKTAKING_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     }


 }
 module.exports = statements ;
