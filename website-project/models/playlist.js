const mongoose = require('mongoose');

//the different playlist
const playlist = new mongoose.Schema({
  name: String,
  songName: [String]
}, {collection: 'playlist-songs'});


const userPlaylist = mongoose.model("Playlist", playlist);

module.exports = userPlaylist;