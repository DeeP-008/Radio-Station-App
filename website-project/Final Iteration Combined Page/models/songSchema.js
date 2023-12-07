const mongoose = require('mongoose');

const songSchema = new mongoose.Schema ({
    name: { type: String, unique: true },
    artist: String,
    album: String,
    releaseDate: String,
    certs: String,
    mp3: String,
    image: String,
    duration: Number
});

const music = mongoose.model('songs', songSchema);
const playlist = mongoose.model('playlist', songSchema);
const curSong = mongoose.model('curSong', songSchema);
module.exports = {music, playlist, curSong};