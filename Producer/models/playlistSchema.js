/**
 * Author: Dhyeya Padhya
 * This file creates the schema for the MongoDB database collection titled Playlists
 */
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    input: String,
    timestamp: {type: Date, default: Date.now}
}, {collection: 'Playlists'});

//Model schema to a collection in the database named 'Playlists'
const playlists = mongoose.model('Playlists', playlistSchema);
module.exports = playlists;