require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./itemsunitssql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateitemUnits = require('@lib/validatestructure');


router.get("/itemsUnits/getallitemUnits", function(req, res) {
  let statement = statements.getallitemUnits.statement;
  let binding = [];
  if(req.query.ITEMS_ID){
      statement = statement + ` and ITEMS_ID = :ITEMS_ID`;
      binding = {'ITEMS_ID':Number(req.query.ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});

//----------------------------------------------------------------
router.get('/itemsUnits/getoneitemUnits/:ITEMS_UNITS_ID', function (req, res) {
  servicePool(req, res, statements.getoneitemUnits.statment, {'ITEMS_UNITS_ID' :req.params.ITEMS_UNITS_ID});
});

//--------------------------------------------------------------------

router.post('/itemsUnits/insertnewitemUnits',checkdataexists, validateitemUnits.validateitemsUnitsStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertnewitemUnits.returns).then(convertedbody=>{
      servicePool(req,res,statements.insertnewitemUnits.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

//---------------------------------------------
router.post('/itemsUnits/deleteItemUnits',checkdataexists , (req,res) => {
  servicePool(
    req,
    res,
    statements.deleteItemUnits.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "ITEMS_UNITS_ID" : req.body.ITEMS_UNITS_ID});


});

router.post("/itemsUnits/updateitemUnits/:items_units_id", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateitemUnits.composeupdatestatement(
      "items_units",
      req.body,
      "items_units_id = " + req.params.items_units_id),
    []
  );
});


module.exports = router;
