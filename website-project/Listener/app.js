const express = require('express');
const app = express();
const path = require('path');
const port = 8080;  //specify localhost port
const searchHistory = require('./models/searchHistory');
const db = require("./database");


// Serve static files from the 'views/resources' directory
app.use(express.static(path.join(__dirname, 'views/resources')));
app.use(express.static(path.join(__dirname, 'views/resources/html')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

const searchHistoryArray = [
];


// Define a route to render your EJS template with search history data
app.get('/', async (req, res) => {
  try {
    // Fetch search history data from the server
    const searchHistoryData = await searchHistory.find().sort({ timestamp: -1 });

    // Map the retrieved data to an array of strings
    const searchHistoryArray = searchHistoryData.map(entry => entry.input);

    // Render the EJS template with search history data
    res.render('listener', { searchHistoryArray });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering the template');
  }
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));

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


// Server-side route
app.post('/clear-history', async (req, res) => {
  console.log('Received request to clear history');
  try {
    // Clearing search history (replace this with your actual logic)
    await searchHistory.deleteMany({});

    //res.json({ message: 'Search history cleared successfully' });
  } catch (error) {
    console.error('Error clearing search history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//start the server and listen at the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});