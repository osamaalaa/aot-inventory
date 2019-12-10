let statements = {
    insertnewStores: {
        statement: `
        INSERT INTO INVENTORY.STORES (
                STORES_ID,
                STORES_CODE, 
                AR_NAME, 
                EN_NAME,
                PARENT_STORES_ID,
                STORE_TYPE, 
                ISSUE_POLICY,
                PROFIT_MARGIN, 
                SUBSIDIARY_ID, 
                COST_METHOD,
                PICKING_RULE_ID,
                MATERIAL_ACCOUNT, 
                MATERIAL_OVERHEAD_ACCOUNT, 
                MATL_OVHD_ABSORPTION_ACCT,
                RESOURCE_ACCOUNT, 
                PURCHASE_PRICE_VAR_ACCOUNT, 
                AP_ACCRUAL_ACCOUNT, 
                OVERHEAD_ACCOUNT, 
                OUTSIDE_PROCESSING_ACCOUNT,
                INTRANSIT_INV_ACCOUNT,
                INTERORG_RECEIVABLES_ACCOUNT, 
                INTERORG_PRICE_VAR_ACCOUNT, 
                INTERORG_PAYABLES_ACCOUNT,
                COST_OF_SALES_ACCOUNT, 
                ENCUMBRANCE_ACCOUNT, 
                PROJECT_COST_ACCOUNT,
                INTERORG_TRANSFER_CR_ACCOUNT, 
                INVOICE_PRICE_VAR_ACCOUNT,
                AVERAGE_COST_VAR_ACCOUNT, 
                SALES_ACCOUNT, 
                EXPENSE_ACCOUNT, 
                BORRPAY_MATL_VAR_ACCOUNT,
                BORRPAY_MOH_VAR_ACCOUNT, 
                BORRPAY_RES_VAR_ACCOUNT,
                BORRPAY_OSP_VAR_ACCOUNT,
                BORRPAY_OVH_VAR_ACCOUNT, 
                DEFERRED_COGS_ACCOUNT,
                CREATED_BY, 
                CREATION_DATE, 
                DELETED,
                STORE_KEEPER) 
         VALUES (
             STORES_SEQ.NEXTVAL,
             :STORES_CODE, 
             :AR_NAME, 
             :EN_NAME,
             :PARENT_STORES_ID,
              :STORE_TYPE, 
             :ISSUE_POLICY,
             :PROFIT_MARGIN, 
             :SUBSIDIARY_ID, 
             :COST_METHOD,
             :PICKING_RULE_ID,
              :MATERIAL_ACCOUNT, 
            :MATERIAL_OVERHEAD_ACCOUNT, 
            :MATL_OVHD_ABSORPTION_ACCT,
             :RESOURCE_ACCOUNT, 
            :PURCHASE_PRICE_VAR_ACCOUNT, 
            :AP_ACCRUAL_ACCOUNT, 
            :OVERHEAD_ACCOUNT, 
            :OUTSIDE_PROCESSING_ACCOUNT,
             :INTRANSIT_INV_ACCOUNT,
              :INTERORG_RECEIVABLES_ACCOUNT, 
            :INTERORG_PRICE_VAR_ACCOUNT, 
            :INTERORG_PAYABLES_ACCOUNT,
             :COST_OF_SALES_ACCOUNT, 
            :ENCUMBRANCE_ACCOUNT, 
            :PROJECT_COST_ACCOUNT,
             :INTERORG_TRANSFER_CR_ACCOUNT, 
            :INVOICE_PRICE_VAR_ACCOUNT,
             :AVERAGE_COST_VAR_ACCOUNT, 
             :SALES_ACCOUNT, 
            :EXPENSE_ACCOUNT, 
            :BORRPAY_MATL_VAR_ACCOUNT,
             :BORRPAY_MOH_VAR_ACCOUNT, 
            :BORRPAY_RES_VAR_ACCOUNT,
             :BORRPAY_OSP_VAR_ACCOUNT,
              :BORRPAY_OVH_VAR_ACCOUNT, 
            :DEFERRED_COGS_ACCOUNT,
             :CREATED_BY, 
             SYSDATE, 
             0,
            :STORE_KEEPER )
         RETURN STORES_CODE , AR_NAME , EN_NAME  , STORE_TYPE , STORE_KEEPER INTO :R_STORES_CODE, :R_AR_NAME, :R_EN_NAME , :R_STORE_TYPE , :R_STORE_KEEPER`,
        returns: ["R_STORES_CODE", "R_AR_NAME", "R_EN_NAME" , "R_STORE_TYPE" , "R_STORE_KEEPER"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    selectAllstores:{
        statment:` SELECT
                      stores_id,
                      stores_code,
                      ar_name,
                      en_name,
                      parent_stores_id,
                      (SELECT AR_NAME  FROM stores PS WHERE PS.stores_id = I.parent_stores_id) PARENT_STORE_AR_NAME,
                      (SELECT EN_NAME  FROM stores PS WHERE PS.stores_id = I.parent_stores_id) PARENT_STORE_EN_NAME,
                      store_type,
                      issue_policy,
                      profit_margin,
                      subsidiary_id,
                      (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_AR_NAME,
                      (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_EN_NAME,
                      cost_method,
                      (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.COST_METHOD ) UNITS_NAME,
                      picking_rule_id,
                      material_account,
                      material_overhead_account,
                      matl_ovhd_absorption_acct,
                      resource_account,
                      purchase_price_var_account,
                      ap_accrual_account,
                      overhead_account,
                      outside_processing_account,
                      intransit_inv_account,
                      interorg_receivables_account,
                      interorg_price_var_account,
                      interorg_payables_account,
                      cost_of_sales_account,
                      encumbrance_account,
                      project_cost_account,
                      interorg_transfer_cr_account,
                      invoice_price_var_account,
                      average_cost_var_account,
                      sales_account,
                      (SELECT AR_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_AR_NAME,
                      (SELECT EN_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_EN_NAME,
                      expense_account,
                      borrpay_matl_var_account,
                      borrpay_moh_var_account,
                      borrpay_res_var_account,
                      borrpay_osp_var_account,
                      borrpay_ovh_var_account,
                      deferred_cogs_account,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date,
                      STORE_KEEPER,
                      (SELECT FIRST_NAME || ' ' || SECOND_NAME || ' ' || LAST_NAME  FROM HR.employees C WHERE C.EMPLOYEE_ID = I.STORE_KEEPER) EMPLOYEE_NAME

                  FROM
                      stores I
                      WHERE I.DELETED = 0 
                  ORDER BY stores_id desc`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },   

        selectStoreBalance:{
        statment:` 
        select
             IBU.ITEMS_ID,
             IBU.UNITS_ID, 
               (select EN_NAME from INVENTORY.ITEMS I where I.ITEMS_ID = IBU.ITEMS_ID) ITEM_EN_NAME,
               (select AR_NAME from INVENTORY.ITEMS I where I.ITEMS_ID = IBU.ITEMS_ID) ITEM_AR_NAME,
               (select ITEM_CODE from INVENTORY.ITEMS I where I.ITEMS_ID = IBU.ITEMS_ID) ITEM_CODE,
               (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 125 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = IBU.UNITS_ID) UNITS_NAME,

             IBU.CURRENT_BALANCE,
             IBU.CURRENT_BALANCE*NVL((
             SELECT
                NVL(IU.UNIT_FACTOR, 1) 
             FROM
                ITEMS_UNITS IU 
             WHERE
                IU.ITEMS_ID = IBU.ITEMS_ID 
                AND IBU.UNITS_ID = IU.UNITS_ID ), 1) DEFAULT_UNIT_QUANTITY 
             FROM
                SHORTAGE_POLICY SP,
                ITEMS IT,
                ITEMS_BALANCE IB,
                ITEMS_BALANCE_UNITS IBU 
             WHERE
                SP.SHORTAGE_POLICY_ID = IT.SHORTAGE_POLICY_ID 
                AND SP.MIN_QUANTITY <= IB.CURRENT_BALANCE 
                AND IB.ITEMS_BALANCE_ID = IBU.ITEMS_BALANCE_ID 
                AND IB.STORES_ID = :STORES_ID 
                AND IB.ITEMS_ID = IT.ITEMS_ID 
             ORDER BY
                IBU.ITEMS_ID,
                IBU.UNITS_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    selectOnestores:{
        statment:`
        SELECT
                      stores_id,
                      stores_code,
                      ar_name,
                      en_name,
                      parent_stores_id,
                      store_type,
                      issue_policy,
                      profit_margin,
                      subsidiary_id,
                      (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_AR_NAME,
                      (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_EN_NAME,
                      cost_method,
                      (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.COST_METHOD ) UNITS_NAME,
                      picking_rule_id,
                      material_account,
                      material_overhead_account,
                      matl_ovhd_absorption_acct,
                      resource_account,
                      purchase_price_var_account,
                      ap_accrual_account,
                      overhead_account,
                      outside_processing_account,
                      intransit_inv_account,
                      interorg_receivables_account,
                      interorg_price_var_account,
                      interorg_payables_account,
                      cost_of_sales_account,
                      encumbrance_account,
                      project_cost_account,
                      interorg_transfer_cr_account,
                      invoice_price_var_account,
                      average_cost_var_account,
                      sales_account,
                      (SELECT AR_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_AR_NAME,
                      (SELECT EN_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_EN_NAME,
                      expense_account,
                      borrpay_matl_var_account,
                      borrpay_moh_var_account,
                      borrpay_res_var_account,
                      borrpay_osp_var_account,
                      borrpay_ovh_var_account,
                      deferred_cogs_account,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date, 
                      STORE_KEEPER
                  FROM
                      stores I
                      WHERE DELETED = 0
                        AND stores_id =:STORES_ID  AND I.store_type != 4`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteStores: {
          statement: `UPDATE STORES
                        SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                        WHERE
                            stores_id = :STORES_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        },
        SearchingForStoresByName:{
            statment:`
            SELECT 
                STORES_ID, STORES_CODE, AR_NAME, 
                EN_NAME, PARENT_STORES_ID,

                 STORE_TYPE,
                ISSUE_POLICY, PROFIT_MARGIN, SUBSIDIARY_ID,
                STATUS
                FROM INVENTORY.STORES  
                WHERE DELETED = 0 AND upper (EN_NAME)  LIKE (upper(:EN_NAME) ||'%' )
                             AND store_type != 4`,
                bindings: [],
                qstring: "",
                requireCommit: false
            },
            SearchingForStoresByARName:{
                statment:`
                SELECT 
                STORES_ID, STORES_CODE, AR_NAME, 
                EN_NAME, PARENT_STORES_ID,

                 STORE_TYPE,
                ISSUE_POLICY, PROFIT_MARGIN, SUBSIDIARY_ID,
                STATUS
                FROM INVENTORY.STORES  
                WHERE DELETED = 0 AND  (AR_NAME)  LIKE ((:AR_NAME) ||'%')
                             -- AND store_type != 4`,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                }, STORE_ITEM_BALANCE: {
            statement: `
                         select STORE_ITEM_BALANCE(:P_ITEM_ID  , :P_UNIT_ID , :P_STORE_ID ) StoreItemBalance
                            from dual`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: true
          }
};

module.exports = statements;
