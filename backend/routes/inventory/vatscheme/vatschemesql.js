let statements = {

    insertScheme: {
        statement: `
                        INSERT INTO vat_scheme (
                        vat_scheme_id,
                        ar_description,
                        en_description,
                        vat_special_percntage,
                        vat_taxable,
                        vat_percntage,
                        created_by,
                        creation_date
                        ) VALUES (
                        VAT_SCHEME_SEQ.NEXTVAL,
                        :AR_DESCRIPTION,
                        :EN_DESCRIPTION,
                        :VAT_SPECIAL_PERCNTAGE,
                        :VAT_TAXABLE,
                        :VAT_PERCNTAGE,
                        :CREATED_BY,
                        SYSDATE
                        )
         RETURN AR_DESCRIPTION , EN_DESCRIPTION INTO :R_AR_DESCRIPTION, :R_EN_DESCRIPTION`,
        returns: ["R_AR_DESCRIPTION", "R_EN_DESCRIPTION"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getScheme:{
        statment:` SELECT
                        vat_scheme_id,
                        ar_description,
                        en_description,
                        vat_special_percntage,
                        vat_taxable,
                        vat_percntage,
                        created_by,
                        creation_date,
                        deleted,
                        deleted_by,
                        deleted_date
                    FROM
                        vat_scheme`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },

    getSchemeByID:{
        statment :`
                  SELECT
                       vat_scheme_id,
                       ar_description,
                       en_description,
                       vat_special_percntage,
                       vat_taxable,
                       vat_percntage,
                       created_by,
                       creation_date,
                       deleted,
                       deleted_by,
                       deleted_date
                   FROM
                       vat_scheme
            WHERE vat_scheme_id =:VAT_SCHEME_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        
        deleteScheme: {
          statement: `UPDATE VAT_SCHEME
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            vat_scheme_id = :VAT_SCHEME_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};
module.exports = statements;
