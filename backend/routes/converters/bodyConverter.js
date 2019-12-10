let body = [];
let oracledb = require('oracledb');

function bodyconverter(req, res, body, outparameter) {
    return new Promise((resolve, reject) => {
        try {
            for (let key in outparameter) {
                if (outparameter.hasOwnProperty(key)) {
                    body[outparameter[key]] = { type: oracledb.DEFAULT, dir: oracledb.BIND_OUT };
                }
            }
            resolve(body);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports =
    {
        bodyconverter: bodyconverter,
        body: body
    };



// kol el feha btgep el out parameter el tal3 w t7oto fel response el rag3 
