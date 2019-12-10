function accessRules (req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
   res.header("Access-Control-Allow-Headers", "*");
    next();
}

module.exports = accessRules;