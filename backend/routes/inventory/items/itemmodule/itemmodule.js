require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./itemmodulesqlstatments");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validateItemModule = require('@lib/validatestructure');

router.get("/itemModule/getallitemTemplate", function(req, res) {
  servicePool(
    req,
    res,
    statements.getallitemTemplate.statement,
    []
  );
});

router.get("/itemModule/getOneItemModule/:ITEMS_TEMPLATE_ID", function(req, res) {
  servicePool(req, res, statements.getOneItemModule.statement,
    {'ITEMS_TEMPLATE_ID':req.params.ITEMS_TEMPLATE_ID});
});


router.post('/itemModule/insertnewitemModule', checkdataexists,validateItemModule.validateitemModuleStructure , (req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertnewitemModule.returns).then(convertedbody=>{
      servicePool(req,res,statements.insertnewitemModule.statement,convertedbody);
        // console.log("success");
    }).catch(error => { res.status(400).json(error); });

});

router.delete('/itemModule/:ITEMS_TEMPLATE_ID',(req,res) =>{
  servicePool(req,res,statements.deleteItemTemplate.statement, {'ITEMS_TEMPLATE_ID' : req.params.ITEMS_TEMPLATE_ID})
});

router.put('/itemModule/:ITEMS_TEMPLATE_ID',checkdataexists,validateItemModule.validateitemModuleStructure,(req,res) =>{
  servicePool(req,res,statements.updateItemTemplate.statement, {...req.body,'ITEMS_TEMPLATE_ID' : req.params.ITEMS_TEMPLATE_ID})
});


router.post("/itemModule/updateItemModule/:ITEMS_TEMPLATE_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateItemModule.composeupdatestatement(
      "items_template",
      req.body,
      "ITEMS_TEMPLATE_ID = " + req.params.ITEMS_TEMPLATE_ID
    ),
    []
  );
});



module.exports = router;
