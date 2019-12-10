require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./purorderdocsql');
let bodyconverter = require('@conv/bodyConverter');
let checkdataexists = require("@vals/dataexists");
let validateStores = require('@lib/validatestructure');
let businessPool = require('@lib/businessPool');


router.get('/selectAllpurDoc', function (req, res) {
  let statement = statements.selectAllpurDoc.statment;
  let binding = [];

  if(req.query.EMPLOYEE_ID){
      statement = statement + ` and EMPLOYEE_ID = :EMPLOYEE_ID`;
      binding = {'EMPLOYEE_ID':Number(req.query.EMPLOYEE_ID) }
  }
  servicePool(req, res, statement,binding);
});


router.get('/getOnePUDerDoc/:DOCUMENT_ID', function (req, res) {
    servicePool(req, res, statements.getOnePUDerDoc.statment,{
        'DOCUMENT_ID': req.params.DOCUMENT_ID
    });
  });



  router.get('/selectAllpurDocDetails', function (req, res) {
    let statement = statements.selectAllpurDocDetails.statment;
    let binding = [];
    if(req.query.DOCUMENT_ID){
        statement = statement + ` and DOCUMENT_ID = :DOCUMENT_ID`;
        binding = {'DOCUMENT_ID':Number(req.query.DOCUMENT_ID) }
    }
    servicePool(req, res, statement, binding);
  });


  router.get('/getOnePUDerDocDetails/:PUR_ORD_DOC_ITEMS_ID', function (req, res) {
      servicePool(req, res, statements.getOnePUDerDocDetails.statment,{
          'PUR_ORD_DOC_ITEMS_ID': req.params.PUR_ORD_DOC_ITEMS_ID
      });
    });


module.exports = router;
