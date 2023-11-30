const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
const {songs, advertisements, sign_ups} = require('./songs.json');
const app = express();
const path = require('path');
const {music, playlist, curSong} = require('./models/songSchema.js');
const ad = require('./models/advertisementSchema.js');
const signUps = require('./models/signUpSchema.js');
const logon =require('./models/loginSchema.js');
const bodyParser = require('body-parser');
const { deserialize } = require('v8');
const DATABASE_URL = process.env.DATABASE_URL;
let songLibrary = [];
let adLibrary = [];
let signList = [];
let loginList = [];
let playlistSongs = [];
let showSong = 0;
let playDuration = 0;
let z = 0;
let lgcnt = 0;
let imgLocal = "../../images/PlaceholderLC.png"
let srcLocal = "../../songs/MELTYBLOOD.mp3";
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
    await curSong.deleteMany();
    await playlist.deleteMany();

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
    while (z < 5){
        playlistSongs[z] = new playlist({name: "song " + (z + 1), artist: "", album: "", album: "",
        releaseDate: "", certs: "", mp3: "", image: "", duration: 0})
        await playlistSongs[z].save();
        z++;
    }
    z = 0;
    showSong = new curSong({name: "", artist: "", album: "",
        releaseDate: "", certs: "", mp3: "", image: imgLocal, duration: 0})
        await showSong.save();
   
}

async function newLog(un, pw){
    loginList[lgcnt] = new logon({uname: un, pword: pw});
    await loginList[lgcnt].save();
    lgcnt++;

}

async function songInfo(sname){
    console.log('here');
    const sq = await music.findOne({ name: sname});
    showSong = await curSong.findOne();
    showSong.name = sq.name;
    showSong.artist = sq.artist;
    showSong.album = sq.album;
    showSong.releaseDate = sq.releaseDate;
    showSong.certs = sq.certs;
    showSong.mp3 = sq.mp3;
    showSong.image = sq.image;
    srcLocal = sq.mp3;
    await showSong.save();

}

async function dateEntry(date, slot, handle, email){
    const dy = await music.findOne({ date: date});
    dy.handle[slot] = handle;
    dy.emailadd[slot] = email;
    await dy.save(); 
}

async function addPlay(sname) {
    const sg = await music.findOne({ name: sname});
    playlistSongs[z] = await new playlist({name: sg.name, artist: sg.artist, album: sg.album,
        releaseDate: sg.releaseDate, certs: sg.certs, mp3: sg.mp3, image: sg.image, duration: sg.duration});
    playDuration += sg.duration;
    await playlistSongs[z].save();
    z++;
}

async function removePlay(sname) {
    await playlist.deleteOne({ name: sname});
}

connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', async function(req, res) {
    res.render('pages/index', {
        songs:songs,
        showSong:showSong,
        playlistSongs:playlistSongs,
        advertisements:advertisements,
        playDuration:playDuration,
        sign_ups:sign_ups,
        srcLocal:srcLocal,
        curUser:curUser
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

app.put('/signUp', (req, res) => {
    let skeys = Object.keys(req.body);
    dateEntry(req.body[skeys[0]],req.body[skeys[1]],req.body[skeys[2]],req.body[skeys[3]]);
})

app.post('/playadd', (req, res) => {
    let skeys = Object.keys(req.body);
    addPlay(req.body[skeys[0]]);
})

app.post('/playremove', (req, res) => {
    console.log(req.body);
    let skeys = Object.keys(req.body);
    removePlay(req.body[skeys[0]])
})

app.post('/logon', (req,res) => {
    console.log('login succesful');
    console.log(req.body);
    let keys = Object.keys(req.body);
    newLog(req.body[keys[0]], req.body[keys[1]]);
    curUser = req.body[keys[0]];
})

app.post('/logout', (req,res) => {
    console.log('hi');
    curUser = "Profile";
})

app.put('/remName', (req,res) => {
    let keys = Object.keys(req.body);
    console.log(req.body[keys[0]]);
    removePlay(req.body[keys[0]]);
})

app.post('/songS', (req, res) => {

})

app.put('/songChange', (req, res) => {
    console.log(req.body);
})

app.listen(8080);
console.log('sucessful connection');
