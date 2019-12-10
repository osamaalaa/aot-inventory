require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./dspdocumentsql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validatecharOfAccEntity = require('@lib/validatestructure');
//------------------------------------------------------




// ============================== get ==================================================
router.get('/getDSPdocument', function (req, res) {
  let statement = statements.getDSPdocument.statement;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  if(req.query.DOCUMENT_STATUS){
      statement = statement + ` and DOCUMENT_STATUS = :DOCUMENT_STATUS`;
      binding = {...binding,'DOCUMENT_STATUS':Number(req.query.DOCUMENT_STATUS) }
  }

  if(req.query.SOURCE_TYPE){
      statement = statement + ` and SOURCE_TYPE = :SOURCE_TYPE`;
      binding = {...binding,'SOURCE_TYPE':Number(req.query.SOURCE_TYPE) }
  }
  statement = statement + ` ORDER BY DOCUMENT_ID DESC`
  servicePool(req, res, statement, binding);
});
router.get('/getOneDSPdocument/:DOCUMENT_ID', function (req, res) {
  servicePool(
    req,
    res,
    statements.getOneDSPdocument.statement,
    { DOCUMENT_ID: req.params.DOCUMENT_ID });
});


// =============================== insert =============================================
router.post('/insertDSPdocument', checkdataexists, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertDSPdocument.returns)
    .then(convertedbody => {
      servicePool(req, res, statements.insertDSPdocument.statement, convertedbody);
    })
    .catch(error => {
      res.status(400).json(error);
      console.log(error);
    });

});

// ========================= update =============================================
router.post("/updateDSPdocument/:DOCUMENT_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validatecharOfAccEntity.composeupdatestatement(
      "DSP_DOCUMENT",
      req.body,
      "DOCUMENT_ID = " + req.params.DOCUMENT_ID
    ),
    []
  );
});
// =========================== delete ==============================
router.post('/deleteDSPdocument', checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteDSPdocument.statement,
    { "DELETED_BY": req.body.DELETED_BY, "DOCUMENT_ID": req.body.DOCUMENT_ID });
});





module.exports = router;
