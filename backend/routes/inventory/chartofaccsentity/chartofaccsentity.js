require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./chartofaccsentitysql");
let bodyconverter = require("@conv/bodyConverter");
let checkdataexists = require("@vals/dataexists");
let validatecharOfAccEntity = require('@lib/validatestructure');
let BusnessPool = require('@lib/businessPool');


//------------------------------------------------------

// get
router.get('/getChartOfAccountsEntity', function(req, res) {
  servicePool(
    req,
    res,
    statements.getChartOfAccountsEntity.statement,
    [] );
});
router.get('/getOneCharOfAccountEntity/:CHART_OF_ACCOUNTS_ID', function(req, res) {
  servicePool(
    req,
    res,
    statements.getOneCharOfAccountEntity.statement,
    {CHART_OF_ACCOUNTS_ID:req.params.CHART_OF_ACCOUNTS_ID} );
});


// insert
router.post('/insertChartOfAccEntity', checkdataexists,(req,res) =>{
    // console.log("successded!!");
    // console.log( );
    bodyconverter.bodyconverter(req,res,req.body,statements.insertChartOfAccEntity.returns)
    .then(convertedbody=>{

      servicePool(req,res,statements.insertChartOfAccEntity.statement,convertedbody);


    })
    .catch(error => { res.status(400).json(error);
                        console.log(error);});

});


// update
router.post("/updateChartOfAccEntityById/:CHART_OF_ACCOUNTS_ID", checkdataexists, (req, res) => {
  servicePool(
    req,
    res,
    validatecharOfAccEntity.composeupdatestatement(
      "chart_of_accounts_entity",
      req.body,
      "CHART_OF_ACCOUNTS_ID = " + req.params.CHART_OF_ACCOUNTS_ID
    ),
 []
  );
});





module.exports = router;
