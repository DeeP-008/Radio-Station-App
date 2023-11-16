const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {type:String, unique:true},
  artist: String,
  duration: Number,
  genre: String,
  releaseDate: String,
  mp3: String
}, {collection: 'Songs'});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
