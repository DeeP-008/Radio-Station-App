const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Import connect-mongo
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const songDB = require('./models/songSchema2');
const playlistDB = require('./models/playlistSchema');
const listenerPreferenceDB = require('./models/listenerPreferenceSchema');
const fs = require('fs');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/swe432b';
// Get Mongoose connection
const mongooseConnection = mongoose.connection;

// Connect to MongoDB using MongoClient
async function connectMongoDB() {
    //mongoose.connect(mongoURI, {dbName: 'RadioStation'}); // Mongoose connection to MongoDB

    mongooseConnection.on('open', function () {
    console.log('Mongoose connected to MongoDB Successfully!');
    });
    mongooseConnection.on("close", function(){
    console.log("Mongoose connection closed");
    });
    mongooseConnection.on('error', console.error.bind(console, 'Mongoose Connection Error:'));

}
connectMongoDB();

const app = express();
app.use(express.json());

// Configure express-session
app.use(
  session({
    secret: 'key123',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000, // 10 minutes (in milliseconds)
    },
  })
);



// Close connections and exit the process after 5 seconds
function closeConnections() {
  client.close();
  mongooseConnection.close();
  console.log('Connections closed. Exiting...');
  process.exit(0);
}

app.listen(3000, () => console.log("Listening"));


// Use JSON file containing information about songs to populate an array songs, which will then be inserted into the database
const song = JSON.parse(fs.readFileSync('data/songData.json','utf8'));
//use Mongoose's insertMany method to populate the songs array in the database
songDB.insertMany(song)
.then(function(songs){
  console.log('Songs saved: ',song);
})
.catch(function(err){
  console.log(err);
});

const playlist = JSON.parse(fs.readFileSync('data/playlistData.json','utf8'));
//use Mongoose's insertMany method to populate the songs array in the database
playlistDB.insertMany(playlist)
.then(function(songs){
  console.log('Songs saved: ',playlist);
})
.catch(function(err){
  console.log(err);
});

const listenerPreference = JSON.parse(fs.readFileSync('data/listenerPreferenceData.json','utf8'));
//use Mongoose's insertMany method to populate the songs array in the database
listenerPreferenceDB.insertMany(listenerPreference)
.then(function(songs){
  console.log('Songs saved: ',listenerPreference);
})
.catch(function(err){
  console.log(err);
});




// Gracefully close connections and terminate the process after 5 seconds
//setTimeout(closeConnections, 5000); // Adjust the timeout as needed

// Expose the app for potential future use
module.exports = app;