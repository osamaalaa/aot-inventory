require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./storehousessql');
let bodyconverter = require('@conv/bodyConverter');
let checkdataexists = require('@vals/dataexists');


let validateStoresHouse= require('@lib/validatestructure');

router.get('/storeHouses/selectAllstoreHouses', function (req, res) {
    servicePool(req, res, statements.selectAllstoreHouses.statment, []);
});

router.get('/storeHouses/selectOnestoreHouses/:STORE_ID',  function (req, res) {
    servicePool(req, res, statements.selectOnestoreHouses.statment, {STORE_ID :req.params.STORE_ID});
});

//----------------------------------------------------
router.post('/storeHouses/insertnewStoreHouses',checkdataexists,validateStoresHouse.validatestoresHousesStructure , (req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertnewStoreHouses.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertnewStoreHouses.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

//----------------------------------------------------

  router.post('/storeHouses/deleteStoreHouses', checkdataexists, (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteStoreHouses.statement,
    { DELETED_BY : req.body.deleted_by, STORE_ID : req.body.store_id});
});

//---------------------------------------------------------

router.post("/storeHouses/updatestoreHouses/:store_id", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateStoresHouse.composeupdatestatement(
      "storehouses",
      req.body,
      "store_id = " + req.params.store_id
    ),
    []
  );
});
module.exports = router;
