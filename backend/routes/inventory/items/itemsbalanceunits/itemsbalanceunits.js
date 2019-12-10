require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./itemsbalanceunitssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateitemsBalanceUnitsStructure = require('@lib/validatestructure');


router.get('/itemBalance/getAllItemsBalanceUnits', function (req, res) {
    let statement = statements.getAllItemsBalanceUnits.statment;
    let binding = [];
    if (req.query.ITEMS_ID) {
        statement = statement + ` and ITEMS_ID = :ITEMS_ID`;
        binding = { 'ITEMS_ID': Number(req.query.ITEMS_ID) }
    }    
    if (req.query.STORES_ID) {
        statement = statement + ` and STORES_ID = :STORES_ID`;
        binding = { 'STORES_ID': Number(req.query.STORES_ID) }
    }
    servicePool(req, res, statement,binding);
});

router.get('/itemBalance/getOneItemBalanceUnitsByID/:ITEMS_BALANCE_UNITS_ID', function (req, res) {
    servicePool(req, res, statements.getOneItemBalanceUnitsByID.statment, {'ITEMS_BALANCE_UNITS_ID':req.params.ITEMS_BALANCE_UNITS_ID});
});

router.post('/itemBalance/insertItemBalanceUnits', checkData,validateitemsBalanceUnitsStructure.validateitemsBalanceUnitsStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertItemBalanceUnits.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertItemBalanceUnits.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

// router.post('/itemBalance/deleteItemsBalanceUnits',checkData, (req,res) => {
//     servicePool(
//     req,
//     res,
//     statements.deleteItemsBalanceUnits.statement,
//     { "DELETED_BY" : req.body.DELETED_BY, "ITEMS_BALANCE_UNITS_ID" : req.body.ITEMS_BALANCE_UNITS_ID});
// });

/**
 * TODO: Deleted by should be from token. Update after jwt implementation
 */
router.delete(`/itemBalanceUnits/:ITEMS_BALANCE_UNITS_ID`, function (req, res){
    console.log(statements.deleteItemsBalanceUnits.statement,req.params.ITEMS_BALANCE_UNITS_ID)
    servicePool(req, res, statements.deleteItemsBalanceUnits.statement, { 'ITEMS_BALANCE_UNITS_ID':req.params.ITEMS_BALANCE_UNITS_ID});
})


//--------------------
router.put("/itemBalance/itemBalanceUnits/:items_balance_units_id", checkData, (req, res) => {
  servicePool(
    req,
    res,

    validateitemsBalanceUnitsStructure.composeupdatestatement(
      "items_balance_units",
      req.body,
      "items_balance_units_id = " + req.params.items_balance_units_id),
    []
  );
});

router.get('/itemBalance/getItemBalanceUnitsByStoreID/:STORES_ID', function (req, res) {
  servicePool(req, res, statements.getItemBalanceUnitsByStoreID.statment, {'STORES_ID':req.params.STORES_ID});
});

router.get("/itemBalance/itemBalanceUnits/getQtyOnHand", (req, res) => {

   let ITEMS_ID  = req.query.ITEMS_ID, 
       UNITS_ID = req.query.UNITS_ID,
       STORES_ID = req.query.STORES_ID;
   if(!ITEMS_ID || !STORES_ID || !UNITS_ID){
     res.status(400).json({
       message:"ITEMS_ID,UNITS_ID and STORES_ID are required"
     })
   }else{
     servicePool(
      req,
      res,
      statements.getQuantityOnHand.statement,
      {ITEMS_ID, STORES_ID,UNITS_ID});
   }
});


router.get("/itemBalanceUnits/getItems",(req,res)=>{
      let statement = statements.getAllItemsInItemBalanceUnits.statment;
    let binding = [];    
    if (req.query.STORES_ID) {
        statement = statement + ` and STORES_ID = :STORES_ID`;
        binding = { 'STORES_ID': Number(req.query.STORES_ID) }
    }
    servicePool(req, res, statement,binding);
})

module.exports = router;
