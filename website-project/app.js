const express = require('express');
const path = require('path');
const app = express();
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
