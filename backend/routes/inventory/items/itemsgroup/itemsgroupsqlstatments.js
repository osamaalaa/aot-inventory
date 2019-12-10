let statements = {
    insertNewGroup: {
        statement: `INSERT INTO items_group (
    items_group_id,
    items_group_code,
    ar_name,
    en_name,
    parent_items_group_id,
    subsidiary_id,
    item_class,
    cost_method,
    profit_margin,
    tree_level,
    brand_id,
    status,
    tax_scheme_id,
    shortage_policy_id,
    slow_policy_id,
    created_by,
    creation_date)
VALUES (ITEMS_GROUP_SEQ.NEXTVAL,
            :ITEMS_GROUP_CODE,
            :AR_NAME,
            :EN_NAME,
            :PARENT_ITEMS_GROUP_ID,
            :SUBSIDIARY_ID,
            :ITEM_CLASS,
            :COST_METHOD,
            :PROFIT_MARGIN,
            :TREE_LEVEL,
            :BRAND_ID,
            :STATUS,
            :TAX_SCHEME_ID,
            :SHORTAGE_POLICY_ID,
            :SLOW_POLICY_ID,
            :CREATED_BY,
            sysdate)
         RETURN  AR_NAME, EN_NAME ,ITEMS_GROUP_ID INTO  :R_AR_NAME, :R_EN_NAME , :R_ITEMS_GROUP_ID`,
        returns: [ "R_AR_NAME", "R_EN_NAME" ,"R_ITEMS_GROUP_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
selectAllItemsGropus:{
    statment:`SELECT
                    items_group_id,
                    items_group_code,
                    ar_name,
                    en_name,
                    parent_items_group_id,
                    subsidiary_id,
                    (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                    (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                    item_class,
                   (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 189 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.item_class) ITEM_CLASS_NAME,
                    cost_method,
                    profit_margin,
                    tree_level,
                    brand_id,
                    status,
                    tax_scheme_id,
                    shortage_policy_id,
                    slow_policy_id,
                    created_by,
                    creation_date,
                    deleted
                FROM
                    items_group I
                  WHERE deleted = 0  `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    selectOneItemsGroup:{
        statment:`SELECT
                        items_group_id,
                        items_group_code,
                        ar_name,
                        en_name,
                        parent_items_group_id,
                        subsidiary_id,
                        (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                        (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                        item_class,
                       (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 189 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.item_class) ITEM_CLASS_NAME,
                        cost_method,
                        profit_margin,
                        tree_level,
                        brand_id,
                        status,
                        tax_scheme_id,
                        shortage_policy_id,
                        slow_policy_id,
                        created_by,
                        creation_date,
                        deleted
                    FROM
                        items_group I
    WHERE ITEMS_GROUP_ID=:ITEMS_GROUP_ID AND deleted = 0 AND STATUS = 1`,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteItemGroup: {
            statement: `UPDATE items_group
                          SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                          WHERE
                              ITEMS_GROUP_ID = :ITEMS_GROUP_ID`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: true
          }
};

module.exports = statements;
