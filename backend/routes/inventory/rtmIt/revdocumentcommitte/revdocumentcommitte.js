require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./revdocumentcommittesql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateRcvDocCommitte = require('@lib/validatestructure');

router.get('/getAllRevDocumentCommitte', (req, res)=>{
    servicePool(req, res,
                statements.getAllRevDocumentCommitte.statement,
                []
                );
});

router.get('/getOneRevDocumentCommitte/:RCV_DOCUMENT_COMMITTEE_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneRevDocumentCommitte.statement,
               {'RCV_DOCUMENT_COMMITTEE_ID' :req.params.RCV_DOCUMENT_COMMITTEE_ID}
               );
});

router.post('/insertNewRevDocumentCommitte', checkData, validateRcvDocCommitte.validateRcvDocumentCommitteStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewRevDocumentCommitte.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertNewRevDocumentCommitte.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updateRevDocumentCommitte/:RCV_DOCUMENT_COMMITTEE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateRcvDocCommitte.composeupdatestatement(
      "RCV_DOCUMENT_COMMITTEE",
      req.body,
      "RCV_DOCUMENT_COMMITTEE_ID = " + req.params.RCV_DOCUMENT_COMMITTEE_ID
    ),
    []
  );
});


module.exports = router;
