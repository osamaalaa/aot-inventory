require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./itemsdetailssql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateItemDetails = require('@lib/validatestructure');


router.get("/itemsDetails/getallitemsDetails", function(req, res) {
  servicePool(
    req,
    res,
    statements.getallitemsDetails.statement,
    []
  );

});


//----------------------------------------------------------------
router.get('/itemsDetails/getoneitemDetails/:ITEMS_ID', function (req, res) {
  servicePool(req, res, statements.getoneitemDetails.statement, {'ITEMS_ID':req.params.ITEMS_ID});
});

//--------------------------------------------------------------------

router.post('/itemsDetails/insertnewitemDetails',checkdataexists, validateItemDetails.validateitemDetailsStructure ,(req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertnewitemDetails.returns).then(convertedbody=>{
         servicePool(req,res,statements.insertnewitemDetails.statement,convertedbody);

    }).catch(error => { res.status(400).json(error);
        });
});

//---------------------------------------------

router.post('/itemsDetails/deleteItemsDetails' ,checkdataexists ,(req,res) => {
  servicePool(
    req,
    res,
    statements.deleteItemsDetails.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "ITEMS_ID" : req.body.items_id});

});

//-------------

router.post("/itemsDetails/updateItemDetails/:items_id", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateItemDetails.composeupdatestatement(
      "items_details",
      req.body,
      "items_id = " + req.params.items_id),
    []
  );
});



module.exports = router;
