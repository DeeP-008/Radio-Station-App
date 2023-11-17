const mongoose = require('mongoose');

const recentlySearchedSchema = new mongoose.Schema({
    input: {type: String, index: true},
    numRecents: Number,
    timestamp: {type: Date, default: Date.now}
}, {collection: 'Recently-Searched'});

const recentlySearched = mongoose.model('Recently-Searched', recentlySearchedSchema);
module.exports = recentlySearched;