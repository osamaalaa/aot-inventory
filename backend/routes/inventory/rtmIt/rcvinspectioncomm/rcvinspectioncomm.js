require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvinspectioncommsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatercvInspectionCommittee = require('@lib/validatestructure');

router.get('/getAllrcvInspectionComm', (req, res)=>{
    servicePool(req, res,
                statements.getAllrcvInspectionComm.statement,
                []
                );
});

router.get('/getOnercvInspectionComm/:RCV_INSPECTION_COMMITTEE_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnercvInspectionComm.statement,
               {'RCV_INSPECTION_COMMITTEE_ID' :req.params.RCV_INSPECTION_COMMITTEE_ID}
               );
});

router.post('/insertrcvInspectionComm', checkData, validatercvInspectionCommittee.validatercvInspectionCommittee ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertrcvInspectionComm.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertrcvInspectionComm.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post("/updatercvInspectionComm/:RCV_INSPECTION_COMMITTEE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatercvInspectionCommittee.composeupdatestatement(
      "RCV_INSPECTION_COMMITTEE",
      req.body,
      "RCV_INSPECTION_COMMITTEE_ID = " + req.params.RCV_INSPECTION_COMMITTEE_ID
    ),
    []
  );
});

module.exports = router;
