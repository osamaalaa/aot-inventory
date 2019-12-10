require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./itemssqlstatments');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateitems = require('@lib/validatestructure');
let businessPool = require('@lib/businessPool');

router.get('/getallitems', function (req, res) {
  servicePool(req, res, statements.getallitems.statment, []);
});

router.get('/getoneitem/:ITEMS_ID', function (req, res) {
  servicePool(req, res, statements.selectoneitems.statment, {
    'ITEMS_ID': req.params.ITEMS_ID
  });
});

router.post('/insertnewitem', checkData, validateitems.validateitemsStructure, (req, res) => {
  bodyconverter.bodyconverter(req, res, req.body, statements.insertnewitem.returns).then(convertedbody => {
    servicePool(req, res, statements.insertnewitem.statement, convertedbody);
  }).catch(error => {
    res.status(400).json(error);
  });
});

router.get('/item-code-check', async (req, res) => {
  try{
    let ITEM_CODE = await businessPool(null, null, statements.selectItemCode.statement, {ITEM_CODE:req.query.ITEM_CODE});
    if(ITEM_CODE.rows.length > 0){
      res.json({
        status:200,
        message:"Item Code Exists"})
    }else{
      res.json({ status:404,message:"Item Code Doesn't exist"})
    }
  }catch(e){
    res.status(500).json({
      message:"Server Error",
      stack:e
    })
  }

});

// router.post('/deleteItems', checkData, (req, res) => {
//   servicePool(
//     req,
//     res,
//     statements.deleteItems.statement, {
//       "DELETED_BY": req.body.DELETED_BY,
//       "items_id": req.body.items_id
//     });
// });
//TODO: Implement deleted_by using jwt
router.delete('/:ITEMS_ID', (req, res) => {
  servicePool(
    req,
    res,
    statements.deleteItems.statement, {
      "items_id": req.params.ITEMS_ID
    });
});


router.get('/getLookUps/:LOOKUP_ID', function (req, res) {
  servicePool(req, res, statements.getLookUps.statment, {
    'LOOKUP_ID': req.params.LOOKUP_ID
  });
});
router.get('/getLookUpsDetails/:LOOKUP_DETAIL_ID', function (req, res) {
  servicePool(req, res, statements.getLookUpsDetails.statment, {
    'LOOKUP_DETAIL_ID': req.params.LOOKUP_DETAIL_ID
  });
});

router.put("/updateItem/:ITEMS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateitems.composeupdatestatement(
      "ITEMS",
      req.body,
      "items_id = " + req.params.ITEMS_ID
    ),
    []
  );
});

module.exports = router;