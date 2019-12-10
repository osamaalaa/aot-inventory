let statements = {
  getallitemTemplate: {
    statement: `
    select items_template_id,
        (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 189 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.ITEM_KIND) KIND_NAME,
        ar_name,
        en_name,
        ar_description,
        en_description,
        items_group_id,
        item_kind,
        item_class,
        item_nature,
        balance_nature,
        number_of_units,
        subsidiary_id,
        (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_AR_NAME,
        (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_EN_NAME,
        profit_margin,
        qty_on_order,
        for_sale,
        status,
        images_id,
        TAX_scheme_id,
        shortage_policy_id,
        (select C.SHORTAGE_POLICY_TYPE FROM INVENTORY.SHORTAGE_POLICY C WHERE  C.SHORTAGE_POLICY_ID = I.SHORTAGE_POLICY_ID ) SHORTAGE_TYPE ,
        slow_policy_id,
        created_by,
        creation_date,
        deleted,
        deleted_by,
        deleted_date
    FROM
        items_template I
    WHERE  
        deleted = 0`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },

  insertnewitemModule: {
    statement: `INSERT INTO items_template (
      items_template_id,
      ar_name,
      en_name,
      ar_description,
      en_description,
      items_group_id,
      item_kind,
      item_class,
      item_nature,
      balance_nature,
      number_of_units,
      subsidiary_id,
      profit_margin,
      qty_on_order,
      for_sale,
      status,
      images_id,
      tax_scheme_id,
      shortage_policy_id,
      slow_policy_id
        ) VALUES (
          ITEMS_TEMPLATE_SEQ.NEXTVAL,
          :AR_NAME,
          :EN_NAME,
          :AR_DESCRIPTION,
          :EN_DESCRIPTION,
          :ITEMS_GROUP_ID,
          :ITEM_KIND,
          :ITEM_CLASS,
          :ITEM_NATURE,
          :BALANCE_NATURE,
          :NUMBER_OF_UNITS,
          :SUBSIDIARY_ID,
          :PROFIT_MARGIN,
          :QTY_ON_ORDER,
          :FOR_SALE,
          :STATUS,
          :IMAGES_ID,
          :TAX_SCHEME_ID,
          :SHORTAGE_POLICY_ID,
          :SLOW_POLICY_ID
           )
            RETURN  ar_name, en_name INTO :R_AR_NAME , :R_EN_NAME`,
    returns: ["R_AR_NAME", "R_EN_NAME"],
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  getOneItemModule: {
    statement: `  select items_template_id,
          (SELECT nvl(L.PRIMARY_NAME, L.SECONDARY_NAME)  FROM HR.LOOKUP_DETAILS L Where LOOKUP_ID = 189 AND STATUS = 1 and L.LOOKUP_DETAIL_ID = I.ITEM_KIND) KIND_NAME,
          ar_name,
          en_name,
          ar_description,
          en_description,
          items_group_id,
          item_kind,
          item_class,
          item_nature,
          balance_nature,
          number_of_units,
          subsidiary_id,
          (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_AR_NAME,
          (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_EN_NAME,
          profit_margin,
          qty_on_order,
          for_sale,
          status,
          images_id,
          TAX_scheme_id,
          shortage_policy_id,
          (select C.SHORTAGE_POLICY_TYPE FROM INVENTORY.SHORTAGE_POLICY C WHERE  C.SHORTAGE_POLICY_ID = I.SHORTAGE_POLICY_ID ) SHORTAGE_TYPE ,
          slow_policy_id,
          created_by,
          creation_date,
          deleted,
          deleted_by,
          deleted_date
      FROM
          items_template I
      WHERE DELETED = 0 AND STATUS = 1
    AND items_template_id= :ITEMS_TEMPLATE_ID`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  deleteItemTemplate: {
    statement: `UPDATE items_template
                  SET deleted = 1 , deleted_date = SYSDATE
                  WHERE
                      ITEMS_TEMPLATE_ID = :ITEMS_TEMPLATE_ID`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  updateItemTemplate:{
    statement: `UPDATE items_template
                  SET AR_NAME =  :AR_NAME,
                  EN_NAME  = :EN_NAME,
                  AR_DESCRIPTION  = :AR_DESCRIPTION,
                  EN_DESCRIPTION  = :EN_DESCRIPTION,
                  ITEMS_GROUP_ID  = :ITEMS_GROUP_ID,
                  ITEM_KIND  = :ITEM_KIND,
                  ITEM_CLASS  = :ITEM_CLASS,
                  ITEM_NATURE  = :ITEM_NATURE,
                  BALANCE_NATURE  = :BALANCE_NATURE,
                  NUMBER_OF_UNITS  =:NUMBER_OF_UNITS,
                  SUBSIDIARY_ID = :SUBSIDIARY_ID,
                  PROFIT_MARGIN  =:PROFIT_MARGIN,
                  QTY_ON_ORDER = :QTY_ON_ORDER,
                  FOR_SALE = :FOR_SALE,
                  STATUS  =:STATUS,
                  IMAGES_ID  =:IMAGES_ID,
                  TAX_SCHEME_ID = :TAX_SCHEME_ID,
                  SHORTAGE_POLICY_ID =:SHORTAGE_POLICY_ID,
                  SLOW_POLICY_ID = :SLOW_POLICY_ID
                WHERE 
                  ITEMS_TEMPLATE_ID = :ITEMS_TEMPLATE_ID`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
  }
};

module.exports = statements;
