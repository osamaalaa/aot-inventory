require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./transactionssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatetransactionsStructure = require('@lib/validatestructure');


router.get('/getTransactions', function (req, res) {
    servicePool(req, res, statements.getTransactions.statment, []);
});

router.get('/getTransactionByID/:INV_TRANSACTIONS_ID', function (req, res) {
    servicePool(req, res, statements.getTransactionByID.statment, {'INV_TRANSACTIONS_ID':req.params.INV_TRANSACTIONS_ID});
});


router.post("/updateTransactions/:INV_TRANSACTIONS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatetransactionsStructure.composeupdatestatement(
      "inv_transactions",
      req.body,
      "INV_TRANSACTIONS_ID = " + req.params.INV_TRANSACTIONS_ID
    ),
    []
  );
});

router.post('/insertTransactions', checkData ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertTransactions.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertTransactions.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});




module.exports = router;
