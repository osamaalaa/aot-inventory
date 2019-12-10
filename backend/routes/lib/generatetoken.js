let jwt = require('jsonwebtoken');

function generatetoken () {
    return new Promise((resolve, reject) => {
        try{
        resolve (jwt.sign({ data: 'foobar' }, 'WaelAbdeen', { expiresIn: '5m' }));
        }catch(error){
         reject (error);
        }
    });
}

module.exports = generatetoken;
