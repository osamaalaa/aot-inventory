require("module-alias/register");
let express = require("express");
let router = express.Router();
let statements = require("./jobordersql");
let servicePool = require('@lib/servicePool');
let checkdataexists = require("@vals/dataexists");
let bodyconverter = require("@conv/bodyConverter");


router.get('/getAllJobOrders', (req, res) =>{
  let statement = statements.getAllJobOrders.statement;
  let binding = [];
  if (req.query.EMPLOYEE_ID) {
    statement = `${statement} where EMPLOYEE_ID = :EMPLOYEE_ID`;
    binding = { 'EMPLOYEE_ID': Number(req.query.EMPLOYEE_ID) }
  }

  servicePool(req, res,
    statement,
    binding
  );
});


router.get('/getOneJobOrdersByID/:JOB_ORDER_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getOneJobOrdersByID.statement,
        {'JOB_ORDER_ID' :req.params.JOB_ORDER_ID}
      );
});

router.get('/getJobOrderByReqID/:REQUEST_ID', (req, res) =>{
  servicePool(req,
          res,
          statements.getJobOrderByReqID.statement,
        {'REQUEST_ID' :req.params.REQUEST_ID}
      );
});


router.post('/updateJobOrder/:JOB_ORDER_ID',checkdataexists , (req,res) => {
  servicePool(
  req,
  res,
  statements.updateJobOrder.statement,
  { 
    JOB_ORDER_ID : req.params.JOB_ORDER_ID ,
    STATUS : req.body.STATUS
  });
});

router.post('/createJobOrder', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.createJobOrder.returns).then(convertedbody => {
    servicePool(req, res, statements.createJobOrder.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});


module.exports = router ;
