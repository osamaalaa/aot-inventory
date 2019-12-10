require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./supplierssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateSuplliers = require('@lib/validatestructure');

router.get('/getSuppliers', function (req, res)
{
    servicePool(req, res, statements.getSuppliers.statment, []);
});

router.get('/getSupplierByID/:SUPPLIER_ID', function (req, res) {
    servicePool(req, res, statements.getSupplierByID.statment, {'SUPPLIER_ID':req.params.SUPPLIER_ID});
});

router.post('/insertSupplier',checkData, validateSuplliers.validatesuppliersStructure, (req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertSupplier.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertSupplier.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});


router.post("/updateSupplier/:SUPPLIER_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateSuplliers.composeupdatestatement(
      "suppliers",
      req.body,
      "SUPPLIER_ID = " + req.params.SUPPLIER_ID
    ),
    []
  );
});

router.delete(`/deleteSupplier/:SUPPLIER_ID`, function (req, res){
  servicePool(req, res, statements.deleteSupplier.statement, {'SUPPLIER_ID':req.params.SUPPLIER_ID});
});



module.exports = router;
