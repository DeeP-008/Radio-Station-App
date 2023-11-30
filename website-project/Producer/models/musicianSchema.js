/**
 * Author: Dhyeya Padhya
 * This file creates the schema for the MongoDB database collection titled Musician-Metrics
 */
const mongoose = require('mongoose');

const musicianSchema = new mongoose.Schema({
    musicianName: {type: String, unique: true},     //The unique parameter stops users from entering duplicate data about the same musisician.
    showsPlayedAt: Number,
    numSongsToBePlayedAtNextShow: Number,
    totalStreams: Number
}, {collection: 'Musician-Metrics'});

//Model schema to a collection in the database named 'Musician-Metrics'
const musician= mongoose.model('Musician-Metrics', musicianSchema);
module.exports = musician;