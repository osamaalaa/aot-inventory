require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./transferitemsdsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateTransferItemsD = require('@lib/validatestructure');

router.get('/getAlltransferItemsD', (req, res)=>{
  let statement = statements.getAlltransferItemsD.statement;
  let binding = [];
  if(req.query.INV_TRANSFER_ITEMS_ID){
      statement = statement + ` and INV_TRANSFER_ITEMS_ID = :INV_TRANSFER_ITEMS_ID`;
      binding = {'INV_TRANSFER_ITEMS_ID':Number(req.query.INV_TRANSFER_ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOnetransferItemsD/:INV_TRANSFER_ITEMS_D_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnetransferItemsD.statement,
               {'INV_TRANSFER_ITEMS_D_ID' :req.params.INV_TRANSFER_ITEMS_D_ID}
               );
});

router.post('/inserttransferItemsD', checkData, validateTransferItemsD.validatetransferItemsDStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.inserttransferItemsD.returns).then(convertedbody=>{
        servicePool(req,res,statements.inserttransferItemsD.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updatetransferItemsDById/:INV_TRANSFER_ITEMS_D_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateTransferItemsD.composeupdatestatement(
      "INV_TRANSFER_ITEMS_D",
      req.body,
      "INV_TRANSFER_ITEMS_D_ID = " + req.params.INV_TRANSFER_ITEMS_D_ID
    ),
    []
  );
});

router.post('/deleteTransferItemsD/:INV_TRANSFER_ITEMS_D_ID'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteTransferItemsD.statement,
    { "INV_TRANSFER_ITEMS_D_ID" : req.params.INV_TRANSFER_ITEMS_D_ID});

});

module.exports = router;
