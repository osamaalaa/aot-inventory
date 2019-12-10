require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./req-committee.sql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateInvStockSommitte = require('@lib/validatestructure');

router.get('/getAllRequestCommitee', (req, res)=>{
  let statement = statements.getAllRequestCommitee.statement;
  let binding = [];
  if(req.query.DOCUMENT_ID){
      statement = statement + ` and DOCUMENT_ID = :DOCUMENT_ID`;
      binding = {'DOCUMENT_ID':Number(req.query.DOCUMENT_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOneInvRequestCommitte/:INV_REQUEST_COMMITTEE_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneInvRequestCommitte.statement,
               {'INV_REQUEST_COMMITTEE_ID' :req.params.INV_REQUEST_COMMITTEE_ID}
               );
});

router.post('/insertInvRequestCommitte', checkData, validateInvStockSommitte.validateinvRequestCommitteStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertInvRequestCommitte.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertInvRequestCommitte.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post("/updateInvRequestCommitte/:INV_REQUEST_COMMITTEE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateInvStockSommitte.composeupdatestatement(
      "INV_REQUEST_COMMITTEE",
      req.body,
      "INV_REQUEST_COMMITTEE_ID = " + req.params.INV_REQUEST_COMMITTEE_ID
    ),
    []
  );
});

module.exports = router;
