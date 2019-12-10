require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./vatschemesql');
let bodyconverter = require('@conv/bodyConverter');
let checkdataexists = require("@vals/dataexists");
let validateVat = require('@lib/validatestructure');


//----------------------
router.get('/getScheme', function (req, res)
{
    servicePool(req, res, statements.getScheme.statment, []);
});

router.get('/getSchemeByID/:VAT_SCHEME_ID', function (req, res) {
    servicePool(req, res, statements.getSchemeByID.statment, {'VAT_SCHEME_ID':req.params.VAT_SCHEME_ID});
});

router.post('/insertScheme',checkdataexists, validateVat.validatevatSchemeStructure,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertScheme.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertScheme.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/deleteScheme', checkdataexists , (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteScheme.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "VAT_SCHEME_ID" : req.body.VAT_SCHEME_ID});
});


router.post("/updateVatSchemeById/:VAT_SCHEME_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateVat.composeupdatestatement(
      "vat_scheme",
      req.body,
      "VAT_SCHEME_ID = " + req.params.VAT_SCHEME_ID
    ),
    []
  );
});


module.exports = router;

//----------------
