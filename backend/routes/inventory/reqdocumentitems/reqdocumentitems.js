require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./reqdocumentitemssql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateReqDoc = require('@lib/validatestructure');

//------------------------------------------------------




// ============================== get ==================================================
router.get('/getReqDocumentItems', function(req, res) {
    let statement = statements.getReqDocumentItems.statement;
  let binding = [];
  if(req.query.DOCUMENT_ID){
      statement = statement + ` and DOCUMENT_ID = :DOCUMENT_ID`;
      binding = {'DOCUMENT_ID':Number(req.query.DOCUMENT_ID) }
  }
  servicePool(req, res, statement, binding);
});
router.get('/getOneReqDocumentItems/:DOCUMENT_ID', function(req, res) {
  servicePool(
    req,
    res,
    statements.getOneReqDocumentItems.statement,
    {DOCUMENT_ID:req.params.DOCUMENT_ID} );
});


// =============================== insert =============================================
router.post('/insertReqDocumentItems', checkdataexists,(req,res) =>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertReqDocumentItems.returns)
    .then(convertedbody=>{

      servicePool(req,res,statements.insertReqDocumentItems.statement,convertedbody);


    })
    .catch(error => { res.status(400).json(error);
                        console.log(error);});

});

// ========================= update =============================================
router.post("/UpdateReqDocumentItems/:REQ_DOCUMENT_ITEMS_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateReqDoc.composeupdatestatement(
      "REQ_DOCUMENT_ITEMS ",
      req.body,
      "REQ_DOCUMENT_ITEMS_ID = " + req.params.REQ_DOCUMENT_ITEMS_ID
    ),
    []
  );
});
// =========================== delete ==============================
router.post('/deleteReqDocumentItems',checkdataexists, (req,res) => {
    servicePool(
    req,
    res,
    statements.deleteReqDocumentItems.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "REQ_DOCUMENT_ITEMS_ID" : req.body.REQ_DOCUMENT_ITEMS_ID});
});

    



module.exports = router;
