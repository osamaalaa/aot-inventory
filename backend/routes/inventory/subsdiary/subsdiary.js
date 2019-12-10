require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./subsdiarysql');
let bodyconverter = require('@conv/bodyConverter');
let checkdataexists = require("@vals/dataexists");
let validatesubsDiary = require('@lib/validatestructure');


router.get('/getsubsDiary', function (req, res) {
    servicePool(req, res, statements.getsubsDiary.statment, []);
});

router.get('/getSubsDiaryByID/:SUBSIDIARY_ID', function (req, res) {
    servicePool(req, res, statements.getSubsDiaryByID.statment, {'SUBSIDIARY_ID':req.params.SUBSIDIARY_ID});
});

router.post('/insertSubidiary',checkdataexists,validatesubsDiary.validatesubsDiaryStructure,(req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertSubidiary.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertSubidiary.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/deletesubsDiary',checkdataexists, (req,res) => {
    servicePool(
    req,
    res,
    statements.deletesubsDiary.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "SUBSIDIARY_ID" : req.body.SUBSIDIARY_ID},
    statements.deletesubsDiary.requireCommit);
});


router.post("/updateSubsDiary/:SUBSIDIARY_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validatesubsDiary.composeupdatestatement(
      "subsidiary_inv_setup",
      req.body,
      "SUBSIDIARY_ID = " + req.params.SUBSIDIARY_ID
    ),
    []
  );
});


module.exports = router;
