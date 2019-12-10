require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./po-temp.sql');
let bodyconverter = require('@conv/bodyConverter');
let checkdataexists = require("@vals/dataexists");
let validateStores = require('@lib/validatestructure');
let businessPool = require('@lib/businessPool');


router.get('/', function (req, res){
  let statement = statements.selectAllPoTemp.statment;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` where STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  if(req.query.EMPLOYEE_ID){
      statement = statement + ` and EMPLOYEE_ID = :EMPLOYEE_ID`;
      binding = {...binding,'EMPLOYEE_ID':Number(req.query.EMPLOYEE_ID) }
  }
  servicePool(req, res, statement, binding);
});
router.get('/:PO_TEMP_ID', function (req, res) {
  servicePool(req, res, statements.getOnePoTemp.statment, {
    'PO_TEMP_ID': req.params.PO_TEMP_ID
  });
});

router.post('/purchaseOrderRequestNew',checkdataexists,(req,res)=>{
    servicePool(req, res, statements.purchaseOrderReqNew.statment,
      {
        'STORES_ID':req.body.STORES_ID,
        'EMP_ID':req.body.EMP_ID
      }
    );
})

router.post('/purchaseOrderRequestAction',checkdataexists,(req,res)=>{
    servicePool(req, res, statements.purchaseOrderReqAction.statment,
      {
        'STORES_ID':req.body.STORES_ID,
        'EMP_ID':req.body.EMP_ID
      }
      );
})



// router.get('/:PO_TEMP_ID', function (req, res) {
//     servicePool(req, res, statements.selectOnePoTemp.statment, {'PO_TEMP_ID':req.params.PO_TEMP_ID});
// });

// router.post("/:PO_TEMP_ID", checkdataexists, (req, res) => {
//   servicePool(
//     req,
//     res,
//     validateStores.composeupdatestatement(
//       "PO_TEMP",
//       req.body,
//       "PO_TEMP_ID = " + req.params.PO_TEMP_ID
//     ),
//     []
//   );
// });

module.exports = router;
