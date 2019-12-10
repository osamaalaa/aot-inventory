
let crypto = require('crypto');
let iv = new Buffer('0000000000000000');
let key = 'A@TSecurity24360';
 function decrypt(PASSWORD) {
    var cc = crypto.createDecipher('aes-128-ecb', new Buffer(key));
    return Buffer.concat([cc.update(PASSWORD, 'base64'), cc.final()]).toString('utf8');
        
  }
module.exports = decrypt;
