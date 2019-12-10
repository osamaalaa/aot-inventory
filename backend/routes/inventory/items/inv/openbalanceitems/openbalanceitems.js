require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./openbalanceitemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateopenBalanceItemsStructure = require('@lib/validatestructure');


router.get('/getOpenbalanceITems', function (req, res) {
  let statement = statements.getOpenbalanceITems.statment;
  let binding = [];
  if(req.query.INV_OPEN_BALANCE_ID){
      statement = statement + ` and INV_OPEN_BALANCE_ID = :INV_OPEN_BALANCE_ID`;
      binding = {'INV_OPEN_BALANCE_ID':Number(req.query.INV_OPEN_BALANCE_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOneOpenBalanceItemByID/:INV_OPEN_BALANCE_ITEMS_ID' ,function (req, res) {
    servicePool(req, res, statements.getOneOpenBalanceItemByID.statment, {'INV_OPEN_BALANCE_ITEMS_ID':req.params.INV_OPEN_BALANCE_ITEMS_ID});
});

router.get('/getOneOpenBalanceItemByUnitsId/:UNITS_ID' ,function (req, res) {
    servicePool(req, res, statements.getOneOpenBalanceItemByUnitsId.statment, {'UNITS_ID':req.params.UNITS_ID});
});

router.post('/insertOpenBalanceItem', checkData,validateopenBalanceItemsStructure.validateopenBalanceItemsStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertOpenBalanceItem.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertOpenBalanceItem.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});
router.post("/updateOpenBalanceItems/:INV_OPEN_BALANCE_ITEMS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateopenBalanceItemsStructure.composeupdatestatement(
      "inv_open_balance_items",
      req.body,
      "INV_OPEN_BALANCE_ITEMS_ID = " + req.params.INV_OPEN_BALANCE_ITEMS_ID
    ),
    []
  );
});

router.delete('/deleteOpenBalanceItems/:INV_OPEN_BALANCE_ITEMS_ID'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteOpenBalanceItems.statement,
    { "INV_OPEN_BALANCE_ITEMS_ID" : req.params.INV_OPEN_BALANCE_ITEMS_ID});

});



module.exports = router;
