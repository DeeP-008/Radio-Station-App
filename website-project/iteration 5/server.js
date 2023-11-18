const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
const {songs, advertisements, sign_ups} = require('./songs.json');
const app = express();
const path = require('path');
const music = require('./models/songSchema.js');
const ad = require('./models/advertisementSchema.js');
const signUps = require('./models/signUpSchema.js');
const logon =require('./models/loginSchema.js');
const bodyParser = require('body-parser');
const DATABASE_URL = process.env.DATABASE_URL;
let songLibrary = [];
let adLibrary = [];
let signList = [];
let loginList = [];
let lgcnt = 0;
let srcLocal = "../../songs/MELTYBLOOD.mp3";
let imgLocal = "../../images/PlaceholderLC.png";
let titleLocal = songs[1].name;
let artLocal = songs[1].name;
let raLocal = songs[1].album;
let rdLocal = songs[1].releaseDate;
let certsLocal = songs[1].certs;
let curUser = "Profile";
async function connect() {
    await mongoose.connect(DATABASE_URL)

    mongoose.connection
        .on("open", () => console.log("Mongoose Connected"))
        .on("close", () => console.log("Disconnected from Mongoose"))
        .on("error", (error) => console.log(error))  

    await music.deleteMany();
    await ad.deleteMany();
    await signUps.deleteMany();

    for (let i = 0; i < songs.length; i++){
        songLibrary[i] = new music({name: songs[i].name, artist: songs[i].artist, album: songs[i].album,
        releaseDate: songs[i].releaseDate, certs: songs[i].certs, mp3: songs[i].mp3, image: songs[i].image, duration: songs[i].duration})
        await songLibrary[i].save();
    }
    for (let j = 0; j < advertisements.length; j++){
        adLibrary[j] = new ad({name: advertisements[j].name, mp3: advertisements[j].mp3, duration: advertisements[j].duration})
        await adLibrary[j].save();
    }
    for (let k = 0; k < sign_ups.length; k++){
        signList[k] = new signUps({date: sign_ups[k].date, genre: sign_ups[k].genre, timeslot: sign_ups[k].timeslot, filled: sign_ups[k].filled, playlist: sign_ups[k].playlist})
        await signList[k].save();
    }   

   
}

async function newLog(un, pw){
    loginList[lgcnt] = new logon({uname: un, pword: pw});
    await loginList[lgcnt].save();
    lgcnt++;

}

async function songInfo(sname){
    console.log('here');
    const sq = await music.findOne({ name: sname});
    titleLocal = sq.name;
    artLocal = sq.artist;
    raLocal = sq.album;
    rdLocal = sq.releaseDate;
    certsLocal = sq.certs;
    srcLocal = sq.mp3;
    imgLocal = sq.image;

}

connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

/*app.get('/index/:name', async (req, res) => {
    const song_name = req.params.name;
})*/

app.get('/', async function(req, res) {
    res.render('pages/index', {
        songs:songs,
        advertisements:advertisements,
        sign_ups:sign_ups,
        srcLocal:srcLocal,
        curUser:curUser,
        imgLocal:imgLocal,
        titleLocal:titleLocal,
        artLocal:artLocal,
        raLocal:raLocal,
        rdLocal:rdLocal,
        certsLocal:certsLocal
    });
});

app.get('/help', function(req, res) {
    res.render('pages/help', {
        curUser:curUser
    });
});

app.get('/sign_in', function(req, res)
{
    res.render('pages/sign_in', {
        curUser:curUser
    });
})

app.post('/look', (req, res) => {
    console.log(req.body);
    let skeys = Object.keys(req.body);
    songInfo(req.body[skeys[0]]);
})

app.post('/logon', (req,res) => {
    console.log('login succesful');
    console.log(req.body);
    let keys = Object.keys(req.body);
    newLog(req.body[keys[0]], req.body[keys[1]]);
    curUser = req.body[keys[0]];
})

app.post('/logout', (req,res) => {
    curUser = "Profile";
})

app.post('/songS', (req, res) => {

})

app.put('/songChange', (req, res) => {
    console.log(req.body);
})

app.listen(8080);
console.log(songs[1].name)
