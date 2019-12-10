let statements = {
    receiveReq: {
      statement: `  
                    BEGIN
                        INVENTORY.RECEIV_REQ ( :pdocument_id , :REQ_TYPE );
                    END ;
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: true
            }
  
  }
  module.exports = statements;
  
  