require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./ddlogsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateDDLog = require('@lib/validatestructure');


router.get('/getddlLogs' ,function (req, res)
{
    servicePool(req, res, statements.getddlLogs.statment, []);
});

router.get('/getddlByID/:DDL_ID', function (req, res) {
    servicePool(req, res, statements.getddlByID.statment, {DDL_ID: req.params.DDL_ID });
});
//-----
router.post("/updateChartOfAccById/:ddl_id", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateDDLog.composeupdatestatement(
      "ddl_log",
      req.body,
      "ddl_id = " + req.params.ddl_id
    ),
    []
  );
});


module.exports = router;
//----------------
