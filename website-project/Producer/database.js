/**
 * Author: Dhyeya Padhya
 * This file connects to MongoDB database. The commented part at the end populates the database from the backend. Could potentially
 * move it to a new file to clean up the code. Also need to find a way to hide the username and password.
 */

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

/****************commented because they are used in populating database****************/
// const Song = require('./models/songSchema');
// const musicianData = require('./models/musicianSchema');
// const djData = require('./models/djSchema');
// const fs = require('fs');
/***************************************************************************************/

// MongoDB Atlas connection URI. 
//TODO: Figure out how to hide username and password.
const mongoURI =
  'mongodb+srv://dhyeyapadhya:ehXK4O1NXuZyFVtq@cluster0.nudewac.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
  // Get Mongoose connection
  const mongooseConnection = mongoose.connection;

// Connect to MongoDB
 async function connectMongoDB() {
     // Mongoose connection to MongoDB database called Radio-Station-DB
     mongoose.connect(mongoURI, {dbName: 'Radio-Station-DB'});
     // Listen for Mongoose connection events
      mongooseConnection.on('open', function () {
      console.log('Mongoose connected to MongoDB Successfully!');
      });
      mongooseConnection.on("close", function(){
      console.log("Mongoose connection closed");
      });
      mongooseConnection.on('error', console.error.bind(console, 'Mongoose Connection Error.'
      ));
}
connectMongoDB();   //call function to connect to database

//create Express app
const app = express();
app.use(express.json());

/****************commented because they are used in populating database********************************************************************************/
// // Close connections and exit the process after 5 seconds
// function closeConnections() {
//   client.close();
//   mongooseConnection.close();
//   console.log('Connections closed. Exiting...');
//   process.exit(0);
// }

// Gracefully close connections and terminate the process after 5 seconds
//setTimeout(closeConnections, 5000); // Adjust the timeout as needed

// // Use JSON file containing information about songs to populate an array songs, which will then be inserted into the database
// const songs = JSON.parse(fs.readFileSync('../SWE432/data/songData.json','utf8'));

// //use Mongoose's insertMany method to populate the songs array in the database
// Song.insertMany(songs)
// .then(function(songs){
//   console.log('Songs saved: ',songs);
// })
// .catch(function(err){
//   console.log(err);
// });

// const musicians = JSON.parse(fs.readFileSync('../SWE432/data/musicianData.json','utf8'));
// musicianData.insertMany(musicians)
// .then(function(musicians){
//   console.log('Saved dat of these musicians: ', musicians);
// })
// .catch(function(err){
//   console.log(err);
// });

// const djShowInfo = JSON.parse(fs.readFileSync('../SWE432/data/djData.json','utf8'));
// djData.insertMany(djShowInfo)
// .then(function(djShowInfo){
//   console.log("Saved data of these DJ's: ", djShowInfo);
// })
// .catch(function(err){
//   console.log(err);
// });
/****************commented because they are used in populating database********************************************************************************/

// Expose the app for potential future use
module.exports = app;
