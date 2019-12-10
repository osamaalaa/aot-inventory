require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvdocumentitemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateRcvDocItems = require('@lib/validatestructure');

router.get('/getAllRcvDocumentITems', (req, res)=>{
  let statement = statements.getAllRcvDocumentITems.statement;
  let binding = [];
  if(req.query.DOCUMENT_ID){
      statement = statement + ` and DOCUMENT_ID = :DOCUMENT_ID`;
      binding = {'DOCUMENT_ID':Number(req.query.DOCUMENT_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOneRcvDocumentITems/:RCV_DOCUMENT_ITEMS_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneRcvDocumentITems.statement,
               {'RCV_DOCUMENT_ITEMS_ID' :req.params.RCV_DOCUMENT_ITEMS_ID}
               );
});

router.post('/insertNewRcvDocumentITems', checkData, validateRcvDocItems.validatercvDocumentItemsStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewRcvDocumentITems.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertNewRcvDocumentITems.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});



router.post("/updateRcvDocumentItems/:RCV_DOCUMENT_ITEMS_ID", checkData, (req, res) => {
  console.log(req.body)

  servicePool(
    req,
    res,
    validateRcvDocItems.composeupdatestatement(
      "RCV_DOCUMENT_ITEMS",
      req.body,
      "RCV_DOCUMENT_ITEMS_ID = " + req.params.RCV_DOCUMENT_ITEMS_ID
    ),
    []
  );
});



router.post("/deleteRcvDocumentItems", (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteRcvDocumentItems.statement,
    { "DELETED_BY": req.body.DELETED_BY, "RCV_DOCUMENT_ITEMS_ID": req.body.RCV_DOCUMENT_ITEMS_ID });
 })






module.exports = router;
