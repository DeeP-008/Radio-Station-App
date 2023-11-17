const express = require('express');
const app = express();
const path = require('path');
const port = 8080;  //specify localhost port
const searchHistory = require('./models/recentlySearchedSchema');
const db = require("./database");

// Serve static files from the 'views/resources' directory
app.use(express.static(path.join(__dirname, 'views/resources')));
app.use(express.static(path.join(__dirname, 'views/resources/html')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Define a route to render your EJS template
app.get('/', (req, res) => {
  res.render('listener');
});



app.use(express.json());
app.use(express.urlencoded({extended:true}));

console.log("TESTING1");

app.post('/Recently-Searched', async(req,res) =>{
  console.log("TESTING2");
  try{
    const{query} = req.body;
    //check if it already exists
    const exists = await searchHistory.findOne({ input: query });
    if(exists){
      exists.timestamp = new Date();
      exists.numRecents += 1;
      await exists.save();
    }
    else{
      const newEntry = new searchHistory({
        input: query,
        numRecents: 1,
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

app.get('/Recently-Searched', async (req,res) =>{
  try{
    const Searched = new searchHistory.find().sort({timestamp: -1}).limit(5);
    res.status(200).json(Searched);
  }catch(error){
    console.error(error);
    res.status(500).json({error: "Error! Couldn't get search history"});
  }
});

console.log("TESTING3");
//start the server and listen at the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});