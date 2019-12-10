require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./transferstoressql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateTransferStores = require('@lib/validatestructure');

router.get('/getAllTransferStores', (req, res)=>{
    servicePool(req, res,
                statements.getAllTransferStores.statement,
                []
                );
});

router.get('/getOneTransferStores/:INV_TRANSFER_STORES_ID', (req, res)=>{
    servicePool(req, res,
               statements.getOneTransferStores.statement,
               {'INV_TRANSFER_STORES_ID' :req.params.INV_TRANSFER_STORES_ID}
               );
});

router.post('/insertTransferStores', checkData, validateTransferStores.validatetransferStoresStructure,  (req, res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertTransferStores.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertTransferStores.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});


router.post("/updateTransferStores/:INV_TRANSFER_STORES_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateTransferStores.composeupdatestatement(
      "INV_TRANSFER_STORES",
      req.body,
      "INV_TRANSFER_STORES_ID = " + req.params.INV_TRANSFER_STORES_ID
    ),
    []
  );
});

module.exports = router;
