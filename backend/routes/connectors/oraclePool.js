
let dbconfig = require('./dbconfig');
let oracledb = require('oracledb');

oracledb.createPool({
    user:             dbconfig.user,
    password:         dbconfig.password,
    connectString:    dbconfig.connectString,
    poolMax:          44,
    poolMin:          2,
    poolTimeout:      0
}, function(err, pool) {

    if (err) {
      console.log("ERROR: ", new Date(), ": createPool() callback: " + err.message);
      return;
    }
    require('./oracledb.js')(pool);
});
