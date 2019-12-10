require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./invstockstoressql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateInvStockStores = require('@lib/validatestructure');

router.get('/getAllInvStockStores', (req, res)=>{
    servicePool(req, res,
                statements.getAllInvStockStores.statement,
                []
                );
});

router.get('/getOneInvStockStores/:INV_STOCKTAKING_STORES_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneInvStockStores.statement,
               {'INV_STOCKTAKING_STORES_ID' :req.params.INV_STOCKTAKING_STORES_ID}
               );
});

router.post('/insertInvStockStores', checkData, validateInvStockStores.validateinvStockStoresStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertInvStockStores.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertInvStockStores.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post("/updateInvStockStores/:INV_STOCKTAKING_STORES_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateInvStockStores.composeupdatestatement(
      "INV_STOCKTAKING_STORES",
      req.body,
      "INV_STOCKTAKING_STORES_ID = " + req.params.INV_STOCKTAKING_STORES_ID
    ),
    []
  );
});


module.exports = router;
