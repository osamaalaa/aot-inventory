require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./storessql');
let bodyconverter = require('@conv/bodyConverter');
let checkdataexists = require("@vals/dataexists");
let validateStores = require('@lib/validatestructure');
let businessPool = require("@lib/businessPool");



const paginate = require('express-paginate');
const app = express();

// keep this before all routes that will use pagination
app.use(paginate.middleware(10, 50));




router.get('/selectOnestores/:STORES_ID', function (req, res) {
  servicePool(req, res, statements.selectOnestores.statment, { 'STORES_ID': req.params.STORES_ID });
});


router.get('/selectStoreBalance/:STORES_ID', function (req, res) {
  servicePool(req, res, statements.selectStoreBalance.statment, { 'STORES_ID': req.params.STORES_ID });
});

router.get('/SearchingForStoresByName/:EN_NAME', function (req, res) {
  servicePool(req, res, statements.SearchingForStoresByName.statment, { 'EN_NAME': req.params.EN_NAME });
});



router.post('/SearchingForStoresByARName', function (req, res) {
  servicePool(req, res, statements.SearchingForStoresByARName.statment, { 
        'AR_NAME': req.body.AR_NAME 
      });
});




router.post('/insertnewStores', checkdataexists, (req, res) => {
  // console.log(req.body);
  bodyconverter.bodyconverter(req, res, req.body, statements.insertnewStores.returns).then(convertedbody => {
    servicePool(req, res, statements.insertnewStores.statement, convertedbody);
  }).catch(error => { res.status(400).json(error); });
});


router.post('/deleteStores', checkdataexists, async (req, res) => {
  try {
    let hasChildren = await checkIfStoreHasChildrens(req.body.STORES_ID);
    if (hasChildren) {
      res.status(400).json({
        status: 400,
        message: "Child Nodes Found"
      })
    } else {
      servicePool(
        req,
        res,
        statements.deleteStores.statement,
        { "DELETED_BY": req.body.DELETED_BY, "STORES_ID": req.body.STORES_ID });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Server Error",
      error: e
    })
  }

});


router.post("/updateStoresById/:STORES_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validateStores.composeupdatestatement(
      "STORES",
      req.body,
      "STORES_ID = " + req.params.STORES_ID
    ),
    []
  );
});


router.get('/selectAllstores', (req, res) => {

  let osamaa = `SELECT
  stores_id,
  stores_code,
  ar_name,
  en_name,
  parent_stores_id,
  (SELECT AR_NAME  FROM stores PS WHERE PS.stores_id = I.parent_stores_id) PARENT_STORE_AR_NAME,
  (SELECT EN_NAME  FROM stores PS WHERE PS.stores_id = I.parent_stores_id) PARENT_STORE_EN_NAME,
  store_type,
  issue_policy,
  profit_margin,
  subsidiary_id,
  (SELECT AR_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_AR_NAME,
  (SELECT EN_NAME  FROM AOT_GEN.SUBSIDARIES S WHERE S.SUBSIDIARY_ID = I.SUBSIDIARY_ID) SUBSIDIARY_EN_NAME,
  cost_method,
  (select PRIMARY_NAME || ' ' ||  SECONDARY_NAME FROM HR.LOOKUP_DETAILS  WHERE lookup_detail_id = I.COST_METHOD ) UNITS_NAME,
  picking_rule_id,
  material_account,
  material_overhead_account,
  matl_ovhd_absorption_acct,
  resource_account,
  purchase_price_var_account,
  ap_accrual_account,
  overhead_account,
  outside_processing_account,
  intransit_inv_account,
  interorg_receivables_account,
  interorg_price_var_account,
  interorg_payables_account,
  cost_of_sales_account,
  encumbrance_account,
  project_cost_account,
  interorg_transfer_cr_account,
  invoice_price_var_account,
  average_cost_var_account,
  sales_account,
  (SELECT AR_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_AR_NAME,
  (SELECT EN_NAME  FROM INVENTORY.CHART_OF_ACCOUNTS C WHERE C.CHART_OF_ACCOUNTS_ID = I.sales_account) CHART_OF_ACCOUNTS_EN_NAME,
  expense_account,
  borrpay_matl_var_account,
  borrpay_moh_var_account,
  borrpay_res_var_account,
  borrpay_osp_var_account,
  borrpay_ovh_var_account,
  deferred_cogs_account,
  created_by,
  creation_date,
  deleted,
  deleted_by,
  deleted_date,
  STORE_KEEPER,
  (SELECT FIRST_NAME || ' ' || SECOND_NAME || ' ' || LAST_NAME  FROM HR.employees C WHERE C.EMPLOYEE_ID = I.STORE_KEEPER) EMPLOYEE_NAME
 
FROM
  stores I
  WHERE I.DELETED = 0 
ORDER BY stores_id desc`;
  let count = `SELECT
                COUNT(*) ALLCOUNT
                FROM
                stores I
                WHERE I.DELETED = 0 `
  businessPool(req, res, osamaa,
    []).then(ou => {
      businessPool(req, res, count,
        []).then(ouo => {
          const page = req.query.page;
          const limit = req.query.limit;
          const startIndex = (page - 1) * limit
          const endIndex = page * limit
          const result = ou.rows.slice(startIndex, endIndex);
          result.next = {
            page: page + 1,
            limit: limit
          }
          result.previous = {
            page: page - 1,
            limit: limit
          }


          res.status(200).json({
            resultPage: result,
            count: ouo.rows
          }
          )
        })

    })

})

let checkIfStoreHasChildrens = async (PARENT_STORES_ID) => {
  try {
    let statement = 'SELECT COUNT(*) as TOTAL FROM STORES WHERE PARENT_STORES_ID =:PARENT_STORES_ID AND DELETED=0';
    let binding = { PARENT_STORES_ID }
    let total = await businessPool(null, null, statement, binding);
    return total.rows[0].TOTAL > 0 ? true : false;
  } catch (e) {
    throw new Error("Something bizzare ")
  }
}

router.post('/storesItems/STOREITEMBALANCE' ,(req,res) => {
  servicePool(
  req,
  res,
  statements.STORE_ITEM_BALANCE.statement,
  { 
    "P_ITEM_ID" : req.body.P_ITEM_ID, 
    "P_UNIT_ID" : req.body.P_UNIT_ID,
    "P_STORE_ID" : req.body.P_STORE_ID,

  });
});



module.exports = router;
