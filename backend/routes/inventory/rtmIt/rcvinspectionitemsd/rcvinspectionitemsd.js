require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./rcvinspectionitemsdsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatercvInspectionItemsD = require('@lib/validatestructure');

router.get('/getAllrcvInspectionItemsD', (req, res)=>{
  let statement = statements.getAllrcvInspectionItemsD.statement;
  let binding = [];
  if(req.query.RCV_INSPECTION_ITEMS_ID){
      statement = statement + ` and RCV_INSPECTION_ITEMS_ID = :RCV_INSPECTION_ITEMS_ID`;
      binding = {'RCV_INSPECTION_ITEMS_ID':Number(req.query.RCV_INSPECTION_ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/getOnercvInspectionItemsD/:RCV_INSPECTION_ITEMS_D_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnercvInspectionItemsD.statement,
               {'RCV_INSPECTION_ITEMS_D_ID' :req.params.RCV_INSPECTION_ITEMS_D_ID}
               );
});

router.post('/insertrcvInspectionItemsD', checkData, validatercvInspectionItemsD.validatercvInspectionItemsDStructure ,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertrcvInspectionItemsD.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertrcvInspectionItemsD.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});

router.post("/updatercvInspectionItemsD/:RCV_INSPECTION_ITEMS_D_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatercvInspectionItemsD.composeupdatestatement(
      "RCV_INSPECTION_ITEMS_D",
      req.body,
      "RCV_INSPECTION_ITEMS_D_ID = " + req.params.RCV_INSPECTION_ITEMS_D_ID
    ),
    []
  );
});
router.post("/deleteRcvInspectionItemsD", (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteRcvInspectionItemsD.statement,
    { "DELETED_BY": req.body.DELETED_BY, "RCV_INSPECTION_ITEMS_D_ID": req.body.RCV_INSPECTION_ITEMS_D_ID });
})

module.exports = router;
