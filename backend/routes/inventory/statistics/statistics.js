require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./statisticssql');
let bodyconverter = require('@conv/bodyConverter');
let businessPool = require("@lib/businessPool");

router.get('/getItemLastTranactionDate/:ITEMS_ID', (req, res) => {
    servicePool(req,
        res,
        statements.getItemLastTranactionDate.statment, {
            ITEMS_ID: req.params.ITEMS_ID
        });
});

router.get('/getLastTransactionWarehouse/:ITEMS_ID', (req, res) => {
    servicePool(req,
        res,
        statements.getLastTransactionWarehouse.statment, {
            ITEMS_ID: req.params.ITEMS_ID
        });
});


router.get('/getTotalBalance/:ITEMS_ID', (req, res) => {
    servicePool(req,
        res,
        statements.getTotalBalance.statment, {
            ITEMS_ID: req.params.ITEMS_ID
        });
});

router.get('/getTopFiveSuppliers/:ITEMS_ID', (req, res) => {
    servicePool(req,
        res,
        statements.getTopFiveSuppliers.statment, {
            ITEMS_ID: req.params.ITEMS_ID
        });
});


router.get('/getTotalNoOfTransactionInLastWeek/:ITEMS_ID', (req, res) => {
    servicePool(req,
        res,
        statements.getTotalNoOfTransactionInLastWeek.statment, {
            ITEMS_ID: req.params.ITEMS_ID
        });
});


router.get('/getTotalNoOfTransactionInLastMonth/:ITEMS_ID', (req, res) => {
    servicePool(req,
        res,
        statements.getTotalNoOfTransactionInLastMonth.statment, {
            ITEMS_ID: req.params.ITEMS_ID
        });
});


router.get('/getTotalNoOfTransactionInLastYear/:ITEMS_ID', (req, res) => {
    servicePool(req,
        res,
        statements.getTotalNoOfTransactionInLastYear.statment, {
            ITEMS_ID: req.params.ITEMS_ID
        });
});


router.get('/getMonthlyTransactionsOfCurrentYear/:ITEMS_ID', (req, res) => {
    servicePool(req,
        res,
        statements.getMonthlyTransactionsOfCurrentYear.statment, {
            ITEMS_ID: req.params.ITEMS_ID
        });
});


router.get('/getTransactionsNoInLastDay/:CREATED_BY', (req, res) => {
    servicePool(req,
        res,
        statements.getTransactionsNoInLastDay.statment, {
            CREATED_BY: req.params.CREATED_BY
        });
});

router.get('/getTransactionsNoInLastWeek/:CREATED_BY', (req, res) => {
    servicePool(req,
        res,
        statements.getTransactionsNoInLastWeek.statment, {
            CREATED_BY: req.params.CREATED_BY
        });
});

router.get('/getTransactionsNoInLastMonth/:CREATED_BY', (req, res) => {
    servicePool(req,
        res,
        statements.getTransactionsNoInLastMonth.statment, {
            CREATED_BY: req.params.CREATED_BY
        });
});

router.get('/getTopFiveItemsTransLastDay', (req, res) => {
    servicePool(req,
        res,
        statements.getTopFiveItemsTransLastDay.statment,
        []);
});

router.get('/getTopFiveItemsTransLastWeek', (req, res) => {
    servicePool(req,
        res,
        statements.getTopFiveItemsTransLastWeek.statment,
        []);
});

router.get('/getTopFiveItemsTransLastMonth', (req, res) => {
    servicePool(req,
        res,
        statements.getTopFiveItemsTransLastMonth.statment,
        []);
});

router.get('/getLastTransactionDateByUser/:CREATED_BY', (req, res) => {
    servicePool(req,
        res,
        statements.getLastTransactionDateByUser.statment, {
            CREATED_BY: req.params.CREATED_BY
        });
});

router.get('/getTopFiveUsersTransLastDay', (req, res) => {
    servicePool(req,
        res,
        statements.getTopFiveUsersTransLastDay.statment,
        []);
});

router.get('/getTopFiveUsersTransLastWeek', (req, res) => {
    servicePool(req,
        res,
        statements.getTopFiveUsersTransLastWeek.statment,
        []);
});
router.get('/getTopFiveUsersTransLastMonth', (req, res) => {
    servicePool(req,
        res,
        statements.getTopFiveUsersTransLastMonth.statment,
        []);
});

router.get('/getlastFiveTransactions', (req, res) => {
    servicePool(req,
        res,
        statements.getlastFiveTransactions.statment,
        []);
});

router.get('/getTopFiveStoreHouses', (req, res) => {
    servicePool(req,
        res,
        statements.getTopFiveStoreHouses.statment,
        []);
});

router.get('/getitemSuppliers', (req, res) => {
    let getSupplierStatement = statements.getitemSuppliers.statment;
    let getSupplierbinding = [];

    let totalCostStatement = statements.getsAllCosts.statment;
    let totalCostBinding = [];

    if(req.query.ITEMS_ID){
        getSupplierStatement = getSupplierStatement + ` and ITEMS_ID = :ITEMS_ID`;
        getSupplierbinding = {'ITEMS_ID':Number(req.query.ITEMS_ID) }
        
        totalCostStatement = totalCostStatement + ` and ITEMS_ID = :ITEMS_ID`;
        totalCostBinding = {'ITEMS_ID':Number(req.query.ITEMS_ID) }
    }
    businessPool(req,
        res,
        getSupplierStatement,
        getSupplierbinding).then(suppliers => {
            businessPool(req,res,totalCostStatement,totalCostBinding).then( allcosts => {
                res.status(200).json({
                    status: 200,
                    suppliers: suppliers.rows,
                    allcosts: allcosts.rows,
                    message: "succeded"
                  })
            }).catch( error => console.log("error"));
        }).catch( error => { 
            console.log("error");
        });
});


router.get('/getinvperiodsSById/:INVENTORY_PERIODS_ID', (req, res) => {
    servicePool(req,
        res,
        statements.getinvperiodsSById.statment,
        {INVENTORY_PERIODS_ID: req.params.INVENTORY_PERIODS_ID});
});

router.get('/getinvperiodsS', (req, res) => {
    servicePool(req,
        res,
        statements.getinvperiodsS.statment,
        []);
});




//---------------------------------------------------------
module.exports = router;