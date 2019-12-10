require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./storeslocationsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatestoresLocation = require('@lib/validatestructure');

router.get('/storesLocation/selectAllstoresLocation', function (req, res) {
  let statement = statements.selectAllstoresLocation.statment;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/storesLocation/selectOnestoresLocation/:STORES_LOCATIONS_ID', function (req, res) {
    servicePool(req, res, statements.selectOnestoresLocation.statment, {'STORES_LOCATIONS_ID':req.params.STORES_LOCATIONS_ID});
});

router.post('/storesLocation/insertnewstoresLocation',checkData ,validatestoresLocation.validatestoresLocationStructure ,(req,res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertnewstoresLocation.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertnewstoresLocation.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/storesLocation/deletestoresLocation', checkData ,(req,res) => {
 // console.log(statements.deletestoresLocation.statement);
 // console.log()
    servicePool(
    req,
    res,
    statements.deletestoresLocation.statement,
    { STORES_LOCATIONS_ID : req.body.STORES_LOCATIONS_ID});
});

router.post("/updatestoresLocation/:STORES_LOCATIONS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatestoresLocation.composeupdatestatement(
      "stores_locations",
      req.body,
      "STORES_LOCATIONS_ID = " + req.params.STORES_LOCATIONS_ID
    ),
    []
  );
});



module.exports = router;
