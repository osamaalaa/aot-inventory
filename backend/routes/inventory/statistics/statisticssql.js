let statements = {
    
    // get ITEM last transaction date
    getItemLastTranactionDate:{
        statment:`
        select max(creation_date) "Last_Transaction" from inv_transactions_items
        where items_id = :ITEMS_ID `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },

    // last transaction in which storehouse
    getLastTransactionWarehouse:{
        statment:`
        select *
        from storehouses
        where creation_date = (select max(creation_date)  from inv_transactions_items where items_id = :ITEMS_ID) `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },


       //total Balance
       getTotalBalance:{
            statment:`
            select count(*) "Total_Balance" from items_balance
            where items_id = :ITEMS_ID `,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
            },


            //top 5 suppliers
    getTopFiveSuppliers:{
        statment:`
        select * from items_suppliers
        where rownum < 6 
        AND items_id = :ITEMS_ID
        order by rownum   desc `,
            bindings: [],
            qstring: "",
            requireCommit: false
       },


      //total no of transactions in last week
      getTotalNoOfTransactionInLastWeek:{
            statment:`
            select count(*)  "Transactions_in_last_week"   from inv_transactions_items
            where creation_date >= (sysdate - 7 )
            AND items_id = :ITEMS_ID `,
                bindings: [],
                qstring: "",
                requireCommit: false
       },

      //total no of transactions in last Month
      getTotalNoOfTransactionInLastMonth:{
            statment:`
            select count(*) "Transactions_in_last_month" from inv_transactions_items
            where creation_date >= (sysdate - 30 )
            AND ITEMS_ID = :ITEMS_ID `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

        //total no of transactions in last Year
        getTotalNoOfTransactionInLastYear:{
            statment:`
            select count(*) "Transactions_in_last_Year" from inv_transactions_items
            where creation_date >= (sysdate - 365 )
            AND ITEMS_ID = :ITEMS_ID `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },
        

        // monthly no of transactions related to the item for the current year --> each month : No of transactions
        getMonthlyTransactionsOfCurrentYear:{
            statment:`
            select  count(*) "Number_Of_Transactions", round(count(*)*100/12) "Number_Of_Transactions_PER", to_char(creation_date,'MONTH') MONTH
            from inv_transactions_items
            where to_char(creation_date,'YYYY') = to_char(sysdate,'YYYY')
            AND items_id = :ITEMS_ID
            group by to_char(creation_date,'MONTH') 
            order by round(count(*)*100/12) desc`,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

        /////////////////////////////////////
        // No of transactions in last day by user
        getTransactionsNoInLastDay:{
            statment:`
            select count(*) "Transactions_Number"
            from inv_transactions 
            where created_by = :CREATED_BY
            AND to_char(creation_date, 'dd')  = to_char((sysdate -1), 'dd') `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

        // No of transactions in last week by user
        getTransactionsNoInLastWeek:{
            statment:`
            select count(*) "Transactions_Number"
            from inv_transactions 
            where created_by = :CREATED_BY
            AND creation_date >= (sysdate -7) `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

        // No of transactions in last month by user
        getTransactionsNoInLastMonth:{
            statment:`
            select count(*)  "Transactions_Number"
            from inv_transactions 
            where created_by = :CREATED_BY
            AND creation_date >= (sysdate -30) `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

        // top 5 items has been enerted in transactions in last day
        getTopFiveItemsTransLastDay:{
            statment:`
            select * from
            (select items_id, count(items_id) count_of_items
            from inv_transactions_items
            where to_char(creation_date, 'dd')  = to_char((sysdate -1), 'dd')
            group by items_id
            order by items_id desc 
            )
            where rownum <=5  `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

         // top 5 items has been enerted in transactions in last week
         getTopFiveItemsTransLastWeek:{
            statment:`
            select * from
            (select items_id, count(items_id) count_of_items
            from inv_transactions_items
            where  creation_date >= (sysdate -7)
            group by items_id
            order by items_id desc 
            )
            where rownum <=5  `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

         // top 5 items has been enerted in transactions in last month
         getTopFiveItemsTransLastMonth:{
            statment:`
            select * from
            (select items_id, count(items_id) count_of_items
            from inv_transactions_items
            where  creation_date >= (sysdate -30)
            group by items_id
            order by items_id desc 
            )
            where rownum <=5 `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

        // Last transaction date by user
        getLastTransactionDateByUser:{
            statment:`
            select max(creation_date) "Last_Transaction_date"
            from inv_transactions
            where created_by = :CREATED_BY  `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

        // top 5 users who entered transactions in last day
        getTopFiveUsersTransLastDay:{
            statment:`
            select created_by "user" from
            (select created_by, count(created_by)
            from inv_transactions
            where to_char(creation_date, 'dd')  = to_char((sysdate -1), 'dd')
            group by created_by
            order by created_by desc 
            )
            where rownum <=5  `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

         // top 5 users who entered transactions in last week
         getTopFiveUsersTransLastWeek:{
            statment:`
            select created_by "user" from
            (select created_by, count(created_by)
            from inv_transactions
            where  creation_date >= (sysdate -7)
            group by created_by
            order by created_by desc 
            )
            where rownum <=5  `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

         // top 5 users who entered transactions in last month
         getTopFiveUsersTransLastMonth:{
            statment:`
            select created_by "user" from
            (select created_by, count(created_by)
            from inv_transactions
            where  creation_date >= (sysdate -30)
            group by created_by
            order by created_by desc 
            )
            where rownum <=5  `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },

  // top 5 storehouse which contains transactions for one one user
        getTopFiveStoreHouses:{
            statment:`
            select *
            from storehouses
            where store_id in ( select stores_id from (
            select count(stores_id) Ranking, stores_id, created_by 
            from inv_transactions
            group by stores_id, created_by
            order by count (stores_id) desc)
            where rownum <= 5
             ) `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },
        getlastFiveTransactions:{
            statment:`
            select INV_TRANSACTIONS_ID,
                            INVENTORY_PERIODS_ID,
                            STORES_ID, 
                            DOCUMENT_ID,
                                DOCUMENT_TYPE_ID,
                                TRANSACTION_DATE, 
                            REAL_TRANSACTION,
                                REAL_TRANSACTION_DATE,
                                SUBSIDIARY_ID, 
                            CREATED_BY,
                                CREATION_DATE,
                                DELETED, 
                            DELETED_BY,
                                DELETED_DATE,
                                MODIFIED_BY, 
                            MODIFIED_DATE
                            from INV_TRANSACTIONS
                            order by TRANSACTION_DATE desc
                            FETCH FIRST 5 ROWS ONLY `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },
        
        getitemSuppliers:{
            statment:`
            SELECT 
                    ITEMS_SUPPLIERS_ID,
                    ITEMS_ID, 
                    SUPPLIER_ID, 
                    SUPPLIER_ITEM_CODE, 
                    ITEM_COST, 
                    UNITS_ID, 
                    CREATED_BY, 
                    CREATION_DATE
                    FROM INVENTORY.ITEMS_SUPPLIERS
                    WHERE DELETED = 0 `,
                    
                bindings: [],
                qstring: "",
                requireCommit: false
        },
        getsAllCosts:{
            statment:`
            SELECT COALESCE(SUM(ITEM_COST ),0) COSTS_OF_ITEM
            FROM INVENTORY.ITEMS_SUPPLIERS
            WHERE DELETED = 0 `,
                bindings: [],
                qstring: "",
                requireCommit: false
        },
        getinvperiodsSById:{
            statment:`
            SELECT 
                INVENTORY_PERIODS_ID,
                EN_NAME,
                (( END_DATE - START_DATE ) + 1) PERIODS 
            FROM INVENTORY.INVENTORY_PERIODS 
            WHERE DELETED = 0 AND INVENTORY_PERIODS_ID = :INVENTORY_PERIODS_ID `,
                bindings: [],
                qstring: "",
                requireCommit: false
            },
            getinvperiodsS:{
                statment:`
                SELECT 
                INVENTORY_PERIODS_ID,
                 EN_NAME,
                 (( END_DATE - START_DATE ) + 1) PERIODS 
                    FROM INVENTORY.INVENTORY_PERIODS 
                    WHERE DELETED = 0 `,
                    bindings: [],
                    qstring: "",
                    requireCommit: false
                }





    };

    

    

module.exports = statements;
