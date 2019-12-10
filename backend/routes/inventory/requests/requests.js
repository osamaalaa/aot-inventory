require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./requestssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateRequests= require('@lib/validatestructure');


router.get('/getAllRequests', (req, res) => {
  servicePool(req, res,
    statements.getAllRequests.statement,
    []
  );
});

router.post('/deleteOneRequest', checkData, (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteOneRequest.statement,
    { "DELETED_BY": req.body.DELETED_BY, "REQUEST_ID": req.body.REQUEST_ID });
});

router.get('/getOneRequestByType/:REQUEST_TYPE', (req, res) => {
  servicePool(req, res,
    statements.getOneRequestByType.statement,
    { 'REQUEST_TYPE': req.params.REQUEST_TYPE }
  );

});


router.get('/getRequest/:spEmployeeId/:p_reqClassification', (req, res) => {
  servicePool(req, res,
            statements.getRequest.statement,
            {spEmployeeId : req.params.spEmployeeId,
              p_reqClassification : req.params.p_reqClassification}
          );
});

// router.post('/insertnewRequest', checkData, validateRequests.validaterequestStructure, (req, res)=>{
//
//     bodyconverter.bodyconverter(req,res,req.body,statements.insertnewRequest.returns).then(convertedbody=>{
//         servicePool(req,res,statements.insertnewRequest.statement,convertedbody);
//     }).catch(error => { res.status(400).json(error); });
//
// });






module.exports = router;
