require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./inventoryperiodsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateInvPeriod = require('@lib/validatestructure');

router.get('/getAllInventoryPeriod', (req, res) => {
  servicePool(req, res,
    statements.getAllInventoryPeriod.statement,
    []
  );
});

router.get('/getOneInventoryPeriod/:INVENTORY_PERIODS_ID', (req, res) => {
  servicePool(req, res,
    statements.getOneInventoryPeriod.statement,
    { 'INVENTORY_PERIODS_ID': req.params.INVENTORY_PERIODS_ID }
  );
});

router.post('/insertInventoryPeriod', checkData, validateInvPeriod.validateinvPeriodsStructure, (req, res) => {

  bodyconverter.bodyconverter(req, res, req.body, statements.insertInventoryPeriod.returns).then(convertedbody => {
    servicePool(req, res, statements.insertInventoryPeriod.statement, convertedbody);
  }).catch(error => { res.status(400).json(error); });

});

router.post("/updateInventoryPeriod/:INVENTORY_PERIODS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateInvPeriod.composeupdatestatement(
      "INVENTORY_PERIODS",
      req.body,
      "INVENTORY_PERIODS_ID = " + req.params.INVENTORY_PERIODS_ID
    ),
    []
  );
});


router.post('/deleteInventoryPeriod', checkData, (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteInventoryPeriod.statement,
    { "DELETED_BY": req.body.DELETED_BY, "INVENTORY_PERIODS_ID": req.body.INVENTORY_PERIODS_ID });
});

module.exports = router;
