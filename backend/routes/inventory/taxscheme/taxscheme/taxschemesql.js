let statements = {
    inserttaxScheme: {
        statement: `
        INSERT INTO tax_scheme (
                          tax_scheme_id,
                          ar_description,
                          en_description,
                          subsidiary_id,
                          created_by,
                          creation_date
                      ) VALUES (
                          TAX_SCHEME_SEQ.NEXTVAL,
                          :AR_DESCRIPTION,
                          :EN_DESCRIPTION,
                          :SUBSIDIARY_ID,
                          :CREATED_BY,
                          sysdate
                      )
         RETURN AR_DESCRIPTION , EN_DESCRIPTION , SUBSIDIARY_ID INTO :R_AR_DESCRIPTION, :R_EN_DESCRIPTION, :R_SUBSIDIARY_ID`,
        returns: ["R_AR_DESCRIPTION", "R_EN_DESCRIPTION", "R_SUBSIDIARY_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getTaxSchemes:{
        statment :` SELECT
                          tax_scheme_id,
                          ar_description,
                          en_description,
                          subsidiary_id,
                          (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                          (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                          created_by,
                          creation_date,
                          deleted,
                          deleted_by,
                          deleted_date,
                          modified_by,
                          modified_date
                      FROM
                          tax_scheme I
                          WHERE DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    gettaxSchemeByID:{
        statment :`
        SELECT
                          tax_scheme_id,
                          ar_description,
                          en_description,
                          subsidiary_id,
                          (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                          (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                          created_by,
                          creation_date,
                          deleted,
                          deleted_by,
                          deleted_date,
                          modified_by,
                          modified_date
                      FROM
                          tax_scheme I
            WHERE TAX_SCHEME_ID =:TAX_SCHEME_ID AND DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deletetaxScheme: {
          statement: `UPDATE tax_scheme
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            TAX_SCHEME_ID = :TAX_SCHEME_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};

module.exports = statements;
