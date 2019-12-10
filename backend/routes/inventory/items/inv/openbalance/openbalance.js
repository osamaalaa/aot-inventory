require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./openbalancesql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateopenBalanceStructure = require('@lib/validatestructure');


router.get('/getOpenbalance', function (req, res) {
  let statement = statements.getOpenbalance.statment;
  let binding = [];
  if(req.query.STORES_ID){
    console.log(typeof(req.query.STORES_ID))
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  if(req.query.DOCUMENT_STATUS){
      statement = statement + ` and DOCUMENT_STATUS = :DOCUMENT_STATUS`;
      binding = {...binding,'DOCUMENT_STATUS':Number(req.query.DOCUMENT_STATUS) }
  }
  statement = statement + ` ORDER BY INV_OPEN_BALANCE_ID DESC`
  servicePool(req, res, statement, binding);
});

router.get('/getOneOpenBalanceByID/:INV_OPEN_BALANCE_ID', function (req, res) {
    servicePool(req, res, statements.getOneOpenBalanceByID.statment, {'INV_OPEN_BALANCE_ID':req.params.INV_OPEN_BALANCE_ID});
});

router.post('/insertOpenBalance', checkData,validateopenBalanceStructure.validateopenBalanceStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertOpenBalance.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertOpenBalance.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});


router.post("/updateOpenBalance/:INV_OPEN_BALANCE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateopenBalanceStructure.composeupdatestatement(
      "inv_open_balance",
      req.body,
      "INV_OPEN_BALANCE_ID = " + req.params.INV_OPEN_BALANCE_ID
    ),
    []
  );
});

//-------------


router.post('/deleteOpenBalance/:INV_OPEN_BALANCE_ID'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteOpenBalance.statement,
    { "INV_OPEN_BALANCE_ID" : req.params.INV_OPEN_BALANCE_ID});

});

router.patch('/patchWorkflow/:INV_OPEN_BALANCE_ID', (req, res) => {
  servicePool(
    req,
    res,
    statements.updateWFRequest.statement,
    {
      "INV_OPEN_BALANCE_ID": req.params.INV_OPEN_BALANCE_ID,
      "WF_REQUEST_ID":req.body.WF_REQUEST_ID
    });
})









module.exports = router;
