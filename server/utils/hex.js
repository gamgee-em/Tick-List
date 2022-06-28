//! run in terminal 'node hex.js' to generate new secret using the nodejs built in crypto method
const crypto = require('crypto');
const token = crypto.randomBytes(256).toString('hex');

//* copy from terminal and paste in .env secret
console.log(token);
