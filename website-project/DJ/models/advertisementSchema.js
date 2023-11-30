const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema ({
    name: { type: String, unique: true },
    mp3: String,
    duration: Number
})

const ad = mongoose.model('advertisement', advertisementSchema);
module.exports = ad;