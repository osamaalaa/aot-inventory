let Joi = require('joi');
let valresult;
let valres = function (req, res, next) {

    const schema = Joi.object().keys(
        {
            USERNAME: Joi.string().min(1).max(30).required().equal('aot'),
            PASSWORD: Joi.string().min(1).max(30).required().equal('p@ssw0rd')
        }
    );

    const validationresult = Joi.validate(req.body, schema);


    if (validationresult.error) {
        valresult = {result: "UnAuthorized Access !"};
        res.status(404).json(valresult);
    } else {
        next();
    }
    //next();
};
module.exports = valres;
