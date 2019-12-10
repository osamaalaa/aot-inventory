require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvinspectionsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateRcvInspection = require('@lib/validatestructure');

router.get('/getAllRcvInspection', (req, res)=>{
  let statement = statements.getAllRcvInspection.statement;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  if(req.query.DOCUMENT_STATUS){
      statement = statement + ` and DOCUMENT_STATUS = :DOCUMENT_STATUS`;
      binding = {...binding,'DOCUMENT_STATUS':Number(req.query.DOCUMENT_STATUS) }
  }
  statement = statement + ` ORDER BY DOCUMENT_ID DESC`
  servicePool(req, res, statement, binding);
});

router.get('/getOneRcvInspection/:DOCUMENT_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneRcvInspection.statement,
               {'DOCUMENT_ID' :req.params.DOCUMENT_ID}
               );
});

router.post('/insertNewRcvInspection', checkData, validateRcvInspection.validatercvInspetionStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewRcvInspection.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertNewRcvInspection.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post("/updateRcvInspectionById/:DOCUMENT_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateRcvInspection.composeupdatestatement(
      "RCV_INSPECTION",
      req.body,
      "DOCUMENT_ID = " + req.params.DOCUMENT_ID
    ),
    []
  );
});

  router.post("/deleteRcvInspection", (req, res) => {
    servicePool(
      req,
      res,
      statements.deleteRcvInspection.statement,
      { "DELETED_BY": req.body.DELETED_BY, "DOCUMENT_ID": req.body.DOCUMENT_ID });
  })

module.exports = router;
