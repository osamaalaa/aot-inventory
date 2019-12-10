require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let businessPool = require('@lib/businessPool');
let statements = require('./userrolesql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let fs = require('fs');
let validateUserRole = require('@lib/validatestructure');
let ip = require('ip');
const publicIp = require('public-ip');


router.get('/getAllUserRolesByUserId/:USER_ID', (req, res) => {
  servicePool(req, res,
    statements.getAllUserRolesByUserId.statement, {
      'USER_ID': req.params.USER_ID
    }
  );
});

router.get('/getallScreensUserId/:USER_ID', (req, res) => {
  servicePool(req, res,
    statements.getallScreensUserId.statement, {
      'USER_ID': req.params.USER_ID
    }
  );
});
//-----------------------
router.get('/getUserProfile/:USER_ID', (req, res) => {
  servicePool(req, res,
    statements.getUserProfile.statement, {
      'USER_ID': req.params.USER_ID
    }
  );
});


router.post("/updateUserProfile/:USER_ID", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateUserRole.composeupdatestatement(
      "employees",
      req.body,
      "USER_ID = " + req.params.USER_ID
    ),
    []
  );
});

//------------------------------------------
router.get('/getUserPic/:USER_ID/:EXT',
  (req, res) => {
    businessPool(req, res, statements.getUserPic.statement, {
        "USER_ID": req.params.USER_ID
      }, 'IMG').then(async pic => {
        if (pic.rows.length > 0) {

          let ipAddress = await publicIp.v4()
          fs.createWriteStream('assets/profiles/pic-' + req.params.USER_ID + '.' + req.params.EXT).write(pic.rows[0][0]);
          res.status(200).json({
            "status": 200,
            "url": "http://" + ipAddress + ":" + process.env.INVPORT + "/profiles/pic-" + req.params.USER_ID + '.' + req.params.EXT
          });
        } else {
          res.status(200).json({
            "status": 200,
            "url": "http://" + ipAddress + ":" + process.env.INVPORT + "/img/unknown.png"
          });
        }
      })
      .catch(error => {
        res.status(200).json({
          status: 400,
          message: "error while getting user image .."
        });
      });
  });



module.exports = router;
