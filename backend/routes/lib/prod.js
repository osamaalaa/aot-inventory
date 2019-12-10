const helmet = require('helmet');
const compression = require ('compression');

function performance (app){
    app.use(helmet());
    app.use(compression());
}

module.exports = performance;