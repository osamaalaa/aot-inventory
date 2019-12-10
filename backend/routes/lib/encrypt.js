
let crypto = require('crypto');
let iv = new Buffer('0000000000000000');
let key = 'A@TSecurity24360';
function encrypt(PASSWORD) {
    let cc = crypto.createCipher('aes-128-ecb', new Buffer(key));
    return Buffer.concat([cc.update(PASSWORD, 'utf8'), cc.final()]).toString('base64');
}
module.exports = encrypt;
