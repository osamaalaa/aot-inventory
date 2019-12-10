require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./po-temp-items.sql');
let bodyconverter = require('@conv/bodyConverter');
let checkdataexists = require("@vals/dataexists");
let validateStores = require('@lib/validatestructure');
let businessPool = require('@lib/businessPool');



router.get('/',  (req, res) => {
  let statement = statements.selectAllPoTempItems.statment;
  let binding = [];
  if(req.query.PO_TEMP_ID){
      statement = statement + ` where PO_TEMP_ID = :PO_TEMP_ID`;
      binding = {'PO_TEMP_ID':Number(req.query.PO_TEMP_ID) }
  }
  servicePool(req, res, statement, binding);
});


router.get('/:PO_TEMP_ID', function (req, res) {
    // servicePool(req, res, statements.selectOnePoTemp.statment, {'PO_TEMP_ID':req.params.PO_TEMP_ID});
});

router.post("/:PO_TEMP_ITEMS_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateStores.composeupdatestatement(
      "PO_TEMP_ITEMS",
      req.body,
      "PO_TEMP_ITEMS_ID = " + req.params.PO_TEMP_ITEMS_ID
    ),
    []
  );
});

module.exports = router;
