require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./itemsgroupsqlstatments');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateitemsGroup = require('@lib/validatestructure');
let businessPool = require('@lib/businessPool');

router.get('/itemsgroups/getallgroups', function (req, res) {
  servicePool(req, res, statements.selectAllItemsGropus.statment, []);
});

router.get('/itemsgroups/getoneitemsgroup/:ITEMS_GROUP_ID', function (req, res) {
    servicePool(req, res, statements.selectOneItemsGroup.statment, {'ITEMS_GROUP_ID':req.params.ITEMS_GROUP_ID});
});

router.post('/itemsgroups/insertNewGroup', checkData , validateitemsGroup.validateitemsGroupStructure ,(req,res)=>{
    bodyconverter.bodyconverter(req,res,req.body,statements.insertNewGroup.returns).then(convertedbody=>{
        console.log(convertedbody);
        servicePool(req,res,statements.insertNewGroup.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post("/itemsgroups/updateItemGroup/:items_group_id", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateitemsGroup.composeupdatestatement(
      "items_group",
      req.body,
      "items_group_id = " + req.params.items_group_id),
    []
  );
});

router.delete('/itemsgroups/deleteItemGroup/:ITEMS_GROUP_ID', async(req, res) => {
  try {
    let hasChildren = await checkIfItemGroupHasChildrens(req.params.ITEMS_GROUP_ID);
    if (hasChildren) {
      res.status(400).json({
        status: 400,
        message: "Child Nodes Found"
      })
    } else {
      servicePool(
        req,
        res,
        statements.deleteItemGroup.statement, {
          "ITEMS_GROUP_ID": req.params.ITEMS_GROUP_ID,
          "DELETED_BY":1
        });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Server Error",
      error: e
    })
  }

});

let checkIfItemGroupHasChildrens =  async (PARENT_ITEMS_GROUP_ID) => {
  try{
    let statement = 'SELECT COUNT(*) as TOTAL FROM items_group WHERE PARENT_ITEMS_GROUP_ID =:PARENT_ITEMS_GROUP_ID AND DELETED=0';
    let binding   = { PARENT_ITEMS_GROUP_ID }
    let total = await businessPool(null, null, statement, binding);
    return total.rows[0].TOTAL > 0 ? true : false;
  }catch(e){
    throw new Error("Something bizzare ")
  }
}


module.exports = router;
