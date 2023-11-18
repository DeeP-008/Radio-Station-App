const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema ({
    date: { type: String, unique: true },
    genre: String,
    timeslot: String,
    filled: Boolean,
    playlist: String
})

const signUps = mongoose.model('sign-ups', signUpSchema);
module.exports = signUps;