require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvtempocommittesql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatercvTempoCommitte = require('@lib/validatestructure');

router.get('/getAllrcvTempoCommitte', (req, res)=>{
    servicePool(req, res,
                statements.getAllrcvTempoCommitte.statement,
                []
                );
});

router.get('/getOnercvTempoCommitte/:RCV_TEMPORARY_COMMITTEE_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnercvTempoCommitte.statement,
               {'RCV_TEMPORARY_COMMITTEE_ID' :req.params.RCV_TEMPORARY_COMMITTEE_ID}
               );
});

router.post('/insertrcvTempoCommitte', checkData, validatercvTempoCommitte.validatercvTempoCommitteStructure ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertrcvTempoCommitte.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertrcvTempoCommitte.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});



router.post("/updatercvTempoCommitte/:RCV_TEMPORARY_COMMITTEE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatercvTempoCommitte.composeupdatestatement(
      "RCV_TEMPORARY_COMMITTEE",
      req.body,
      "RCV_TEMPORARY_COMMITTEE_ID = " + req.params.RCV_TEMPORARY_COMMITTEE_ID
    ),
    []
  );
});

module.exports = router;
