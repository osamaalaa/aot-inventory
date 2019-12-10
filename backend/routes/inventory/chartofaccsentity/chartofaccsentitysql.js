let statements = {
    getChartOfAccountsEntity: {
      statement: `SELECT 
                        CHART_OF_ACCOUNTS_ID,
                        SUB_JOURNALS_COMPULSION,
                            SUBSIDIARY_ID, 
                            STATUS
                        FROM INVENTORY."chart_of_accounts_entity"
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
            },

            insertChartOfAccEntity: {
              statement: `INSERT INTO "chart_of_accounts_entity" (
                CHART_OF_ACCOUNTS_ID,
                 SUB_JOURNALS_COMPULSION,
                  SUBSIDIARY_ID, 
                STATUS) 
                    VALUES ( 
                                :CHART_OF_ACCOUNTS_ID,
                                :SUB_JOURNALS_COMPULSION,
                                :SUBSIDIARY_ID,
                                :STATUS
                           )
                RETURN CHART_OF_ACCOUNTS_ID  , SUB_JOURNALS_COMPULSION , SUBSIDIARY_ID, STATUS INTO :R_CHART_OF_ACCOUNTS_ID , :R_SUB_JOURNALS_COMPULSION, :R_SUBSIDIARY_ID , :R_STATUS`,
                returns: ["R_CHART_OF_ACCOUNTS_ID", "R_SUB_JOURNALS_COMPULSION", "R_SUBSIDIARY_ID","R_STATUS" ],
                bindings: [],
                qstring: "",
                requireCommit: true
            },
            getOneCharOfAccountEntity: {
              statement: `SELECT 
                                CHART_OF_ACCOUNTS_ID,
                                SUB_JOURNALS_COMPULSION,
                                    SUBSIDIARY_ID, 
                                    STATUS
                                FROM INVENTORY."chart_of_accounts_entity"
                                WHERE CHART_OF_ACCOUNTS_ID = :CHART_OF_ACCOUNTS_ID
                      `,
                      returns: [],
                      bindings: [],
                      qstring: "",
                      requireCommit: false
                    }
  
  }
  module.exports = statements;
  