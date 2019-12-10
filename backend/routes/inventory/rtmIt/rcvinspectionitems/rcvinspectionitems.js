require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvinspectionitemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatercvInspectionItems = require('@lib/validatestructure');

router.get('/getAllrcvInspectionItems', (req, res)=>{
  let statement = statements.getAllrcvInspectionItems.statement;
  let binding = [];
  if(req.query.DOCUMENT_ID){
      statement = statement + ` and DOCUMENT_ID = :DOCUMENT_ID`;
      binding = {'DOCUMENT_ID':Number(req.query.DOCUMENT_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOnercvInspectionItems/:RCV_INSPECTION_ITEMS_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnercvInspectionItems.statement,
               {'RCV_INSPECTION_ITEMS_ID' :req.params.RCV_INSPECTION_ITEMS_ID}
               );
});

router.post('/insertrcvInspectionItems', checkData, validatercvInspectionItems.validatercvInspectionItemsStructure ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertrcvInspectionItems.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertrcvInspectionItems.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});



router.post("/updatercvInspectionItems/:RCV_INSPECTION_ITEMS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatercvInspectionItems.composeupdatestatement(
      "RCV_INSPECTION_ITEMS",
      req.body,
      "RCV_INSPECTION_ITEMS_ID = " + req.params.RCV_INSPECTION_ITEMS_ID
    ),
    []
  );
});

router.post("/deleteRcvInspectionItems", (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteRcvInspectionItems.statement,
    { "DELETED_BY": req.body.DELETED_BY, "RCV_INSPECTION_ITEMS_ID": req.body.RCV_INSPECTION_ITEMS_ID });
})
module.exports = router;
