const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../server/config.js');

const getGenreList = (req, res) => {
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${API_KEY}`)
  .then(list => {
      res.send(list.data.genres)
  })
}
// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover

// Don't forget to export your functions and require them within your server file

module.exports.getGenreList = getGenreList;