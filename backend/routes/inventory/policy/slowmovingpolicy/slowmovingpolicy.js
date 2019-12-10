require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./slowmovingpolicysql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateslowMovingPolicy = require('@lib/validatestructure');

router.get('/slowMovingPolicy/getSmovingPolicy', function (req, res) {
    servicePool(req, res, statements.getSmovingPolicy.statment, []);
});

router.get('/slowMovingPolicy/getSmovingPolicyByID/:SLOW_POLICY_ID', function (req, res) {
    servicePool(req, res, statements.getSmovingPolicyByID.statment, { "SLOW_POLICY_ID" :req.params.SLOW_POLICY_ID});
});

router.post('/slowMovingPolicy/insertSmovingPolicy', checkData, validateslowMovingPolicy.validateslowMovingPolicyStructure ,(req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertSmovingPolicy.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertSmovingPolicy.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});




router.post('/slowMovingPolicy/deleteSmovingPolicy',checkData, (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteSmovingPolicy.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "SLOW_POLICY_ID" : req.body.SLOW_POLICY_ID});
});






router.post("/updateMovingPolicy/:SLOW_POLICY_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateslowMovingPolicy.composeupdatestatement(
      "slow_moving_policy",
      req.body,
      "SLOW_POLICY_ID = " + req.params.SLOW_POLICY_ID
    ),
    []
  );
});








module.exports = router;
