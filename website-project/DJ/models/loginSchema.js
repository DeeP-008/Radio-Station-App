const mongoose = require('mongoose');

const logonSchema = new mongoose.Schema ({
    uname: String,
    pword: String
})

const logon = mongoose.model('logon', logonSchema);
module.exports = logon;