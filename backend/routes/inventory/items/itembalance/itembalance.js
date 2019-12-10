require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./itembalancestatments");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateItemBalance = require('@lib/validatestructure');
let validateItmTempDetails = require('@lib/validatestructure');

//------------------------------------------------------------

// get
router.get('/itemBalance/getAllItemBalance', function(req, res) {
  let statement = statements.getAllItemBalance.statement;
  let binding = [];
  if(req.query.ITEMS_ID){
      statement = statement + ` and ITEMS_ID = :ITEMS_ID`;
      binding = {'ITEMS_ID':Number(req.query.ITEMS_ID) }
  }
  servicePool(
    req,
    res,
    statement,
    binding
  );
});

router.get("/itemBalance/getOneItemBalance/:ITEMS_BALANCE_ID", function(req, res) {
  servicePool(req, res, statements.getOneItemBalance.statement,
    {'ITEMS_BALANCE_ID':req.params.ITEMS_BALANCE_ID});
});


// insert
router.post('/itemBalance/insertNewItemBalance', checkdataexists, validateItemBalance.validateitemBalanceStructure,(req,res) =>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewItemBalance.returns)
    .then(convertedbody=>{
      servicePool(req,res,statements.insertNewItemBalance.statement,convertedbody);
    })
    .catch(error => { res.status(400).json(error); });

});

// update
// router.post('/itemBalance/updateExItemBalance', checkdataexists  , (req , res)=>{
//   servicePool(
//     req,
//     res,
//     statements.updateExItemBalance.statement,
//     { "I_ITEM_BALANCE_ID" : req.body.items_balance_id});

// });

// update
router.put('/itemBalance/:ITEMS_BALANCE_ID', checkdataexists, validateItemBalance.validateitemBalanceStructure, (req, res) => {
  servicePool(
    req,
    res,
    validateItmTempDetails.composeupdatestatement(
      "ITEMS_BALANCE",
      req.body,
      "ITEMS_BALANCE_ID = " + req.params.ITEMS_BALANCE_ID),
    []
  );
});

// delete
router.delete('/itemBalance/:ITEMS_BALANCE_ID'  , (req , res)=>{
  servicePool(
    req,
    res,
    statements.deleteItemBalance.statement,
    { "ITEMS_BALANCE_ID" : req.params.ITEMS_BALANCE_ID});

});

router.post("/itemBalance/updateItemBalance/:ITEMS_ALIASES_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateItemBalance.composeupdatestatement(
      "ITEMS_BALANCE",
      req.body,
      "ITEMS_BALANCE_ID = " + req.params.ITEMS_BALANCE_ID
    ),
    []
  );
});




// router.post()
module.exports = router;
