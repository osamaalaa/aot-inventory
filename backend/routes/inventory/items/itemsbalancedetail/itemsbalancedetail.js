require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./itemsbalancedetailsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateitemsBalanceDetailStructure = require('@lib/validatestructure');


router.get('/itemBalance/getAllItemsBalanceDetail', function (req, res) {
    servicePool(req, res, statements.getAllItemsBalanceDetail.statment, []);
});

router.get('/itemBalance/getOneItemBalanceDetailByID/:ITEMS_BALANCE_DETAIL_ID', function (req, res) {
    servicePool(req, res, statements.getOneItemBalanceDetailByID.statment, {'ITEMS_BALANCE_DETAIL_ID':req.params.ITEMS_BALANCE_DETAIL_ID});
});


router.get('/itemBalance/getOneItemBalancesByID/:ITEMS_BALANCE_ID', function (req, res) {
  servicePool(req, res, statements.getOneItemBalancesByID.statment, {'ITEMS_BALANCE_ID':req.params.ITEMS_BALANCE_ID});
});

router.post('/itemBalance/insertItemBalanceDetail', checkData,validateitemsBalanceDetailStructure.validateitemsBalanceDetailStructure,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertItemBalanceDetail.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertItemBalanceDetail.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});




router.post('/itemBalance/deleteItemsBalanceDetail',checkData, (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteItemsBalanceDetail.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "ITEMS_BALANCE_DETAIL_ID" : req.body.ITEMS_BALANCE_DETAIL_ID});
});

//-------------
router.post("/itemBalance/updateItemBalanceDetail/:ITEMS_BALANCE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateitemsBalanceDetailStructure.composeupdatestatement(
      "items_balance_detail",
      req.body,
      "ITEMS_BALANCE_ID = " + req.params.ITEMS_BALANCE_ID
    ),
    []
  );
});



module.exports = router;
