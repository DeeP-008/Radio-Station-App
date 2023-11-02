/**Author: Dhyeya Padhya
 * This app.js will run the radio station webpage from the producer's perspective. You can run this code by typing in node app.js or nodemon app.js in 
 * your terminal in the directory this file is in.
 */

//require path and express modules for express.js
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;  //specify localhost port

//Serve static HTML, CSS and javascript files from the 'public' directory. Allows resuing pre-written code
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'public/website-project/html')));

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

const searchResults = ['Movement - Hozier',
                        'Moves Like Jagger - Maroon 5, Christina Aguilera',
                        'Movies - Conan Grey',
                        'I Like to Move It - will.i.am'
];

const user={
  playlists:[            
    'Workout Jam',
    'Lo-Fi',
    'Gangsta-Rap',
    "Today's Hits",
    'Coding and Crying'
  ]
};                       

//Define a route to render the 'index' or the main page view display data
app.get('/', (req, res) => {
    res.render('index', { musicians, DJs, upcomingShows, searchResults, user });
});

//Define routes to the musicianX.html files that are accessed when a user clicks on a musician button
app.get('/musician-metrics/:musicianName', (req, res) => {
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

//start the server and listen at the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
