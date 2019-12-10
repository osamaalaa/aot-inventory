require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./taxschemedetailssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatetaxSchemeDetailStructure = require('@lib/validatestructure');

router.get('/TaxSchemeDetail/getTaxSchemesDetails', function (req, res)
{
    servicePool(req, res, statements.getTaxSchemesDetails.statment, []);
});

router.get('/TaxSchemeDetail/gettaxSchemeDetailByID/:TAX_SCHEME_DETAIL_ID', function (req, res) {
    servicePool(req, res, statements.gettaxSchemeDetailByID.statment, {'TAX_SCHEME_DETAIL_ID':req.params.TAX_SCHEME_DETAIL_ID});
});

router.get('/TaxSchemeDetail/gettaxSchemeDetailByTaxSchemaID/:TAX_SCHEME_ID', function (req, res) {
    servicePool(req, res, statements.gettaxSchemeDetailByTaxSchemaID.statment, {'TAX_SCHEME_ID':req.params.TAX_SCHEME_ID});
});

router.post('/TaxSchemeDetail/inserttaxSchemeDetail',checkData, validatetaxSchemeDetailStructure.validatetaxSchemeDetailStructure, (req,res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.inserttaxSchemeDetail.returns).then(convertedbody=>{
        servicePool(req,res,statements.inserttaxSchemeDetail.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/TaxSchemeDetail/deletetaxSchemeDetail',checkData , (req,res) => {
    servicePool(
    req,
    res,
    statements.deletetaxSchemeDetail.statement,
    { "DELETED_BY" : req.body.TAX_SCHEME_DETAIL_ID, "TAX_SCHEME_DETAIL_ID" : req.body.TAX_SCHEME_DETAIL_ID});
});

router.post("/TaxSchemeDetail/updateTaxSchemeDetail/:TAX_SCHEME_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatetaxSchemeDetailStructure.composeupdatestatement(
      "tax_scheme_detail",
      req.body,
      "TAX_SCHEME_ID = " + req.params.TAX_SCHEME_ID
    ),
    []
  );
});


module.exports = router;
