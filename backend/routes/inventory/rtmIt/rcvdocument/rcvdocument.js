require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvdocumentsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateRcvDoc = require('@lib/validatestructure');

router.get('/getAllRcvDocument', (req, res) => {
  let statement = statements.getAllRcvDocument.statement;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  if(req.query.DOCUMENT_STATUS){
      statement = statement + ` and DOCUMENT_STATUS = :DOCUMENT_STATUS`;
      binding = {...binding,'DOCUMENT_STATUS':Number(req.query.DOCUMENT_STATUS) }
  }
  statement = statement + ` ORDER BY DOCUMENT_ID DESC`
  servicePool(req, res, statement, binding);
});

router.get('/getOneRcvDocument/:DOCUMENT_ID', (req, res) => {
  servicePool(req, res,
    statements.getOneRcvDocument.statement,
    { 'DOCUMENT_ID': req.params.DOCUMENT_ID }
  );
});

router.post('/insertRcvDocument', checkData, validateRcvDoc.validateRcvDocumentStructure, (req, res) => {

  bodyconverter.bodyconverter(req, res, req.body, statements.insertRcvDocument.returns).then(convertedbody => {
    servicePool(req, res, statements.insertRcvDocument.statement, convertedbody);
  }).catch(error => { res.status(400).json(error); });

});

router.post("/updateRcvDocument/:DOCUMENT_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateRcvDoc.composeupdatestatement(
      "RCV_DOCUMENT",
      req.body,
      "DOCUMENT_ID = " + req.params.DOCUMENT_ID
    ),
    []
  );
});

router.post("/deleteRcvDocument", (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteRcvDocument.statement,
    { "DELETED_BY": req.body.DELETED_BY, "DOCUMENT_ID": req.body.DOCUMENT_ID });
})

module.exports = router;
