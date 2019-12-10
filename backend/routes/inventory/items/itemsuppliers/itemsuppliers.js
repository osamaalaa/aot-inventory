require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./itemsuppliersqlstatments");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateItemSupplier = require('@lib/validatestructure');

//--- get all --------------
// router.get("/itemSuppliers/getAllitemSuppls", function(req, res) {
//   servicePool(
//     req,
//     res,
//     statements.getAllitemSuppls.statement,
//     []
//       );
// });
router.get('/itemSuppliers/getAllitemSuppls', function (req, res) {
  let statement = statements.getAllitemSuppls.statement;
  let binding = [];
  if(req.query.ITEMS_ID){
      statement = statement + ` and ITEMS_ID = :ITEMS_ID`;
      //console.log("id...."+items_id);
      binding = {'ITEMS_ID':Number(req.query.ITEMS_ID) }
  }
  servicePool(req, res, statement, binding);
});

//--------------------------------insertion -------------------------------------------------------------------
router.post('/itemSuppliers/insertnewSupplier', checkdataexists,validateItemSupplier.validateitemSupplierStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body ,statements.insertnewSupplier.returns).then(convertedbody=>{
      servicePool(req,res,statements.insertnewSupplier.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });

});
//-------------------------------------------------------------------------------------------------------
router.post('/itemSuppliers/deleteitemSupplier', checkdataexists , (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteitemSupplier.statement,
    { "DELETED_BY" : req.body.DELETED_BY, "ITEMS_SUPPLIERS_ID" : req.body.ITEMS_SUPPLIERS_ID});
});

//---------------------------------------------------------------------------------------
router.get('/itemSuppliers/selectOneitemsupplier/:ITEMS_SUPPLIERS_ID',function (req, res) {
  servicePool(req, res, statements.selectOneitemsupplier.statment, {'ITEMS_SUPPLIERS_ID':req.params.ITEMS_SUPPLIERS_ID});
});

//---------------------------------------------------------------------------------------
router.post("/itemSuppliers/updateitemsSuppliers/:ITEMS_SUPPLIERS_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateItemSupplier.composeupdatestatement(
      "ITEMS_SUPPLIERS",
      req.body,
      "ITEMS_SUPPLIERS_ID = " + req.params.ITEMS_SUPPLIERS_ID),
    []
  );
});




module.exports = router ;
