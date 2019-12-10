require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./transactionsitemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatetransactionsItemsStructure = require('@lib/validatestructure');


router.get('/getTransactionItems', function (req, res) {
   let statement = statements.getTransactionItems.statment;
  let binding = [];
  if(req.query.INV_TRANSACTIONS_ID){
    console.log(typeof(req.query.INV_TRANSACTIONS_ID))
      statement = statement + ` and INV_TRANSACTIONS_ID = :INV_TRANSACTIONS_ID`;
      binding = {'INV_TRANSACTIONS_ID':Number(req.query.INV_TRANSACTIONS_ID) }
  }
      servicePool(req, res, statement, binding);

});
//-------


router.get('/getOneTransactionItems/:INV_TRANSACTIONS_ITEMS_ID', function (req, res) {
    servicePool(req, res, statements.getOneTransactionItems.statment, {'INV_TRANSACTIONS_ITEMS_ID':req.params.INV_TRANSACTIONS_ITEMS_ID});
});
//--------

router.post('/insertTransactionItems', checkData,validatetransactionsItemsStructure.validatetransactionsItemsStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertTransactionItems.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertTransactionItems.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

//----------


router.post("/updateTransactionItems/:INV_TRANSACTIONS_ITEMS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatetransactionsItemsStructure.composeupdatestatement(
      "inv_transactions_items",
      req.body,
      "INV_TRANSACTIONS_ITEMS_ID = " + req.params.INV_TRANSACTIONS_ITEMS_ID
    ),
    []
  );
});



module.exports = router;
