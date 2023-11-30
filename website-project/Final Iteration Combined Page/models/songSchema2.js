const mongoose = require('mongoose');

//songs 
const songSchema2 = new mongoose.Schema({
  name: String,
  artist: String,
  duration: Number
}, {collection: 'userSongs'});


const userSongs = mongoose.model("userSongs", songSchema2);

module.exports = userSongs;