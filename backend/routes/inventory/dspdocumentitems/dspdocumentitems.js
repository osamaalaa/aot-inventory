require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./dspdocumentitemssql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validatedspdocitems = require('@lib/validatestructure');

//------------------------------------------------------




// ============================== get ==================================================
router.get('/getDSPdocumentItems', function(req, res) {
  let statement = statements.getDSPdocumentItems.statement;
  let binding = [];
  if(req.query.DOCUMENT_ID){
      statement = statement + ` and DOCUMENT_ID = :DOCUMENT_ID`;
      binding = {'DOCUMENT_ID':Number(req.query.DOCUMENT_ID) }
  }
  servicePool(req, res, statement, binding);
});
router.get('/getOneDSPdocumentItems/:DSP_DOCUMENT_ITEMS_ID', function(req, res) {
  servicePool(
    req,
    res,
    statements.getOneDSPdocumentItems.statement,
    {DSP_DOCUMENT_ITEMS_ID:req.params.DSP_DOCUMENT_ITEMS_ID} );
});


// =============================== insert =============================================
router.post('/insertDSPdocumentItems', checkdataexists,(req,res) =>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertDSPdocumentItems.returns)
    .then(convertedbody=>{

      servicePool(req,res,statements.insertDSPdocumentItems.statement,convertedbody);


    })
    .catch(error => { res.status(400).json(error);
                        console.log(error);});

});

// ========================= update =============================================
router.post("/updateDSPdocumentItems/:DSP_DOCUMENT_ITEMS_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validatedspdocitems.composeupdatestatement(
      "DSP_DOCUMENT_ITEMS",
      req.body,
      "DSP_DOCUMENT_ITEMS_ID = " + req.params.DSP_DOCUMENT_ITEMS_ID
    ),
    []
  );
});
// =========================== delete ==============================
router.post('/deleteDSPdocumentItems',checkdataexists, (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteDSPdocumentItems.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "DSP_DOCUMENT_ITEMS_ID" : req.body.DSP_DOCUMENT_ITEMS_ID});
});



router.get('/getoneItemsInDSPById/:ITEMS_ID', function(req, res) {
  servicePool(
    req,
    res,
    statements.getoneItemsInDSPById.statement,
    {ITEMS_ID:req.params.ITEMS_ID} );
});

router.get('/getItemsInDSPById', function(req, res) {
  servicePool(
    req,
    res,
    statements.getItemsInDSPById.statement,
    [] );
});


module.exports = router;
