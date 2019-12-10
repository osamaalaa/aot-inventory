require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./transactiontypessql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatetransactionTypes = require('@lib/validatestructure');
//----------------------
router.get('/getTransactions', function (req, res)
{
    servicePool(req, res, statements.getTransactions.statement, []);
});

router.get('/getTransactionsByID/:TRANSACTION_TYPE_ID', function (req, res) {
    servicePool(req, res, statements.getTransactionsByID.statement, {'TRANSACTION_TYPE_ID':req.params.TRANSACTION_TYPE_ID});
});

router.post('/insertTransaction',checkData ,validatetransactionTypes.validatetransactionTypesStructure, (req,res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertTransaction.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertTransaction.statement,convertedbody);

    }).catch(error => { res.status(400).json(error); });
});

router.post('/deleteTransactions',checkData , (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteTransactions.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "TRANSACTION_TYPE_ID" : req.body.TRANSACTION_TYPE_ID});
});


router.post("/updateTransactions/:TRANSACTION_TYPE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatetransactionTypes.composeupdatestatement(
      "transaction_types",
      req.body,
      "TRANSACTION_TYPE_ID = " + req.params.TRANSACTION_TYPE_ID
    ),
    []
  );
});


module.exports = router;
