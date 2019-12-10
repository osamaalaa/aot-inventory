require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./reqdocumentitemsdsql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateReqDoc = require('@lib/validatestructure');

//------------------------------------------------------




// ============================== get ==================================================
router.get('/getReqDocumentItemsD', function(req, res) {
    let statement = statements.getReqDocumentItemsD.statement;
  let binding = [];
  if(req.query.REQ_DOCUMENT_ITEMS_ID){
      statement = statement + ` and REQ_DOCUMENT_ITEMS_ID = :REQ_DOCUMENT_ITEMS_ID`;
      binding = {'REQ_DOCUMENT_ITEMS_ID':Number(req.query.REQ_DOCUMENT_ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});
router.get('/getOneReqDocumentItemsD/:DOCUMENT_ID', function(req, res) {
  servicePool(
    req,
    res,
    statements.getOneReqDocumentItemsD.statement,
    {DOCUMENT_ID:req.params.DOCUMENT_ID} );
});


// =============================== insert =============================================
router.post('/insertReqDocumentItemsD', checkdataexists,(req,res) =>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertReqDocumentItemsD.returns)
    .then(convertedbody=>{

      servicePool(req,res,statements.insertReqDocumentItemsD.statement,convertedbody);


    })
    .catch(error => { res.status(400).json(error);
                        console.log(error);});

});

// ========================= update =============================================
router.post("/UpdateReqDocumentItemsD/:DOCUMENT_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateReqDoc.composeupdatestatement(
      "REQ_DOCUMENT_ITEMS_D ",
      req.body,
      "DOCUMENT_ID = " + req.params.DOCUMENT_ID
    ),
    []
  );
});
// =========================== delete ==============================
router.post('/deleteReqDocumentItemsD',checkdataexists, (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteReqDocumentItemsD.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "REQ_DOCUMENT_ITEMS_D_ID" : req.body.REQ_DOCUMENT_ITEMS_D_ID});
});

    



module.exports = router;
