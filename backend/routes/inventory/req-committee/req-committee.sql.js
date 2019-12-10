let statements = {
    getAllRequestCommitee : {
        statement :` SELECT
               INV_REQUEST_COMMITTEE_ID,
               DOCUMENT_ID,
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
          FROM INV_REQUEST_COMMITTEE I
          WHERE DELETED = 0    `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getOneInvRequestCommitte : {
        statement :` SELECT
               INV_REQUEST_COMMITTEE_ID,
               DOCUMENT_ID,
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
          FROM INV_REQUEST_COMMITTEE I
          WHERE DELETED = 0
          AND INV_REQUEST_COMMITTEE_ID = :INV_REQUEST_COMMITTEE_ID `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },

     insertInvRequestCommitte : {
        statement :`INSERT INTO INV_REQUEST_COMMITTEE (
            INV_REQUEST_COMMITTEE_ID,
            DOCUMENT_ID,
            ARRANGEMENT_NO,
            EMPLOYEE_ID,
            EMPLOYEE_POSITION,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     )VALUES (
        INV_REQUEST_COMMITTEE_SEQ.NEXTVAL,
        :DOCUMENT_ID,
        :ARRANGEMENT_NO,
        :EMPLOYEE_ID,
        :EMPLOYEE_POSITION,
        :NOTES,
        :CREATED_BY,
        sysdate
    )
     RETURN DOCUMENT_ID into :R_DOCUMENT_ID `,
        returns :["R_DOCUMENT_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
     }


 }
 module.exports = statements ;
