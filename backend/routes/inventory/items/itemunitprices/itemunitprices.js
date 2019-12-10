require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./itemunitpricessql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateitemPrice = require('@lib/validatestructure');


router.get('/getAllItemUnitPrices', function (req, res) {
    servicePool(req, res, statements.getAllItemUnitPrices.statment, []);
});

//-------
router.get('/getOneItemUnitPrices/:ITEMS_UNITS_PRICES_ID', function (req, res) {
    servicePool(req, res, statements.getOneItemUnitPrices.statment, {'ITEMS_UNITS_PRICES_ID':req.params.ITEMS_UNITS_PRICES_ID});
});

//--------
router.post('/insertItemUnitPrices', checkData,validateitemPrice.validateitemPriceStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertItemUnitPrices.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertItemUnitPrices.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});
// delete
router.post('/deleteItemUnitPrices/:ITEMS_UNITS_PRICES_ID'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteItemUnitPrices.statement,
    { "ITEMS_UNITS_PRICES_ID" : req.params.ITEMS_UNITS_PRICES_ID});

});
//UPDATED
router.post("/UPDATEITEMPRICES/:ITEMS_UNITS_PRICES_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateitemPrice.composeupdatestatement(
      "ITEMS_UNITS_PRICES",
      req.body,
      "ITEMS_UNITS_PRICES_ID = " + req.params.ITEMS_UNITS_PRICES_ID
    ),
    []
  );
});

module.exports = router;
