const express = require('express');
const path = require('path');
const app = express();
const mongodb = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const searchHistory1 = require('./models/searchHistory');
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the 'views/resources' directory
app.use(express.static(path.join(__dirname, 'views/resources')));

// Define a route to render your EJS template
app.get('/', (req, res) => {
  res.render('listener');
});

app.get('/api', (req, res) => {
  res.json(`HTTP GET request received`);
});

app.use(function(req, res) {
  res.status(404).send('404 Error: Resource not found');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post('/searchHistory', async(req,res) =>{
  try{

    const{query} = req.body;

    //check if it already exists
    const exists = await searchHistory1.findOne({ input: query });
    if(exists){
      exists.timestamp = new Date();
      await exists.save();
    }
    else{
      const newEntry = new searchHistory1({
        input: query,
        timestamp: new Date(),
      });
      await newEntry.save();
    }
    res.status(201).json({message: "Search History Updated."});
  } catch(error){
    console.error(error);
    res.status(500).json({error: "Error! Couldn't connect to server."});
  }
});
app.get('/searchHistory', async (req,res) =>{
  try{
    const Searched = new searchHistory1.find();
    res.status(200).json(Searched);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Error! Couldn't get search history"});
  }
});
