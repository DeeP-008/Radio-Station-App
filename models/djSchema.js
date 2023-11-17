/**
 * Author: Dhyeya Padhya
 * This file creates the schema for the MongoDB database collection titled DJ-Show-Info
 */
const mongoose = require('mongoose');

const djSchema = new mongoose.Schema({
    djName: {type: String, unique: true},   //The unique parameter stops users from entering duplicate data about the same DJ.
    showsPlayedAt: Number,
    willPlayAnotherShow: Boolean,
    numSongsToBePlayedAtNextShow: Number
    
}, {collection: 'DJ-Show-Info'});

//Model schema to a collection in the database named 'DJ-Show-Info'
const dj= mongoose.model('DJ-Show-Info', djSchema);
module.exports = dj;