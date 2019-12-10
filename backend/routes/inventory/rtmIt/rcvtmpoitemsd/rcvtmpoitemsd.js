require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvtmpoitemsdsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatercvTempoItemsD = require('@lib/validatestructure');

router.get('/getAllrcvTmpoItemsD', (req, res)=>{
  let statement = statements.getAllrcvTmpoItemsD.statement;
  let binding = [];
  if(req.query.RCV_TEMP_ITEMS_ID){
      statement = statement + ` and RCV_TEMP_ITEMS_ID = :RCV_TEMP_ITEMS_ID`;
      binding = {'RCV_TEMP_ITEMS_ID':Number(req.query.RCV_TEMP_ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOnercvTmpoItemsD/:RCV_TEMP_ITEMS_D_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnercvTmpoItemsD.statement,
               {'RCV_TEMP_ITEMS_D_ID' :req.params.RCV_TEMP_ITEMS_D_ID}
               );
});

router.post('/insertrcvTmpoItemsD', checkData, validatercvTempoItemsD.validatercvTempoItemsDStructure ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertrcvTmpoItemsD.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertrcvTmpoItemsD.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updatercvTmpoItemsD/:RCV_TEMP_ITEMS_D_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatercvTempoItemsD.composeupdatestatement(
      "RCV_TEMPORARY_ITEMS_D",
      req.body,
      "RCV_TEMP_ITEMS_D_ID = " + req.params.RCV_TEMP_ITEMS_D_ID
    ),
    []
  );
});

router.post('/deleteRcvTempoItemsD', checkData, (req,res) => {
  servicePool(
  req,
  res,
  statements.deleteRcvTempoiTEMSD.statement,
  { "DELETED_BY" : req.body.DELETED_BY, "RCV_TEMP_ITEMS_D_ID" : req.body.RCV_TEMP_ITEMS_D_ID});
});
module.exports = router;
