require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./itemssubssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData  = require('@vals/dataexists');
let validateitemsSubsStructure = require('@lib/validatestructure');

router.get('/itemsSubs/getItemsSubs', function (req, res) {
  let statement = statements.getItemsSubs.statment;
  let binding = [];
  if(req.query.ITEMS_ID){
      statement = statement + ` and ITEMS_ID = :ITEMS_ID`;
      binding = {'ITEMS_ID':Number(req.query.ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/itemsSubs/getItemsSubsByID/:ITEMS_SUBSTITUTIONS_ID', function (req, res) {
    servicePool(req, res, statements.getItemsSubsByID.statment, {'ITEMS_SUBSTITUTIONS_ID':req.params.ITEMS_SUBSTITUTIONS_ID});
});

router.post('/itemsSubs/insertItemSubs',checkData ,validateitemsSubsStructure.validateitemsSubsStructure ,(req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertItemSubs.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertItemSubs.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

// router.post('/itemsSubs/deleteItemSubs',checkData, (req,res) => {
//     servicePool(
//     req,
//     res,
//     statements.deleteItemSubs.statement,
//     { "DELETED_BY" : req.body.DELETED_BY, "ITEMS_SUBSTITUTIONS_ID" : req.body.ITEMS_SUBSTITUTIONS_ID});
// });
//TODO:Deleted by should be from jwt
router.delete('/itemsSubs/:ITEMS_SUBSTITUTIONS_ID', (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteItemSubs.statement,
    { "ITEMS_SUBSTITUTIONS_ID" : req.params.ITEMS_SUBSTITUTIONS_ID});
});


//-------
router.post("/itemsSubs/updateItemSubs/:ITEMS_SUBSTITUTIONS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateitemsSubsStructure.composeupdatestatement(
      "items_substitutions",
      req.body,
      "ITEMS_SUBSTITUTIONS_ID = " + req.params.ITEMS_SUBSTITUTIONS_ID),
    []
  );
});


module.exports = router;
