const mongoose = require('mongoose');

//songs 
const songs = new mongoose.Schema({
  title: String,
  artist: String,
  duration: Number
});


const userSongs = mongoose.model("usersSongs", songs);

module.exports = userSongs;