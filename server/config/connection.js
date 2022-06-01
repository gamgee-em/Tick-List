const { connect, connection } = require('mongoose');
//require('dotenv').config();

connect(process.env.MONGODB_URI || 'mongodb://localhost/guidebookdb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

module.exports = connection;