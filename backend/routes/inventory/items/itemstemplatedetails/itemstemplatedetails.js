require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./itemstemplatedetailssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateItmTempDetails = require('@lib/validatestructure');

router.get('/getAllitmTempDetails', (req, res)=>{
    servicePool(req, res,
                statements.getAllitmTempDetails.statement,
                []
                );
});

router.get('/getOneitmTempDetails/:ITEMS_TEMPLATE_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneitmTempDetails.statement,
               {'ITEMS_TEMPLATE_ID' :req.params.ITEMS_TEMPLATE_ID}
               );
});

router.post('/insertitmTempDetails', checkData, validateItmTempDetails.validateitmTempDetailsStructure ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertitmTempDetails.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertitmTempDetails.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});
router.put('/updateitmTempDetails', checkData, validateItmTempDetails.validateitmTempDetailsStructure ,  (req, res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.updateItmTempDetails.returns).then(convertedbody=>{
        servicePool(req,res,statements.updateItmTempDetails.statement,req.body);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updateItemTempDetails/:ITEMS_TEMPLATE_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateItmTempDetails.composeupdatestatement(
      "ITEMS_TEMPLATE_DETAILS",
      req.body,
      "ITEMS_TEMPLATE_ID = " + req.params.ITEMS_TEMPLATE_ID),
    []
  );
});

module.exports = router;
