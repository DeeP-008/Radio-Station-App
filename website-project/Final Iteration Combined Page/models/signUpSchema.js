const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema ({
    playlistSongs: [String]
})

const signUpSchema = new mongoose.Schema ({
    date: { type: String, unique: true },
    genre: [String],
    timeslot: [String],
    filled: [Boolean],
    playlist: [playlistSchema],
    handle: [String],
    emailadd: [String]
})

const signUps = mongoose.model('sign-ups', signUpSchema);
module.exports = signUps;