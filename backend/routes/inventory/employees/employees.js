require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./employeessql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateemp = require('@lib/validatestructure');


router.get('/getAllEmployees', (req, res)=>{
  servicePool(req,
              res,
              statements.getAllEmployees.statement,
              []
            );
});

router.get('/getEmpsNames', (req, res)=>{
  servicePool(req,
              res,
              statements.getEmpsNames.statement,
              []
            );
});

router.get('/getOneEmployeeByID/:EMPLOYEE_ID', (req, res)=>{
  servicePool(req,
              res,
              statements.getOneEmployeeByID.statement,
              {'EMPLOYEE_ID' :req.params.EMPLOYEE_ID}
            );
});

module.exports = router;
//----------------
