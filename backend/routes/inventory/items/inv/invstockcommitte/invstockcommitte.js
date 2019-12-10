require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./invstockcommittesql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateInvStockSommitte = require('@lib/validatestructure');

router.get('/getAllInvStockCommitte', (req, res)=>{
    let statement = statements.getAllInvStockCommitte.statement;
  let binding = [];
  if(req.query.INV_STOCKTAKING_ID){
      statement = statement + ` and INV_STOCKTAKING_ID = :INV_STOCKTAKING_ID`;
      binding = {'INV_STOCKTAKING_ID':Number(req.query.INV_STOCKTAKING_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOneInvStockCommitte/:INV_STOCKTAKING_COMMITTEE_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneInvStockCommitte.statement,
               {'INV_STOCKTAKING_COMMITTEE_ID' :req.params.INV_STOCKTAKING_COMMITTEE_ID}
               );
});

router.post('/insertInvStockCommitte', checkData, validateInvStockSommitte.validateinvStockCommitteStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertInvStockCommitte.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertInvStockCommitte.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post("/updateInvStockCommitte/:INV_STOCKTAKING_COMMITTEE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateInvStockSommitte.composeupdatestatement(
      "INV_STOCKTAKING_COMMITTEE",
      req.body,
      "INV_STOCKTAKING_COMMITTEE_ID = " + req.params.INV_STOCKTAKING_COMMITTEE_ID
    ),
    []
  );
});

module.exports = router;
