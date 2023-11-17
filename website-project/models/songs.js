const mongoose = require('mongoose');

//songs 
const songs = new mongoose.Schema({
  name: String,
  artist: String,
  duration: Number
}, {collection: 'userSongs'});


const userSongs = mongoose.model("userSongs", songs);

module.exports = userSongs;