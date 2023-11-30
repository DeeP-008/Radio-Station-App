const mongoose = require('mongoose');

//the different playlist
const playlistSchema = new mongoose.Schema({
  name: String,
  songName: [String]
}, {collection: 'playlist-songs'});


const userPlaylist = mongoose.model("playlist-songs", playlistSchema);

module.exports = userPlaylist;