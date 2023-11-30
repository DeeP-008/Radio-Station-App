/**
 * Author: Dhyeya Padhya
 * This file creates the schema for the MongoDB database collection titled Recently-Searched
 */
const mongoose = require('mongoose');

const recentlySearchedSchema = new mongoose.Schema({
    input: {type: String, index: true},
    numRecents: Number,     //keeps track of how many times an entry is searched
    timestamp: {type: Date, default: Date.now}
}, {collection: 'Recently-Searched'});

//Model schema to a collection in the database named 'Recently-Searched'
const recentlySearched = mongoose.model('Recently-Searched', recentlySearchedSchema);
module.exports = recentlySearched;