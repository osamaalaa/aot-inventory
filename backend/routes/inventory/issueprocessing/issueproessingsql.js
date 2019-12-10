let statements = {
   issueProcessingForReqDoc: {
        statement: ` 
        DECLARE 
            req_document_id    NUMBER;
          
         BEGIN
            IF req_document_id IS NOT NULL
            THEN
               inventory.item_balance (:req_document_id, 'Request');
               inventory.create_transaction (:req_document_id, 'Request');
            END IF;
         END ;`,
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    issueProcessingForDSPdoc: {
      statement: ` 
      DECLARE 
          dsp_document_id    NUMBER;
       BEGIN
          IF dsp_document_id IS NOT NULL
          THEN
             inventory.item_balance (:dsp_document_id, 'Dispense');
             inventory.create_transaction (:dsp_document_id, 'Dispense');
          END IF;
       END ;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },    
  issueProcessingForInvTransfer: {
      statement: ` 
      BEGIN
         INVENTORY.TRANSFER_REQ (:INV_TRANSFER_ID, 'REQUEST');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },
  issueProcessingForInvTransferR: {
      statement: ` 
      BEGIN
         INVENTORY.TRANSFER_REQ (:INV_TRANSFER_R_ID, 'RECEIVE');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  }, 
  issueProcessingForRCVDoc: {
      statement: ` 
      BEGIN
         INVENTORY.RECEIV_REQ (:DOCUMENT_ID, 'FINAL');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },
  issueProcessingForRCVInspection: {
      statement: ` 
      BEGIN
         INVENTORY.RECEIV_REQ (:DOCUMENT_ID, 'INSPECT');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },
    issueProcessingForRCVTemporary: {
      statement: ` 
      BEGIN
         INVENTORY.RECEIV_REQ (:DOCUMENT_ID, 'TEMP');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },
      issueProcessingForSaveInvStocking: {
      statement: ` 
      BEGIN
         INVENTORY.PHYSICAL_INV_REQ (:INV_STOCKTAKING_ID, 'NEW');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  } ,
       issueProcessingForInvStocking: {
      statement: ` 
      BEGIN
         INVENTORY.PHYSICAL_INV_REQ (:INV_STOCKTAKING_ID, 'ADJUST');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },
       issueProcessingForReqDocumentNew: {
      statement: ` 
      BEGIN
         INVENTORY.ADD_DSP_REQ (:DOCUMENT_ID, 'NEW');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },
  issueProcessingForReqDocumentItemRequest: {
      statement: ` 
      BEGIN
      INVENTORY.ADD_DSP_REQ (:DOCUMENT_ID, 'ACTION');

      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },
    issueProcessingForReqDocumentAction: {
      statement: ` 
      BEGIN
         INVENTORY.INCR_DESC_BAL (:DOCUMENT_ID, 'INCREASE');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },
    issueProcessingForItemReturnRequest: {
      statement: ` 
      BEGIN
         INVENTORY.INCR_DESC_BAL (:DOCUMENT_ID, 'DECREASE');
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  } ,   
  issueProcessingForEmployeeCustody: {
      statement: ` 
      BEGIN
         INVENTORY.ADD_CUSTODY_REQ (:DOCUMENT_ID);
      END;`,
      bindings: [],
      qstring: "",
      requireCommit: true
  },
    issueProcessingForItemLostRequest: {
      statement: ` 
      declare res VARCHAR2(500);
            BEGIN
            INVENTORY.ADD_DSP_REQ(:DOCUMENT_ID, :REQ_TYPE, res);
          
            END;
      `,
      returns: ['res' ],
       bindings: [],
      qstring: "",
      requireCommit: true
  }


};


module.exports = statements;
