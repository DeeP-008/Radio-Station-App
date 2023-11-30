/**Author: Dhyeya Padhya
 * This app.js will run the radio station webpage from the producer's perspective. You can run this code by typing in node app.js or nodemon app.js in 
 * your terminal in the directory this file is in.
 */

//require path and express modules for express.js
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;  //specify localhost port
const searchHistory = require('./models/recentlySearchedSchema'); //import model for searchHistory collection in DB
const addedPlaylists = require('./models/playlistSchema');  //import model for searchHistory collection in DB
const db = require("./database"); //require database file to connect app to database
const mongoose = require('mongoose');
const session = require('express-session');   //module to help in session management

const searchResults = [];
const playlists = [];

//Configure session management middleware
app.use(
  session({
    secret: "VxoByU3uH3xuGziR0kL0MQ0Rcfv0WwUjpl0Ef6wbH0ILS2Jq3hj8w5Hbwjw4GKG8",   //randomly generated session key. TODO: Find a way to hide it
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: 1000*60*30  //session duration in milliseconds (30 minutes)
    },
  })
);

/****************commented because used in testing session management****************/
// app.get('/test-session', (req, res) => {
//   if (!req.session.counter) {
//     req.session.counter = 1;
//   } else {
//     req.session.counter += 1;
//   }
//   res.send(`Counter: ${req.session.counter}`);
// });
/***************************************************************************************/

//Serve static HTML, CSS and javascript files from the 'public' directory. Allows resuing pre-written code
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'Producer/public/html')));

//set view engine ejs and configure the "views" directory
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

//Define arrays of musician's, DJs, upcoming shows location and search results to display using ejs 
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
app.get('/', async function(req, res){
  try{
    const recentlySearched = await searchHistory.find().sort ({timestamp:-1}).limit(4);
    searchResults.splice(0, searchResults.length, ...recentlySearched.map(search => search.input));
    res.render('index', {upcomingShows,DJs,musicians,searchResults,playlists});
  } catch(error){
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//start the server and listen at the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
