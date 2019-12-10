require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./invtransferrsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateTransferR = require('@lib/validatestructure');

router.get('/getAlltInvTransferR', function (req, res) {
  let statement = statements.getAlltInvTransferR.statement;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  statement = statement + ` ORDER BY INV_TRANSFER_R_ID DESC`
  servicePool(req, res, statement, binding);
});

router.get('/getOneInvTransferR/:INV_TRANSFER_R_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneInvTransferR.statement,
               {'INV_TRANSFER_R_ID' :req.params.INV_TRANSFER_R_ID}
               );
});

router.post('/insertInvTransferR', checkData, validateTransferR.validatetransferRStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertInvTransferR.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertInvTransferR.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post('/deleteTransferR'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteTransferR.statement,
    { "INV_TRANSFER_R_ID" : req.body.INV_TRANSFER_R_ID});

});

router.post("/updateInvTransferR/:INV_TRANSFER_R_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateTransferR.composeupdatestatement(
      "INV_TRANSFER_R",
      req.body,
      "INV_TRANSFER_R_ID = " + req.params.INV_TRANSFER_R_ID
    ),
    []
  );
});

module.exports = router;
