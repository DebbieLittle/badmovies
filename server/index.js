var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var axios = require('axios');
const {API_KEY} = require('../server/config.js')
var db = require('./database.js')

var api = require('./apiHelpers.js');

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
    // get the search genre     

    // https://www.themoviedb.org/account/signup

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
    // console.log('made it to server.get', req.query.selectedGenre)
  let GENRE_ID = req.query.selectedGenre;
//   console.log('hit app.get', GENRE_ID)
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.asc&include_adult=true&include_video=false&page=1&with_genres=${GENRE_ID}`)
  .then(list => {
    //   console.log(list.data.results)
      res.send(list.data.results);
  })
});

app.get('/genres', function(req, res) {
    // make an axios request to get the list of official genres
    
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list

    // send back

  axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${API_KEY}`)
  .then(list => {
      res.send(list.data.genres)
  })
});

app.get('/favorites', (req, res) => {
  db.getAllFavorites((err, data) => {
    if (err) console.log('GET FAVORITES ERR', err)
    else res.send(data)
  })
})

app.post('/save', function(req, res) {
  let {title, release_date, popularity, poster_path} = req.body;
  let params = [title, release_date, popularity, poster_path];
  db.saveFavorite(params, (err, data) => {
    if (err) console.log(err)
    else res.send(data)
  })
});

app.post('/delete', function(req, res) {
  let {title} = req.body
  db.deleteFavorite(title, (err, data) => {
    if (err) console.log('DELETE ERR', err)
    else res.sendStatus(200)
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
