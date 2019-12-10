require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./invbalancerequestitemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateInvBalanceReqItems = require('@lib/validatestructure');

router.get('/getAllInvBalanceReqItems', (req, res)=>{
    servicePool(req, res,
                statements.getAllInvBalanceReqItems.statement,
                []
                );
});

router.get('/getOneInvBalanceReqItems/:INV_BALANCE_REQUEST_ITEMS_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneInvBalanceReqItems.statement,
               {'INV_BALANCE_REQUEST_ITEMS_ID' :req.params.INV_BALANCE_REQUEST_ITEMS_ID}
               );
});

router.post('/insertInvBalanceReqItems', checkData, validateInvBalanceReqItems.validateinvBalanceRequestItemsStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertInvBINV_BALANCE_REQUEST_ITEMSalanceReqItems.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertInvBalanceReqItems.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updateInvBalanceReqItems/:INV_BALANCE_REQUEST_ITEMS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateInvBalanceReqItems.composeupdatestatement(
      "INV_BALANCE_REQUEST_ITEMS",
      req.body,
      "INV_BALANCE_REQUEST_ITEMS_ID = " + req.params.INV_BALANCE_REQUEST_ITEMS_ID
    ),
    []
  );
});

module.exports = router;
