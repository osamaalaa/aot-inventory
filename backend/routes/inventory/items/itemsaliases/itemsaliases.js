require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let businessPool = require('@lib/businessPool');
let statements = require('./itemsaliasessqlstatments');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateAliases = require('@lib/validatestructure');


router.get('/itemsaliases/getallitemaliases', function (req, res) {
    let statement = statements.getallitemaliases.statment;
    let binding = [];
    if(req.query.ITEMS_ID){
        statement = statement + ` and ITEMS_ID = :ITEMS_ID`;
        binding = {'ITEMS_ID':Number(req.query.ITEMS_ID) }
    }
    servicePool(req, res, statement, binding);
});

router.get('/itemsaliases/getoneitemaliase/:ITEMS_ALIASES_ID', function (req, res) {
    servicePool(req, res, statements.getoneitemaliase.statment, {'ITEMS_ALIASES_ID':req.params.ITEMS_ALIASES_ID});
});

router.post('/itemsaliases/insertNewItemAliase',checkData,validateAliases.validateitemsAliasesStructure ,async(req,res)=>{
    if(req.body.DEFAULT_ALIASES == 1){
        await removeDefaultAlias(req.body.ITEMS_ID)
    }
    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewItemAliase.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertNewItemAliase.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.put('/itemsaliases/:ITEMS_ALIASES_ID',checkData,validateAliases.validateitemsAliasesStructure ,async(req,res)=>{
    req.body.MODIFIED_BY = req.body.CREATED_BY;
    delete req.body.CREATED_BY;
    if(req.body.DEFAULT_ALIASES == 1){
        await removeDefaultAlias(req.body.ITEMS_ID)
    }
    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewItemAliase.returns).then(convertedbody=>{
        servicePool(req,res,statements.updateItemAliase.statement,{...req.body,'ITEMS_ALIASES_ID' : req.params.ITEMS_ALIASES_ID});
    }).catch(error => { res.status(400).json(error); });
});

router.delete(`/itemsaliases/:ITEMS_ALIASES_ID`, function (req, res){
    servicePool(req, res, statements.deleteItemAlias.statement, {'ITEMS_ALIASES_ID':req.params.ITEMS_ALIASES_ID});
});
//---------------
router.post("/itemsaliases/updateItemAliases/:ITEMS_ALIASES_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateAliases.composeupdatestatement(
      "ITEMS_ALIASES",
      req.body,
      "ITEMS_ALIASES_ID = " + req.params.ITEMS_ALIASES_ID
    ),
    []
  );
});

async function removeDefaultAlias(ITEMS_ID){
   let statement = `UPDATE ITEMS_ALIASES SET DEFAULT_ALIASES = 0 WHERE ITEMS_ID = :ITEMS_ID`;
   let binding   = { ITEMS_ID }
   return await businessPool(null, null, statement, binding)
}

module.exports = router;
