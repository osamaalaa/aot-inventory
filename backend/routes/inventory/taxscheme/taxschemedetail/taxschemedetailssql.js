let statements = {
    inserttaxSchemeDetail: {
        statement: `
        INSERT INTO tax_scheme_detail (
                  tax_scheme_detail_id,
                  tax_scheme_id,
                  ar_description,
                  en_description,
                  tax_type_id,
                  tax_taxable,
                  auto_calc,
                  mandatory_tax,
                  user_changeable,
                  tax_value_type,
                  tax_value_type_value,
                  chart_of_accounts_id,
                  created_by,
                  creation_date
              ) VALUES (
                  TAX_SCHEME_DETAIL_SEQ.NEXTVAL,
                  :TAX_SCHEME_ID,
                  :AR_DESCRIPTION,
                  :EN_DESCRIPTION,
                  :TAX_TYPE_ID,
                  :TAX_TAXABLE,
                  :AUTO_CALC,
                  :MANDATORY_TAX,
                  :USER_CHANGEABLE,
                  :TAX_VALUE_TYPE,
                  :TAX_VALUE_TYPE_VALUE,
                  :CHART_OF_ACCOUNTS_ID,
                  :CREATED_BY,
                  sysdate
              )
         RETURN TAX_SCHEME_ID , AR_DESCRIPTION , EN_DESCRIPTION INTO :R_TAX_SCHEME_ID, :R_AR_DESCRIPTION, :R_EN_DESCRIPTION`,
        returns: ["R_TAX_SCHEME_ID", "R_AR_DESCRIPTION", "R_EN_DESCRIPTION"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getTaxSchemesDetails:{
        statment :`   SELECT
                tax_scheme_detail_id,
                tax_scheme_id,
                ar_description,
                en_description,
                tax_type_id,
                (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.ALIASES_TYPE_ID ) TAX_NAME,
                tax_taxable,
                auto_calc,
                mandatory_tax,
                user_changeable,
                tax_value_type,
                tax_value_type_value,
                chart_of_accounts_id,
                (SELECT AR_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.chart_of_accounts_id) CHART_OF_ACCOUNTS_AR_NAME,
                (SELECT EN_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.chart_of_accounts_id) CHART_OF_ACCOUNTS_EN_NAME,
                created_by,
                creation_date,
                deleted,
                deleted_by,
                deleted_date,
                modified_by,
                modified_date
            FROM
                tax_scheme_detail I
                      WHERE DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    gettaxSchemeDetailByID:{
        statment :`
              SELECT
                tax_scheme_detail_id,
                tax_scheme_id,
                ar_description,
                en_description,
                tax_type_id,
                (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.tax_type_id ) TAX_NAME,
                tax_taxable,
                auto_calc,
                mandatory_tax,
                user_changeable,
                tax_value_type,
                tax_value_type_value,
                chart_of_accounts_id,
                (SELECT AR_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.chart_of_accounts_id) CHART_OF_ACCOUNTS_AR_NAME,
                (SELECT EN_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.chart_of_accounts_id) CHART_OF_ACCOUNTS_EN_NAME,
                created_by,
                creation_date,
                deleted,
                deleted_by,
                deleted_date,
                modified_by,
                modified_date
            FROM
                tax_scheme_detail I
            WHERE TAX_SCHEME_DETAIL_ID =:TAX_SCHEME_DETAIL_ID AND DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        gettaxSchemeDetailByTaxSchemaID:{
        statment :`
        select 
        tax_scheme_detail_id,
        tax_scheme_id,
        ar_description,
        en_description,
        tax_type_id,
        (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.tax_type_id ) TAX_NAME,
        tax_taxable,
        auto_calc,
        mandatory_tax,
        user_changeable,
        tax_value_type,
        tax_value_type_value,
        chart_of_accounts_id,
        (SELECT AR_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.chart_of_accounts_id) CHART_OF_ACCOUNTS_AR_NAME,
        (SELECT EN_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.chart_of_accounts_id) CHART_OF_ACCOUNTS_EN_NAME,
        created_by,
        creation_date,
        deleted,
        deleted_by,
        deleted_date,
        modified_by,
        modified_date
    FROM
        tax_scheme_detail I
    WHERE TAX_SCHEME_ID =:TAX_SCHEME_ID AND DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deletetaxSchemeDetail: {
          statement: `UPDATE tax_scheme_detail
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            TAX_SCHEME_DETAIL_ID = :TAX_SCHEME_DETAIL_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
};

module.exports = statements;
