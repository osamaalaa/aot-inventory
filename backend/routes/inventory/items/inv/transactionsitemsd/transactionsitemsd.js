require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./transactionsitemsdsql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateTransItemsD = require('@lib/validatestructure');

router.get('/getAlltransactionsItemsD', (req, res)=>{
    servicePool(req, res,
                statements.getAlltransactionsItemsD.statement,
                []
                );
});

router.get('/getOnetransactionsItemsD/:INV_TRANSACTIONS_ITEMS_D_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOnetransactionsItemsD.statement,
               {'INV_TRANSACTIONS_ITEMS_D_ID' :req.params.INV_TRANSACTIONS_ITEMS_D_ID}
               );
});

router.post('/inserttransactionsItemsD', checkData, validateTransItemsD.validatetransactionItemsDStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.inserttransactionsItemsD.returns).then(convertedbody=>{
        servicePool(req,res,statements.inserttransactionsItemsD.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updatetransactionsItemsD/:INV_TRANSACTIONS_ITEMS_D_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateTransItemsD.composeupdatestatement(
      "INV_TRANSACTIONS_ITEMS_D",
      req.body,
      "INV_TRANSACTIONS_ITEMS_D_ID = " + req.params.INV_TRANSACTIONS_ITEMS_D_ID
    ),
    []
  );
});


module.exports = router;
