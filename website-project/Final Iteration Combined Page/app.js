const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
const searchHistory = require('./models/searchHistory');
const {songs, advertisements, sign_ups} = require('./songs.json');
const app = express();
const path = require('path');
const db = require("./database");
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
const musicians = [
    { musicianName: 'Musician 1', url: 'musician1.html' },
    { musicianName: 'Musician 2', url: 'musician2.html' },
    { musicianName: 'Musician 3', url: 'musician3.html' },
    { musicianName: 'Musician 4', url: 'musician4.html' },
    { musicianName: 'Musician 5', url: 'musician5.html' },
    { musicianName: 'Musician 6', url: 'musician6.html' },
    { musicianName: 'Musician 7', url: 'musician7.html' },
    { musicianName: 'Musician 8', url: 'musician8.html' },
    { musicianName: 'Musician 9', url: 'musician9.html' },
    { musicianName: 'Musician 10', url: 'musician10.html' }
];

const DJs = [
            {djName: 'DJ 1', url:'dj1.html'},
            {djName: 'DJ 2', url:'dj2.html'},
            {djName: 'DJ 3', url:'dj3.html'},
            {djName: 'DJ 4', url:'dj4.html'},
            {djName: 'DJ 5', url:'dj5.html'},
            {djName: 'DJ 6', url:'dj6.html'}
];

const upcomingShows = [
                      {locationName:'Location 1', url: 'upcomingShow1.html'},
                      {locationName:'Location 2', url: 'upcomingShow2.html'},
                      {locationName:'Location 3', url: 'upcomingShow3.html'},
                      {locationName:'Location 4', url: 'upcomingShow4.html'},
                      {locationName:'Location 5', url: 'upcomingShow5.html'},
                      {locationName:'Location 6', url: 'upcomingShow6.html'}
];

const searchResults = [];
const playlists = [];



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
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', async function(req, res) {
    res.render('pages/index', {

    });
});

app.get('/djpage', async function(req, res) {
    res.render('pages/djpage', {
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

app.get('/listener', async (req, res) => {
    try {
      // Fetch search history data from the server
      const searchHistoryData = await searchHistory.find().sort({ timestamp: -1 });
  
      // Map the retrieved data to an array of strings
      const searchHistoryArray = searchHistoryData.map(entry => entry.input);
  
      // Render the EJS template with search history data
      res.render('pages/listener', { searchHistoryArray });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error rendering the template');
    }
});

app.post('/search-history', async(req,res) =>{
    try{
      const{query} = req.body;
      //check if it already exists
      const exists = await searchHistory.findOne({ input: query });
      if(exists){
        exists.timestamp = new Date();
        await exists.save();
      }
      else{
        const newEntry = new searchHistory({
          input: query,
          timestamp: new Date(),
        });
        await newEntry.save();
      }
      //res.status(201).json({message: "Search History Updated."});
    } catch(error){
      console.error(error);
      res.status(500).json({error: "Error! Couldn't connect to server."});
    }
  });
  app.get('/search-history', async (req,res) =>{
    try{
      const Searched = await searchHistory.find();
      res.status(200).json(Searched);
    }catch(error){
      console.error(error);
      res.status(500).json({error: "Error! Couldn't get search history"});
    }
  });

//Define routes to the musicianX.html files that are accessed when a user clicks on a musician button
app.get('/musician-metrics/:musicianName', async (req, res) => {
    const musicianName = req.params.musicianName;
    res.render('musician-metrics', { musicianName });
  });
  
  //Define routes to the djX.html files that are accessed when a user clicks on a dj button
  app.get('/dj-control-center/:djName', (req, res) => {
    const djName = req.params.djName;
    res.render('dj-control-center', { djName });
  });
  
  //Define routes to the upcomingSHowsX.html files that are accessed when a user clicks on an upcoming show button
  app.get('/upcoming-shows-info/:locationName', (req, res) => {
    const locationName = req.params.locationName;
    res.render('upcoming-shows-info', { locationName });
  });
  
  //Handle's JSON request from the express app
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  
  //Handle POST requests for the search bar on the website
  app.post('/Recently-Searched', async(req,res) =>{
    try{
      const{query} = req.body;  //extract the query parameter from the request body
  
      //check Database to see if input query already exists
      const exists = await searchHistory.findOne({ input: query });
      
      //if input query exists, update its timestamp and increment the 'numRecents' paramter that keeps track of how many times that entry appears in the search 
      if(exists){
        exists.timestamp = new Date();
        exists.numRecents += 1;
        await exists.save();  //save that entry in the database
      }
      else{   //if t doesnt exist, create a new entry with current time as timestamp
        const newEntry = new searchHistory({
          input: query,
          numRecents: 1,
          timestamp: new Date(),
        });
        await newEntry.save();
      }
  
      //Fetch the 4 most recent entries from the database and update the searchResults array with those entries to be rendered in the front-end
      const recentlySearched = await searchHistory.find().sort ({timestamp:-1}).limit(4);
      searchResults.splice(0, searchResults.length, ...recentlySearched.map(search => search.input));
      res.render('index', {upcomingShows,DJs,musicians,searchResults,playlists});
    
    } catch(error){   //error-handling in case of server connection issues
      console.error(error);
      res.status(500).json({error: "Error! Couldn't connect to server."});
    }
  });
  
  //Handles GET requests for the search bar
  app.get('/Recently-Searched', async (req,res) =>{
    try{
      //Fetch 5 most recent entries from the database and return a JSON obkect containing those entries
      const Searched = new searchHistory.find().sort({timestamp: -1}).limit(5);
      res.json(Searched);
    
    }catch(error){    //error handling in case search history couldnt be obtained
      console.error(error);
      res.status(500).json({error: "Error! Couldn't get search history."});
    }
  });
  
  /**Handle POST Requests for the Add Playlist functionality on the webpage. Logic similar to the POST request for the recently searched, but index.ejs creates buttons for each playlist that 
    the user wants to add so that they can be redirected to a different page that contains data about that playlist*/
  app.post('/Playlists', async(req,res) =>{
    try{
      const{query} = req.body;
      const exists = await addedPlaylists.findOne({ input: query });
      if(exists){
        exists.timestamp = new Date();
        await exists.save();
      }
      else{
        const newEntry = new addedPlaylists({
          input: query,
          timestamp: new Date(),
        });
        await newEntry.save();
      }
      const playlistAdded = await addedPlaylists.find().sort ({timestamp:1});
      playlists.splice(0, playlists.length, ...playlistAdded.map(added => added.input));
      res.render('index', {upcomingShows,DJs,musicians,searchResults, playlists});
    } catch(error){
      console.error(error);
      res.status(500).json({error: "Error! Couldn't connect to server."});
    }
  });
  
  /**Handles GET Requests for the add playlists functionality. Logic similar to get search request functionality
   * such that it returns the playlists from the database, but not sorted anyhow. The playlists array is filled as 
   * users enter the information, so the playlist created first will be at the top. */
  app.get('/Playlists', async (req,res) =>{
    try{
      const added = new addedPlaylists.find().sort({timestamp: 1});
      res.json(added);
    }catch(error){
      console.error(error);
      res.status(500).json({error: "Error! Couldn't get data on added playlists."});
    }
  });
  
  // Define a route to render individual playlist pages
  app.get('/playlist/:playlistName', async (req, res) => {
    try {
      const playlistName = req.params.playlistName;
      res.render('playlist', { playlistData: { input: playlistName } });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  //Define a route to render the 'index' or the main page view display data
  app.get('/producer', async function(req, res){
    try{
      const recentlySearched = await searchHistory.find().sort ({timestamp:-1}).limit(4);
      searchResults.splice(0, searchResults.length, ...recentlySearched.map(search => search.input));
      res.render('pages/producer', {upcomingShows,DJs,musicians,searchResults,playlists});
    } catch(error){
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  
  // Server-side route
app.post('/clear-history', async (req, res) => {
    console.log('Received request to clear history');
    try {
      // Clearing search history (replace this with your actual logic)
      await searchHistory.deleteMany({});
  
    } catch (error) {
      console.error('Error clearing search history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
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