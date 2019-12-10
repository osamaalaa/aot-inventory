let statements = {
    insertSupplier: {
        statement: `
        INSERT INTO suppliers (
                            supplier_id,
                            supplier_code,
                            ar_name,
                            en_name,
                            subsidiary_id,
                            intercompany,
                            intercompany_id,
                            vat_registration_no,
                            TAX_SCHEME_ID ,
                            local_supplier,
                            status,
                            created_by,
                            creation_date
                        )VALUES (
                      SUPPLIERS_SEQ.NEXTVAL,
                      :SUPPLIER_CODE,
                      :AR_NAME,
                      :EN_NAME,
                      :SUBSIDIARY_ID,
                      :INTERCOMPANY,
                      :INTERCOMPANY_ID,
                      :VAT_REGISTRATION_NO,
                      :TAX_SCHEME_ID ,
                      :LOCAL_SUPPLIER,
                      :STATUS,
                      :CREATED_BY,
                       sysdate
                  )
         RETURN SUPPLIER_CODE , AR_NAME , EN_NAME, supplier_id INTO :R_SUPPLIER_CODE, :R_AR_NAME, :R_EN_NAME, :R_SUPPLIER_ID`,
        returns: ["R_SUPPLIER_CODE", "R_AR_NAME", "R_EN_NAME", "R_SUPPLIER_ID"],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getSuppliers:{
        statment :` SELECT
                      supplier_id,
                      supplier_code,
                      ar_name,
                      en_name,
                      subsidiary_id,
                      (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                       (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                      intercompany,
                      intercompany_id,
                      vat_registration_no,
                      TAX_SCHEME_ID ,
                      local_supplier,
                      status,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date
                  FROM
                      suppliers I
                      WHERE deleted = 0 `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
    getSupplierByID:{
        statment :`
        SELECT
                      supplier_id,
                      supplier_code,
                      ar_name,
                      en_name,
                      subsidiary_id,
                      (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_AR_NAME,
                      (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDARIE_EN_NAME,
                      intercompany,
                      intercompany_id,
                      vat_registration_no,
                      TAX_SCHEME_ID ,
                      local_supplier,
                      status,
                      created_by,
                      creation_date,
                      deleted,
                      deleted_by,
                      deleted_date
                  FROM
                      suppliers I
                      WHERE deleted = 0 
            AND supplier_id =:SUPPLIER_ID `,
            bindings: [],
            qstring: "",
            requireCommit: false
        },
        deleteSupplier: {
          statement: `UPDATE suppliers
                        SET DELETED = 1 ,DELETED_DATE = sysdate
                        WHERE
                        SUPPLIER_ID = :SUPPLIER_ID`,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
        }
       
};

module.exports = statements;
