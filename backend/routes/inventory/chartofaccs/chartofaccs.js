require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./chartofaccssql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validatecharOfAcc = require('@lib/validatestructure');
let businessPool = require('@lib/businessPool');

//let oracledb = require('oracledb');
//------------------------------------------------------

// get
router.get('/getChartOfAccounts', function(req, res) {
  servicePool(
    req,
    res,
    statements.getChartOfAccounts.statement,
    [] );
});
router.get('/getChartOfAccounts/:CHART_OF_ACCOUNTS_ID', function(req, res) {
  servicePool(
    req,
    res,
    statements.getOneCharOfAccount.statement,
    {CHART_OF_ACCOUNTS_ID:req.params.CHART_OF_ACCOUNTS_ID} );
});



// delete
router.post('/deleteChartOfAcc', checkdataexists, async (req, res) => {
  try {
    let hasChildren = await checkIfAccountHasChildrens(req.body.CHART_OF_ACCOUNTS_ID);
    if (hasChildren) {
      res.status(400).json({
        status: 400,
        message: "Child Nodes Found"
      })
    } else {
      servicePool(
        req,
        res,
        statements.deleteChartOfAcc.statement,
        { "DELETED_BY": req.body.DELETED_BY, "CHART_OF_ACCOUNTS_ID": req.body.CHART_OF_ACCOUNTS_ID });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Server Error",
      error: e
    })
  }


});

// insert
router.post('/insertChartOfAcc', checkdataexists,validatecharOfAcc.validatechartOfAccStructure,(req,res) =>{
    // console.log("successded!!");
    // console.log( );
    // bodyconverter.bodyconverter(req,res,req.body,statements.insertChartOfAcc.returns)
    // .then(convertedbody=>{

    //   servicePool(req,res,statements.insertChartOfAcc.statement,convertedbody);


    // })
    // .catch(error => { res.status(400).json(error);
    //                     console.log(error);});

    console.log(req.body)
    servicePool(req,res,statements.insertChartOfAcc.statement,req.body);

});

// update
router.post("/updateChartOfAccById/:chart_of_accounts_id", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validatecharOfAcc.composeupdatestatement(
      "chart_of_accounts",
      req.body,
      "chart_of_accounts_id = " + req.params.chart_of_accounts_id
    ),
    []
  );
});

let checkIfAccountHasChildrens =  async (PARENT_ACCOUNTS_ID) => {
  try{
    let statement = 'SELECT COUNT(*) as TOTAL FROM CHART_OF_ACCOUNTS WHERE PARENT_ACCOUNTS_ID =:PARENT_ACCOUNTS_ID AND DELETED=0';
    let binding   = { PARENT_ACCOUNTS_ID }
    let total = await businessPool(null, null, statement, binding);
    return total.rows[0].TOTAL > 0 ? true : false;
  }catch(e){
    throw new Error("Something bizzare ")
  }
}





module.exports = router;
