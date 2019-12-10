require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./stocktakingbalancesql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatestockTakingBalanceStructure = require('@lib/validatestructure');

router.get('/getStockTakingBalance', function (req, res) {
    servicePool(req, res, statements.getStockTakingBalance.statment, []);
});

router.get('/getOneStockTakingBalanceByID/:INV_STOCKTAKING_BALANCE_ID', function (req, res) {
    servicePool(req, res, statements.getOneStockTakingBalanceByID.statment, {'INV_STOCKTAKING_BALANCE_ID':req.params.INV_STOCKTAKING_BALANCE_ID});
});

router.post('/insertStockTakingBalance', checkData,validatestockTakingBalanceStructure.validatestockTakingBalanceStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertStockTakingBalance.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertStockTakingBalance.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});




router.post("/updateStockTakingBalance/:INV_STOCKTAKING_BALANCE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatestockTakingBalanceStructure.composeupdatestatement(
      "inv_stocktaking_balance",
      req.body,
      "INV_STOCKTAKING_BALANCE_ID = " + req.params.INV_STOCKTAKING_BALANCE_ID
    ),
    []
  );
});





module.exports = router;
