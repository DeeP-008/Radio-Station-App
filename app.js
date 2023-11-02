const express = require('express');
const app = express();
const path = require('path');
const port = 8080;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'public/website-project/html')));

app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', path.join(__dirname, 'views')); // Set the "views" directory

// Define the musicians array outside the route handlers
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


app.get('/', (req, res) => {
    // Pass the musicians array to the EJS template
    res.render('index', { musicians, DJs, upcomingShows, searchResults, user });
});

app.get('/musician-metrics/:musicianName', (req, res) => {
  // Implement logic to render the musician metrics page for the provided musicianName
  const musicianName = req.params.musicianName;
  // Use this data to render your EJS template or perform any other actions
  res.render('musician-metrics', { musicianName });
});

app.get('/dj-control-center/:djName', (req, res) => {
  // Implement logic to render the DJ control center page for the provided djName
  const djName = req.params.djName;
  // Use this data to render your EJS template or perform any other actions
  res.render('dj-control-center', { djName });
});

app.get('/upcoming-shows-info/:locationName', (req, res) => {
  // Implement logic to render the upcoming shows info page for the provided locationName
  const locationName = req.params.locationName;
  // Use this data to render your EJS template or perform any other actions
  res.render('upcoming-shows-info', { locationName });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
