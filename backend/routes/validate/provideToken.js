require('module-alias/register');
let express = require('express');
let router = express.Router();
const mytoken = require('@lib/generatetoken');
let validateuser = require('@lib/validateuser');
let validatestructure = require('@lib/validatestructure');
//let notify = require('../wflo/notifications/notify');
router.use(validatestructure.validatetokenstructure);
router.use(validateuser);

router.get('/' , function (req, res){
    mytoken()
    .then(result => {
        res.status(200).json({"USERNAME" : req.body.USERNAME, "TOKEN" : result });
    })
    .catch(error => {
        res.status(400).json(error);
    });
});

module.exports = router;
