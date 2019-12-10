require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./storesitemsgroupsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatestoresItemsGroupStructure = require('@lib/validatestructure');

router.get('/storesItemsGroup/getStoresItemsGroup', function (req, res) {
    servicePool(req, res, statements.getStoresItemsGroup.statment, []);
});

router.get('/storesItemsGroup/getStoreItemGroupByID/:STORES_ITEMS_GROUP_ID', function (req, res) {
    servicePool(req, res, statements.getStoreItemGroupByID.statment, {'STORES_ITEMS_GROUP_ID':req.params.STORES_ITEMS_GROUP_ID});
});


router.post('/storesItemsGroup/insertStoresItemsGroups',checkData ,validatestoresItemsGroupStructure.validatestoresItemsGroupStructure ,(req,res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertStoresItemsGroups.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertStoresItemsGroups.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/deleteStorese',checkData , (req,res) => {
  servicePool(
  req,
  res,
  statements.deleteStoreItemGroup.statement,
  { "DELETED_BY" : req.body.DELETED_BY, "STORES_ITEMS_GROUP_ID" : req.body.Stores_Item_Id});
});


router.post("/storesItemsGroup/updateStoreItemsGroup/:STORES_ITEMS_GROUP_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatestoresItemsGroupStructure.composeupdatestatement(
      "stores_items_group",
      req.body,
      "STORES_ITEMS_GROUP_ID = " + req.params.STORES_ITEMS_GROUP_ID
    ),
    []
  );
});

module.exports = router;
