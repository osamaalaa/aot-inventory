require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./issueproessingsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateInvPeriod = require('@lib/validatestructure');
let businessPool = require('@lib/businessPool');

router.post('/issueProcessingForReqDoc',checkData, (req, res) => {
  servicePool(req, res,
    statements.issueProcessingForReqDoc.statement,
    {req_document_id: req.body.REQ_DOCUMENT_ID
      }
  );
});

router.post('/issueProcessingForDSPdoc', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForDSPdoc.statement,
    {
      dsp_document_id: req.body.DSP_DOCUMENT_ID}
  );
});

router.post('/issueProcessingForInvTransfer', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForInvTransfer.statement,
    {
      INV_TRANSFER_ID: req.body.INV_TRANSFER_ID}
  );
});
router.post('/issueProcessingForInvTransferR', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForInvTransferR.statement,
    {
      INV_TRANSFER_R_ID: req.body.INV_TRANSFER_R_ID}
  );
});
router.post('/issueProcessingForRCVDoc', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForRCVDoc.statement,
    {
      DOCUMENT_ID: req.body.DOCUMENT_ID}
  );
});
router.post('/issueProcessingForRCVInspection', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForRCVInspection.statement,
    {
      DOCUMENT_ID: req.body.DOCUMENT_ID}
  );
});
router.post('/issueProcessingForRCVTemporary', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForRCVTemporary.statement,
    {
      DOCUMENT_ID: req.body.DOCUMENT_ID}
  );
});
router.post('/issueProcessingForSaveInvStocking', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForSaveInvStocking.statement,
    {
      INV_STOCKTAKING_ID: req.body.INV_STOCKTAKING_ID}
  );
});

router.post('/issueProcessingForInvStocking', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForInvStocking.statement,
    {
      INV_STOCKTAKING_ID: req.body.INV_STOCKTAKING_ID}
  );
});
router.post('/issueProcessingForReqDocumentNew', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForReqDocumentNew.statement,
    {
      DOCUMENT_ID: req.body.DOCUMENT_ID}
  );
});
router.post('/issueProcessingForReqDocumentItemRequest', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForReqDocumentItemRequest.statement,
    {
      DOCUMENT_ID: req.body.DOCUMENT_ID}
  );
});

router.post('/issueProcessingForReqDocumentAction', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForReqDocumentAction.statement,
    {
      DOCUMENT_ID: req.body.DOCUMENT_ID}
  );
});
router.post('/issueProcessingForItemReturnRequest', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForItemReturnRequest.statement,
    {
      DOCUMENT_ID: req.body.DOCUMENT_ID}
  );
});
router.post('/issueProcessingForEmployeeCustody', checkData,(req, res) => {
  servicePool(req, res,
    statements.issueProcessingForEmployeeCustody.statement,
    {
      DOCUMENT_ID: req.body.DOCUMENT_ID}
  );
});
router.post('/issueProcessingForItemLostRequest', checkData,(req, res) => {


  bodyconverter.bodyconverter(req, res, {
    DOCUMENT_ID: req.body.DOCUMENT_ID ,
     REQ_TYPE : req.body.REQ_TYPE},  statements.issueProcessingForItemLostRequest.returns).then(convertedBody => {
    servicePool(req, res, statements.issueProcessingForItemLostRequest.statement, convertedBody);

    
});
});



module.exports = router;
