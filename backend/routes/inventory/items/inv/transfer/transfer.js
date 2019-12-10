require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./transfersql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatetransferStructure = require('@lib/validatestructure');


router.get('/getTransfer', function (req, res) {
  let statement = statements.getTransfer.statment;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  statement = statement + ` ORDER BY INV_TRANSFER_ID DESC`
  servicePool(req, res, statement, binding);
});

//-------
router.get('/getOneTransfer/:INV_TRANSFER_ID', function (req, res) {
    servicePool(req, res, statements.getOneTransfer.statment, {'INV_TRANSFER_ID':req.params.INV_TRANSFER_ID});
});

//--------
router.post('/insertTransfer', checkData,validatetransferStructure.validatetransferStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertTransfer.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertTransfer.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});
// delete
router.post('/deleteTRANSFER/:INV_TRANSFER_ID'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteTRANSFER.statement,
    { "INV_TRANSFER_ID" : req.params.INV_TRANSFER_ID});

});
//UPDATED
router.post("/UPDATETRANSFER/:INV_TRANSFER_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatetransferStructure.composeupdatestatement(
      "inv_transfer",
      req.body,
      "INV_TRANSFER_ID = " + req.params.INV_TRANSFER_ID
    ),
    []
  );
});

module.exports = router;
