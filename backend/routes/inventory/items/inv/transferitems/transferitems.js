require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./transferitemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateTransferItems = require('@lib/validatestructure');

router.get('/getAlltransferItems', (req, res)=>{
  let statement = statements.getAlltransferItems.statement;
  let binding = [];
  if(req.query.INV_TRANSFER_ID){
      statement = statement + ` and INV_TRANSFER_ID = :INV_TRANSFER_ID`;
      binding = {'INV_TRANSFER_ID':Number(req.query.INV_TRANSFER_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOnetransferItems/:INV_TRANSFER_ITEMS_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnetransferItems.statement,
               {'INV_TRANSFER_ITEMS_ID' :req.params.INV_TRANSFER_ITEMS_ID}
               );
});

router.post('/inserttransferItems', checkData, validateTransferItems.validatetransferItemsStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.inserttransferItems.returns).then(convertedbody=>{
        servicePool(req,res,statements.inserttransferItems.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updatetransferItemsById/:INV_TRANSFER_ITEMS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateTransferItems.composeupdatestatement(
      "INV_TRANSFER_ITEMS",
      req.body,
      "INV_TRANSFER_ITEMS_ID = " + req.params.INV_TRANSFER_ITEMS_ID
    ),
    []
  );
});

router.post('/deleteTransferItems/:INV_TRANSFER_ITEMS_ID'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteTransferItems.statement,
    { "INV_TRANSFER_ITEMS_ID" : req.params.INV_TRANSFER_ITEMS_ID});

});

module.exports = router;
