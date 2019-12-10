let businessPool = require('@lib/businessPool');
let statement = require('./approval.sql');
var MiddleWare = {}



MiddleWare.checkIfTypeOpenBalance = async (req, res, next)=> {
    let REQUEST_ID = req.body.REQUEST_ID;
    try{
        let openBalanceId  = await businessPool(null, null, statement.getOpenBalanceId.statement, {REQUEST_ID});
        console.log(openBalanceId)
        if (openBalanceId.rows.length <= 0) {
            res.status(401).json({ 
                message:"Request Doensn't belong to Open Balance"
            });
        } else {
            console.log("Hello");
            req.data = {};
            req.data.INV_OPEN_BALANCE_ID = openBalanceId.rows[0].INV_OPEN_BALANCE_ID
            next();

        }
    }catch(error){
        console.log('1')
        res.status(500).json({ 
            message:"Server Error",
            error
        });
    }
    
}

MiddleWare.checkIfRequestExists = async (req, res, next)=> {
    let REQUEST_ID = req.body.REQUEST_ID;
    try{
        let request  = await businessPool(null, null, statement.getOneRequest.statement, {REQUEST_ID});
        if (request.rows.length <= 0) {
            res.status(401).json({ 
                message:"Request doesn't exist"
            });
        } else {
            next();
        }
    }catch(error){
        console.log('2')
        res.status(500).json({ 
            message:"Server Error",
            error
        });
    }
    
}
MiddleWare.checkIfEmpExists = async (req, res, next)=> {
    let DESTINATION_ID = req.body.DESTINATION_ID;
    try{
        let employee  = await businessPool(null, null, statement.getOneDestination.statement, {DESTINATION_ID});
        if (employee.rows.length <= 0) {
            res.status(401).json({ 
                message:"Employee doesn't exist"
            });
        } else {
            next();
        }
    }catch(error){
        console.log('3')
        res.status(500).json({ 
            message:"Server Error",
            error
        });
    }
}
MiddleWare.checkIfEmpIsLastStep = async (req, res, next)=> {
    let DESTINATION_ID = req.body.DESTINATION_ID;
    let REQUEST_ID = req.body.REQUEST_ID;
    try{
        let REQUEST_TYPE  = await businessPool(null, null, statement.getOneRequestType.statement, {REQUEST_ID});

        let requestFinalStepEmployee = await businessPool(null, null, statement.getFinalStepForRequestType.statement, {REQUEST_TYPE:REQUEST_TYPE.rows[0].REQUEST_TYPE});
        console.log(requestFinalStepEmployee)
        console.log(DESTINATION_ID)
        console.log(REQUEST_TYPE)
        if (requestFinalStepEmployee.rows[0].DESTINATION_ID != DESTINATION_ID) {
            res.status(401).json({ 
                message:"Not Authorized to approve this"
            });
        } else {
            next();
        }
    }catch(error){
        console.log('4')
        res.status(500).json({ 
            message:"Server Error",
            error
        });
    }
}

module.exports = MiddleWare;
