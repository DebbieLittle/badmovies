const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  let queryStr = 'SELECT * FROM favorites'
  connection.query(queryStr, (err, results) => {
    if (err) callback(err)
    else callback(null, results)
  })
};

const saveFavorite = function(params, callback) {
  // save movie to favorites in the database
  let queryStr = 'INSERT IGNORE INTO favorites (title, release_date, popularity, poster_path) values (?, ?, ?, ?)'
  connection.query(queryStr, params, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  })
};

const deleteFavorite = function(title, callback) {
  // delete a movie from favorites in the database
  let queryStr = 'DELETE FROM favorites WHERE title = ?'
  connection.query(queryStr, title, (err, results) => {
    if (err) callback(err, null)
    else callback(null, results)
  })
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};