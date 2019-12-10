require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./reicvsql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateReqDoc = require('@lib/validatestructure');

//------------------------------------------------------




// ============================== get ==================================================
router.post('/receiveReq/:pdocument_id/:REQ_TYPE', function(req, res) {
  servicePool(
    req,
    res,
    statements.receiveReq.statement,
    {pdocument_id:req.params.pdocument_id , 
        REQ_TYPE: req.params.REQ_TYPE }
         );
});




module.exports = router;
