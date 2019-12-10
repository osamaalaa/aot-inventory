require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./invstockitemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateInvStockitems = require('@lib/validatestructure');

router.get('/getAllInvStockItems', (req, res)=>{
  let statement = statements.getAllInvStockItems.statement;
  let binding = [];
  if(req.query.INV_STOCKTAKING_ID){
      statement = statement + ` and INV_STOCKTAKING_ID = :INV_STOCKTAKING_ID`;
      binding = {'INV_STOCKTAKING_ID':Number(req.query.INV_STOCKTAKING_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOneInvStockItems/:INV_STOCKTAKING_ITEMS_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneInvStockItems.statement,
               {'INV_STOCKTAKING_ITEMS_ID' :req.params.INV_STOCKTAKING_ITEMS_ID}
               );
});

router.post('/insertInvStockItems', checkData, validateInvStockitems.validateinvStockItemsStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertInvStockItems.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertInvStockItems.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updateInvStockItems/:INV_STOCKTAKING_ITEMS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateInvStockitems.composeupdatestatement(
      "INV_STOCKTAKING_ITEMS",
      req.body,
      "INV_STOCKTAKING_ITEMS_ID = " + req.params.INV_STOCKTAKING_ITEMS_ID
    ),
    []
  );
});


module.exports = router;
