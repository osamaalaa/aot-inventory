let statements ={
      getAllRevDocumentCommitte :{
           statement :`SELECT
           RCV_DOCUMENT_COMMITTEE_ID,
           DOCUMENT_ID,
           ARRANGEMENT_NO,
           EMPLOYEE_ID,
           (select FIRST_NAME || ' ' ||  LAST_NAME FROM AOT_GEN.EMPLOYEES E WHERE E.EMPLOYEE_ID = I.EMPLOYEE_ID ) EMPLOYEE_NAME,
           EMPLOYEE_POSITION,
           NOTES,
           CREATED_BY,
           CREATION_DATE,
           DELETED,
           DELETED_BY,
           DELETED_DATE,
           MODIFIED_BY,
           MODIFIED_DATE
      FROM RCV_DOCUMENT_COMMITTEE I
      WHERE DELETED = 0 `,
           bindings: [],
           qstring: "",
           requireCommit: false
      },

      getOneRevDocumentCommitte :{
        statement :`SELECT
        RCV_DOCUMENT_COMMITTEE_ID,
        DOCUMENT_ID,
        ARRANGEMENT_NO,
        EMPLOYEE_ID,
        (select FIRST_NAME || ' ' ||  LAST_NAME FROM AOT_GEN.EMPLOYEES E WHERE E.EMPLOYEE_ID = I.EMPLOYEE_ID ) EMPLOYEE_NAME,
        EMPLOYEE_POSITION,
        NOTES,
        CREATED_BY,
        CREATION_DATE,
        DELETED,
        DELETED_BY,
        DELETED_DATE,
        MODIFIED_BY,
        MODIFIED_DATE
   FROM RCV_DOCUMENT_COMMITTEE I
   WHERE RCV_DOCUMENT_COMMITTEE_ID = :RCV_DOCUMENT_COMMITTEE_ID AND DELETED = 0`,
        bindings: [],
        qstring: "",
        requireCommit: false
      },

      insertNewRevDocumentCommitte :{
        statement :`INSERT INTO RCV_DOCUMENT_COMMITTEE (
            RCV_DOCUMENT_COMMITTEE_ID,
            DOCUMENT_ID,
            ARRANGEMENT_NO,
            EMPLOYEE_ID,
            EMPLOYEE_POSITION,
            NOTES,
            CREATED_BY,
            CREATION_DATE
     ) VALUES (
        RCV_DOCUMENT_COMMITTEE_SEQ.NEXTVAL,
        :DOCUMENT_ID,
        :ARRANGEMENT_NO,
        :EMPLOYEE_ID,
        :EMPLOYEE_POSITION,
        :NOTES,
        :CREATED_BY,
        sysdate
     )
        RETURN  DOCUMENT_ID INTO :R_DOCUMENT_ID `,
        returns : ["R_DOCUMENT_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
      }

}

module.exports = statements ;
