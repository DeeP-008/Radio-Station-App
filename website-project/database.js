const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const songDB = require('./models/songs');
const playlistDB = require('./models/playlist');
const listenerPreferenceDB = require('./models/listenerPreference');
const fs = require('fs');




// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/RadioStation';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB using MongoClient
async function connectMongoDB() {
  try {
    await mongoose.connect(mongoURI)
    
    mongoose.connection
    .on("open", () => console.log("Mongoose Connected"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error))
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Connection Error:', error);
    process.exit(1); // Exit the process if there's an error connecting to MongoDB
  }
}

// Mongoose connection to MongoDB
mongoose.connect(mongoURI);

connectMongoDB();

// Get Mongoose connection
const mongooseConnection = mongoose.connection;

// Listen for Mongoose connection events
mongooseConnection.on('error', console.error.bind(console, 'Mongoose Connection Error:'));
mongooseConnection.once('open', function () {
  console.log('Mongoose connected to MongoDB Successfully!');
});

const app = express();
app.use(express.json());
/*
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
*/

// Gracefully close connections and terminate the process after 5 seconds
setTimeout(closeConnections, 5000); // Adjust the timeout as needed

// Expose the app for potential future use
module.exports = app;