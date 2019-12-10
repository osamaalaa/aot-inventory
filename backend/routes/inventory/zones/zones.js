require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./zonessql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatZone = require('@lib/validatestructure');

//----------------------
router.get('/getZones' ,function (req, res)
{
    servicePool(req, res, statements.getZones.statment, []);
});

router.get('/getZoneByID/:ZONE_ID', function (req, res) {
    servicePool(req, res, statements.getZoneByID.statment, {ZONE_ID: req.params.ZONE_ID });
});

router.post('/insertZone',checkData, validatZone.validatezonesStructure ,(req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertZone.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertZone.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/deleteZone' , checkData, (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteZone.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "ZONE_ID" : req.body.ZONE_ID});
});


router.post("/updateZonesById/:ZONE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatZone.composeupdatestatement(
      "zones",
      req.body,
      "ZONE_ID = " + req.params.ZONE_ID
    ),
    []
  );
});



module.exports = router;
//----------------
