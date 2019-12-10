require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvtmpoitemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatrcvtmpItems = require('@lib/validatestructure');


router.get('/rcvTmpoItems/getTmpItems', function (req, res) {
  let statement = statements.getTmpItems.statment;
  let binding = [];
  if(req.query.DOCUMENT_ID){
      statement = statement + ` and DOCUMENT_ID = :DOCUMENT_ID`;
      binding = {'DOCUMENT_ID':Number(req.query.DOCUMENT_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/rcvTmpoItems/getTmpItembyID/:RCV_TEMP_ITEMS_ID', function (req, res) {
  servicePool(req, res, statements.getTmpItembyID.statment, { 'RCV_TEMP_ITEMS_ID': req.params.RCV_TEMP_ITEMS_ID });
});

router.post('/rcvTmpoItems/insertTmpItem', checkData, validatrcvtmpItems.validatercvtmpItemsStructure, (req, res) => {
  
  bodyconverter.bodyconverter(req, res, req.body, statements.insertTmpItem.returns).then(convertedbody => {
    servicePool(req, res, statements.insertTmpItem.statement, convertedbody);
  }).catch(error => { res.status(400).json(error); });
});

router.post('/rcvTmpoItems/deleteTmpItem', checkData, (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteTmpItem.statement,
    { "DELETED_BY": req.body.DELETED_BY, "RCV_TEMP_ITEMS_ID": req.body.RCV_TEMP_ITEMS_ID });
});


router.post("/rcvTmpoItems/updatercvTmpoItems/:rcv_temp_items_id", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatrcvtmpItems.composeupdatestatement(
      "rcv_temporary_items",
      req.body,
      "rcv_temp_items_id = " + req.params.rcv_temp_items_id
    ),
    []
  );
});



module.exports = router;
