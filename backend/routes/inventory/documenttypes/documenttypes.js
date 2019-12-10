require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require('./documenttypessql');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validateDocumentType = require('@lib/validatestructure');


router.get('/getDocsTypes' ,function (req, res)
{
    servicePool(req, res, statements.getDocsTypes.statment, []);
});

router.get('/getDocsByID/:DOCUMENT_TYPE_ID', function (req, res) {
    servicePool(req, res, statements.getDocsByID.statment, {DOCUMENT_TYPE_ID: req.params.DOCUMENT_TYPE_ID });
});

router.post("/updateDocumentTypesById/:document_type_id", checkData, (req, res) => {
  servicePool(
    req,
    res,
    validateDocumentType.composeupdatestatement(
      "document_types",
      req.body,
      "document_type_id = " + req.params.document_type_id
    ),
    []
  );
});

module.exports = router;
