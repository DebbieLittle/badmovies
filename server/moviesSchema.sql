DROP DATABASE IF EXISTS badmovies;

CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE favorites (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  release_date varchar(10) NOT NULL,
  popularity varchar(3) NOT NULL,
  poster_path varchar(50) NOT NULL,
  PRIMARY KEY (ID)
)