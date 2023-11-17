/**
 * Author: Dhyeya Padhya
 * This file creates the schema for the MongoDB database collection titled Songs
 */
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {type:String, unique:true},  //The unique parameter stops users from entering duplicate data about the same song.
  artist: String,
  duration: Number,
  genre: String,
  releaseDate: String,
  mp3: String
}, {collection: 'Songs'});

//Model schema to a collection in the database named 'Songs'
const Song = mongoose.model('Songs', songSchema);

module.exports = Song;
