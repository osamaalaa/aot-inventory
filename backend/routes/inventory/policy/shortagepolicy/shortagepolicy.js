require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./shortagepolicysql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatshortagePolicy = require('@lib/validatestructure');

router.get('/getShortagePolicy', function (req, res) {
    servicePool(req, res, statements.getShortagePolicy.statment, []);
});

router.get('/getShortagePolicyByID/:SHORTAGE_POLICY_ID', function (req, res) {
    servicePool(req, res, statements.getShortagePolicyByID.statment, {'SHORTAGE_POLICY_ID':req.params.SHORTAGE_POLICY_ID});
});

router.post('/insertShortagePolicy', checkData , validatshortagePolicy.validateshortagePolicyStructure, (req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertShortagePolicy.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertShortagePolicy.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/deleteShortagePolicy', checkData , (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteShortagePolicy.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "SHORTAGE_POLICY_ID" : req.body.SHORTAGE_POLICY_ID});
});




router.post("/updateShortagePolicy/:SHORTAGE_POLICY_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatshortagePolicy.composeupdatestatement(
      "shortage_policy",
      req.body,
      "SHORTAGE_POLICY_ID = " + req.params.SHORTAGE_POLICY_ID
    ),
    []
  );
});





module.exports = router;
