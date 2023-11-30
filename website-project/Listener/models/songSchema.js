const mongoose = require('mongoose');

//songs 
const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  duration: Number
}, {collection: 'userSongs'});


const userSongs = mongoose.model("userSongs", songSchema);

module.exports = userSongs;