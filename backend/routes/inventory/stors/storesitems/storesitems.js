require('module-alias/register');
let express = require('express');
let router = express.Router();
let businessPool = require("@lib/businessPool");
let servicePool = require('@lib/servicePool');
let statements = require('./storesitemssql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');

let validatestoreItemsStructure = require('@lib/validatestructure');

router.get('/storesItems/getStoresItems', function (req, res) {
  let statement = statements.getStoresItems.statment;
  let binding = [];
  if(req.query.STORES_ID){
      statement = statement + ` and STORES_ID = :STORES_ID`;
      binding = {'STORES_ID':Number(req.query.STORES_ID) }
  }
  servicePool(req, res, statement, binding);
});

router.get('/storesItems/getStoreItemByID/:STORES_ITEMS_ID', function (req, res) {
    servicePool(req, res, statements.getStoreItemByID.statment, {'STORES_ITEMS_ID':req.params.STORES_ITEMS_ID});
});

router.get('/storesItems/getStoreItemByID/:STORES_ITEMS_ID', function (req, res) {
  servicePool(req, res, statements.getStoreItemByID.statment, {'STORES_ITEMS_ID':req.params.STORES_ITEMS_ID});
});

router.post('/storesItems/insertStoresItems',checkData ,validatestoreItemsStructure.validatestoreItemsStructure ,(req,res)=>{

    bodyconverter.bodyconverter(req,res,req.body,statements.insertStoresItems.returns).then(convertedbody=>{
        servicePool(req,res,statements.insertStoresItems.statement,convertedbody);
    }).catch(error => { res.status(400).json(error); });
});

router.post('/storesItems/deleteStoreItem', checkData ,(req,res) => {
    servicePool(
    req,
    res,
    statements.deleteStoreItem.statement,
    { "DELETED_BY" : req.body.DELETED_BY, STORES_ITEMS_ID : req.body.STORES_ITEMS_ID});
});



router.post("/storesItems/updateStoreItem/:STORES_ITEMS_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validatestoreItemsStructure.composeupdatestatement(
      "stores_items",
      req.body,
      "STORES_ITEMS_ID = " + req.params.STORES_ITEMS_ID
    ),
    []
  );
});

router.get('/storesItems/getStoresItemsByStoreID/:STORES_ID', (req, res)=>{
  let osamaa = `SELECT
  stores_items_id,
  stores_id,
  (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
  (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
  
  items_id,
  (SELECT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_AR_NAME,
  (SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
  nvl((SELECT nvl(DEFAULT_UNIT,1) FROM INVENTORY.ITEMS_UNITS U WHERE U.ITEMS_ID = I.ITEMS_ID),1) DEFAULT_UNIT,
  nvl((SELECT nvl(UNIT_FACTOR,1) FROM INVENTORY.ITEMS_UNITS U WHERE U.ITEMS_ID = I.ITEMS_ID),1) UNIT_FACTOR,
  status
FROM
  stores_items I
  WHERE DELETED = 0 AND STATUS !=4 AND STORES_ID = :STORES_ID 
  ORDER BY
                I.ITEMS_ID`;
  let count = `SELECT
                COUNT(*) ALLCOUNT
                FROM
                stores_items I
                WHERE I.DELETED = 0 AND STATUS !=4 AND STORES_ID = :STORES_ID`;
  businessPool(req, res, osamaa,
    {'STORES_ID': req.params.STORES_ID}).then(ou =>
        { 
          businessPool(req, res, count,
            {'STORES_ID': req.params.STORES_ID}).then(ouo =>
                {
                    const page = req.query.page;
                    const limit =req.query.limit ;
                    const startIndex = (page - 1)* limit
                    const endIndex = page * limit 
                    // console.log(page);
                    // console.log(limit);
                  const result =  ou.rows.slice(startIndex , endIndex);
                  // console.log(ou.rows)
                  result.next = {
                    page: page + 1,
                    limit: limit 
                  }
                  result.previous = {
                    page: page - 1,
                    limit: limit 
                  }                    
                    res.status(200).json({
                     resultPage:  result ,
                     count: ouo.rows
                    }
                    )
                  })





                })
      
})

router.post('/storesItems/SearchingForStoresItemsByARName', checkData ,(req,res) => {
  let statsAr = `SELECT 
           
  I.stores_items_id,
  I.stores_id,
  (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
  (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
  I.items_id,
  --(SELECT DISTINCT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID  ) ITEM_AR_NAME,
  --(SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
  I.status,
  I.created_by,
  I.creation_date , 
  I.DELETED ,
  M.AR_NAME ITEM_AR_NAME,
  M.EN_NAME ITEM_EN_NAME
 
FROM
  stores_items I ,ITEMS M
  WHERE I.DELETED = 0 AND I.STATUS !=4 AND I.STORES_ID = :STORES_ID AND (M.AR_NAME)  LIKE ((:AR_NAME) ||'%') AND I.ITEMS_ID = M.ITEMS_ID`
  servicePool(
  req,
  res,
  statsAr,
  { "STORES_ID" : req.body.STORES_ID,
   "AR_NAME" : req.body.AR_NAME});
});

router.post('/storesItems/SearchingForStoresItemsByEnName', checkData ,(req,res) => {
  let statsEn = `SELECT 
           
  I.stores_items_id,
  I.stores_id,
  (SELECT AR_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_AR_NAME,
  (SELECT EN_NAME FROM INVENTORY.STORES S WHERE S.STORES_ID = I.STORES_ID) STORE_EN_NAME,
  I.items_id,
  --(SELECT DISTINCT AR_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID  ) ITEM_AR_NAME,
  --(SELECT EN_NAME  FROM INVENTORY.ITEMS M WHERE M.ITEMS_ID = I.ITEMS_ID) ITEM_EN_NAME,
  I.status,
  I.created_by,
  I.creation_date , 
  I.DELETED ,
  M.AR_NAME ITEM_AR_NAME,
  M.EN_NAME ITEM_EN_NAME
 
FROM
  stores_items I ,ITEMS M
  WHERE I.DELETED = 0 AND I.STATUS !=4 AND I.STORES_ID = :STORES_ID AND (M.EN_NAME)  LIKE ((:EN_NAME) ||'%') AND I.ITEMS_ID = M.ITEMS_ID`
  servicePool(
  req,
  res,
  statsEn,
  { "STORES_ID" : req.body.STORES_ID,
   "EN_NAME" : req.body.EN_NAME});
});


module.exports = router;