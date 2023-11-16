const mongoose = require('mongoose');

const musicianSchema = new mongoose.Schema({
    musicianName: {type: String, unique: true},
    showsPlayedAt: Number,
    numSongsToBePlayedAtNextShow: Number,
    totalStreams: Number
}, {collection: 'Musician-Metrics'});

const musician= mongoose.model('Musician Info', musicianSchema);
module.exports = musician;