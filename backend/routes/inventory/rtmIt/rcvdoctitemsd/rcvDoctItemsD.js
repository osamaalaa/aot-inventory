require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvdoctitemsdsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateRcvDocItemsD = require('@lib/validatestructure');

router.get('/getAllrcvDoctItemsD', (req, res)=>{
  let statement = statements.getAllrcvDoctItemsD.statement;
  let binding = [];
  if(req.query.RCV_DOCUMENT_ITEMS_ID){
      statement = statement + ` and RCV_DOCUMENT_ITEMS_ID = :RCV_DOCUMENT_ITEMS_ID`;
      binding = {'RCV_DOCUMENT_ITEMS_ID':Number(req.query.RCV_DOCUMENT_ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOnercvDoctItemsD/:RCV_DOCUMENT_ITEMS_D_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnercvDoctItemsD.statement,
               {'RCV_DOCUMENT_ITEMS_D_ID' :req.params.RCV_DOCUMENT_ITEMS_D_ID}
               );
});

router.post('/insertrcvDoctItemsD', checkData, validateRcvDocItemsD.validatercvDocItemsDStructure ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertrcvDoctItemsD.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertrcvDoctItemsD.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post("/updatercvDoctItemsD/:RCV_DOCUMENT_ITEMS_D_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateRcvDocItemsD.composeupdatestatement(
      "RCV_DOCUMENT_ITEMS_D",
      req.body,
      "RCV_DOCUMENT_ITEMS_D_ID = " + req.params.RCV_DOCUMENT_ITEMS_D_ID
    ),
    []
  );
});


router.post('/deleteRcvDocumentItemsDetails', checkData,(req, res) => {

  
  servicePool(
    req,
    res,
    statements.deleteRcvDocumentItemsDetails.statement,
    { "DELETED_BY": req.body.DELETED_BY, "RCV_DOCUMENT_ITEMS_D_ID": req.body.RCV_DOCUMENT_ITEMS_D_ID });
 })


 
 




module.exports = router;
