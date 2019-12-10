require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./storesitemsnosql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateStoresItmNO = require('@lib/validatestructure');

router.get('/getAllStoresItemsNO', (req, res)=>{
  let statement = statements.getAllStoresItemsNO.statement;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOneStoresItemsNO/:STORES_ITEMS_NO_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneStoresItemsNO.statement,
               {'STORES_ITEMS_NO_ID' :req.params.STORES_ITEMS_NO_ID}
               );
});

router.post('/insertStoresItemsNO', checkData, validateStoresItmNO.validatesstoresItemsNOStructure ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertStoresItemsNO.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertStoresItemsNO.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post('/deleteStoreItemNo', checkData ,(req,res) => {
  servicePool(
  req,
  res,
  statements.deleteStoreItemNo.statement,
  { "DELETED_BY" : req.body.DELETED_BY, STORES_ITEMS_NO_ID : req.body.STORES_ITEMS_NO_ID});
});


router.post("/updateStoresItemsNO/:STORES_ITEMS_NO_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateStoresItmNO.composeupdatestatement(
      "STORES_ITEMS_NO",
      req.body,
      "STORES_ITEMS_NO_ID = " + req.params.STORES_ITEMS_NO_ID
    ),
    []
  );
});

module.exports = router;
