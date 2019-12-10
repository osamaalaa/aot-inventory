let statements = {
  getChartOfAccounts: {
    statement: `SELECT
                      chart_of_accounts_id,
                      subsidiary_id,
                      (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                      (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                      account_code,
                      ar_name,
                      en_name,
                      ar_description,
                      en_description,
                      sub_journals_compulsion,
                      sub_journals_id,
                      cost_center_compulsion,
                      cost_center_patterns_id,
                      account_type,
                      account_nature,
                      (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 189 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.account_nature) ACCOUNT_NAME,
                      general_chart_of_account_id,
                      parent_accounts_id,
                      tree_level,
                      tree_parent_code,
                      full_account_code,
                      status,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date
                  FROM
                      chart_of_accounts I
                      WHERE DELETED = 0
            `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
          },
          deleteChartOfAcc: {
            statement: `UPDATE CHART_OF_ACCOUNTS
                          SET deleted = 1 , deleted_by = :DELETED_BY , deleted_date = SYSDATE
                          WHERE
                              chart_of_accounts_id = :CHART_OF_ACCOUNTS_ID`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: true
          },

          insertChartOfAcc: {
            statement: `INSERT INTO chart_of_accounts (
              CHART_OF_ACCOUNTS_ID,
              SUBSIDIARY_ID,
              ACCOUNT_CODE,
              AR_NAME,
              EN_NAME,
              AR_DESCRIPTION,
              EN_DESCRIPTION,
              SUB_JOURNALS_COMPULSION,
              SUB_JOURNALS_ID,
              COST_CENTER_COMPULSION,
              COST_CENTER_PATTERNS_ID,
              ACCOUNT_TYPE,
              ACCOUNT_NATURE,
              GENERAL_CHART_OF_ACCOUNT_ID,
              PARENT_ACCOUNTS_ID,
              TREE_LEVEL,
              TREE_PARENT_CODE,
              FULL_ACCOUNT_CODE,
              STATUS,
              CREATED_BY) 
              values (
                CHART_OF_ACCOUNTS_SEQ.NEXTVAL,
                :SUBSIDIARY_ID,
                :ACCOUNT_CODE,
                :AR_NAME,
                :EN_NAME,
                :AR_DESCRIPTION,
                :EN_DESCRIPTION,
                :SUB_JOURNALS_COMPULSION,
                :SUB_JOURNALS_ID,
                :COST_CENTER_COMPULSION,
                :COST_CENTER_PATTERNS_ID,
                :ACCOUNT_TYPE,
                :ACCOUNT_NATURE,
                :GENERAL_CHART_OF_ACCOUNT_ID,
                :PARENT_ACCOUNTS_ID,
                :TREE_LEVEL,
                :TREE_PARENT_CODE,
                :FULL_ACCOUNT_CODE,
                :STATUS,
                :CREATED_BY
              )`,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: true
          },
          getOneCharOfAccount: {
            statement: `SELECT
                              chart_of_accounts_id,
                              subsidiary_id,
                              (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                              (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                              account_code,
                              ar_name,
                              en_name,
                              ar_description,
                              en_description,
                              sub_journals_compulsion,
                              sub_journals_id,
                              cost_center_compulsion,
                              cost_center_patterns_id,
                              account_type,
                              account_nature,
                              (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 189 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.account_nature) ACCOUNT_NAME,
                              general_chart_of_account_id,
                              parent_accounts_id,
                              tree_level,
                              tree_parent_code,
                              full_account_code,
                              status,
                              created_by,
                              creation_date,
                              deleted,
                              deleted_by,
                              deleted_date
                          FROM
                              chart_of_accounts I
                              WHERE DELETED = 0 AND STATUS = 1
                              and CHART_OF_ACCOUNTS_ID = :CHART_OF_ACCOUNTS_ID
                    `,
                    returns: [],
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                  },
          updateExitChartOfAcc: {
            statement: `UPDATE chart_of_accounts
                                  SET
                                      a = b
                                  WHERE
                                      chart_of_accounts_id = :R_CHART_OF_ACCOUNTS_ID
                                      AND subsidiary_id = :R_SUBSIDIARY_ID
                                      AND account_code = :R_ACCOUNT_CODE
                                      AND ar_name = :R_AR_NAME
                                      AND en_name = :R_EN_NAME
                                      AND ar_description = :R_AR_DESCRIPTION
                                      AND en_description = :R_EN_DESCRIPTION
                                      AND sub_journals_compulsion = :R_SUB_JOURNALS_COMPULSION
                                      AND sub_journals_id = :R_SUB_JOURNALS_ID
                                      AND cost_center_compulsion = :R_COST_CENTER_COMPULSION
                                      AND cost_center_patterns_id = :R_COST_PATTERNS_ID
                                      AND account_type = :R_ACCOUNT_TYPE
                                      AND account_nature = :R_ACCOUNT_NATURE
                                      AND general_chart_of_account_id = :R_GENERAL_CHART_OF_ACCOUNT_ID
                                      AND parent_accounts_id = :R_PARENT_ACCOUNTS_ID
                                      AND tree_level = :R_TREE_LEVEL
                                      AND tree_parent_code = :R_TREE_PARENT_CODE
                                      AND full_account_code = :R_FULL_ACCOUNT_CODE
                                      AND status = :R_STATUS
                                      AND created_by = :R_CREATED_BY
                                      AND creation_date = SYSDATE
              RETURN chart_of_accounts_id , account_code INTO :R_CHART_OF_ACCOUNTS_ID , :R_aCCOUNT_CODE`,
              returns: ["R_CHART_OF_ACCOUNTS_ID , R_aCCOUNT_CODE"],
              bindings: [],
              qstring: "",
              requireCommit: true
                    }

}
module.exports = statements;
