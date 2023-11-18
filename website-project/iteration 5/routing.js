const express = require("express");
const music = require('./models/songSchema.js');
const ad = require('./models/advertisementSchema.js');
const signUps = require('./models/signUpSchema.js');
const router = express.Router();

router.get("/swe", async (req, res) => {
    const allSongs = await music.find()
    res.send(allSongs);
})

router.get('/getsong')



module.exports = router;