// standard dec
require('module-alias/register');
let connPool = require('./routes/connectors/oraclePool');
const express = require('express');
const app = express();


let bodyParser = require('body-parser');
// custom dec
// let fileLogger = require('@log/fileLogger');
let filelogger = require('./routes/loggers/fileLogger');
// services dec
const token = require('@val/provideToken');
const items = require('./routes/inventory/items/items/items');
const itemsgroups = require('@itemsgroup/itemsgroup');
const itemsaliases = require('@itemsaliases/itemsaliases');
const itemscomponents = require('@itemscomponents/itemscomponents');
const itemtemplate = require('@itemmodule/itemmodule');
const itembalance = require('@itembalance/itembalance');
const itemsuppliers = require('@itemsuppliers/itemsuppliers');
const itemsunits = require('@itemsunits/itemsunits');
const itemsdetails = require('@itemsdetails/itemsdetails');
const itemssubs = require('@itemssubs/itemssubs');
let itemmodule = require('@itemmodule/itemmodule');
let itembalancedetail = require('@itemsbalancedetail/itemsbalancedetail');
let itembalanceunits = require('@itemsbalanceunits/itemsbalanceunits');
let itmtempdetails = require('@itemstemplatedetails/itemstemplatedetails');
const subsdiary = require('./routes/inventory/subsdiary/subsdiary');
const suppliers = require('@suppliers/suppliers');  // suppliers
const vatscheme = require('@inv/vatscheme/vatscheme');    // vatscheme
const zones = require('@inv/zones/zones');   // zones 
let chartofaccs = require('@inv/chartofaccs/chartofaccs');   // chart of accs 
const transactiontypes = require('./routes/inventory/transactiontypes/transactiontypes');
const rcvtempo = require('@rtmit/rcvtempo/rcvtempo');
const rcvtmpoitems = require('@rtmit/rcvtmpoitems/rcvtmpoitems');
const rcvdoctitemsd = require('@rtmit/rcvdoctitemsd/rcvDoctItemsD');
let rcvinspectioncomm = require('@rtmit/rcvinspectioncomm/rcvinspectioncomm');
let rcvinspectionitems = require('@rtmit/rcvinspectionitems/rcvinspectionitems');
let rcvinspectionitemsd = require('@rtmit/rcvinspectionitemsd/rcvinspectionitemsd');
let rcvtempocommitte = require('@rtmit/rcvtempocommitte/rcvtempocommitte');
let rcvtempoitemsd = require('@rtmit/rcvtmpoitemsd/rcvtmpoitemsd');
const shortagepolicy = require('@policy/shortagepolicy/shortagepolicy');
const slowmovingpolicy = require('@policy/slowmovingpolicy/slowmovingpolicy');
const storehouses = require('@stores/storehouses/storehouses');
const stores = require('@stores/stores/stores');
const storeslocation = require('@stores/storeslocation/storeslocation');
const storesitems = require('@stores/storesitems/storesitems');
const storesitemsgroup = require('@stores/storesitemsgroup/storesitemsgroup');
const storesdoctypes = require('@stores/storesdoctypes/storesdoctypes');
const storesitemsgroupno = require('@stores/storesitemsgroupno/storesitemsgroupno');
const storesitemsno = require('@stores/storesitemsno/storesitemsno');
let texscheme = require('@taxscheme/taxscheme/taxscheme');    // tax sceheme
let texschemedetail = require('@taxscheme/taxschemedetail/taxschemedetail');  // tax scheme detail
let ddlog = require('@ddlog/ddlog');            // ddl log 
let documenttypes = require('@docs/documenttypes');  // document types 
let openbalance = require('@INV/openbalance/openbalance');
let openbalanceitems = require('@INV/openbalanceitems/openbalanceitems');
let transactions = require('@INV/transactions/transactions');
let transactionsitems = require('@INV/transactionsitems/transactionitems');
let transfer = require('@INV/transfer/transfer');
let invbalancereq = require('@INV/invbalancerequest/invbalancerequest');
let invbalancereqitems = require('@INV/invbalancerequestitems/invbalancerequestitems');
let openbalanceitemsd = require('@INV/openbalanceitemsd/openbalanceitemsd');
let stockbalanceu = require('@INV/stocktakingbalanceu/stocktakingbalanceu');
let transitemsd = require('@INV/transactionsitemsd/transactionsitemsd');
let transferitems = require('@INV/transferitems/transferitems');
let transferitemsd = require('@INV/transferitemsd/transferitemsd');
let transferr = require('@INV/transferr/invtransferr');
let transferritems = require('@INV/transferritems/transferritems');
let transferstores = require('@INV/transferstores/transferstores');
const rcvdocument = require('@rtmit/rcvdocument/rcvdocument');
const rcvdoccommitte = require('@rtmit/revdocumentcommitte/revdocumentcommitte');
const rcvdocitems = require('@rtmit/rcvdocumentitems/rcvdocumentitems');
const rcvinspection = require('@rtmit/rcvinspection/rcvinspection');
let stocktaking = require('@INV/stocktaking/stocktaking');
let stocktakingbalance = require('@INV/stocktakingbalance/stocktakingbalance');
let stocktakingbalanced = require('@INV/stocktakingbalanced/stocktakingbalanced');
const invstockcommit = require("@INV/invstockcommitte/invstockcommitte");
const invstockitems = require("@INV/invstockitems/invstockitems");
const invstockstores = require("@INV/invstockstores/invstockstores");
const invperiod = require("@invperiod/inventoryperiod/inventoryperiod");
let imageupload = require('./routes/inventory/fileupload/imageupload');
let security = require("@security/security");
let userrole = require('./routes/inventory/userrole/userrole');
let itemprice = require('@itemprice/itemunitprices');
let requests = require('@requests/requests');  // requests
let approvals = require('@approvals/approvals');
let confirm = require('@confirm/confirm');
let statistics = require('@statistics/statistics')
let chartofaccsentity = require("@accentity/chartofaccsentity")  // chart of accs entity
let dspdocument = require('@dspdoc/dspdocument')  // dsp document
let dspdocitem = require('@dspdocitem/dspdocumentitems');  // dspdocument items 
let reqdoc = require('@reqdoc/reqdocument'); // req document
let reqdocitems = require("@reqdocitems/reqdocumentitems")
let reqdocitemsd = require("@reqdocitemsd/reqdocumentitemsd") ;
let dspdocitemsd = require("@dspdocitemsd/dspdocumentitemsd"); 
let empo  = require("@empo");    // empolyees 
let reciv = require("@reciv/reicv");  // recieve request 
let employees = require("@employees/employees")
let poTemp = require("@po-temp/po-temp")
let poTempItems = require("@po-temp-items/po-temp-items")
let reqCommittee = require("@req-committee/req-committee")
let purorderdoc = require("@purorderdoc/purorderdoc")

let joborder = require("@joborder/joborder");
let issueproc = require('@issproc');
// ----------- Multiple Languages ---------------------
let i18n=require("i18n-express");

//------------------------------------------------------
// common
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('assets'));
app.use(express.static("docs"));

// Authorization
// loggers
//app.use(fileLogger);
// performance

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
      return res.status(200).json({});
    }
    next();
  });



require('./routes/lib/prod')(app);

// services
app.use('/items/itmtempdetails' ,itmtempdetails);
app.use('/providetoken', token); // first service
app.use('/items', items ,itemsaliases , itemsgroups ,itemscomponents , itemmodule , itembalance ,itemsuppliers, itemsunits,itemsdetails,itemssubs);
app.use('/items', itembalancedetail); // itemsBalanceDetails
app.use('/items', itembalanceunits); // itemsBalanceUnits
app.use('/stores', stores );  // stores
app.use('/stores', storehouses);  // storesHouses
app.use('/stores', storeslocation);  // storesLocation
app.use('/stores', storesitems );  // storeItems
app.use('/stores', storesitemsgroup );  // storeItemsGroup
app.use('/rcvTempo' , rcvtempo , rcvtmpoitems) ; // RCV_TEMPORARY
app.use('/shortagePolicy', shortagepolicy, slowmovingpolicy ); // * shortage and slow policy *
app.use('/zones',zones);   // * zones *
app.use('/chartOfAccs',chartofaccs); // * chart of accs *
app.use('/subsDiary',subsdiary);  // * Subsdiary *
app.use('/suppliers', suppliers);  // * suppliers *
app.use('/transactionTypes',transactiontypes);  // * transaction types *
app.use('/vatScheme', vatscheme);   // * vat scheme * 
app.use('/taxScheme',texscheme);  // * tax Scheme *
app.use('/taxScheme',texschemedetail);  // * tax Scheme Detai *
app.use('/DDLlog',ddlog);  // * DDLLOG *
app.use('/DocTypes',documenttypes);  // * Document types * 
app.use('/OpenBalance',openbalance);  // * OpenBalance *
app.use('/OpenBalanceItems',openbalanceitems);  // OpenBalanceItems
app.use('/transactions',transactions);  // transaction
app.use('/transactionsItems',transactionsitems);  // transactionItems
app.use('/transfer', transfer);  // transfer
app.use('/rcvDocument' ,rcvdocument);
app.use('/rcvDocCommitte', rcvdoccommitte);
app.use('/rcvDocItems', rcvdocitems);
app.use('/rcvInspection', rcvinspection);
app.use('/stocktaking', stocktaking);
app.use('/stocktakingBalance', stocktakingbalance);
app.use('/stocktakingBalanceD', stocktakingbalanced);
app.use('/invStockStores', invstockstores);
app.use('/invStockItems', invstockitems);
app.use('/invStockCommit', invstockcommit);
app.use('/InvPeriod', invperiod);   // * inventory period *
app.use('/invBalanceReq', invbalancereq);
app.use('/invBalanceReqItems', invbalancereqitems);
app.use('/openBalanceItemsD', openbalanceitemsd);
app.use('/stockBalanceU', stockbalanceu);
app.use('/transItemsD', transitemsd);
app.use('/transferItems', transferitems);
app.use('/transferItemsD', transferitemsd);
app.use('/TransferR', transferr);
app.use('/transferRItems', transferritems);
app.use('/TransferStores', transferstores);
app.use('/itmTempDetails', itmtempdetails);
app.use('/rcvDoctItemsD', rcvdoctitemsd);
app.use('/rcvInspectionComm', rcvinspectioncomm);
app.use('/rcvInspectionItems', rcvinspectionitems);
app.use('/rcvInspectionItemsD', rcvinspectionitemsd);
app.use('/rcvTempoCommitte', rcvtempocommitte);
app.use('/rcvTempoItemsD', rcvtempoitemsd);  // rcvtempoitemsd
app.use('/stores', storesdoctypes);
app.use('/storesItemsGroupNO', storesitemsgroupno);
app.use('/storesItemsNO', storesitemsno);  
app.use('/itemImage', imageupload); //   * image upload * 
app.use("/security", security );  // * security * 
app.use("/userRole" , userrole);  // * user role * 
app.use('/statistics', statistics); // * statistics
app.use('/requests',requests);   // * requests *
app.use('/approvals',approvals);  // * approvals*
app.use('/confirm',confirm);  // *confirm*
app.use('/items/itemPrice',itemprice);  // *itemPrice*
app.use('/chartOfAccEntity', chartofaccsentity);  // * chartOfAccsEntity * 
app.use('/dspdocument', dspdocument);  // * dsp document *
app.use('/dspdocumentitems', dspdocitem); // * dsp document items *
app.use('/reqdocument', reqdoc);  // * req document *
app.use('/reqdocitems', reqdocitems)  // * req document items *
app.use('/reqdocitemsd', reqdocitemsd)  // * req document details items *
app.use('/dspdocitemsd' , dspdocitemsd) // * dsp document items details *
app.use('/joborder', joborder); // * job order * 
app.use('/issueproc', issueproc); // * issue processing *
app.use('/empolyees' , empo);  // * empolyees * 
app.use('/rec' , reciv); // * recieve request *
app.use('/employees' , employees); // * recieve request *
app.use('/po-temp' , poTemp); // * po temp *
app.use('/po-temp-items' , poTempItems); // * po temp *
app.use('/req-committee' , reqCommittee); // * po temp *
app.use('/purorderdoc' , purorderdoc); // * puroderdoc *

var path = require("path");  // path library :D 

//----------------------- ** MultiLanguages ** ----------------------------
app.use(i18n({
  translationsPath: path.join(__dirname+'/routes', 'i18n'), 
  siteLangs: ["en","ar"],
  textsVarName: 'translation'
}));
//-------------------------------------------------------------------------

// INVPORT
 const port = process.env.INVPORT ;
 app.listen(port, () => console.log(`Listening on Port :`+ process.env.INVPORT));

 