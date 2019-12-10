require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./transferritemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateTransferRItems = require('@lib/validatestructure');

router.get('/getAllTransferRItems', (req, res)=>{

  let statement = statements.getAllTransferRItems.statement;
  let binding = [];
  if(req.query.INV_TRANSFER_R_ID){
      statement = statement + ` and INV_TRANSFER_R_ID = :INV_TRANSFER_R_ID`;
      binding = {'INV_TRANSFER_R_ID':Number(req.query.INV_TRANSFER_R_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOneTransferRItems/:INV_TRANSFER_R_ITEMS_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneTransferRItems.statement,
               {'INV_TRANSFER_R_ITEMS_ID' :req.params.INV_TRANSFER_R_ITEMS_ID}
               );
});

router.post('/insertTransferRItems', checkData, validateTransferRItems.validatetransferRItemsStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertTransferRItems.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertTransferRItems.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post("/updateTransferRItems/:INV_TRANSFER_R_ITEMS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateTransferRItems.composeupdatestatement(
      "INV_TRANSFER_R_ITEMS",
      req.body,
      "INV_TRANSFER_R_ITEMS_ID = " + req.params.INV_TRANSFER_R_ITEMS_ID
    ),
    []
  );
});
router.post('/deleteTransferItemsR/:INV_TRANSFER_R_ITEMS_ID'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteTransferItemsR.statement,
    { "INV_TRANSFER_R_ITEMS_ID" : req.params.INV_TRANSFER_R_ITEMS_ID});

});
module.exports = router;
