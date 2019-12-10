require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./taxschemesql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatetaxSchemeStructure = require('@lib/validatestructure');

router.get('/getTaxSchemes', function (req, res)
{
    servicePool(req, res, statements.getTaxSchemes.statment, []);
});

router.get('/gettaxSchemeByID/:TAX_SCHEME_ID', function (req, res) {
    servicePool(req, res, statements.gettaxSchemeByID.statment, {'TAX_SCHEME_ID':req.params.TAX_SCHEME_ID});
});

router.post('/inserttaxScheme',checkData, validatetaxSchemeStructure.validatetaxSchemeStructure, (req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.inserttaxScheme.returns).then(convertedbody=>{
        servicePool(req,res,statements.inserttaxScheme.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/deletetaxScheme',checkData , (req,res) => {
    servicePool(
    req,
    res,
    statements.deletetaxScheme.statement,
    { "DELETED_BY" : req.body.TAX_SCHEME_ID, "TAX_SCHEME_ID" : req.body.TAX_SCHEME_ID});
});



router.post("/updateTaxScheme/:TAX_SCHEME_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatetaxSchemeStructure.composeupdatestatement(
      "tax_scheme",
      req.body,
      "TAX_SCHEME_ID = " + req.params.TAX_SCHEME_ID
    ),
    []
  );
});

module.exports = router;
