require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./stocktakingbalanceusql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateStockBalanceU = require('@lib/validatestructure');

router.get('/getAllstocktakingBalanceU', (req, res)=>{
  let statement = statements.getAllstocktakingBalanceU.statement;
  let binding = [];
  if(req.query.INV_STOCKTAKING_ID){
      statement = statement + ` and INV_STOCKTAKING_ID = :INV_STOCKTAKING_ID`;
      binding = {'INV_STOCKTAKING_ID':Number(req.query.INV_STOCKTAKING_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOnestocktakingBalanceU/:INV_STOCKTAKING_BALANCE_U_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnestocktakingBalanceU.statement,
               {'INV_STOCKTAKING_BALANCE_U_ID' :req.params.INV_STOCKTAKING_BALANCE_U_ID}
               );
});

router.post('/insertstocktakingBalanceU', checkData, validateStockBalanceU.validatestockBalanceUStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertstocktakingBalanceU.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertstocktakingBalanceU.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});



router.post("/updateStockTakingBalanceU/:INV_STOCKTAKING_BALANCE_U_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateStockBalanceU.composeupdatestatement(
      "INV_STOCKTAKING_BALANCE_U",
      req.body,
      "INV_STOCKTAKING_BALANCE_U_ID = " + req.params.INV_STOCKTAKING_BALANCE_U_ID
    ),
    []
  );
});


module.exports = router;
