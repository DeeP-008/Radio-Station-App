const express = require('express');
const {songs, advertisements} = require('./songs.json');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('pages/index', {
        songs:songs,
        advertisements:advertisements
    });
});

app.get('/help', function(req, res) {
    res.render('pages/help');
});

app.listen(8080);
console.log(songs[1].name)
