require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./storesdoctypessql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateStoresDocTypes = require('@lib/validatestructure');

router.get('/storesDocTypes/getAllstoresDocTypes', (req, res)=>{
  let statement = statements.getAllstoresDocTypes.statement;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/storesDocTypes/getOnestoresDocTypes/:STORES_DOCUMENT_TYPES_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnestoresDocTypes.statement,
               {'STORES_DOCUMENT_TYPES_ID' :req.params.STORES_DOCUMENT_TYPES_ID}
               );
});

router.post('/storesDocTypes/insertstoresDocTypes', checkData, validateStoresDocTypes.validatestoresDocTypesstructure ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertstoresDocTypes.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertstoresDocTypes.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/storesDocTypes/updateStoresDocById/:STORES_DOCUMENT_TYPES_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateStoresDocTypes.composeupdatestatement(
      "STORES_DOCUMENT_TYPES",
      req.body,
      "STORES_DOCUMENT_TYPES_ID = " + req.params.STORES_DOCUMENT_TYPES_ID
    ),
    []
  );
});

router.post('/storesDocTypes/deleteStoresDocById', checkData ,(req,res) => {
  servicePool(
  req,
  res,
  statements.deleteStoreDocumentType.statement,
  { "DELETED_BY" : req.body.DELETED_BY, STORES_DOCUMENT_TYPES_ID : req.body.STORES_DOCUMENT_TYPES_ID});
});


module.exports = router;
