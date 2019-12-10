require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./dspdocumentitemsdsql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validatedspdocitems = require('@lib/validatestructure');

//------------------------------------------------------




// ============================== get ==================================================
router.get('/getDSPdocumentItemsD', function(req, res) {
  let statement = statements.getDSPdocumentItemsD.statement;
  let binding = [];
  if(req.query.DSP_DOCUMENT_ITEMS_ID){
      statement = statement + ` and DSP_DOCUMENT_ITEMS_ID = :DSP_DOCUMENT_ITEMS_ID`;
      binding = {'DSP_DOCUMENT_ITEMS_ID':Number(req.query.DSP_DOCUMENT_ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});
router.get('/getOneDSPdocumentItemsD/:DOCUMENT_ID', function(req, res) {
  servicePool(
    req,
    res,
    statements.getOneDSPdocumentItemsD.statement,
    {DOCUMENT_ID:req.params.DOCUMENT_ID} );
});


// =============================== insert =============================================
router.post('/insertDSPdocumentItemsD', checkdataexists,(req,res) =>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertDSPdocumentItemsD.returns)
    .then(convertedbody=>{
      servicePool(req,res,statements.insertDSPdocumentItemsD.statement,convertedbody);
    })
    .catch(error => { res.status(400).json(error);
                        console.log(error);});
});

// ========================= update =============================================
router.post("/updateDSPdocumentItemsD/:DSP_DOCUMENT_ITEMS_D_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validatedspdocitems.composeupdatestatement(
      "DSP_DOCUMENT_ITEMS_D",
      req.body,
      "DSP_DOCUMENT_ITEMS_D_ID = " + req.params.DSP_DOCUMENT_ITEMS_D_ID
    ),
    []
  );
});
// =========================== delete ==============================
router.post('/deleteDSPdocumentItemsD',checkdataexists, (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteDSPdocumentItemsD.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "DSP_DOCUMENT_ITEMS_D_ID" : req.body.DSP_DOCUMENT_ITEMS_D_ID});
});

router.post('/addItemBalancedsp/:P_DOC_ID', function(req, res) {
  servicePool(
    req,
    res,
    statements.addItemBalancedsp.statement,
    {P_DOC_ID:req.params.P_DOC_ID} );
});


module.exports = router;
