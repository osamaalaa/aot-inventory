require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./openbalanceitemsdsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateOpenBalanceItemSD = require('@lib/validatestructure');

router.get('/getAllOpenBalanceItemsD', (req, res)=>{
  let statement = statements.getAllOpenBalanceItemsD.statement;
  let binding = [];
  if(req.query.INV_OPEN_BALANCE_ITEMS_ID){
      statement = statement + ` and INV_OPEN_BALANCE_ITEMS_ID = :INV_OPEN_BALANCE_ITEMS_ID`;
      binding = {'INV_OPEN_BALANCE_ITEMS_ID':Number(req.query.INV_OPEN_BALANCE_ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOneOpenBalanceItemsD/:INV_OPEN_BALANCE_ITEMS_D_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneOpenBalanceItemsD.statement,
               {'INV_OPEN_BALANCE_ITEMS_D_ID' :req.params.INV_OPEN_BALANCE_ITEMS_D_ID}
               );
});

router.post('/insertOpenBalanceItemsD', checkData, validateOpenBalanceItemSD.validateinvOpenBalanceItemsDStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertOpenBalanceItemsD.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertOpenBalanceItemsD.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updateOpenBalanceItemsD/:INV_OPEN_BALANCE_ITEMS_D_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateOpenBalanceItemSD.composeupdatestatement(
      "INV_OPEN_BALANCE_ITEMS_D",
      req.body,
      "INV_OPEN_BALANCE_ITEMS_D_ID = " + req.params.INV_OPEN_BALANCE_ITEMS_D_ID
    ),
    []
  );
});
router.delete('/deleteOpenBalanceItemsD/:INV_OPEN_BALANCE_ITEMS_D_ID'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteOpenBalanceItemsD.statement,
    { "INV_OPEN_BALANCE_ITEMS_D_ID" : req.params.INV_OPEN_BALANCE_ITEMS_D_ID});

});

module.exports = router;
