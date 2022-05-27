//! run in terminal 'node hex.js' to generate new secret using nodejs built in crypto method
const crypto = require('crypto');
const token = crypto.randomBytes(256).toString('hex');

console.log(token);