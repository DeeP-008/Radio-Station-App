const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    input: String,
    timestamp: {type: Date, default: Date.now}
}, {collection: 'Playlists'});

const playlists = mongoose.model('Playlists', playlistSchema);
module.exports = playlists;