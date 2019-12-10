require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./itemscomponentssqlstatments');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateitemComponentsStructure = require ('@lib/validatestructure');


router.get('/itemscomponents/getallitemacomponents', function (req, res) {
    let statement = statements.getallitemacomponents.statment;
    let binding = [];
    if(req.query.ITEMS_ID){
        statement = statement + ` and ITEMS_ID = :ITEMS_ID order by ARRANGEMENT_NO asc`;
        binding = {'ITEMS_ID':Number(req.query.ITEMS_ID) }
    }
    servicePool(req, res, statement, binding);
});


router.get('/itemscomponents/getoneitemcomponents/:ITEMS_COMPONENTS_ID', function (req, res) {
    servicePool(req, res, statements.selectOneItemsComponents.statment, {'ITEMS_COMPONENTS_ID':req.params.ITEMS_COMPONENTS_ID});
});
router.get('/itemscomponents/getitemcomponentsbyitem/:ITEMS_ID', function (req, res) {
    servicePool(req, res, statements.selectAllItemsComponentsByItem.statment, {'ITEMS_ID':req.params.ITEMS_ID});
});

router.post('/itemscomponents/insertnewitemcomponents', checkData,
validateitemComponentsStructure.validateitemComponentsStructure ,(req,res)=>{
    // console.log(req.body);
    bodyconverter.bodyconverter(req,res,req.body,statements.insertnewitemcomponents.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertnewitemcomponents.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});
router.put('/itemscomponents/:ITEMS_COMPONENTS_ID',checkData ,validateitemComponentsStructure.validateitemComponentsStructure,(req,res)=>{
    //
    // bodyconverter.bodyconverter(req,res,req.body,statements.updateComponentse.returns).then(convertedbody=>{
    //     servicePool(req,res,statements.updateComponentse.statement,{...convertedbody,'ITEMS_COMPONENTS_ID' : req.params.ITEMS_COMPONENTS_ID});
    // }).catch(error => { res.status(400).json(error); });
    servicePool(req,res,statements.updateComponentse.statement,{...req.body,'ITEMS_COMPONENTS_ID' : Number(req.params.ITEMS_COMPONENTS_ID)});

});

router.delete(`/itemscomponents/:ITEMS_COMPONENTS_ID`, function (req, res){
    servicePool(req, res, statements.deleteItemComponentse.statement, {'ITEMS_COMPONENTS_ID':req.params.ITEMS_COMPONENTS_ID});
});

//--------

router.post("/itemscomponents/updateItemComponents/:ITEMS_COMPONENTS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateitemComponentsStructure.composeupdatestatement(
      "ITEMS_COMPONENTS",
      req.body,
      "ITEMS_COMPONENTS_ID = " + req.params.ITEMS_COMPONENTS_ID),
    []
  );
});


module.exports = router;
