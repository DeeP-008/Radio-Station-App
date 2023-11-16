const mongoose = require('mongoose');

const djSchema = new mongoose.Schema({
    djName: {type: String, unique: true},
    showsPlayedAt: Number,
    willPlayAnotherShow: Boolean,
    numSongsToBePlayedAtNextShow: Number
    
}, {collection: 'DJ-Show-Info'});

const dj= mongoose.model('DJ Show Info', djSchema);
module.exports = dj;