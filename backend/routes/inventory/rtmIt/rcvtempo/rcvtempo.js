require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvtemposql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatercvTempo = require('@lib/validatestructure');

router.get('/getRcvTempo', function (req, res) {
  let statement = statements.getRcvTempo.statment;
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

router.get('/getRcvTempobyID/:DOCUMENT_ID',function (req, res) {
    servicePool(req, res, statements.getRcvTempobyID.statment, {'DOCUMENT_ID':req.params.DOCUMENT_ID});
});

router.post('/insertRcvTempo',checkData,validatercvTempo.validatercvTempoStructure,(req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertRcvTempo.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertRcvTempo.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/deleteRcvTempo', checkData, (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteRcvTempo.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "DOCUMENT_ID" : req.body.DOCUMENT_ID});
});



router.post("/updateRcvTempoById/:DOCUMENT_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatercvTempo.composeupdatestatement(
      "rcv_temporary",
      req.body,
      "DOCUMENT_ID = " + req.params.DOCUMENT_ID
    ),
    []
  );
});

module.exports = router;
