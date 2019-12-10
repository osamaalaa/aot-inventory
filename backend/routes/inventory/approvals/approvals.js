let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./approval.sql");
let checkdataexists = require("@vals/dataexists");
let MiddleWare = require('./approval.middlewares')
let businessPool = require('@lib/businessPool');

router.get('/getAllApprovals/:DESTINATION_ID', function (req, res) {
  let DESTINATION_ID = req.params.DESTINATION_ID;

  servicePool(
    req,
    res,
    statements.getAllApprovals.statement,
    { DESTINATION_ID });
});

router.post('/approveOpenBalance',
  checkdataexists,
  MiddleWare.checkIfTypeOpenBalance,
  MiddleWare.checkIfRequestExists,
  MiddleWare.checkIfEmpExists,
  MiddleWare.checkIfEmpIsLastStep,
  async function (req, res) {
    let INV_OPEN_BALANCE_ID = req.data.INV_OPEN_BALANCE_ID;
    try {
      let STORES_ID = await businessPool(null, null, statements.getStoreId.statement, { INV_OPEN_BALANCE_ID });
      await businessPool(null, null, statements.updateAllItemBalance.statement, {INV_OPEN_BALANCE_ID, STORES_ID: STORES_ID.rows[0].STORES_ID });
      res.status(200).json({
        message: "Updated Item Balance"
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message:"something went wrong"
      })
    }
  });

// let checkIfRequestExist


module.exports = router;
