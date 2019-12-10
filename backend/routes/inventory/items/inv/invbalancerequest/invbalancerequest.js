require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./invbalancerequestsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateInvBalanceReq = require('@lib/validatestructure');

router.get('/getAllInvBalanceRequest', (req, res)=>{
    servicePool(req, res,
                statements.getAllInvBalanceRequest.statement,
                []
                );
});

router.get('/getOneInvBalanceRequest/:INV_BALANCE_REQUEST_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneInvBalanceRequest.statement,
               {'INV_BALANCE_REQUEST_ID' :req.params.INV_BALANCE_REQUEST_ID}
               );
});

router.post('/insertInvBalanceRequest', checkData, validateInvBalanceReq.validateinvBalanceRequestStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertInvBalanceRequest.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertInvBalanceRequest.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post("/updateInvBalanceRequest/:INV_BALANCE_REQUEST_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateInvBalanceReq.composeupdatestatement(
      "INVENTORY_PERIODS",
      req.body,
      "INV_BALANCE_REQUEST_ID = " + req.params.INV_BALANCE_REQUEST_ID
    ),
    []
  );
});

module.exports = router;
