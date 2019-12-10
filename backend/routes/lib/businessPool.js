let oracleconn = require('../connectors/oracledb');

function Connect(req, res, _statement, _bindings, dataType = 'OBJECT') {
    return new Promise((resolve, reject) => {

        oracleconn.doConnect(function (err, connection) {
            if (err) {
                return (err);
            } else {
                
                oracleconn.doExecute(
                    connection, _statement, _bindings, dataType,
                    function (err, result, outBinds) {
                        if (err) {
                            oracleconn.doRelease(connection); // RELEASE CONNECTION             // ERROR
                            reject(err.message);
                        } else {
                            if (outBinds !== undefined){
                                response = outBinds;
                                for (let key in outBinds) {
                                    if (outBinds.hasOwnProperty(key)) {
                                        response[key] = outBinds[key][0];
                                    }
                                }
                                result = response;
                            }
                            let mresult = {
                                status: 200,
                                rows: result,
                                message: 'successed'
                            };

                            oracleconn.doRelease(connection); // RELEASE CONNECTION
                            resolve(mresult); // ALL IS GOOD
                        }
                    }
                );
            }
        });
    });
}

module.exports = Connect;
