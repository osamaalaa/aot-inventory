require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./stocktakingsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatestockTakingStructure = require('@lib/validatestructure');

router.get('/getStockTaking', function (req, res) {
  let statement = statements.getStockTaking.statment;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  if(req.query.DOCUMENT_STATUS){
      statement = statement + ` and DOCUMENT_STATUS = :DOCUMENT_STATUS`;
      binding = {...binding,'DOCUMENT_STATUS':Number(req.query.DOCUMENT_STATUS) }
  }
  statement = statement + ` ORDER BY INV_STOCKTAKING_ID DESC`
  servicePool(req, res, statement, binding);
});

router.get('/getOneStockTakingByID/:INV_STOCKTAKING_ID', function (req, res) {
    servicePool(req, res, statements.getOneStockTakingByID.statment, {'INV_STOCKTAKING_ID':req.params.INV_STOCKTAKING_ID});
});

router.post('/insertStockTaking', checkData,validatestockTakingStructure.validatestockTakingStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertStockTaking.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertStockTaking.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});



router.post("/updateStockTaking/:INV_STOCKTAKING_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatestockTakingStructure.composeupdatestatement(
      "inv_stocktaking",
      req.body,
      "INV_STOCKTAKING_ID = " + req.params.INV_STOCKTAKING_ID
    ),
    []
  );
});





module.exports = router;
