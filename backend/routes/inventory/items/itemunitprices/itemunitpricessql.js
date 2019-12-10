let statements = {
    insertItemUnitPrices:
    {
        statement: `
        INSERT INTO INVENTORY.ITEMS_UNITS_PRICES (
            ITEMS_UNITS_PRICES_ID,
             ITEMS_UNITS_ID,
            CURRENCY_ID, 
            ITEM_PRICE, 
            CREATED_BY, 
            CREATION_DATE,
            DELETED
             ) 
         VALUES (
            ITEMS_UNITS_PRICES_SEQ.NEXTVAL,
            :ITEMS_UNITS_ID,
            :CURRENCY_ID,
            :ITEM_PRICE,
            :CREATED_BY,
            SYSDATE,
            0
          )
                   RETURN ITEMS_UNITS_PRICES_ID, ITEMS_UNITS_ID  ,CURRENCY_ID ,  ITEM_PRICE ,CREATED_BY , CREATION_DATE INTO :R_ITEMS_UNITS_PRICES_ID, :R_ITEMS_UNITS_ID, :R_CURRENCY_ID , :R_ITEM_PRICE , :R_CREATED_BY , 
                   :R_CREATION_DATE`,
        returns: ["R_ITEMS_UNITS_PRICES_ID" , "R_ITEMS_UNITS_ID", "R_CURRENCY_ID" , "R_ITEM_PRICE","R_CREATED_BY","R_CREATION_DATE"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getAllItemUnitPrices:{
        statment:`SELECT 
                        I.ITEMS_UNITS_PRICES_ID,
                        I.ITEMS_UNITS_ID, 
                        (select ITEMS_ID from INVENTORY.ITEMS_UNITS U where U.ITEMS_UNITS_ID = I.ITEMS_UNITS_ID) ITEMS_ID,
                    (select UNITS_ID from INVENTORY.ITEMS_UNITS U where U.ITEMS_UNITS_ID = I.ITEMS_UNITS_ID) UNITS_ID,
                    I.CURRENCY_ID, 
                    (select AR_NAME from AOT_GEN.CURRENCIES C where C.CURRENCY_ID = I.CURRENCY_ID) CURRENCY_AR_NAME,
                    (select EN_NAME from AOT_GEN.CURRENCIES C where C.CURRENCY_ID = I.CURRENCY_ID) GROUP_EN_NAME,
                    I.ITEM_PRICE,
                    I.CREATED_BY, 
                    I.CREATION_DATE
                    FROM INVENTORY.ITEMS_UNITS_PRICES I
                    WHERE I.DELETED = 0`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getOneItemUnitPrices:{
        statment:`SELECT 
                     I.ITEMS_UNITS_PRICES_ID,
                     I.ITEMS_UNITS_ID, 
                     (select ITEMS_ID from INVENTORY.ITEMS_UNITS U where U.ITEMS_UNITS_ID = I.ITEMS_UNITS_ID) ITEMS_ID,
                    (select UNITS_ID from INVENTORY.ITEMS_UNITS U where U.ITEMS_UNITS_ID = I.ITEMS_UNITS_ID) UNITS_ID,
                    I.CURRENCY_ID, 
                    (select AR_NAME from AOT_GEN.CURRENCIES C where C.CURRENCY_ID = I.CURRENCY_ID) CURRENCY_AR_NAME,
                    (select EN_NAME from AOT_GEN.CURRENCIES C where C.CURRENCY_ID = I.CURRENCY_ID) GROUP_EN_NAME,
                    I.ITEM_PRICE,
                    I.CREATED_BY, 
                    I.CREATION_DATE
                    FROM INVENTORY.ITEMS_UNITS_PRICES I
                    WHERE I.DELETED = 0
                     AND I.ITEMS_UNITS_PRICES_ID=:ITEMS_UNITS_PRICES_ID`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteItemUnitPrices: {
            statement: `UPDATE ITEMS_UNITS_PRICES
                          SET deleted = 1 ,   deleted_date = sysdate
                          WHERE
                          ITEMS_UNITS_PRICES_ID = :ITEMS_UNITS_PRICES_ID`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: true
          },
        UPDATEITEMPRICES:{
            statement: `UPDATE ITEMS_UNITS_PRICES

                 ITEMS_UNITS_ID       =:ITEMS_UNITS_ID,
                 CURRENCY_ID          =:CURRENCY_ID,
                 ITEM_PRICE             =:ITEM_PRICE,
                 CREATED_BY   =:CREATED_BY,
                 MODIFIED_BY =:MODIFIED_BY,
                 MODIFIED_DATE = sysdate
                            WHERE
                            ITEMS_UNITS_PRICES_ID = :ITEMS_UNITS_PRICES_ID`,
returns: [],
bindings: [],
qstring: "",
requireCommit: true
        }
};



module.exports = statements;
