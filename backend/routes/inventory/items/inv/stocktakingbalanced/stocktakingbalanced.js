require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./stocktakingbalancedsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatestockTakingBalanceDStructure = require('@lib/validatestructure');

router.get('/getStockTakingBalanceD', function (req, res) {
    servicePool(req, res, statements.getStockTakingBalanceD.statment, []);
});

router.get('/getOneStockTakingBalanceDByID/:INV_STOCKTAKING_BALANCE_D_ID', function (req, res) {
    servicePool(req, res, statements.getOneStockTakingBalanceDByID.statment, {'INV_STOCKTAKING_BALANCE_D_ID':req.params.INV_STOCKTAKING_BALANCE_D_ID});
});

router.post('/insertStockTakingDBalance', checkData,validatestockTakingBalanceDStructure.validatestockTakingBalanceDStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertStockTakingDBalance.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertStockTakingDBalance.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post("/updateStockTakingBalanceD/:INV_STOCKTAKING_BALANCE_D_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatestockTakingBalanceDStructure.composeupdatestatement(
      "inv_stocktaking_balance_d",
      req.body,
      "INV_STOCKTAKING_BALANCE_D_ID = " + req.params.INV_STOCKTAKING_BALANCE_D_ID
    ),
    []
  );
});








module.exports = router;
