require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./storesitemsgroupnosql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateStoresItmGroupNO = require('@lib/validatestructure');

router.get('/getAllstoresItemsGroupNO', (req, res)=>{
    servicePool(req, res,
                statements.getAllstoresItemsGroupNO.statement,
                []
                );
});

router.get('/getOnestoresItemsGroupNO/:STORES_ITEMS_GROUP_NO_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnestoresItemsGroupNO.statement,
               {'STORES_ITEMS_GROUP_NO_ID' :req.params.STORES_ITEMS_GROUP_NO_ID}
               );
});

router.post('/insertstoresItemsGroupNO', checkData, validateStoresItmGroupNO.validatestoresItemsGroupNOStructure ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertstoresItemsGroupNO.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertstoresItemsGroupNO.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});
router.post('/deleteStoreseItemsGroupNo',checkData , (req,res) => {
  servicePool(
  req,
  res,
  statements.deleteStoreItemGroupNo.statement,
  { "DELETED_BY" : req.body.DELETED_BY, "STORES_ITEMS_GROUP_NO_ID" : req.body.Stores_Items_Group_No_Id});
});

router.post("/updateStoresItemsGroupNO/:STORES_ITEMS_GROUP_NO_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateStoresItmGroupNO.composeupdatestatement(
      "STORES_ITEMS_GROUP_NO",
      req.body,
      "STORES_ITEMS_GROUP_NO_ID = " + req.params.STORES_ITEMS_GROUP_NO_ID
    ),
    []
  );
});


module.exports = router;
