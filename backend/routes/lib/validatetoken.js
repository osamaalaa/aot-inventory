let jwt = require('jsonwebtoken');

function validatetoken (req, res, next){

    jwt.verify(req.body.token, 'WaelAbdeen', function(err, decoded){
        if (err){
            res.status(400).json({"error" : "invalid or expired token !"});
        }else{
            next();
        }
    });
    //next();
}

module.exports = validatetoken;
