const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

// MongoDB Atlas connection URI
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

// Connect to MongoDB using MongoClient
async function connectMongoDB() {
  try {
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

// Get Mongoose connection
const mongooseConnection = mongoose.connection;

// Listen for Mongoose connection events
mongooseConnection.on('error', console.error.bind(console, 'Mongoose Connection Error:'));
mongooseConnection.once('open', function () {
  console.log('Mongoose connected to MongoDB Successfully!');
});

const app = express();
app.use(express.json());

// Close connections and exit the process after 5 seconds
function closeConnections() {
  client.close();
  mongooseConnection.close();
  console.log('Connections closed. Exiting...');
  process.exit(0);
}

// Gracefully close connections and terminate the process after 5 seconds
setTimeout(closeConnections, 5000); // Adjust the timeout as needed

// Expose the app for potential future use
module.exports = app;
